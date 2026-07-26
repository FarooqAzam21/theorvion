import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import { getCyberGuardResults } from '../services/cyberguardService.js';

const router = Router();

router.get('/', authMiddleware, (_req, res) => {
  res.json({ results: getCyberGuardResults() });
});

export default router;
