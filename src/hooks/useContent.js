// ─────────────────────────────────────────────────────────────
//  useContent.js  —  Dynamic content hook with fallback
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {
  fetchStatistics,
  fetchServices,
  fetchTestimonials,
  fetchPortfolio,
} from '../services/contentApi';

/**
 * Custom hook for fetching dynamic content from the CMS API.
 *
 * @param {string} section - One of 'statistics', 'services', 'testimonials', 'portfolio'
 * @param {*} fallbackData - Default data to use if the API is unreachable
 * @returns {{ data: *, loading: boolean, error: string|null }}
 */
const useContent = (section, fallbackData) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchMap = {
      statistics: fetchStatistics,
      services: fetchServices,
      testimonials: fetchTestimonials,
      portfolio: fetchPortfolio,
    };

    const fetcher = fetchMap[section];
    if (!fetcher) {
      setLoading(false);
      return;
    }

    fetcher()
      .then((result) => {
        if (cancelled) return;
        if (result !== null && result !== undefined) {
          setData(result);
        }
        // If result is null, we keep fallbackData — no regression
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        // Keep fallbackData on error
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [section]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
};

export default useContent;
