import { useEffect, useState } from 'react';
import { getGames } from '../services/rawgApi';

export default function useFetchGames(page = 1, query = '') {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // create controller
    const { signal } = controller;

    async function fetchGames() {
      setLoading(true);
      setError(null);

      try {
        const data = await getGames(page, query, { signal });
        console.log(data);
        setGames((prev) => [...prev, ...data.results]);
      } catch (err) {
        // Ignore abort errors (they're expected)
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchGames();

    // Cleanup: abort ongoing request when query changes or component unmounts
    return () => controller.abort();
  }, [page, query]);

  return { games, loading, error };
}
