const API_KEY = import.meta.env.VITE_RAWG_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const getGames = async (page = 1, search = '') => {
  console.log(API_KEY);

  const res = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=20&search=${search}`,
    { mode: 'cors' }
  );
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
};

export const getGameDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch game details');
  return res.json();
};
