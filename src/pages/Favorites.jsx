// src/pages/FavoritesPage.jsx
import { useQueries } from '@tanstack/react-query';
import { useFavorites } from '../hooks/useFavorites'; // custom hook returning favIds etc.
import { fetchGameDetails } from '../services/rawgApi';
import { Link } from 'react-router';
import Gallery from '../layout/Gallery';
import { Trash } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import Error from '../components/Error';

function FavoritesPage() {
  const { favIds, removeFav } = useFavorites();

  // Prepare an array of query configs for each favorite ID
  const favoriteQueries = useQueries({
    queries: favIds.map((id) => ({
      queryKey: ['games', id],
      queryFn: () => fetchGameDetails(id),
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 10, // e.g., cache for 10 minutes
    })),
  });

  // Determine loading / error states
  const isLoading = favoriteQueries.some((q) => q.isLoading);
  const isError = favoriteQueries.some((q) => q.isError);

  // Aggregate the results
  const favoriteGames = favoriteQueries
    .map((q) => q.data)
    .filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <Error message={'Failed to load one or more favorite games.'} />
    );
  }

  if (favoriteGames.length === 0) {
    return (
      <div className="my-4 w-full">
        <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
          Favorites
        </h2>
        <p className="text-neutral-400">No favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="my-4 w-full">
      <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
        Favorites
      </h2>
      <Gallery>
        {favoriteGames.map((game) => (
          <div
            key={game.id}
            className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg lg:mb-6"
          >
            <img
              src={game.background_image}
              alt={game.name}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
              onLoad={(e) => (e.target.style.opacity = 1)}
              loading="lazy"
            />
            <div
              className="relative"
              style={{
                backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.1), rgb(23, 23, 23) 70%)`,
              }}
            >
              <Link to={`/games/game/${game?.slug}`}>
                <div className="aspect-video w-full"></div>
              </Link>
              <div className="p-2 lg:p-4">
                <div>
                  <span>{game.metacritic}</span>
                </div>
                <h3 className="cursor-pointer text-2xl font-semibold">
                  <Link to={`/games/game/${game?.slug}`}>
                    {game.name}
                  </Link>
                </h3>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFav(game.id)}
                    className="flex transform cursor-pointer items-center gap-0.5 rounded-md bg-rose-700 px-2 py-1 text-sm text-neutral-200 transition-transform will-change-transform hover:scale-105"
                  >
                    <Trash className="h-4 w-4" />
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Gallery>
    </div>
  );
}

export default FavoritesPage;
