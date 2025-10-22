import { LoaderCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../services/rawgApi';
import { Link } from 'react-router';

function Genres() {
  const {
    data: genres,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['genre'],
    queryFn: fetchGenres,
  });
  console.log(genres);

  return (
    <div className="my-4 min-h-full w-full">
      {isLoading && (
        <div className="flex min-h-[80vh] w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      )}
      {error && (
        <div className="font-medium text-red-400">
          ⚠️ Error loading games: {error.message}
        </div>
      )}
      {!isLoading && (
        <div>
          <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
            All Genres
          </h2>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {genres?.results.map((genre) => (
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.5), rgb(23, 23, 23) 70%), url(${genre.image_background})`,
                }}
                className="relative flex flex-col overflow-hidden rounded-lg border border-neutral-800 bg-cover bg-center p-4"
                key={genre.id}
              >
                <Link
                  to={`/genres/${genre.slug}`}
                  className="m-5 mx-auto mt-20 text-3xl font-bold"
                >
                  {genre.name}
                </Link>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-sm">
                  <span className="font-semibold">Games Count:</span>
                  <span className="text-base">
                    {genre.games_count}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-neutral-400">
                    Popular Games:
                  </span>
                  <div className="flex flex-col text-sm underline">
                    {genre.games.slice(0, 3).map((game) => (
                      <Link to={`/games/game/${game.slug}`}>
                        {game.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Genres;
