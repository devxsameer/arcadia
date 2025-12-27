import { useParams } from 'react-router';
import { LoaderCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import CollapsibleParagraph from '../components/CollapsibleParagraph';

import { fetchGenreDetails } from '../services/rawgApi';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useGamesQuery from '../hooks/useGamesQuery';
import { extractText } from '../utils/utils';

export default function GenreGames() {
  const { genreSlug } = useParams();

  /** 🧠 Fetch genre details */
  const {
    data: genreDetails,
    isLoading: isGenreLoading,
    isError: isGenreError,
    error: genreError,
  } = useQuery({
    queryKey: ['genreDetails', genreSlug],
    queryFn: () => fetchGenreDetails(genreSlug),
    enabled: !!genreSlug, // ensures query runs only when slug is available
    staleTime: 5 * 60 * 1000, // 5 min cache for smoother UX
  });

  /** 🎮 Fetch games for that genre (infinite scrolling) */
  const {
    games,
    isLoading: isGamesLoading,
    isError: isGamesError,
    error: gamesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({
    params: { genres: genreSlug },
    enabled: !!genreSlug,
  });

  const loaderRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  /** 🎨 Loading state */
  if (isGenreLoading || isGamesLoading) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  /** 💥 Error state */
  if (isGenreError || isGamesError) {
    const message =
      genreError?.message || gamesError?.message || 'Unknown error';
    return (
      <div className="font-medium text-red-400">
        ⚠️ Error loading content: {message}
      </div>
    );
  }

  /** ✅ Main content */
  return (
    <div className="my-4 min-h-full w-full">
      {genreDetails && (
        <>
          <h2 className="mb-2 text-5xl font-bold capitalize lg:text-7xl">
            {genreDetails.name}
          </h2>

          {genreDetails.description && (
            <CollapsibleParagraph
              text={extractText(genreDetails.description)}
            />
          )}
        </>
      )}

      <Gallery>
        {games.map((game) => (
          <GameCard key={game.id} gameData={game} />
        ))}
      </Gallery>

      {/* Infinite Scroll Trigger */}
      <div
        ref={loaderRef}
        className="h-full w-full content-center py-8 text-center"
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
    </div>
  );
}
