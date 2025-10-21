import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { useEffect, useRef } from 'react';
import { fetchGames } from '../services/rawgApi';
import { useInfiniteQuery } from '@tanstack/react-query';

function Games() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get('page');
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || !loaderRef.current) return;
    let fetching = false;
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !fetching &&
          !isFetchingNextPage
        ) {
          fetching = true;
          await fetchNextPage();
          fetching = false;
        }
      },
      { threshold: 0.3, rootMargin: '400px' }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const games = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="my-4 min-h-full w-full">
      {isLoading && <span>Loading...</span>}
      {error && (
        <div className="font-medium text-red-400">
          ⚠️ Error loading games: {error.message}
        </div>
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
      <div ref={loaderRef}>
        {isFetchingNextPage
          ? 'Loading...'
          : hasNextPage
            ? 'Scroll to load more'
            : 'No more Games'}
      </div>
    </div>
  );
}

export default Games;
