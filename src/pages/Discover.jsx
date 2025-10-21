import { useParams, useNavigate } from 'react-router';
import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { LoaderCircle } from 'lucide-react';
import useGamesQuery from '../hooks/useGamesQuery';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { discoverConfigs } from '../utils/discoverConfig';
import { useEffect } from 'react';

export default function DiscoverPage() {
  const { discoverId } = useParams();
  const navigate = useNavigate();
  const discoverConfig = discoverConfigs[discoverId];

  // ✅ Always call hooks, even if discoverId is invalid
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({
    key: ['discover', discoverId || 'default'],
    params: discoverConfig?.params || {},
  });

  const loaderRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // Redirect if invalid
  useEffect(() => {
    if (!discoverConfig) {
      const timer = setTimeout(() => navigate('/'), 500);
      return () => clearTimeout(timer);
    }
  }, [discoverConfig, navigate]);

  // Show nothing if invalid while redirecting
  if (!discoverConfig) return null;

  const games = data?.pages.flatMap((p) => p.results) || [];

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

      {!isLoading && !error && (
        <>
          <h2 className="mb-4 text-5xl font-bold capitalize lg:text-7xl">
            {discoverConfig.title}
          </h2>
          <Gallery>
            {games.map((game, i) => (
              <GameCard key={`${game.id}-${i}`} gameData={game} />
            ))}
          </Gallery>
        </>
      )}

      <div ref={loaderRef} className="h-full w-full content-center">
        {isFetchingNextPage ? (
          <LoaderCircle className="h-8 w-8 animate-spin" />
        ) : hasNextPage ? (
          'Scroll to load more'
        ) : null}
      </div>
    </div>
  );
}
