// ─────────────────────────────────────────────────────────────
//  chatService.js  —  Full RAG generation orchestrator
// ─────────────────────────────────────────────────────────────
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retrieve, calcConfidence } from './retrievalService.js';

import { buildPrompt, buildCitations } from '../rag/promptBuilder.js';
import logger from '../utils/logger.js';

const SERVICE_INTENT_RE = /\b(services?|offer(?:ing)?s?|what\s+do\s+you\s+do|what\s+you\s+do|our\s+service|your\s+service|provide|solutions?)\b/i;

const SERVICE_OVERVIEW_ANSWER = `The Orvion offers focused digital services for businesses that need practical growth, premium design, and reliable software delivery:

- **Custom Software Development** — scalable business platforms, dashboards, portals, admin systems, and SaaS-style products.
- **Web Applications** — fast, responsive, conversion-focused websites and web apps built with modern frontend and backend stacks.
- **AI Automation** — AI chatbots, workflow automation, RAG systems, CRM integrations, and smart internal tools.
- **UI/UX Design** — premium interfaces, landing pages, product flows, design systems, and conversion-focused user experiences.
- **Digital Marketing** — campaign strategy, content, funnels, SEO support, and lead-generation systems.
- **Influencer Marketing** — creator partnerships that help brands build trust, reach relevant audiences, and drive action.
- **Cloud & Support** — deployment, monitoring, performance improvements, maintenance, and scalable infrastructure.

If you already have a project in mind, share the goal and I can suggest the best service mix for it.`;

const getDirectServiceAnswer = (message) => {
  if (!SERVICE_INTENT_RE.test(message)) return null;

  return {
    answer: SERVICE_OVERVIEW_ANSWER,
    sources: [
      {
        source: 'services',
        section: 'Collective Services Overview',
        title: 'The Orvion Services',
        score: 100,
      },
    ],
    confidence: 100,
  };
};

const getOllamaConfig = () => ({
  host: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434',
  model: process.env.OLLAMA_MODEL || 'qwen2.5:0.5b',
  timeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS || 120000),
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
          num_ctx: 2048,
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
  const directAnswer = getDirectServiceAnswer(message);
  if (directAnswer) {
    logger.success('Direct services overview response generated');
    return directAnswer;
  }

  // 1. Retrieve relevant context chunks
  const contextChunks = await retrieve(message, Number(process.env.RAG_TOP_K || 2), 0.25);
  const confidence = calcConfidence(contextChunks);

  // 2. Build structured prompt
  const { systemInstruction, contents } = buildPrompt(message, contextChunks, history);

  // 3. Generate response
  let answer = '';

  if (process.env.GEMINI_API_KEY) {
    // --- 3a. Use Gemini (Production Mode) ---
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction,
      });

      const result = await model.generateContent({
        contents,
        generationConfig: {
          temperature: 0.5,
          topP: 0.85,
          maxOutputTokens: 1024,
        },
      });

      answer = result.response.text().trim();
      logger.success(`Response generated with Gemini (confidence: ${confidence}%)`);
    } catch (err) {
      logger.warn(`Gemini generation failed; falling back to Ollama. ${err.message}`);
      answer = await generateWithOllama(systemInstruction, contents);
    }
  } else {
    // --- 3b. Use Ollama (Local Mode) ---
    logger.rag(`Generating response with Ollama ${getOllamaConfig().model} (confidence: ${confidence}%, chunks: ${contextChunks.length})`);
    answer = await generateWithOllama(systemInstruction, contents);
  }

  // 4. Build citations for frontend
  const sources = buildCitations(contextChunks);

  logger.success(`Response generated — ${answer.length} chars`);

  return { answer, sources, confidence };
};
