// src/app/router.jsx
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import AppLayout from '@/layout/AppLayout';

// Games feature
const Home = lazy(() => import('@/features/games/pages/Home'));
const Games = lazy(() => import('@/features/games/pages/Games'));
const GameDetails = lazy(
  () => import('@/features/games/pages/GameDetails')
);
const SearchPage = lazy(
  () => import('@/features/games/pages/Search')
);

// Genres feature
const Genres = lazy(() => import('@/features/genres/pages/Genres'));
const GenreGames = lazy(
  () => import('@/features/genres/pages/GenreGames')
);

// Discover feature
const Discover = lazy(
  () => import('@/features/discover/pages/Discover')
);

// Favorites feature
const Favorites = lazy(
  () => import('@/features/favorites/pages/Favorites')
);

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<Games />} />
        <Route
          path="games/game/:gameSlug"
          element={<GameDetails />}
        />
        <Route path="search" element={<SearchPage />} />

        <Route path="genres" element={<Genres />} />
        <Route path="genres/:genreSlug" element={<GenreGames />} />

        <Route path="discover/:discoverId" element={<Discover />} />
        <Route path="favorites" element={<Favorites />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
