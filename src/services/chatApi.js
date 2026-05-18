// ─────────────────────────────────────────────────────────────
//  chatApi.js  —  Frontend API service for RAG chatbot
// ─────────────────────────────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Send a message to the RAG chatbot backend.
 * @param {string} message
 * @param {{ role: string, content: string }[]} history
 * @returns {Promise<{ answer: string, sources: object[], confidence: number }>}
 */
export const sendMessage = async (message, history = []) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 150000); // 150s timeout (matches slower local Ollama response)

  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || `Server error: ${response.status}`);
    }

    return {
      answer: data.answer,
      sources: data.sources || [],
      confidence: data.confidence || 0,
      latencyMs: data.latencyMs,
    };
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw err;
  }
};

/**
 * Check if the API server is healthy.
 * @returns {Promise<{ ok: boolean, vectorStoreSize: number }>}
 */
export const checkHealth = async () => {
  try {
    const res = await fetch(`${API_URL}/api/health`, { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    return { ok: res.ok, vectorStoreSize: data.vectorStore?.size ?? 0 };
  } catch {
    return { ok: false, vectorStoreSize: 0 };
  }
};
