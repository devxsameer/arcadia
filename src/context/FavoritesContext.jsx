import { useEffect, useState, useCallback } from 'react';
import { FavoritesContext } from '../hooks/useFavorites';

const STORAGE_KEY = 'favoriteGameIds';

// Helper functions
function readFavIds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function writeFavIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    // Dispatch manual storage event for same-tab listeners
    window.dispatchEvent(
      new StorageEvent('storage', { key: STORAGE_KEY })
    );
  } catch {
    // optional: console.error(err)
  }
}

export function FavoritesProvider({ children }) {
  const [favIds, setFavIds] = useState(() => readFavIds());

  // Add / Remove handlers
  const addFav = useCallback((id) => {
    setFavIds((prev) => {
      if (!prev.includes(id)) {
        const updated = [...prev, id];
        writeFavIds(updated);
        return updated;
      }
      return prev;
    });
  }, []);

  const removeFav = useCallback((id) => {
    setFavIds((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((fid) => fid !== id);
        writeFavIds(updated);
        return updated;
      }
      return prev;
    });
  }, []);

  // Multi-tab sync listener
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setFavIds(readFavIds());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const isFav = useCallback((id) => favIds.includes(id), [favIds]);

  return (
    <FavoritesContext value={{ favIds, addFav, removeFav, isFav }}>
      {children}
    </FavoritesContext>
  );
}
