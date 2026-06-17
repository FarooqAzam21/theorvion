// ─────────────────────────────────────────────────────────────
//  content.js  —  Content CMS API Routes
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.resolve(__dirname, '..', 'data', 'content.json');

const router = Router();

// ── Helpers ───────────────────────────────────────────────────
const readContent = () => {
  const raw = readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
};

const writeContent = (data) => {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

const VALID_SECTIONS = ['statistics', 'services', 'testimonials', 'portfolio'];

// ── Auth Middleware (admin-only for writes) ───────────────────
const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return res.status(503).json({ error: 'Admin access not configured. Set ADMIN_TOKEN env var.' });
  }

  if (!token || token !== adminToken) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing admin token.' });
  }

  next();
};

// ── GET /api/content — Full content ──────────────────────────
router.get('/', (_req, res) => {
  try {
    const content = readContent();
    res.json(content);
  } catch (err) {
    console.error('Error reading content:', err);
    res.status(500).json({ error: 'Failed to read content' });
  }
});

// ── GET /api/content/:section — Single section ───────────────
router.get('/:section', (req, res) => {
  const { section } = req.params;

  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({
      error: `Invalid section: "${section}". Valid: ${VALID_SECTIONS.join(', ')}`,
    });
  }

  try {
    const content = readContent();
    res.json(content[section]);
  } catch (err) {
    console.error(`Error reading ${section}:`, err);
    res.status(500).json({ error: `Failed to read ${section}` });
  }
});

// ── PUT /api/content/:section — Update a section (admin) ─────
router.put('/:section', requireAdmin, (req, res) => {
  const { section } = req.params;

  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({
      error: `Invalid section: "${section}". Valid: ${VALID_SECTIONS.join(', ')}`,
    });
  }

  if (!req.body || (typeof req.body !== 'object')) {
    return res.status(400).json({ error: 'Request body must be a valid JSON object or array.' });
  }

  try {
    const content = readContent();
    content[section] = req.body;
    writeContent(content);
    res.json({ success: true, section, data: content[section] });
  } catch (err) {
    console.error(`Error updating ${section}:`, err);
    res.status(500).json({ error: `Failed to update ${section}` });
  }
});

export default router;
