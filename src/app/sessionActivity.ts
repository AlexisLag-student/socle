/**
 * Signal « séance guidée en cours » : le bandeau de mise à jour attend la fin de la séance
 * pour ne jamais inviter à recharger au milieu d'un exercice.
 */
import { useEffect, useSyncExternalStore } from 'react';

let running = false;
const listeners = new Set<() => void>();

export function setSessionRunning(value: boolean) {
  if (running === value) return;
  running = value;
  listeners.forEach((l) => l());
}

export function isSessionRunning(): boolean {
  return running;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useSessionRunning(): boolean {
  return useSyncExternalStore(subscribe, () => running);
}

/** À appeler dans l'écran de séance : signale la séance en cours tant que `active` est vrai et que l'écran est affiché. */
export function useMarkSessionRunning(active: boolean) {
  useEffect(() => {
    setSessionRunning(active);
    return () => setSessionRunning(false);
  }, [active]);
}
