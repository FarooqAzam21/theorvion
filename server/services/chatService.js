// ─────────────────────────────────────────────────────────────
//  chatService.js  —  Full RAG generation orchestrator
// ─────────────────────────────────────────────────────────────
import { retrieve, calcConfidence } from './retrievalService.js';
import { buildPrompt, buildCitations } from '../rag/promptBuilder.js';
import logger from '../utils/logger.js';

const getOllamaConfig = () => ({
  host: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434',
  model: process.env.OLLAMA_MODEL || 'qwen2.5:0.5b',
  timeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS || 60000),
  maxTokens: Number(process.env.OLLAMA_MAX_TOKENS || 512),
});

const withTimeout = (ms) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return { controller, timeout };
};

const toOllamaMessages = (systemInstruction, contents) => [
  { role: 'system', content: systemInstruction },
  ...contents.map((turn) => ({
    role: turn.role === 'model' ? 'assistant' : 'user',
    content: turn.parts?.map((part) => part.text).filter(Boolean).join('\n') || '',
  })),
];

const generateWithOllama = async (systemInstruction, contents) => {
  const { host, model, timeoutMs, maxTokens } = getOllamaConfig();
  const { controller, timeout } = withTimeout(timeoutMs);

  try {
    const response = await fetch(`${host.replace(/\/$/, '')}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: toOllamaMessages(systemInstruction, contents),
        stream: false,
        options: {
          temperature: 0.3,
          top_p: 0.85,
          num_predict: maxTokens,
          num_thread: 4,
        },
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Ollama request failed with status ${response.status}`);
    }

    return data.message?.content?.trim() || data.response?.trim() || "I'm sorry, I couldn't generate a response.";
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Ollama request timed out after ${timeoutMs}ms.`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Process a chat message through the full RAG pipeline with retry logic.
 * @param {string} message - User's current message
 * @param {{ role: string, content: string }[]} history - Conversation history
 * @returns {Promise<{ answer: string, sources: object[], confidence: number }>}
 */
export const chat = async (message, history = []) => {
  // 1. Retrieve relevant context chunks
  const contextChunks = await retrieve(message, Number(process.env.RAG_TOP_K || 3), 0.25);
  const confidence = calcConfidence(contextChunks);

  // 2. Build structured prompt
  const { systemInstruction, contents } = buildPrompt(message, contextChunks, history);

  // 3. Generate response with Ollama
  logger.rag(`Generating response with Ollama ${getOllamaConfig().model} (confidence: ${confidence}%, chunks: ${contextChunks.length})`);

  const answer = await generateWithOllama(systemInstruction, contents);

  // 4. Build citations for frontend
  const sources = buildCitations(contextChunks);

  logger.success(`Response generated — ${answer.length} chars`);

  return { answer, sources, confidence };
};
