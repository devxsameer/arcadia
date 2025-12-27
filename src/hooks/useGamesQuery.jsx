// src/hooks/useGamesQuery.js
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGames } from '../services/rawgApi';
import { gameKeys } from './gameQueryKeys';

export default function useGamesQuery({ params = {} }) {
  const query = useInfiniteQuery({
    queryKey: gameKeys.list(params),
    queryFn: ({ pageParam = 1 }) => fetchGames({ pageParam, params }),
    getNextPageParam: (lastPage) =>
      lastPage.next
        ? new URL(lastPage.next).searchParams.get('page')
        : undefined,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const games =
    query.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    ...query,
    games,
  };
}
