// src/main.jsx
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { LoaderCircle } from 'lucide-react';

import AppProviders from './app/providers';
import AppRouter from './app/router';

const loaderFallback = (
  <div className="flex h-screen w-full items-center justify-center bg-neutral-950 text-neutral-200">
    <LoaderCircle className="h-12 w-12 animate-spin" />
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <Suspense fallback={loaderFallback}>
        <AppRouter />
      </Suspense>
    </AppProviders>
  </StrictMode>
);
