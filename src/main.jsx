import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Cart from './pages/Cart';
import ScrollToTop from './layout/ScrollToTop';
import GameDetails from './pages/GameDetails';
import Home from './pages/Home';
import Games from './pages/Games';
import Discover from './pages/Discover.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/games" element={<Games />} />
            <Route
              path="/games/game/:gameSlug"
              element={<GameDetails />}
            />
            <Route
              path="/discover/:discoverId"
              element={<Discover />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
