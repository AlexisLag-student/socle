import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Compte à rebours précis (basé sur l'horloge, pas sur le nombre de ticks) : reste juste
 * même si l'onglet est mis en arrière-plan un moment.
 */
export function useCountdown(onDone: () => void, onTick?: (remaining: number) => void) {
  const [endAt, setEndAt] = useState<number | null>(null);
  const [pausedLeft, setPausedLeft] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const doneRef = useRef(onDone);
  const tickRef = useRef(onTick);
  const lastSec = useRef<number | null>(null);
  useLayoutEffect(() => {
    doneRef.current = onDone;
    tickRef.current = onTick;
  });

  useEffect(() => {
    if (endAt === null) return;
    const id = setInterval(() => {
      const n = Date.now();
      setNow(n);
      const left = Math.ceil((endAt - n) / 1000);
      if (left !== lastSec.current) {
        lastSec.current = left;
        tickRef.current?.(left);
      }
      if (n >= endAt) {
        // Une seule fin par décompte : un tick suivant, avant que React ne retire l'intervalle,
        // relancerait `onDone` avec l'état déjà avancé (ex. démarrer seul le côté 2).
        clearInterval(id);
        setEndAt(null);
        lastSec.current = null;
        doneRef.current();
      }
    }, 100);
    return () => clearInterval(id);
  }, [endAt]);

  const start = useCallback((sec: number) => {
    setPausedLeft(null);
    setNow(Date.now());
    setEndAt(Date.now() + sec * 1000);
  }, []);
  const stop = useCallback(() => {
    setEndAt(null);
    setPausedLeft(null);
  }, []);
  const pause = useCallback(() => {
    if (endAt === null) return;
    setPausedLeft(Math.max(0, endAt - Date.now()) / 1000);
    setEndAt(null);
  }, [endAt]);
  const resume = useCallback(() => {
    if (pausedLeft === null) return;
    setEndAt(Date.now() + pausedLeft * 1000);
    setPausedLeft(null);
  }, [pausedLeft]);
  const add = useCallback((sec: number) => setEndAt((e) => (e === null ? e : e + sec * 1000)), []);

  const remaining = endAt !== null ? Math.max(0, (endAt - now) / 1000) : (pausedLeft ?? 0);
  return { running: endAt !== null, paused: pausedLeft !== null, remaining, start, stop, pause, resume, add };
}

export function formatClock(sec: number): string {
  const s = Math.ceil(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
