// src/features/favorites/FavoritesProvider.jsx
import { useEffect, useState, useCallback } from 'react';
import { FavoritesContext } from './useFavorites';
import { readFavIds, writeFavIds } from './favorites.storage';

export function FavoritesProvider({ children }) {
  const [favIds, setFavIds] = useState(() => readFavIds());

  const addFav = useCallback((id) => {
    setFavIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      writeFavIds(updated);
      return updated;
    });
  }, []);

  const removeFav = useCallback((id) => {
    setFavIds((prev) => {
      if (!prev.includes(id)) return prev;
      const updated = prev.filter((fid) => fid !== id);
      writeFavIds(updated);
      return updated;
    });
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'favoriteGameIds') {
        setFavIds(readFavIds());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isFav = useCallback((id) => favIds.includes(id), [favIds]);

  return (
    <FavoritesContext.Provider
      value={{ favIds, addFav, removeFav, isFav }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
