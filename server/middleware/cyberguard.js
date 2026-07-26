import { monitorNetwork, monitorUrl } from '../services/cyberguardService.js';

const getRequestUrl = (req) => {
  const configuredOrigin = process.env.FRONTEND_URL;
  if (configuredOrigin) return new URL(req.originalUrl || req.url, configuredOrigin).toString();

  const host = req.get('host');
  return host ? `${req.protocol}://${host}${req.originalUrl || req.url}` : req.originalUrl || req.url;
};

// This observer is deliberately detached, so an upstream failure never delays a request.
export const cyberGuardRequestMonitor = (req, res, next) => {
  const startedAt = Date.now();

  res.once('finish', () => {
    if (req.path.startsWith('/api/admin/monitoring')) return;

    void monitorUrl(getRequestUrl(req));
    void monitorNetwork({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
};
