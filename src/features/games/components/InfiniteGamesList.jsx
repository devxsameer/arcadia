// src/features/games/components/InfiniteGameList.jsx
import { LoaderCircle } from 'lucide-react';
import GameCard from './GameCard';
import Gallery from '@/layout/Gallery';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

/**
 * Reusable infinite-scrolling game list
 */
export default function InfiniteGameList({
  games,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) {
  const loaderRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <Gallery>
        {games.map((game) => (
          <GameCard key={game.id} gameData={game} />
        ))}
      </Gallery>

      {/* Infinite scroll trigger */}
      <div
        ref={loaderRef}
        className="h-full w-full content-center py-6 text-center"
      >
        {isFetchingNextPage ? (
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin" />
        ) : hasNextPage ? (
          <span className="text-neutral-400">
            Scroll to load more...
          </span>
        ) : (
          <span className="text-neutral-500">No more games 🎮</span>
        )}
      </div>
    </>
  );
}
