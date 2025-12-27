// src/features/favorites/favorites.storage.js
const STORAGE_KEY = 'favoriteGameIds';

export function readFavIds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function writeFavIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(
      new StorageEvent('storage', { key: STORAGE_KEY })
    );
  } catch {
    // ignore
  }
}
