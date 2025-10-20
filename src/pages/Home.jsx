import useFetchGames from '../hooks/useFetchGames';
import GameCard from '../components/GameCard';
import Gallery from '../layout/Gallery';

function Home() {
  const { games, loading } = useFetchGames();
  console.log(games);

  return (
    <div className="my-4 w-full">
      {loading && <span>Loading...</span>}
      <Gallery>
        {games.map((game) => (
          <GameCard
            key={game.id}
            name={game.name}
            bgImg={game.background_image}
          />
        ))}
      </Gallery>
    </div>
  );
}

export default Home;
