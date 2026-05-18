// ─────────────────────────────────────────────────────────────
//  pipeline.js  —  RAG ingestion pipeline
// ─────────────────────────────────────────────────────────────
import { readdirSync, readFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { processDocument, processText } from './chunker.js';
import { embedBatch } from '../services/embeddingService.js';
import * as vectorStore from '../services/vectorStore.js';
import logger from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, '../data/knowledge');

/**
 * Load and process all knowledge base files.
 * @returns {Array} All chunks ready for embedding
 */
const loadKnowledgeBase = () => {
  const files = readdirSync(KNOWLEDGE_DIR);
  const allChunks = [];

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const filePath = join(KNOWLEDGE_DIR, file);

    try {
      if (ext === '.json') {
        const raw = readFileSync(filePath, 'utf-8');
        const doc = JSON.parse(raw);
        const chunks = processDocument(doc);
        allChunks.push(...chunks);
        logger.rag(`Loaded ${chunks.length} chunks from ${file}`);
      } else if (ext === '.txt' || ext === '.md') {
        const text = readFileSync(filePath, 'utf-8');
        const chunks = processText(text, file.replace(ext, ''));
        allChunks.push(...chunks);
        logger.rag(`Loaded ${chunks.length} chunks from ${file}`);
      }
    } catch (err) {
      logger.error(`Failed to load ${file}`, err);
    }
  }

  return allChunks;
};

/**
 * Run the full ingestion pipeline:
 * Load → Chunk → Embed → Store → Save
 * @param {boolean} force - If false, skips if store already populated
 */
export const runIngestion = async (force = false) => {
  if (!force && vectorStore.size() > 0) {
    logger.info(`Vector store already populated (${vectorStore.size()} docs). Skipping ingestion.`);
    return { skipped: true, count: vectorStore.size() };
  }

  logger.rag('Starting RAG ingestion pipeline...');
  const startTime = Date.now();

  // 1. Load and chunk all knowledge base files
  const chunks = loadKnowledgeBase();
  if (chunks.length === 0) {
    logger.warn('No knowledge base documents found.');
    return { skipped: false, count: 0 };
  }
  logger.rag(`Total chunks to embed: ${chunks.length}`);

  // 2. Generate embeddings for all chunks
  const texts = chunks.map((c) => c.text);
  const embeddings = await embedBatch(texts, 150); // 150ms delay between calls

  // 3. Clear old store and insert all new documents
  vectorStore.clear();
  for (let i = 0; i < chunks.length; i++) {
    vectorStore.add(chunks[i].id, chunks[i].text, embeddings[i], chunks[i].metadata);
  }

  // 4. Persist to disk
  vectorStore.save();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  logger.success(`Ingestion complete — ${chunks.length} chunks in ${elapsed}s`);

  return { skipped: false, count: chunks.length };
};
