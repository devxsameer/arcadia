// src/app/providers.jsx
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient';
import { FavoritesProvider } from '@/features/favorites/FavoritesProvider';
import ScrollToTop from '@/layout/ScrollToTop';

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FavoritesProvider>
          <ScrollToTop />
          {children}
        </FavoritesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
