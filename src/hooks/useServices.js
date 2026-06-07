import { useState, useCallback } from 'react';
import { SERVICES } from '../data/mockData';

const PRICES_KEY = 'esc_service_prices';

function readPrices() {
  try {
    const raw = localStorage.getItem(PRICES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function writePrices(prices) {
  try { localStorage.setItem(PRICES_KEY, JSON.stringify(prices)); } catch {}
}

// Returns the SERVICES array merged with any admin-set price overrides,
// plus helpers to update or reset individual prices.
export function useServices() {
  const [customPrices, setCustomPrices] = useState(readPrices);

  const services = SERVICES.map(s => ({
    ...s,
    price: customPrices[s.title] !== undefined ? customPrices[s.title] : s.price,
  }));

  const updatePrice = useCallback((title, newPrice) => {
    setCustomPrices(prev => {
      const next = { ...prev, [title]: newPrice };
      writePrices(next);
      return next;
    });
  }, []);

  const resetPrice = useCallback((title) => {
    setCustomPrices(prev => {
      const next = { ...prev };
      delete next[title];
      writePrices(next);
      return next;
    });
  }, []);

  // customPrices — raw override map { [serviceTitle]: customPriceString }
  return { services, updatePrice, resetPrice, customPrices };
}
