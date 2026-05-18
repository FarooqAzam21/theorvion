// ─────────────────────────────────────────────────────────────
//  validator.js  —  Request validation middleware
// ─────────────────────────────────────────────────────────────

export const validateChatRequest = (req, res, next) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      error: 'Message is required and must be a string.',
      code: 'INVALID_MESSAGE',
    });
  }

  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return res.status(400).json({
      error: 'Message cannot be empty.',
      code: 'EMPTY_MESSAGE',
    });
  }

  if (trimmed.length > 1000) {
    return res.status(400).json({
      error: 'Message is too long. Please keep it under 1000 characters.',
      code: 'MESSAGE_TOO_LONG',
    });
  }

  // Validate history if provided
  if (history !== undefined) {
    if (!Array.isArray(history)) {
      return res.status(400).json({
        error: 'History must be an array.',
        code: 'INVALID_HISTORY',
      });
    }

    // Limit history to last 20 turns to prevent prompt bloat
    const validHistory = history
      .slice(-20)
      .filter(
        (h) =>
          h &&
          typeof h === 'object' &&
          ['user', 'assistant'].includes(h.role) &&
          typeof h.content === 'string' &&
          h.content.length <= 2000
      );

    req.body.history = validHistory;
  } else {
    req.body.history = [];
  }

  req.body.message = trimmed;
  next();
};
