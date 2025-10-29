import { useContext, createContext } from 'react';

export const FavoritesContext = createContext({
  favIds: [],
  addFav: () => {},
  removeFav: () => {},
  isFav: () => false,
});

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error(
      'useFavorites must be used within a FavoritesProvider'
    );
  return ctx;
}
