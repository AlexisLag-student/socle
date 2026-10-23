/**
 * Horloge du tempo de la séance guidée : une seule source de temps pour l'indicateur de tempo
 * et l'animation de l'exercice (synchronisation exacte, pause et reprise communes).
 */
import { useMemo, useSyncExternalStore } from 'react';

export class TempoClock {
  private startedAt = 0;
  private pausedAt: number | null = null;
  private listeners = new Set<() => void>();
  private version = 0;
  running = false;

  constructor(private now: () => number = () => performance.now()) {}

  /** Temps écoulé (s) depuis le départ, pauses exclues. */
  elapsed = (): number => {
    if (!this.running && this.pausedAt === null) return 0;
    const end = this.pausedAt ?? this.now();
    return Math.max(0, (end - this.startedAt) / 1000);
  };

  /** Repart de zéro et lance l'horloge. */
  restart(): void {
    this.startedAt = this.now();
    this.pausedAt = null;
    this.set(true);
  }

  /** Arrête et remet à zéro. */
  stop(): void {
    this.pausedAt = null;
    this.set(false);
  }

  pause(): void {
    if (!this.running) return;
    this.pausedAt = this.now();
    this.set(false);
  }

  resume(): void {
    if (this.running) return;
    if (this.pausedAt === null) return this.restart();
    this.startedAt += this.now() - this.pausedAt;
    this.pausedAt = null;
    this.set(true);
  }

  toggle = (): void => (this.running ? this.pause() : this.resume());

  get paused(): boolean {
    return this.pausedAt !== null;
  }

  private set(running: boolean) {
    this.running = running;
    this.version++;
    this.listeners.forEach((l) => l());
  }

  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };

  snapshot = () => this.version;
}

/** Horloge propre à l'écran de séance ; le composant se met à jour quand elle démarre, s'arrête ou se met en pause. */
export function useTempoClock(): TempoClock {
  const clock = useMemo(() => new TempoClock(), []);
  useSyncExternalStore(clock.subscribe, clock.snapshot, clock.snapshot);
  return clock;
}

/** Phase de tempo en cours à un instant donné du cycle (répétition, index de phase, secondes restantes). */
export function tempoPosition(phases: { sec: number }[], elapsed: number): { rep: number; index: number; left: number } {
  const cycle = phases.reduce((n, p) => n + p.sec, 0);
  if (cycle <= 0) return { rep: 1, index: 0, left: 0 };
  const rep = Math.floor(elapsed / cycle) + 1;
  let t = elapsed - (rep - 1) * cycle;
  for (let i = 0; i < phases.length; i++) {
    const s = phases[i]!.sec;
    if (t < s) return { rep, index: i, left: s - t };
    t -= s;
  }
  return { rep, index: phases.length - 1, left: 0 };
}
