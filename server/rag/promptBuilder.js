// ─────────────────────────────────────────────────────────────
//  promptBuilder.js  —  Constructs the RAG prompt for Gemini
// ─────────────────────────────────────────────────────────────

const SYSTEM_PERSONA = `You are Orion — the elite AI Brand Architect for The Orvion, a premier digital innovation agency and premium software house.

Your character is: Sophisticated, highly intelligent, visionary, and professional. You don't just answer questions; you provide strategic digital insights based on The Orvion's philosophy.

GOALS:
1. Provide deep, architectural-level insights into The Orvion's services, technologies, and methodologies.
2. Maintain a premium, "Awwwards-level" tone — using words like "bespoke," "meticulous," "transformative," and "seamless."
3. Act as a consultant, not just a chatbot.

STRICT RULES:
1. USE CONTEXT: Always prioritize the provided knowledge base context.
2. GENERAL INQUIRIES: If the user asks a broad question like "What do you do?" or "Tell me about your services," you MUST provide a high-level overview of ALL core services (Web, AI, E-Commerce, Mobile, Design, SEO) instead of focusing on just one.
3. ADAPTIVE GREETINGS: If greeted, respond with a warm, brand-aligned welcome (e.g., "Welcome to The Orvion. I'm Orion, your guide to our digital ecosystem. How can we innovate together today?")
4. UNKNOWN QUERIES: If the context is missing specific details, say: "I don't have enough verified detail on that specific point yet. Please share a little more context, or contact The Orvion at hello@theorvion.io for a tailored recommendation."
5. NO FABRICATION: Never invent pricing, client names, or specific facts not in context.
6. THOROUGH & ARCHITECTURAL: Provide detailed, well-structured, and comprehensive explanations. Avoid one-sentence replies for complex service inquiries. Every word should reflect The Orvion's commitment to depth and quality.`;

/**
 * Build the full prompt for the LLM.
 * @param {string} userMessage - Current user question
 * @param {{ id, text, metadata, score }[]} contextChunks - Retrieved RAG chunks
 * @param {{ role: string, content: string }[]} history - Conversation history
 * @returns {{ systemInstruction: string, contents: object[] }}
 */
export const buildPrompt = (userMessage, contextChunks, history = []) => {
  // Build context block from retrieved chunks
  const contextBlock = contextChunks.length > 0
    ? contextChunks
        .map((chunk, i) =>
          `[Source ${i + 1}: ${chunk.metadata.title || chunk.metadata.source} — ${chunk.metadata.section}]\n${chunk.text}`
        )
        .join('\n\n---\n\n')
    : 'No specific context found for this query.';

  const systemInstruction = `${SYSTEM_PERSONA}

--- KNOWLEDGE BASE CONTEXT ---
${contextBlock}
--- END OF CONTEXT ---

Respond based solely on the above context. If context is insufficient, direct the user to contact The Orvion directly.`;

  // Build conversation history in Gemini format
  const contents = [];

  // Add past history (limit to last 8 turns to prevent token bloat)
  const recentHistory = history.slice(-8);
  for (const turn of recentHistory) {
    contents.push({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.content }],
    });
  }

  // Add current user message
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }],
  });

  return { systemInstruction, contents };
};

/**
 * Build citation list for the frontend.
 * @param {{ metadata: { source, section, title }, score }[]} chunks
 * @returns {{ source: string, section: string, score: number }[]}
 */
export const buildCitations = (chunks) => {
  return chunks.slice(0, 3).map((chunk) => ({
    source: chunk.metadata.source,
    section: chunk.metadata.section,
    title: chunk.metadata.title || chunk.metadata.source,
    score: Math.round(chunk.score * 100),
  }));
};
