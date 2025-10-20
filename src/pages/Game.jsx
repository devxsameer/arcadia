import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getGameDetails } from '../services/rawgApi';

function Game() {
  const { gameSlug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGame() {
      try {
        setLoading(true);
        const data = await getGameDetails(gameSlug); // you can pass slug or ID
        setGame(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [gameSlug]);

  return (
    <>
      {loading && (
        <div className="p-8 text-lg">Loading game details...</div>
      )}
      {error && (
        <div className="p-8 text-red-500">Error: {error.message}</div>
      )}
      {game && (
        <div className="mx-auto my-8 max-w-5xl p-4">
          <h1 className="mb-4 text-5xl font-bold">{game.name}</h1>
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full rounded-2xl shadow-lg"
          />
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">
            {game.description_raw}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-neutral-400">
            <p>⭐ Rating: {game.rating} / 5</p>
            <p>🎮 Released: {game.released}</p>
            <p>
              🏷️ Genres: {game.genres.map((g) => g.name).join(', ')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Game;
