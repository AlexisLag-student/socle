import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { createBrowserRouter, RouterProvider, useRouteError, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { initI18n } from '@/i18n';
import { Layout } from './Layout';
import { applyPaper, applyTheme, getPrefs } from './prefs';

initI18n();

const Home = lazy(() => import('@/features/home/HomePage'));
const Setup = lazy(() => import('@/features/athlete-setup/SetupPage'));
const ProgramSheet = lazy(() => import('@/features/program-sheet/ProgramPage'));
const Session = lazy(() => import('@/features/guided-session/SessionPage'));
const History = lazy(() => import('@/features/history/HistoryPage'));
const Library = lazy(() => import('@/features/library/LibraryPage'));
const ExerciseDetail = lazy(() => import('@/features/library/ExercisePage'));
const Pathologies = lazy(() => import('@/features/pathology/PathologiesPage'));
const PathologyDetail = lazy(() => import('@/features/pathology/PathologyPage'));
const Bibliography = lazy(() => import('@/features/bibliography/BibliographyPage'));
const ProHome = lazy(() => import('@/features/practitioner/ProHomePage'));
const ProEditor = lazy(() => import('@/features/practitioner/ProEditorPage'));
const ShareImport = lazy(() => import('@/features/share-import/ImportPage'));
const Settings = lazy(() => import('@/features/settings/SettingsPage'));
const Disclaimer = lazy(() => import('@/features/disclaimer/DisclaimerScreen'));
const AnatomyDemo = lazy(() => import('@/features/dev/AnatomyDemo'));

function Loading() {
  const { t } = useTranslation();
  return <p aria-busy="true">{t('common.loading')}</p>;
}

const page = (el: ReactNode) => <Suspense fallback={<Loading />}>{el}</Suspense>;

function RouteError() {
  const { t } = useTranslation();
  const error = useRouteError() as { status?: number } | undefined;
  return (
    <div style={{ padding: 24 }}>
      <h1>{error?.status === 404 ? t('errors.notFound') : t('errors.generic')}</h1>
      <Link to="/">{t('nav.home')}</Link>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: page(<Home />) },
      { path: '/setup', element: page(<Setup />) },
      { path: '/program', element: page(<ProgramSheet />) },
      { path: '/program/:id', element: page(<ProgramSheet />) },
      { path: '/session/:key', element: page(<Session />) },
      { path: '/history', element: page(<History />) },
      { path: '/library', element: page(<Library />) },
      { path: '/library/:id', element: page(<ExerciseDetail />) },
      { path: '/pathologies', element: page(<Pathologies />) },
      { path: '/pathologies/:id', element: page(<PathologyDetail />) },
      { path: '/bibliography', element: page(<Bibliography />) },
      { path: '/pro', element: page(<ProHome />) },
      { path: '/pro/edit/:id', element: page(<ProEditor />) },
      { path: '/import', element: page(<ShareImport />) },
      { path: '/settings', element: page(<Settings />) },
      { path: '/disclaimer', element: page(<Disclaimer />) },
      { path: '/dev/anatomy', element: page(<AnatomyDemo />) },
      { path: '*', element: <RouteError /> },
    ],
  },
]);

export function App() {
  useEffect(() => {
    applyTheme(getPrefs().theme);
    applyPaper(getPrefs().paperLines);
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme(getPrefs().theme);
    mq?.addEventListener?.('change', onChange);
    return () => mq?.removeEventListener?.('change', onChange);
  }, []);
  return <RouterProvider router={router} />;
}
