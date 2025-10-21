// hooks/useGamesQuery.js
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGames } from '../services/rawgApi';

export default function useGamesQuery({
  key = 'games',
  params = {},
}) {
  return useInfiniteQuery({
    queryKey: [key, params],
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
}
