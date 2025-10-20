import { throttle } from 'lodash';
import useFetchGames from '../hooks/useFetchGames';
import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { useState } from 'react';
import { useEffect } from 'react';
import LoaderBtn from '../components/LoaderBtn';

function Games() {
  const [page, setPage] = useState(1);
  const { games, loading } = useFetchGames(page);

  const handleScroll = throttle(() => {
    if (
      !loading &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  return (
    <div className="my-4 w-full">
      {loading && <span>Loading...</span>}
      {games.length && (
        <div>
          <h2 className="mb-4 text-5xl font-bold lg:text-7xl">
            All Games
          </h2>
          <Gallery>
            {games.map((game, index) => (
              <GameCard key={`${game.id}-${index}`} gameData={game} />
            ))}
          </Gallery>
          <LoaderBtn loading={loading} />
        </div>
      )}
    </div>
  );
}

export default Games;
