// src/services/rawgApi.js
import { apiGet } from '../lib/apiClient';

/**
 * Fetch paginated games list
 */
export const fetchGames = async ({ pageParam = 1, params = {} }) => {
  return apiGet('/games', {
    page: pageParam,
    page_size: 15,
    ...params,
  });
};

/**
 * Fetch single game details
 */
export const fetchGameDetails = async (slug) => {
  return apiGet(`/games/${slug}`);
};

/**
 * Fetch screenshots for a game
 */
export const fetchGameScreenshots = async (slug) => {
  return apiGet(`/games/${slug}/screenshots`);
};

/**
 * Fetch all genres
 */
export const fetchGenres = async () => {
  return apiGet('/genres');
};

/**
 * Fetch genre details
 */
export const fetchGenreDetails = async (slug) => {
  return apiGet(`/genres/${slug}`);
};
