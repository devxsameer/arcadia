import { useParams } from 'react-router';
import {
  fetchGameDetails,
  fetchGameScreenshots,
} from '../services/rawgApi';
import Carousel from '../components/Carousel';
import { useQuery } from '@tanstack/react-query';

function GameDetails() {
  const { gameSlug } = useParams();

  const {
    data: game,
    isLoading: gameIsLoading,
    error: gameError,
  } = useQuery({
    queryKey: ['games', gameSlug],
    queryFn: () => fetchGameDetails(gameSlug),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const { data: screenshots, isLoading: screenshotsLoading } =
    useQuery({
      queryKey: ['games', 'screenshots', gameSlug],
      queryFn: () => fetchGameScreenshots(gameSlug),
      enabled: !!game,
      staleTime: 1000 * 60 * 5,
    });

  const isLoading = gameIsLoading || screenshotsLoading;

  if (isLoading)
    return <div className="p-8 text-lg">Loading game details...</div>;

  if (gameError)
    return (
      <div className="p-8 text-red-500">
        Error: {gameError.message}
      </div>
    );

  return (
    <div className="mx-auto my-8 max-w-5xl p-4">
      <h1 className="mb-4 text-5xl font-bold">{game.name}</h1>

      <Carousel
        slides={[
          { id: game.name, image: game.background_image },
          ...(screenshots?.results ?? []),
        ]}
      />

      <p className="mt-6 text-lg leading-relaxed text-neutral-300">
        {game.description_raw}
      </p>

      <div className="mt-6 flex flex-wrap gap-6 text-neutral-400">
        <p>⭐ Rating: {game.rating} / 5</p>
        <p>🎮 Released: {game.released}</p>
        <p>🏷️ Genres: {game.genres.map((g) => g.name).join(', ')}</p>
      </div>
    </div>
  );
}

export default GameDetails;
