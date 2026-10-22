/** Remplace le module virtuel de vite-plugin-pwa dans les tests (pas de service worker sous jsdom). */
import { useState } from 'react';

export function useRegisterSW() {
  const needRefresh = useState(false);
  const offlineReady = useState(false);
  return { needRefresh, offlineReady, updateServiceWorker: async () => {} };
}
