import { useSyncExternalStore } from 'react';
import { favStore } from '../utils/favStore';

export function useFavorites() {
  const favIds = useSyncExternalStore(
    favStore.subscribe,
    favStore.getSnapshot,
    () => [] // getServerSnapshot (for SSR) can default to empty array
  );

  return {
    favIds,
    addFav: favStore.addFav,
    removeFav: favStore.removeFav,
    isFav: (id) => favIds.includes(id),
  };
}
