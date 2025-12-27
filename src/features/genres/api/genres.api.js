// src/features/genres/api/genres.api.js
import { apiGet } from '@/lib/apiClient';

/**
 * Fetch all genres
 */
export const fetchGenres = () => {
  return apiGet('/genres');
};

/**
 * Fetch genre details
 */
export const fetchGenreDetails = (slug) => {
  return apiGet(`/genres/${slug}`);
};
