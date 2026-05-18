// ─────────────────────────────────────────────────────────────
//  routes/health.js  —  Health check endpoint
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import { size, getMetadata } from '../services/vectorStore.js';

const router = Router();

router.get('/', (req, res) => {
  const storeInfo = getMetadata();
  res.json({
    status: 'ok',
    service: 'The Orvion RAG Chatbot API',
    vectorStore: {
      size: size(),
      ...storeInfo,
    },
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
