/**
 * Estimation de la durée d'un exercice à partir de son dosage.
 */
import type { Dosage } from '@/domain/schema';

/** Secondes de mise en place / transition entre deux exercices. */
export const TRANSITION_SEC = 30;
/** Durée par répétition quand aucun tempo n'est précisé. */
const DEFAULT_REP_SEC = 3;

export function repSeconds(tempo?: string): number {
  if (!tempo) return DEFAULT_REP_SEC;
  const parts = tempo.split('-').map((p) => (p === 'X' ? 0.7 : Number(p)));
  return Math.max(1, parts.reduce((a, b) => a + b, 0));
}

/** Durée de travail d'une série (les deux côtés si `perSide`). */
export function setWorkSeconds(d: Dosage): number {
  const sides = d.perSide ? 2 : 1;
  if (d.holdSec) return d.holdSec * sides;
  const reps = d.reps ? (d.reps[0] + d.reps[1]) / 2 : 10;
  return reps * repSeconds(d.tempo) * sides;
}

/** Durée totale estimée d'un exercice, transition comprise. */
export function exerciseSeconds(d: Dosage): number {
  return d.sets * setWorkSeconds(d) + Math.max(0, d.sets - 1) * d.restSec + TRANSITION_SEC;
}

/** Réduit le volume pour tenir dans un budget serré : 1 série de moins (min. 2) et repos raccourci. */
export function reduceDosage(d: Dosage): Dosage | undefined {
  if (d.sets <= 2 && d.restSec <= 45) return undefined;
  return {
    ...d,
    sets: Math.max(2, d.sets - 1),
    restSec: d.restSec > 45 ? Math.max(45, Math.round((d.restSec * 0.75) / 15) * 15) : d.restSec,
  };
}
