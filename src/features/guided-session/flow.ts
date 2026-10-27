/**
 * Logique pure de la séance guidée : quota de répétitions et enchaînement série → série → exercice.
 * La progression ne passe jamais par des répétitions supplémentaires : elle reste fondée sur le retour
 * après l'exercice (facile / correct / trop dur).
 */
import type { Dosage } from '@/domain/schema';
import { REP_REST_SEC } from '@/engine/duration';
import { tempoPhases } from '@/lib/device';

/**
 * Nombre de répétitions prévu pour une série (le haut de la fourchette, déjà noté par défaut), par côté si `perSide`.
 * Avec un maintien (`holdSec`), chaque répétition est un maintien ; sans répétitions, aucun quota (maintien unique).
 */
export function repQuota(d: Pick<Dosage, 'reps' | 'holdSec'>): number | undefined {
  return d.reps?.[1];
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

export type AfterHold =
  /** Répétition maintenue terminée, il en reste : repos court, puis la suivante démarre seule. */
  | { kind: 'repRest'; nextRep: number }
  /** Dernière répétition (ou maintien unique) : la série ou le côté est terminé (`afterWork`). */
  | { kind: 'done' };

/** Fin d'un maintien. `rep` : répétition en cours (0 à quota − 1) ; `quota` absent = maintien unique. */
export function afterHold(rep: number, quota: number | undefined): AfterHold {
  return quota && rep + 1 < quota ? { kind: 'repRest', nextRep: rep + 1 } : { kind: 'done' };
}

export type HoldStep =
  | { kind: 'hold'; set: number; side: 1 | 2; rep: number; sec: number }
  | { kind: 'repRest'; sec: number }
  /** Changement de côté : le côté 2 démarre sur une action de l'utilisateur. */
  | { kind: 'side' }
  | { kind: 'setRest'; sec: number };

/**
 * Déroulé complet d'un exercice au maintien, dans l'ordre où la séance guidée l'enchaîne (`afterHold` puis `afterWork`) :
 * séries × côtés × (répétitions × (maintien + repos entre répétitions)), puis repos entre séries.
 */
export function holdSteps(d: Pick<Dosage, 'sets' | 'perSide' | 'reps' | 'holdSec' | 'restSec'>): HoldStep[] {
  if (!d.holdSec) return [];
  const quota = repQuota(d);
  const steps: HoldStep[] = [];
  let set = 0;
  let side: 1 | 2 = 1;
  let rep = 0;
  for (;;) {
    steps.push({ kind: 'hold', set, side, rep, sec: d.holdSec });
    const h = afterHold(rep, quota);
    if (h.kind === 'repRest') {
      steps.push({ kind: 'repRest', sec: REP_REST_SEC });
      rep = h.nextRep;
      continue;
    }
    rep = 0;
    const w = afterWork(d, set, side, true);
    if (w.kind === 'feedback') return steps;
    if (w.kind === 'side') {
      steps.push({ kind: 'side' });
      side = 2;
    } else {
      steps.push({ kind: 'setRest', sec: d.restSec });
      set = w.nextSet;
      side = 1;
    }
  }
}

/** Après le retour sur un exercice : repos avant le suivant, ou fin de séance après le dernier. */
export function afterFeedback(index: number, total: number): 'between' | 'finish' {
  return index + 1 < total ? 'between' : 'finish';
}
