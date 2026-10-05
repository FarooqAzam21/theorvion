// ─────────────────────────────────────────────────────────────
//  retrievalService.js  —  Semantic search & context ranking
// ─────────────────────────────────────────────────────────────
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { embedText } from './embeddingService.js';
import { keywordSearch, search } from './vectorStore.js';
import { processDocument } from '../rag/chunker.js';
import logger from '../utils/logger.js';

const SERVICES_KNOWLEDGE_PATH = new URL('../data/knowledge/services.json', import.meta.url);

const loadServiceKnowledge = () => {
  const document = JSON.parse(readFileSync(fileURLToPath(SERVICES_KNOWLEDGE_PATH), 'utf8'));
  return processDocument(document);
};

const isServiceOverviewQuery = (query) => (
  /\b(?:what|which|list|tell me about|describe)\b.*\bservices?\b|\bservices?\b.*\b(?:offer|provide|include|available|overview)\b|\bwhat do you offer\b|\bwhat (?:do you|does (?:the )?orvion) do\b|\bwhat can (?:the )?orvion do\b/i
    .test(query)
);

/**
 * Retrieve the most relevant context chunks for a query.
 * @param {string} query - User's message
 * @param {number} topK - Number of top results to return
 * @param {number} minScore - Minimum similarity threshold
 * @returns {Promise<{ id, text, metadata, score }[]>}
 */
export const retrieve = async (query, topK = 5, minScore = 0.40) => {
  logger.rag(`Retrieving context for: "${query.slice(0, 60)}..."`);

  if (isServiceOverviewQuery(query)) {
    const services = loadServiceKnowledge().map((doc) => ({
      ...doc,
      score: 1,
    }));
    logger.rag(`Retrieved complete services knowledge (${services.length} chunks)`);
    return services;
  }

  let results = [];
  const retrievalMode = process.env.RAG_RETRIEVAL_MODE || 'keyword';

  if (retrievalMode === 'keyword') {
    results = keywordSearch(query, topK * 2);
  } else {
    try {
      // 1. Embed the user query
      const queryEmbedding = await embedText(query);

      // 2. Semantic search in vector store
      results = search(queryEmbedding, topK * 2, minScore); // over-fetch then re-rank
    } catch (err) {
      logger.warn(`Semantic retrieval failed; using keyword fallback. ${err.message}`);
      results = keywordSearch(query, topK * 2);
    }
  }

  // 3. Deduplicate by section (avoid repeating same source section)
  const seen = new Set();
  const deduped = results.filter((r) => {
    const key = `${r.metadata.source}:${r.metadata.section}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 4. Return top-K after deduplication
  const final = deduped.slice(0, topK);
  logger.rag(`Retrieved ${final.length} chunks (scores: ${final.map((r) => r.score.toFixed(2)).join(', ')})`);

  return final;
};

/**
 * Calculate an overall confidence score based on retrieved chunk scores.
 * @param {{ score: number }[]} chunks
 * @returns {number} 0–100
 */
export const calcConfidence = (chunks) => {
  if (!chunks || chunks.length === 0) return 0;
  const avgScore = chunks.reduce((sum, c) => sum + c.score, 0) / chunks.length;
  const topScore = chunks[0]?.score ?? 0;
  // Weighted: 60% top score + 40% average
  const raw = 0.6 * topScore + 0.4 * avgScore;
  return Math.min(100, Math.round(raw * 100));
};
