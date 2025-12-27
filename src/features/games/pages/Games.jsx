// src/features/games/pages/Games.jsx
import { LoaderCircle } from 'lucide-react';
import useGamesQuery from '@/features/games/hooks/useGamesQuery';
import Error from '@/shared/components/Error';
import InfiniteGameList from '@/features/games/components/InfiniteGameList';

function Games() {
  const {
    games,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({});

  return (
    <div className="my-4 min-h-full w-full">
      {isLoading && (
        <div className="flex min-h-[80vh] w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      )}
      {error && (
        <Error message={`⚠️ Error loading games: ${error.message}`} />
      )}
      {!isLoading && (
        <div>
          <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
            All Games
          </h2>
          <InfiniteGameList
            games={games}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      )}
    </div>
  );
}

export default Games;
