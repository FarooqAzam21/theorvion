// ─────────────────────────────────────────────────────────────
//  index.js  —  The Orvion RAG Chatbot Server Entry Point
// ─────────────────────────────────────────────────────────────
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { load as loadVectorStore } from './services/vectorStore.js';
import { runIngestion } from './rag/pipeline.js';
import chatRoute from './routes/chat.js';
import ingestRoute from './routes/ingest.js';
import healthRoute from './routes/health.js';
import contentRoute from './routes/content.js';
import authRoute from './routes/auth.js';
import blogsRoute from './routes/blogs.js';
import adminBlogsRoute from './routes/adminBlogs.js';
import { connectDB } from './services/db.js';
import logger from './utils/logger.js';

// Load .env from the same directory as this file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// ── Trust proxy (required for Render / behind load balancers) ──
app.set('trust proxy', 1);

// ── Security ──────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ── CORS ──────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:4173',
  'https://theorvion.io',
  'https://www.theorvion.io',
];

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false }));

// ── Request Logger ────────────────────────────────────────────
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});
// ── Root Route ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    service: 'The Orvion RAG Chatbot API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /api/health',
      chat: 'POST /api/chat',
      ingest: 'POST /api/ingest',
    },
  });
});
// ── Routes ────────────────────────────────────────────────────
app.use('/api/health', healthRoute);
app.use('/api/chat', chatRoute);
app.use('/api/ingest', ingestRoute);
app.use('/api/content', contentRoute);
app.use('/api/auth', authRoute);
app.use('/api/blogs', blogsRoute);
app.use('/api/admin/blogs', adminBlogsRoute);
app.use('/uploads', express.static(path.join(__dirname, 'data/uploads')));

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, _next) => {
  logger.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Startup ───────────────────────────────────────────────────
const start = async () => {
  logger.info('Starting The Orvion RAG Server...');

  // Initialize Database
  await connectDB();

  const provider = process.env.GEMINI_API_KEY ? 'Google Gemini (Fast Mode)' : `Ollama (${process.env.OLLAMA_MODEL || 'qwen2.5:0.5b'})`;
  logger.info(`Active AI Provider: ${provider}`);

  // Load persisted vector store
  loadVectorStore();

  // Start listening immediately so the frontend can connect
  app.listen(PORT, () => {
    logger.success(`🚀 Orvion RAG Server running on http://localhost:${PORT}`);
    logger.info(`Health check: http://localhost:${PORT}/api/health`);
  });

  // Auto-ingest if vector store is empty and semantic retrieval is enabled.
  try {
    if (process.env.RAG_RETRIEVAL_MODE === 'semantic') {
      await runIngestion(false); // will skip if already populated
    }
  } catch (err) {
    logger.error('Auto-ingestion failed. Server starting without vector data.', err);
  }
};

start();
