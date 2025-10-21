import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { useEffect, useRef } from 'react';
import { fetchGames } from '../services/rawgApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

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
  });

  const loaderRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || !loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
        rootMargin: '200px',
      }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const games = useMemo(
    () => data?.pages.flatMap((page) => page.results) || [],
    [data]
  );

  return (
    <div className="my-4 w-full">
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
