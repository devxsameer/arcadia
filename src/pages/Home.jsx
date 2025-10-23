import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { LoaderCircle } from 'lucide-react';
import useGamesQuery from '../hooks/useGamesQuery';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { Link } from 'react-router';
import Error from '../components/Error';

function Home() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGamesQuery({
    key: 'games',
    params: { ordering: '-added' },
  });

  const loaderRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const games = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="my-4 min-h-full w-full">
      <section className="relative mb-8 rounded-lg bg-neutral-900 bg-gradient-to-r from-rose-700/75 to-neutral-900 px-2 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-2 text-5xl font-bold xl:text-7xl">
            Welcome to Arcadia
          </h1>
          <p className="mb-4 text-sm leading-snug text-neutral-400 md:text-lg">
            Explore and collect your favorite games from our massive
            library powered by RAWG API. Add to your cart, track your
            favorites, and enjoy a curated gaming experience.
          </p>
          <Link
            to="/games"
            className="rounded-md bg-neutral-900 px-4 py-1.5 font-semibold text-neutral-300 shadow-lg transition hover:bg-neutral-800"
          >
            Browse Games
          </Link>
        </div>
      </section>

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
          <h2 className="mb-2 text-3xl font-bold xl:text-5xl">
            Trending Games
          </h2>
          <p className="mb-6 text-sm text-neutral-500 md:text-base">
            Based on the games that users are adding most right now —
            the freshest and fastest rising titles.
          </p>
          <Gallery>
            {games.map((game, index) => (
              <GameCard key={`${game.id}-${index}`} gameData={game} />
            ))}
          </Gallery>
        </div>
      )}

      {/* Infinite scroll Trigger */}
      <div ref={loaderRef} className="h-full w-full content-center">
        <div className="flex justify-center py-6">
          {isFetchingNextPage && (
            <LoaderCircle className="h-8 w-8 animate-spin" />
          )}
          {!isFetchingNextPage && hasNextPage && (
            <p className="text-gray-400">
              Scroll down to load more games...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
