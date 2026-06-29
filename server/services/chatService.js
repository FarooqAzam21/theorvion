// ─────────────────────────────────────────────────────────────
//  chatService.js  —  Full RAG generation orchestrator
//  Provider chain: Groq (free) → Gemini → Ollama (local dev)
// ─────────────────────────────────────────────────────────────
import { retrieve, calcConfidence } from './retrievalService.js';
import { buildPrompt, buildCitations } from '../rag/promptBuilder.js';
import logger from '../utils/logger.js';

// ── Shared helper: convert Gemini-format contents to OpenAI messages ──────────
const toOpenAIMessages = (systemInstruction, contents) => [
  { role: 'system', content: systemInstruction },
  ...contents.map((turn) => ({
    role: turn.role === 'model' ? 'assistant' : 'user',
    content: turn.parts?.map((p) => p.text).filter(Boolean).join('\n') || '',
  })),
];

// ── Provider: Groq (free tier, OpenAI-compatible) ────────────────────────────
/**
 * Generate a response via Groq's free API (llama3 family).
 * Docs: https://console.groq.com/docs/openai
 */
const generateWithGroq = async (systemInstruction, contents) => {
  const model = process.env.GROQ_MODEL || 'llama3-8b-8192';
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: toOpenAIMessages(systemInstruction, contents),
      temperature: 0.3,
      max_tokens: Number(process.env.GROQ_MAX_TOKENS || 512),
      top_p: 0.85,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errMsg = data.error?.message || `Groq error ${response.status}`;
    const err = new Error(errMsg);
    err.status = response.status;
    throw err;
  }

  return data.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response.";
};

// ── Provider: Google Gemini ───────────────────────────────────────────────────
const generateWithGemini = async (systemInstruction, contents) => {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
    systemInstruction,
  });

  const history = contents.slice(0, -1).map((turn) => ({
    role: turn.role,
    parts: turn.parts,
  }));

  const lastTurn = contents[contents.length - 1];
  const userMessage = lastTurn?.parts?.map((p) => p.text).join('\n') || '';

  const chatSession = model.startChat({ history });
  const result = await chatSession.sendMessage(userMessage);
  const text = result.response.text();
  return text?.trim() || "I'm sorry, I couldn't generate a response.";
};

// ── Provider: Ollama (local dev fallback) ────────────────────────────────────
const getOllamaConfig = () => ({
  host: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434',
  model: process.env.OLLAMA_MODEL || 'qwen2.5:0.5b',
  timeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS || 60000),
  maxTokens: Number(process.env.OLLAMA_MAX_TOKENS || 512),
});

const generateWithOllama = async (systemInstruction, contents) => {
  const { host, model, timeoutMs, maxTokens } = getOllamaConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${host.replace(/\/$/, '')}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: toOpenAIMessages(systemInstruction, contents),
        stream: false,
        options: { temperature: 0.3, top_p: 0.85, num_predict: maxTokens, num_thread: 4 },
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Ollama error ${response.status}`);
    return data.message?.content?.trim() || data.response?.trim() || "I'm sorry, I couldn't generate a response.";
  } catch (err) {
    if (err.name === 'AbortError') throw new Error(`Ollama timed out after ${timeoutMs}ms.`);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

// ── Main chat function with provider waterfall ────────────────────────────────
/**
 * Process a chat message through the full RAG pipeline.
 *
 * Provider priority:
 *   1. Groq  (GROQ_API_KEY set)   — free, fast, generous limits
 *   2. Gemini (GEMINI_API_KEY set) — fallback if Groq fails / not configured
 *   3. Ollama (local dev)          — last resort
 *
 * 429 quota errors auto-cascade to the next provider.
 *
 * @param {string} message
 * @param {object[]} history
 * @returns {Promise<{ answer: string, sources: object[], confidence: number }>}
 */
export const chat = async (message, history = []) => {
  // 1. Retrieve relevant context chunks
  const contextChunks = await retrieve(message, Number(process.env.RAG_TOP_K || 3), 0.25);
  const confidence = calcConfidence(contextChunks);

  // 2. Build structured prompt
  const { systemInstruction, contents } = buildPrompt(message, contextChunks, history);

  // 3. Provider waterfall
  const providers = [];

  if (process.env.GROQ_API_KEY) {
    providers.push({
      name: `Groq (${process.env.GROQ_MODEL || 'llama3-8b-8192'})`,
      fn: () => generateWithGroq(systemInstruction, contents),
    });
  }

  if (process.env.GEMINI_API_KEY) {
    providers.push({
      name: `Gemini (${process.env.GEMINI_MODEL || 'gemini-2.0-flash'})`,
      fn: () => generateWithGemini(systemInstruction, contents),
    });
  }

  // Always include Ollama as a last resort for local dev
  providers.push({
    name: `Ollama (${getOllamaConfig().model})`,
    fn: () => generateWithOllama(systemInstruction, contents),
  });

  let lastError;
  for (const provider of providers) {
    try {
      logger.rag(`Generating response with ${provider.name} (confidence: ${confidence}%, chunks: ${contextChunks.length})`);
      const answer = await provider.fn();
      const sources = buildCitations(contextChunks);
      logger.success(`Response generated via ${provider.name} — ${answer.length} chars`);
      return { answer, sources, confidence };
    } catch (err) {
      lastError = err;
      // Cascade on quota/rate-limit errors (429) or connection failures
      const isTransient = err.status === 429 || err.message?.includes('429') ||
        err.message?.includes('quota') || err.message?.includes('rate') ||
        err.message?.includes('fetch failed') || err.message?.includes('ECONNREFUSED');

      if (isTransient) {
        logger.warn(`${provider.name} unavailable (${err.message?.slice(0, 80)}). Trying next provider...`);
        continue;
      }
      // Non-transient error — bubble up immediately
      throw err;
    }
  }

  // All providers failed
  throw lastError || new Error('All AI providers are currently unavailable.');
};
