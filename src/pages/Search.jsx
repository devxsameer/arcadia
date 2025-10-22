import { useSearchParams } from 'react-router';
import useGamesQuery from '../hooks/useGamesQuery';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { LoaderCircle } from 'lucide-react';
import Gallery from '../layout/Gallery';
import GameCard from '../components/GameCard';
import Error from '../components/Error';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({ key: 'games', params: { search: query } });

  const loaderRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const games = data?.pages.flatMap((page) => page.results) || [];

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
          <Gallery>
            {games.map((game, index) => (
              <GameCard key={`${game.id}-${index}`} gameData={game} />
            ))}
          </Gallery>
        </div>
      )}

      {/* Infinite scroll Trigger */}
      <div ref={loaderRef} className="h-full w-full content-center">
        {isFetchingNextPage ? (
          <LoaderCircle className="h-8 w-8 animate-spin" />
        ) : hasNextPage ? (
          'Scroll to load more'
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default SearchPage;
