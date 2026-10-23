/** Remplace le module virtuel de vite-plugin-pwa dans les tests (pas de service worker sous jsdom). */
import { useEffect, useState } from 'react';

let pendingRefresh = false;
const listeners = new Set<(v: boolean) => void>();

/** Simule l'arrivée (ou non) d'une nouvelle version prête à être activée. */
export function __setNeedRefresh(value: boolean) {
  pendingRefresh = value;
  listeners.forEach((l) => l(value));
}

export const __updateCalls: boolean[] = [];

export function useRegisterSW() {
  const needRefresh = useState(pendingRefresh);
  const offlineReady = useState(false);
  const set = needRefresh[1];
  useEffect(() => {
    listeners.add(set);
    return () => void listeners.delete(set);
  }, [set]);
  return {
    needRefresh,
    offlineReady,
    updateServiceWorker: async (reload?: boolean) => {
      __updateCalls.push(!!reload);
    },
  };
}
