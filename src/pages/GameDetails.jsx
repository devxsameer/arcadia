import { Link, useParams } from 'react-router';
import {
  fetchGameDetails,
  fetchGameScreenshots,
} from '../services/rawgApi';
import Carousel from '../components/Carousel';
import { useQuery } from '@tanstack/react-query';
import CollapsibleParagraph from '../components/CollapsibleParagraph';
import { LoaderCircle } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';

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
      {gameError && (
        <div className="flex min-h-[70vh] w-full flex-col items-center justify-center">
          <ShieldAlert className="m-4 h-15 w-15 text-rose-800" />
          <span className="mb-4 max-w-xl">
            Error:{' '}
            <span className="text-2xl">{gameError.message}</span>{' '}
          </span>
          <Link
            to="/"
            className="rounded-md border bg-neutral-200 px-4 py-1 text-sm font-semibold text-neutral-900 transition-transform will-change-transform hover:scale-105"
          >
            Back to home
          </Link>
        </div>
      )}
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
