// src/features/discover/pages/Discover.jsx
import { useParams, useNavigate } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import useGamesQuery from '@/features/games/hooks/useGamesQuery';
import InfiniteGameList from '@/features/games/components/InfiniteGameList';
import { discoverConfigs } from '@/shared/utils/discoverConfig';
import { useEffect } from 'react';

export default function DiscoverPage() {
  const { discoverId } = useParams();
  const navigate = useNavigate();
  const discoverConfig = discoverConfigs[discoverId];

  // ✅ Always call hooks, even if discoverId is invalid
  const {
    games,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({
    params: discoverConfig?.params || {},
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
          <h2 className="mb-2 text-5xl font-bold capitalize lg:text-7xl">
            {discoverConfig.title}
          </h2>
          <p className="mb-4 text-sm text-neutral-500 md:text-base">
            {discoverConfig.description}
          </p>
          <InfiniteGameList
            games={games}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </div>
  );
}
