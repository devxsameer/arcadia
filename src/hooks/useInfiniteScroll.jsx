import { useEffect, useRef } from 'react';

export default function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  rootMargin = '400px',
  threshold = 0.3,
}) {
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
      { threshold, rootMargin }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    threshold,
    rootMargin,
  ]);

  return loaderRef;
}
