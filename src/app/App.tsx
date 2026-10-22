import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { initI18n } from '@/i18n';

initI18n();

const AnatomyDemo = lazy(() => import('@/features/dev/AnatomyDemo'));

function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Socle</h1>
      <p>Renforcement musculaire pour coureurs et cyclistes — en construction.</p>
    </main>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/dev/anatomy',
    element: (
      <Suspense fallback={null}>
        <AnatomyDemo />
      </Suspense>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
