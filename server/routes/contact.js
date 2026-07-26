import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { monitorEmail } from '../services/cyberguardService.js';

const router = Router();

const getSupabaseClient = () => {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};

const normalize = (value) => (typeof value === 'string' ? value.trim() : '');

router.post('/', async (req, res) => {
  const name = normalize(req.body?.name);
  const email = normalize(req.body?.email).toLowerCase();
  const subject = normalize(req.body?.subject);
  const message = normalize(req.body?.message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (name.length > 120 || email.length > 255 || subject.length > 200 || message.length > 10000) {
    return res.status(400).json({ error: 'One or more fields exceed the allowed length.' });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Contact submissions are not configured yet.' });
  }

  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) {
    console.error('Contact submission insert failed:', error.message);
    return res.status(500).json({ error: 'Unable to save your message. Please try again.' });
  }

  void monitorEmail({
    subject: subject || `Website contact from ${name}`,
    body: message,
  });

  return res.status(201).json({ success: true, message: 'Your message has been received.' });
});

export default router;
