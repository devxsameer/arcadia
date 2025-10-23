import { Link, useParams } from 'react-router';
import {
  fetchGameDetails,
  fetchGameScreenshots,
} from '../services/rawgApi';
import Carousel from '../components/Carousel';
import { useQuery } from '@tanstack/react-query';
import CollapsibleParagraph from '../components/CollapsibleParagraph';
import { LoaderCircle } from 'lucide-react';
import Error from '../components/Error';
import { useFavorites } from '../hooks/useFavorites';
import { format, parseISO } from 'date-fns';
import { Check } from 'lucide-react';
import { Plus } from 'lucide-react';

function GameDetails() {
  const { gameSlug } = useParams();
  const { addFav, removeFav, isFav } = useFavorites();

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
  const fav = isFav(game?.id);

  const { data: screenshots, isLoading: screenshotsLoading } =
    useQuery({
      queryKey: ['games', 'screenshots', gameSlug],
      queryFn: () => fetchGameScreenshots(gameSlug),
      enabled: !!game,
      staleTime: 1000 * 60 * 5,
    });

  const isLoading = gameIsLoading || screenshotsLoading;

  console.log(game);

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
          <h1 className="mb-4 flex items-end gap-4 text-5xl font-bold">
            {game.name}
            <button
              type="button"
              onClick={() =>
                fav ? removeFav(game.id) : addFav(game.id)
              }
              className={`flex transform cursor-pointer items-center gap-0.5 rounded-md px-2 py-0.5 text-sm text-neutral-200 transition-transform will-change-transform hover:scale-105 ${fav ? 'bg-emerald-600 text-neutral-950' : 'bg-neutral-800'}`}
            >
              {fav ? (
                <Check className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {fav ? game.added + 1 : game.added}
            </button>
          </h1>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
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
            <div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-neutral-300">
                <p>
                  <span className="text-sm text-neutral-400">
                    🖥️ Platforms:
                  </span>{' '}
                  {game.platforms
                    .map(({ platform }) => platform.name)
                    .join(', ')}
                </p>
                <p>
                  <span className="text-sm text-neutral-400">
                    🏷️ Genres:
                  </span>{' '}
                  {game.genres.map((g, i) => (
                    <span key={g.id}>
                      <Link
                        to={`/genres/${g.slug}`}
                        className="underline hover:text-rose-300"
                      >
                        {g.name}
                      </Link>
                      {i < game.genres.length - 1 && ', '}
                    </span>
                  ))}
                </p>

                <p>
                  <span className="text-sm text-neutral-400">
                    ⭐ Rating:
                  </span>{' '}
                  {game.rating?.toFixed(1)} / 5
                </p>

                <p>
                  <span className="text-sm text-neutral-400">
                    🎮 Released:
                  </span>{' '}
                  {game.released
                    ? format(parseISO(game.released), 'MMM d, yyyy')
                    : 'N/A'}
                </p>

                <p>
                  <span className="text-sm text-neutral-400">
                    ❤️ Favorite:
                  </span>{' '}
                  {fav ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameDetails;
