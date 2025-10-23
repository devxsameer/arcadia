import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { LoaderCircle } from 'lucide-react';
import useGamesQuery from '../hooks/useGamesQuery';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Error from '../components/Error';

function Games() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({ key: 'games' });

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
      {error && (
        <Error message={`⚠️ Error loading games: ${error.message}`} />
      )}
      {!isLoading && (
        <div>
          <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
            All Games
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

export default Games;
