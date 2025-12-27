// src/features/games/hooks/useGamesQuery.jsx
export const gameKeys = {
  all: ['games'],
  list: (params) => ['games', 'list', params],
  detail: (slug) => ['games', 'detail', slug],
};
