import { Link } from 'react-router';

function GameCard({ gameData }) {
  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg lg:mb-6">
      <div className="w-full overflow-hidden bg-neutral-800">
        <Link to={`/games/game/${gameData?.slug}`}>
          <img
            src={gameData.background_image}
            alt={gameData.name}
            className="aspect-video w-full object-cover opacity-0 transition-opacity duration-700"
            onLoad={(e) => (e.target.style.opacity = 1)}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="p-2 lg:p-4">
        <div>
          <span>{gameData.metacritic}</span>
        </div>
        <h3 className="cursor-pointer text-2xl font-semibold">
          <Link to={`/games/game/${gameData?.slug}`}>
            {gameData.name}
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default GameCard;
