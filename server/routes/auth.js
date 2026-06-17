// ─────────────────────────────────────────────────────────────
//  auth.js  —  Admin Authentication API Routes
// ─────────────────────────────────────────────────────────────
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from '../services/db.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'orvion_super_secret_session_key_2026_blog';

// ── Register Initial Admin ────────────────────────────────────
// Only allows creating the first admin user. Subsequent registrations are blocked.
router.post('/register', async (req, res) => {
  const { username, password, fullName } = req.body;

  if (!username || !password || !fullName) {
    return res.status(400).json({ error: 'All fields (username, password, fullName) are required.' });
  }

  try {
    const existingUsers = await Users.find({});
    if (existingUsers.length > 0) {
      return res.status(403).json({ error: 'An administrator account has already been registered. Public registrations are locked.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.insertOne({
      username: username.toLowerCase().trim(),
      password: hashedPassword,
      fullName: fullName.trim(),
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Initial administrator account created successfully.',
      user: { id: newUser.id, username: newUser.username, fullName: newUser.fullName }
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Failed to create administrator account.' });
  }
});

// ── Admin Login ───────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const user = await Users.findOne({ username: username.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Sign jwt token
    const token = jwt.sign(
      { id: user.id, username: user.username, fullName: user.fullName },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed.' });
  }
});

// ── Get Current Session ────────────────────────────────────────
router.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
