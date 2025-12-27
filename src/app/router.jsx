import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import App from '@/App';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const Games = lazy(() => import('@/pages/Games'));
const Genres = lazy(() => import('@/pages/Genres'));
const SearchPage = lazy(() => import('@/pages/Search'));
const GenreGames = lazy(() => import('@/pages/GenreGames'));
const GameDetails = lazy(() => import('@/pages/GameDetails'));
const Discover = lazy(() => import('@/pages/Discover'));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="games" element={<Games />} />
        <Route path="genres" element={<Genres />} />
        <Route path="genres/:genreSlug" element={<GenreGames />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="games/game/:gameSlug"
          element={<GameDetails />}
        />
        <Route path="discover/:discoverId" element={<Discover />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
