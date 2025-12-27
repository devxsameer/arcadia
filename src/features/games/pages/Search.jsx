import { useSearchParams } from 'react-router';
import useGamesQuery from '@/features/games/hooks/useGamesQuery';
import Error from '@/shared/components/Error';
import { LoaderCircle } from 'lucide-react';
import InfiniteGameList from '@/features/games/components/InfiniteGameList';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const {
    games,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({ params: { search: query } });

  return (
    <div className="my-4 min-h-full w-full">
      {isLoading && (
        <div className="flex min-h-[80vh] w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      )}
      {error && <Error message={error} />}
      {!isLoading && games.length === 0 && (
        <Error
          message={`No games found for "${query}". Try a different search term.`}
        />
      )}
      {!isLoading && Boolean(games.length) && (
        <div>
          <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
            Search Results for "{query}"
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

export default SearchPage;
