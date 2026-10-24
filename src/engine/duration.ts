/**
 * Estimation de la durée d'un exercice et d'une séance à partir des dosages, repos compris
 * (repos entre les séries et repos entre les exercices, tels que la séance guidée les décompte).
 */
import type { Dosage } from '@/domain/schema';
import type { SessionMinutes } from '@/domain/user';

/** Bornes du repos entre deux exercices (secondes) : le temps de changer de poste, sans refroidir. */
export const BETWEEN_REST_MIN_SEC = 60;
export const BETWEEN_REST_MAX_SEC = 120;
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

/**
 * Repos après un exercice, avant le suivant : le repos entre séries de l'exercice terminé
 * (il reflète son intensité), borné entre 60 et 120 s.
 */
export function restBetweenExercises(d: Pick<Dosage, 'restSec'>): number {
  return Math.min(BETWEEN_REST_MAX_SEC, Math.max(BETWEEN_REST_MIN_SEC, d.restSec));
}

/** Durée d'un exercice seul : séries et repos entre les séries. */
export function exerciseWorkSeconds(d: Dosage): number {
  return d.sets * setWorkSeconds(d) + Math.max(0, d.sets - 1) * d.restSec;
}

/** Durée d'un exercice suivi du repos avant l'exercice suivant (majorant utilisé pendant la génération). */
export function exerciseSeconds(d: Dosage): number {
  return exerciseWorkSeconds(d) + restBetweenExercises(d);
}

/** Durée estimée d'une séance : exercices, repos entre séries et repos entre exercices (aucun après le dernier). */
export function sessionSeconds(items: readonly { dosage: Dosage }[]): number {
  if (!items.length) return 0;
  const total = items.reduce((s, i) => s + exerciseSeconds(i.dosage), 0);
  return total - restBetweenExercises(items[items.length - 1]!.dosage);
}

/** Nombre d'exercices par séance selon la durée (une séance courte en compte moins, repos compris). */
export function itemBounds(minutes: SessionMinutes): { min: number; max: number } {
  switch (minutes) {
    case 15:
      return { min: 3, max: 4 };
    case 30:
      return { min: 4, max: 6 };
    case 45:
      return { min: 4, max: 8 };
    case 60:
      return { min: 6, max: 12 };
  }
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
