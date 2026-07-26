import logger from '../utils/logger.js';

const DEFAULT_API_URL = 'https://cyberguard-ai-nq8k.onrender.com/api/v1/agent/analyze';
const REQUEST_TIMEOUT_MS = Number(process.env.CYBERGUARD_TIMEOUT_MS || 5000);
const MAX_RECENT_RESULTS = 50;
const recentResults = [];

const recordResult = ({ type, status, outcome }) => {
  recentResults.unshift({ type, status, outcome, at: new Date().toISOString() });
  recentResults.splice(MAX_RECENT_RESULTS);
};

const resultSummary = (type, status, outcome) => ({ type, status, outcome });

export const sendCyberGuardEvent = async (type, data) => {
  const apiKey = process.env.CYBERGUARD_API_KEY;
  const apiUrl = process.env.CYBERGUARD_API_URL || DEFAULT_API_URL;

  if (!apiKey) {
    recordResult({ type, status: 'not_configured', outcome: 'skipped' });
    logger.warn('CyberGuard result: not configured', resultSummary(type, 'not_configured', 'skipped'));
    return { ok: false, status: 'not_configured' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({ type, data }),
      signal: controller.signal,
    });

    const status = response.status;
    const outcome = response.ok ? 'success' : 'rejected';
    recordResult({ type, status, outcome });
    logger.info(`CyberGuard result: ${status}`, resultSummary(type, status, outcome));
    return { ok: response.ok, status };
  } catch (error) {
    const status = error.name === 'AbortError' ? 'timeout' : 'unavailable';
    recordResult({ type, status, outcome: 'failed' });
    logger.warn(`CyberGuard result: ${status}`, resultSummary(type, status, 'failed'));
    return { ok: false, status };
  } finally {
    clearTimeout(timeout);
  }
};

export const monitorUrl = (url) => sendCyberGuardEvent('url', url);
export const monitorEmail = ({ subject, body }) => sendCyberGuardEvent('email', { subject, body });
export const monitorNetwork = (networkEvent) => sendCyberGuardEvent('network', { ...networkEvent });
export const getCyberGuardResults = () => recentResults.map((result) => ({ ...result }));
