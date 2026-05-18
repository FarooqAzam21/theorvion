// ─────────────────────────────────────────────────────────────
//  chunker.js  —  Document chunking for RAG ingestion
// ─────────────────────────────────────────────────────────────

const CHUNK_SIZE = 600;      // characters per chunk
const CHUNK_OVERLAP = 80;    // overlap between chunks

/**
 * Split a long text into overlapping chunks.
 * @param {string} text
 * @param {number} chunkSize
 * @param {number} overlap
 * @returns {string[]}
 */
export const splitIntoChunks = (text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) => {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = start + chunkSize;

    // Try to break at a sentence boundary
    if (end < text.length) {
      const breakAt = text.lastIndexOf('. ', end);
      if (breakAt > start + chunkSize * 0.5) {
        end = breakAt + 1;
      }
    }

    const chunk = text.slice(start, end).trim();
    if (chunk.length > 20) chunks.push(chunk); // skip tiny chunks
    start = end - overlap;
  }

  return chunks;
};

/**
 * Process a single knowledge base document (JSON format).
 * Returns an array of chunk objects ready for embedding.
 * @param {object} doc - Parsed JSON document
 * @returns {{ id: string, text: string, metadata: object }[]}
 */
export const processDocument = (doc) => {
  const chunks = [];
  const source = doc.source || 'unknown';
  const title = doc.title || source;

  if (!Array.isArray(doc.content)) return chunks;

  doc.content.forEach((item, idx) => {
    const fullText = `${title} — ${item.section}:\n${item.text}`;
    const subChunks = splitIntoChunks(fullText);

    subChunks.forEach((chunk, subIdx) => {
      chunks.push({
        id: `${source}_${idx}_${subIdx}`,
        text: chunk,
        metadata: {
          source,
          title,
          section: item.section,
          chunkIndex: subIdx,
          totalChunks: subChunks.length,
        },
      });
    });
  });

  return chunks;
};

/**
 * Process a plain text document.
 * @param {string} text
 * @param {string} source
 * @returns {{ id: string, text: string, metadata: object }[]}
 */
export const processText = (text, source = 'text') => {
  const subChunks = splitIntoChunks(text);
  return subChunks.map((chunk, idx) => ({
    id: `${source}_${idx}`,
    text: chunk,
    metadata: { source, section: `chunk_${idx}` },
  }));
};
