import { monitorNetwork, monitorUrl } from '../services/cyberguardService.js';

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
};

const getSecurityEvent = (req) => {
  if (req.method === 'POST' && req.path === '/api/contact') return 'contact_submission';
  if (req.method === 'POST' && req.path === '/api/auth/login') return 'admin_login';
  if (req.method === 'POST' && req.path === '/api/auth/register') return 'admin_registration';
  return 'api_request';
};

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
    // Avoid consuming the CyberGuard key for static files or recursive reads of
    // the monitoring endpoint itself.
    if (!req.path.startsWith('/api/') || req.path.startsWith('/api/admin/monitoring')) return;

    void monitorUrl(getRequestUrl(req));
    void monitorNetwork({
      event: getSecurityEvent(req),
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      clientIp: getClientIp(req),
      userAgent: req.get('user-agent') || 'unknown',
    });
  });

  next();
};
