// src/features/games/api/games.api.js
import { apiGet } from '@/lib/apiClient.js';

/**
 * Fetch paginated games
 */
export const fetchGames = ({ page = 1, params = {} }) => {
  return apiGet('/games', {
    page,
    page_size: 15,
    ...params,
  });
};

/**
 * Fetch game details
 */
export const fetchGameDetails = (slug) => {
  return apiGet(`/games/${slug}`);
};

/**
 * Fetch screenshots for a game
 */
export const fetchGameScreenshots = (slug) => {
  return apiGet(`/games/${slug}/screenshots`);
};
