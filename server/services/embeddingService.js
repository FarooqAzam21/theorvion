// ─────────────────────────────────────────────────────────────
//  embeddingService.js  —  Ollama embedding wrapper
// ─────────────────────────────────────────────────────────────
import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from '../utils/logger.js';


const getOllamaConfig = () => ({
  host: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434',
  model: process.env.OLLAMA_EMBEDDING_MODEL || 'nomic-embed-text',
  timeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS || 60000),
});

/**
 * Generate an embedding vector for a text string.
 * Uses Gemini if API key is present, otherwise falls back to local Ollama.
 * @param {string} text
 * @returns {Promise<number[]>} embedding vector
 */
export const embedText = async (text) => {
  // --- 1. Try Gemini (Production Mode) ---
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-embedding-2' });
      const result = await model.embedContent(text.slice(0, 8000));
      return result.embedding.values;
    } catch (err) {
      logger.warn(`Gemini embedding failed; falling back to Ollama. ${err.message}`);
    }
  }

  // --- 2. Fallback to Ollama (Local Mode) ---
  const { host, model, timeoutMs } = getOllamaConfig();
  const cleanText = text.replace(/\s+/g, ' ').trim().slice(0, 8000);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${host.replace(/\/$/, '')}/api/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        input: cleanText,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = await response.text().catch(() => `Status ${response.status}`);
      throw new Error(`Ollama embedding failed: ${error}`);
    }

    const data = await response.json();
    const values = data.embeddings?.[0];

    if (!Array.isArray(values) || values.length === 0) {
      throw new Error(
        `Embedding model ${model} returned invalid response. Check that Ollama is running and the model is installed.`
      );
    }

    return values;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Ollama embedding timed out after ${timeoutMs}ms.`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Generate embeddings for multiple texts in batch (sequential to respect rate limits).
 * @param {string[]} texts
 * @returns {Promise<number[][]>}
 */
export const embedBatch = async (texts, delayMs = 150) => {
  const embeddings = [];
  for (let i = 0; i < texts.length; i++) {
    const embedding = await embedText(texts[i]);
    embeddings.push(embedding);
    logger.rag(`Embedded chunk ${i + 1}/${texts.length}`);
    if (i < texts.length - 1) {
      await new Promise((r) => setTimeout(r, delayMs)); // rate limit buffer
    }
  }
  return embeddings;
};
