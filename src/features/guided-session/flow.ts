/**
 * Logique pure de la séance guidée : quota de répétitions et enchaînement série → série → exercice.
 * La progression ne passe jamais par des répétitions supplémentaires : elle reste fondée sur le retour
 * après l'exercice (facile / correct / trop dur).
 */
import type { Dosage } from '@/domain/schema';
import { tempoPhases } from '@/lib/device';

/** Nombre de répétitions prévu pour une série (le haut de la fourchette, déjà noté par défaut), par côté si `perSide`. */
export function repQuota(d: Pick<Dosage, 'reps' | 'holdSec'>): number | undefined {
  if (d.holdSec || !d.reps) return undefined;
  return d.reps[1];
}

/** Durée d'une répétition au tempo (mêmes phases que l'indicateur de tempo et l'animation). */
export function cycleSeconds(tempo: string): number {
  return tempoPhases(tempo).reduce((s, p) => s + p.sec, 0);
}

/** Répétitions terminées au tempo après `elapsed` secondes, jamais au-delà du quota. */
export function repsDone(elapsed: number, cycle: number, quota: number): number {
  if (cycle <= 0) return 0;
  return Math.min(quota, Math.floor(elapsed / cycle + 1e-6));
}

/** Le quota est atteint quand la dernière répétition prévue est terminée. */
export function quotaReached(elapsed: number, cycle: number, quota: number): boolean {
  return cycle > 0 && elapsed + 1e-6 >= quota * cycle;
}

/** Instant affiché par l'indicateur et l'animation : figé sur la fin de la dernière répétition au quota. */
export function clampElapsed(elapsed: number, cycle: number, quota: number | undefined): number {
  if (!quota || cycle <= 0) return elapsed;
  return Math.min(elapsed, quota * cycle - 1e-3);
}

/** Répétitions notées : entières, entre 0 et le quota. */
export function clampReps(value: number, quota: number | undefined): number {
  const n = Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
  return quota === undefined ? n : Math.min(quota, n);
}

export type AfterWork =
  /** Côté 1 terminé : le côté 2 démarre sur une action de l'utilisateur. */
  | { kind: 'side'; side: 2 }
  /** Série terminée, il en reste : repos entre séries. */
  | { kind: 'rest'; nextSet: number }
  /** Dernière série terminée : retour sur l'exercice. */
  | { kind: 'feedback' };

/**
 * Étape suivante quand une série (ou un côté) est terminée.
 * `bySide` : les deux côtés sont enchaînés séparément (maintien par côté, ou rythme affiché par côté).
 */
export function afterWork(d: Pick<Dosage, 'sets' | 'perSide'>, setNo: number, side: 1 | 2, bySide: boolean): AfterWork {
  if (bySide && d.perSide && side === 1) return { kind: 'side', side: 2 };
  if (setNo + 1 >= d.sets) return { kind: 'feedback' };
  return { kind: 'rest', nextSet: setNo + 1 };
}

/** Après le retour sur un exercice : repos avant le suivant, ou fin de séance après le dernier. */
export function afterFeedback(index: number, total: number): 'between' | 'finish' {
  return index + 1 < total ? 'between' : 'finish';
}
