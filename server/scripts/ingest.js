// ─────────────────────────────────────────────────────────────
//  scripts/ingest.js  —  Standalone ingestion script
//  Run: node scripts/ingest.js         (incremental)
//  Run: node scripts/ingest.js --force (re-embed everything)
// ─────────────────────────────────────────────────────────────
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { load as loadVectorStore } from '../services/vectorStore.js';
import { runIngestion } from '../rag/pipeline.js';
import logger from '../utils/logger.js';

// Load .env from the server root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const force = process.argv.includes('--force');

logger.info(`Running standalone ingestion script (force=${force})`);
loadVectorStore();

runIngestion(force)
  .then((result) => {
    if (result.skipped) {
      logger.info('Ingestion skipped — vector store already populated.');
      logger.info('Use: node scripts/ingest.js --force  to re-ingest.');
    } else {
      logger.success(`Ingestion complete! ${result.count} chunks embedded and stored.`);
    }
    process.exit(0);
  })
  .catch((err) => {
    logger.error('Ingestion script failed', err);
    process.exit(1);
  });
