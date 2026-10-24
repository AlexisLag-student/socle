import { describe, expect, it } from 'vitest';
import { afterFeedback, afterWork, clampElapsed, clampReps, cycleSeconds, quotaReached, repQuota, repsDone } from './flow';

describe('quota de répétitions', () => {
  it('le quota est le haut de la fourchette ; aucun quota pour un maintien', () => {
    expect(repQuota({ reps: [10, 12] })).toBe(12);
    expect(repQuota({ reps: [8, 8] })).toBe(8);
    expect(repQuota({ holdSec: 30 })).toBeUndefined();
  });

  it('durée d’une répétition au tempo (X = 0,8 s comme l’indicateur)', () => {
    expect(cycleSeconds('3-0-3')).toBe(6);
    expect(cycleSeconds('2-1-X')).toBeCloseTo(3.8);
  });

  it('impossible de dépasser le quota, même si l’horloge continue', () => {
    const cycle = cycleSeconds('2-0-2');
    expect(repsDone(0, cycle, 10)).toBe(0);
    expect(repsDone(4 * 4 + 1, cycle, 10)).toBe(4);
    expect(repsDone(10 * 4, cycle, 10)).toBe(10);
    expect(repsDone(1000, cycle, 10)).toBe(10);
  });

  it('le quota est atteint à la fin de la dernière répétition, pas avant', () => {
    expect(quotaReached(39.9, 4, 10)).toBe(false);
    expect(quotaReached(40, 4, 10)).toBe(true);
    expect(quotaReached(41, 4, 10)).toBe(true);
  });

  it('l’indicateur reste figé sur la dernière répétition (jamais « 11 / 10 »)', () => {
    const shown = clampElapsed(55, 4, 10);
    expect(Math.floor(shown / 4) + 1).toBe(10);
    expect(clampElapsed(12, 4, undefined)).toBe(12);
  });

  it('répétitions notées ramenées au quota', () => {
    expect(clampReps(15, 12)).toBe(12);
    expect(clampReps(-3, 12)).toBe(0);
    expect(clampReps(9.6, 12)).toBe(10);
    expect(clampReps(Number.NaN, 12)).toBe(0);
    expect(clampReps(40, undefined)).toBe(40);
  });
});

describe('enchaînement série → série → exercice', () => {
  const d = { sets: 3, perSide: false };

  it('série → repos → série suivante, puis retour après la dernière', () => {
    expect(afterWork(d, 0, 1, false)).toEqual({ kind: 'rest', nextSet: 1 });
    expect(afterWork(d, 1, 1, false)).toEqual({ kind: 'rest', nextSet: 2 });
    expect(afterWork(d, 2, 1, false)).toEqual({ kind: 'feedback' });
  });

  it('par côté : côté 1 → côté 2 → repos', () => {
    const ps = { sets: 2, perSide: true };
    expect(afterWork(ps, 0, 1, true)).toEqual({ kind: 'side', side: 2 });
    expect(afterWork(ps, 0, 2, true)).toEqual({ kind: 'rest', nextSet: 1 });
    expect(afterWork(ps, 1, 2, true)).toEqual({ kind: 'feedback' });
    // Sans rythme affiché, les deux côtés forment une seule série.
    expect(afterWork(ps, 0, 1, false)).toEqual({ kind: 'rest', nextSet: 1 });
  });

  it('exercice au temps : même enchaînement', () => {
    expect(afterWork({ sets: 1, perSide: false }, 0, 1, true)).toEqual({ kind: 'feedback' });
  });

  it('après le retour : repos avant l’exercice suivant, fin après le dernier', () => {
    expect(afterFeedback(0, 5)).toBe('between');
    expect(afterFeedback(3, 5)).toBe('between');
    expect(afterFeedback(4, 5)).toBe('finish');
  });
});
