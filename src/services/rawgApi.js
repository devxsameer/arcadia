// rawgApi.js
const API_KEY = import.meta.env.VITE_RAWG_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async ({ pageParam = 1, params = {} }) => {
  // Convert params object to query string
  const queryString = new URLSearchParams({
    key: API_KEY,
    page: pageParam,
    page_size: 15,
    ...params, // spread additional query params
  }).toString();

  const res = await fetch(`${BASE_URL}/games?${queryString}`);
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
};

export const fetchGameDetails = async (slug) => {
  const res = await fetch(`${BASE_URL}/games/${slug}?key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch game details');
  return res.json();
};

export const fetchGameScreenshots = async (slug) => {
  const res = await fetch(
    `${BASE_URL}/games/${slug}/screenshots?key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch screenshots');
  return res.json();
};
export const fetchGenres = async () => {
  const res = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch screenshots');
  return res.json();
};
export const fetchGenreDetails = async (slug) => {
  const res = await fetch(
    `${BASE_URL}/genres/${slug}?key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch screenshots');
  return res.json();
};
