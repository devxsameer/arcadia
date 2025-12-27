// src/features/favorites/useFavorites.js
import { useContext, createContext } from 'react';

export const FavoritesContext = createContext(null);

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      'useFavorites must be used within FavoritesProvider'
    );
  }
  return ctx;
}
