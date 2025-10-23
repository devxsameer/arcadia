// src/stores/favStore.js
const STORAGE_KEY = 'favouriteGameIds';

// read from localStorage, parse JSON, default to empty array
function readFavIds() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// write to localStorage
function writeFavIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    // dispatch storage event so other tabs / listeners get notified
    window.dispatchEvent(
      new StorageEvent('storage', { key: STORAGE_KEY })
    );
  } catch {
    // fail silently or log error
  }
}

let favIds = readFavIds(); // current in-memory snapshot
const listeners = new Set(); // subscribers

function getSnapshot() {
  return favIds;
}

function subscribe(listener) {
  window.addEventListener('storage', listener);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function addFav(id) {
  if (!favIds.includes(id)) {
    favIds = [...favIds, id];
    writeFavIds(favIds);
    listeners.forEach((l) => l());
  }
}

function removeFav(id) {
  if (favIds.includes(id)) {
    favIds = favIds.filter((fid) => fid !== id);
    writeFavIds(favIds);
    listeners.forEach((l) => l());
  }
}

export const favStore = {
  getSnapshot,
  subscribe,
  addFav,
  removeFav,
};
