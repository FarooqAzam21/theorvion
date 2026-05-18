// ─────────────────────────────────────────────────────────────
//  routes/ingest.js  —  Knowledge base ingestion endpoint
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import { runIngestion } from '../rag/pipeline.js';
import { ingestLimiter } from '../middleware/rateLimiter.js';
import logger from '../utils/logger.js';

const router = Router();

// POST /api/ingest
// Body: { force: boolean }  — set force=true to re-embed everything
router.post('/', ingestLimiter, async (req, res) => {
  const { force = false } = req.body;

  logger.info(`Ingestion requested (force=${force})`);

  try {
    const result = await runIngestion(force);
    res.json({
      success: true,
      skipped: result.skipped,
      chunksIngested: result.count,
      message: result.skipped
        ? 'Vector store already populated. Pass force=true to re-ingest.'
        : `Successfully ingested ${result.count} chunks into the vector store.`,
    });
  } catch (err) {
    logger.error('Ingestion failed', err);
    res.status(500).json({
      success: false,
      error: 'Ingestion failed. Check server logs for details.',
    });
  }
});

export default router;
