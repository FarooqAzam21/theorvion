import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_FILE = path.join(__dirname, '../server.log');

const appendToFile = (msg) => {
  try {
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
  } catch (err) { /* ignore */ }
};

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  magenta: '\x1b[35m',
};

const pad = (n) => String(n).padStart(2, '0');

const timestamp = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const logger = {
  info: (msg, meta = '') => {
    appendToFile(`INFO: ${msg} ${meta ? JSON.stringify(meta) : ''}`);
    console.log(`${COLORS.gray}[${timestamp()}]${COLORS.reset} ${COLORS.cyan}INFO${COLORS.reset}  ${msg}`, meta || '');
  },

  success: (msg, meta = '') => {
    appendToFile(`SUCCESS: ${msg} ${meta ? JSON.stringify(meta) : ''}`);
    console.log(`${COLORS.gray}[${timestamp()}]${COLORS.reset} ${COLORS.green}OK  ${COLORS.reset}  ${msg}`, meta || '');
  },

  warn: (msg, meta = '') => {
    appendToFile(`WARN: ${msg} ${meta ? JSON.stringify(meta) : ''}`);
    console.warn(`${COLORS.gray}[${timestamp()}]${COLORS.reset} ${COLORS.yellow}WARN${COLORS.reset}  ${msg}`, meta || '');
  },

  error: (msg, err = '') => {
    appendToFile(`ERROR: ${msg} ${err?.message || err}`);
    console.error(`${COLORS.gray}[${timestamp()}]${COLORS.reset} ${COLORS.red}ERR ${COLORS.reset}  ${msg}`);
    if (err?.stack) console.error(COLORS.red + err.stack + COLORS.reset);
    else if (err) console.error(err);
  },

  rag: (msg, meta = '') => {
    appendToFile(`RAG: ${msg} ${meta ? JSON.stringify(meta) : ''}`);
    console.log(`${COLORS.gray}[${timestamp()}]${COLORS.reset} ${COLORS.magenta}RAG ${COLORS.reset}  ${msg}`, meta || '');
  },
};

export default logger;
