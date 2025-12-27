// src/lib/apiClient.js
import { ENV } from './env';

/**
 * Generic GET request helper
 * @param {string} path
 * @param {Record<string, any>} params
 */
export async function apiGet(path, params = {}) {
  const url = new URL(`${ENV.API_BASE_URL}${path}`);

  url.search = new URLSearchParams({
    key: ENV.RAWG_API_KEY,
    ...params,
  }).toString();

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`API error (${res.status})`);
  }

  return res.json();
}
