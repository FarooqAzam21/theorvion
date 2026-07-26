import { Router } from 'express';
import { monitorEmail } from '../services/cyberguardService.js';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  void monitorEmail({
    subject: subject || `Website contact from ${name}`,
    body: message,
  });

  return res.status(202).json({ success: true, message: 'Your message has been received.' });
});

export default router;
