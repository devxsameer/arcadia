import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  getGameDetails,
  getGameScreenshots,
} from '../services/rawgApi';
import Carousel from '../components/Carousel';

function Game() {
  const { gameSlug } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGameData() {
      try {
        setLoading(true);
        const [gameData, screenshotData] = await Promise.all([
          getGameDetails(gameSlug),
          getGameScreenshots(gameSlug),
        ]);
        setGame(gameData);
        setScreenshots(screenshotData.results || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGameData();
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
          <Carousel
            slides={[
              { id: game.name, image: game.background_image },
              ...screenshots,
            ]}
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
