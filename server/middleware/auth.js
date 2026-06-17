// ─────────────────────────────────────────────────────────────
//  auth.js  —  JWT Authenticator Route Protection Middleware
// ─────────────────────────────────────────────────────────────
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'orvion_super_secret_session_key_2026_blog';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Contains id, username, fullName
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
};

export default authMiddleware;
