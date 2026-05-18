// ─────────────────────────────────────────────────────────────
//  rateLimiter.js  —  Rate limiting middleware
// ─────────────────────────────────────────────────────────────
import rateLimit from 'express-rate-limit';

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute
  max: 30,                    // 30 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please slow down and try again in a minute.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  skip: (req) => process.env.NODE_ENV === 'development', // disable in dev
});

export const ingestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 5,                     // max 5 ingestion runs per hour
  message: {
    error: 'Ingestion rate limit exceeded. Try again later.',
    code: 'INGEST_RATE_LIMIT',
  },
});
