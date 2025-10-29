import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import ScrollToTop from './layout/ScrollToTop';
import App from './App.jsx';
import { LoaderCircle } from 'lucide-react';

// ✅ Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Games = lazy(() => import('./pages/Games'));
const Genres = lazy(() => import('./pages/Genres'));
const SearchPage = lazy(() => import('./pages/Search'));
const GenreGames = lazy(() => import('./pages/GenreGames'));
const GameDetails = lazy(() => import('./pages/GameDetails'));
const Discover = lazy(() => import('./pages/Discover.jsx'));

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        {/* ✅ Single Suspense boundary for all lazy components */}
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center bg-neutral-950 text-neutral-200">
              <LoaderCircle className="h-12 w-12 animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="games" element={<Games />} />
              <Route path="genres" element={<Genres />} />
              <Route
                path="genres/:genreSlug"
                element={<GenreGames />}
              />
              <Route path="search" element={<SearchPage />} />
              <Route
                path="games/game/:gameSlug"
                element={<GameDetails />}
              />
              <Route
                path="discover/:discoverId"
                element={<Discover />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
