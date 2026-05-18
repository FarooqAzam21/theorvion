// ─────────────────────────────────────────────────────────────
//  vectorStore.js  —  Zero-dependency local JSON vector store
//  Interface-compatible so you can swap to Pinecone/ChromaDB
// ─────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE_DIR = join(__dirname, '../data/vector-store');
const STORE_PATH = join(STORE_DIR, 'index.json');

// ── In-memory store ───────────────────────────────────────────
let store = { documents: [], metadata: { createdAt: null, count: 0 } };
let isDirty = false;

// ── Cosine Similarity ─────────────────────────────────────────
const cosineSimilarity = (vecA, vecB) => {
  if (!Array.isArray(vecA) || !Array.isArray(vecB) || vecA.length !== vecB.length) {
    return 0;
  }

  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
};

// ── Persistence ───────────────────────────────────────────────
export const load = () => {
  try {
    if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
    if (existsSync(STORE_PATH)) {
      const raw = readFileSync(STORE_PATH, 'utf-8');
      store = JSON.parse(raw);
      logger.success(`Vector store loaded — ${store.documents.length} documents`);
    } else {
      logger.warn('Vector store not found — will create on first ingest');
    }
  } catch (err) {
    logger.error('Failed to load vector store', err);
  }
};

export const save = () => {
  try {
    if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });
    writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
    isDirty = false;
    logger.success(`Vector store saved — ${store.documents.length} documents`);
  } catch (err) {
    logger.error('Failed to save vector store', err);
  }
};

export const clear = () => {
  store = { documents: [], metadata: { createdAt: null, count: 0 } };
  isDirty = true;
};

// ── CRUD ──────────────────────────────────────────────────────
/**
 * Add a document to the vector store.
 * @param {string} id - Unique ID
 * @param {string} text - Raw text content
 * @param {number[]} embedding - Embedding vector
 * @param {object} metadata - Source info (source, section, etc.)
 */
export const add = (id, text, embedding, metadata = {}) => {
  store.documents.push({ id, text, embedding, metadata });
  store.metadata.count = store.documents.length;
  store.metadata.updatedAt = new Date().toISOString();
  isDirty = true;
};

/**
 * Semantic similarity search.
 * @param {number[]} queryEmbedding
 * @param {number} topK - Number of results to return
 * @param {number} minScore - Minimum similarity threshold (0–1)
 * @returns {{ id, text, metadata, score }[]}
 */
export const search = (queryEmbedding, topK = 5, minScore = 0.3) => {
  if (store.documents.length === 0) return [];

  const scored = store.documents.map((doc) => ({
    id: doc.id,
    text: doc.text,
    metadata: doc.metadata,
    score: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  return scored
    .filter((d) => d.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};

const STOP_WORDS = new Set([
  'about', 'all', 'and', 'are', 'can', 'for', 'from', 'has', 'how', 'our',
  'the', 'their', 'them', 'this', 'that', 'what', 'when', 'where', 'which',
  'who', 'why', 'with', 'you', 'your',
]);

const tokenize = (text) => (
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
);

/**
 * Local fallback search used when the embedding provider is unavailable.
 * @param {string} query
 * @param {number} topK
 * @returns {{ id, text, metadata, score }[]}
 */
export const keywordSearch = (query, topK = 5) => {
  if (store.documents.length === 0) return [];

  const queryTerms = new Set(tokenize(query));
  if (queryTerms.size === 0) return [];

  return store.documents
    .map((doc) => {
      const headingText = `${doc.metadata?.source ?? ''} ${doc.metadata?.title ?? ''} ${doc.metadata?.section ?? ''}`;
      const docText = `${headingText} ${doc.text}`;
      const normalizedHeading = headingText.toLowerCase();
      const normalizedQuery = query.toLowerCase();
      const headingTerms = tokenize(headingText);
      const docTerms = tokenize(docText);
      const matches = docTerms.filter((term) => queryTerms.has(term)).length;
      const headingMatches = headingTerms.filter((term) => queryTerms.has(term)).length;
      const coverage = [...queryTerms].filter((term) => docTerms.includes(term)).length / queryTerms.size;
      const headingBoost = headingMatches / queryTerms.size;
      const phraseBoost = normalizedQuery.includes('web development') && normalizedHeading.includes('web development') ? 0.3 : 0;
      const rank = (matches / Math.max(docTerms.length, 1)) * 5 + coverage * 0.45 + headingBoost * 0.3 + phraseBoost;
      const score = Math.min(0.95, rank);

      return {
        id: doc.id,
        text: doc.text,
        metadata: doc.metadata,
        rank,
        score,
      };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, topK);
};

export const size = () => store.documents.length;

export const getMetadata = () => ({ ...store.metadata, count: store.documents.length });
