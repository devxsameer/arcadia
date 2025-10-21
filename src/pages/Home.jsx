import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';
import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../services/rawgApi';

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['games', 1],
    queryFn: () => fetchGames(1),
  });

  const games = data?.pages.flatMap((page) => page.results) || [];
  return (
    <div className="my-4 w-full">
      {isLoading && <span>Loading...</span>}
      {error && <span>{error.message}</span>}
      <Gallery>
        {games.map((game, index) => (
          <GameCard key={`${game.id}-${index}`} gameData={game} />
        ))}
      </Gallery>
    </div>
  );
}

export default Home;
