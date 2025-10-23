import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { useFavorites } from '../hooks/useFavorites';
import { Check } from 'lucide-react';

function GameCard({ gameData }) {
  const { favIds: _, addFav, removeFav, isFav } = useFavorites();
  const fav = isFav(gameData.id);

  return (
    <div className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg lg:mb-6">
      <img
        src={gameData.background_image}
        alt={gameData.name}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
        onLoad={(e) => (e.target.style.opacity = 1)}
        loading="lazy"
      />
      <div
        className="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.1), rgb(23, 23, 23) 70%)`,
        }}
      >
        <Link to={`/games/game/${gameData?.slug}`}>
          <div className="aspect-video w-full"></div>
        </Link>
        <div className="p-2 lg:p-4">
          <div>
            <span>{gameData.metacritic}</span>
          </div>
          <h3 className="cursor-pointer text-2xl font-semibold">
            <Link to={`/games/game/${gameData?.slug}`}>
              {gameData.name}
            </Link>
          </h3>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() =>
                fav ? removeFav(gameData.id) : addFav(gameData.id)
              }
              className={`flex transform cursor-pointer items-center gap-0.5 rounded-md px-2 py-0.5 text-sm text-neutral-200 transition-transform will-change-transform hover:scale-105 ${fav ? 'bg-emerald-600 text-neutral-950' : 'bg-neutral-800'}`}
            >
              {fav ? (
                <Check className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {gameData.added}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
