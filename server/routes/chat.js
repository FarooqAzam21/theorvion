// ─────────────────────────────────────────────────────────────
//  routes/chat.js  —  Main chat endpoint
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import { chat } from '../services/chatService.js';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { validateChatRequest } from '../middleware/validator.js';
import logger from '../utils/logger.js';

const router = Router();

// POST /api/chat
// Body: { message: string, history: { role: string, content: string }[] }
router.post('/', chatLimiter, validateChatRequest, async (req, res) => {
  const { message, history } = req.body;
  const startTime = Date.now();

  logger.info(`Chat request: "${message.slice(0, 60)}${message.length > 60 ? '...' : ''}"`);

  try {
    const { answer, sources, confidence } = await chat(message, history);
    const latencyMs = Date.now() - startTime;

    logger.success(`Chat OK — ${latencyMs}ms | confidence: ${confidence}%`);

    res.json({
      success: true,
      answer,
      sources,
      confidence,
      latencyMs,
    });
  } catch (err) {
    logger.error('Chat generation failed', err);

    if (
      err.message?.includes('fetch failed') ||
      err.message?.includes('ECONNREFUSED') ||
      err.message?.includes('Ollama request timed out')
    ) {
      return res.status(503).json({
        success: false,
        error: 'Local Ollama is not responding. Please start Ollama and try again.',
        code: 'OLLAMA_UNAVAILABLE',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Something went wrong generating a response. Please try again.',
      code: 'GENERATION_ERROR',
    });
  }
});

export default router;
