const API_KEY = import.meta.env.VITE_RAWG_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page=${pageParam}&page_size=15`
  );
  if (!res.ok) throw new Error('Failed to fetch games');
  console.log(`fetch: page: ${pageParam}`);
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
