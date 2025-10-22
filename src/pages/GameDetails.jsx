import { useParams } from 'react-router';
import {
  fetchGameDetails,
  fetchGameScreenshots,
} from '../services/rawgApi';
import Carousel from '../components/Carousel';
import { useQuery } from '@tanstack/react-query';
import CollapsibleParagraph from '../components/CollapsibleParagraph';
import { LoaderCircle } from 'lucide-react';
import Error from '../components/Error';

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

  return (
    <>
      {gameError && <Error message={gameError.message} />}
      {isLoading && (
        <div className="flex min-h-[80vh] w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      )}

      {!isLoading && !gameError && (
        <div className="my-4">
          <h1 className="mb-4 text-5xl font-bold">{game.name}</h1>
          <div>
            <div className="max-w-2xl">
              <Carousel
                slides={[
                  { id: game.name, image: game.background_image },
                  ...(screenshots?.results ?? []),
                ]}
              />
              <h4 className="mt-6 text-xl">About</h4>
              <CollapsibleParagraph
                text={game.description_raw}
                className="text-sm text-neutral-400 lg:text-base"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-6 text-neutral-400">
              <p>⭐ Rating: {game.rating} / 5</p>
              <p>🎮 Released: {game.released}</p>
              <p>
                🏷️ Genres: {game.genres.map((g) => g.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameDetails;
