// src/main.jsx
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

import { queryClient } from './lib/queryClient';
import ScrollToTop from './layout/ScrollToTop';
import AppRouter from './app/router';

const loaderFallback = (
  <div className="flex h-screen w-full items-center justify-center bg-neutral-950 text-neutral-200">
    <LoaderCircle className="h-12 w-12 animate-spin" />
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={loaderFallback}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
