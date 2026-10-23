import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Polices auto-hébergées (sous-ensemble latin), précachées par le service worker.
import '@fontsource/zilla-slab/latin-500.css';
import '@fontsource/zilla-slab/latin-600.css';
import '@fontsource/zilla-slab/latin-700.css';
import '@fontsource/atkinson-hyperlegible/latin-400.css';
import '@fontsource/atkinson-hyperlegible/latin-700.css';
import '@fontsource/caveat/latin-500.css';
import '@fontsource/caveat/latin-700.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/print.css';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
