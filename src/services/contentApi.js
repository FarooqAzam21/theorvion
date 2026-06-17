// ─────────────────────────────────────────────────────────────
//  contentApi.js  —  Frontend API client for dynamic content
// ─────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
const cache = new Map();

const fetchWithCache = async (endpoint) => {
  const url = `${API_BASE}/api/content${endpoint}`;
  const cached = cache.get(url);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    cache.set(url, { data, timestamp: Date.now() });
    return data;
  } catch (err) {
    console.warn(`[contentApi] Failed to fetch ${url}:`, err.message);
    // Return stale cache if available
    if (cached) return cached.data;
    return null;
  }
};

export const fetchAllContent = () => fetchWithCache('');
export const fetchStatistics = () => fetchWithCache('/statistics');
export const fetchServices = () => fetchWithCache('/services');
export const fetchTestimonials = () => fetchWithCache('/testimonials');
export const fetchPortfolio = () => fetchWithCache('/portfolio');

// Clear cache (useful after admin updates)
export const clearContentCache = () => cache.clear();
