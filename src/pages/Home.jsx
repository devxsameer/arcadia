import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { LoaderCircle } from 'lucide-react';
import useGamesQuery from '../hooks/useGamesQuery';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { Link } from 'react-router';

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
      <section className="relative mb-8 rounded-lg bg-neutral-900 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-6xl font-bold">
            Welcome to Arcadia
          </h1>
          <p className="mb-6 text-lg">
            Explore and collect your favorite games from our massive
            library powered by RAWG API. Add to your cart, track your
            favorites, and enjoy a curated gaming experience.
          </p>
          <Link
            to="/games"
            className="rounded-md bg-neutral-100 px-4 py-1.5 text-neutral-950 transition hover:bg-neutral-400"
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
        <div className="font-medium text-red-400">
          ⚠️ Error loading games: {error.message}
        </div>
      )}
      {!isLoading && (
        <div>
          <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
            Trending Games
          </h2>
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
