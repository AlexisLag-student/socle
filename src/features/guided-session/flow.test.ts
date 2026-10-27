import { describe, expect, it } from 'vitest';
import { content } from '@/content/index';
import type { Dosage } from '@/domain/schema';
import { exerciseWorkSeconds, REP_REST_SEC } from '@/engine/duration';
import { afterFeedback, afterHold, afterWork, clampElapsed, clampReps, cycleSeconds, holdSteps, quotaReached, repQuota, repsDone, type HoldStep } from './flow';

const count = (steps: HoldStep[], kind: HoldStep['kind']) => steps.filter((s) => s.kind === kind).length;
const seconds = (steps: HoldStep[]) => steps.reduce((sum, s) => sum + ('sec' in s ? s.sec : 0), 0);

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

describe('répétitions × maintien (pied court 3 × 10 × 5 s)', () => {
  const shortFoot = { sets: 3, reps: [10, 10] as [number, number], holdSec: 5, restSec: 30, perSide: false };

  it('le quota de répétitions est conservé quand chaque répétition est un maintien', () => {
    expect(repQuota({ reps: [10, 10], holdSec: 5 })).toBe(10);
  });

  it('fin d’un maintien : repos court et répétition suivante, jusqu’à la dernière', () => {
    expect(afterHold(0, 10)).toEqual({ kind: 'repRest', nextRep: 1 });
    expect(afterHold(8, 10)).toEqual({ kind: 'repRest', nextRep: 9 });
    expect(afterHold(9, 10)).toEqual({ kind: 'done' });
    // Maintien unique (gainage 30 s) : inchangé, la série est terminée.
    expect(afterHold(0, undefined)).toEqual({ kind: 'done' });
  });

  it('non-régression : 30 maintiens, 27 repos entre répétitions, 2 repos entre séries', () => {
    const steps = holdSteps(shortFoot);
    expect(count(steps, 'hold')).toBe(30);
    expect(count(steps, 'repRest')).toBe(27);
    expect(count(steps, 'setRest')).toBe(2);
    expect(steps.slice(0, 4)).toEqual([
      { kind: 'hold', set: 0, side: 1, rep: 0, sec: 5 },
      { kind: 'repRest', sec: REP_REST_SEC },
      { kind: 'hold', set: 0, side: 1, rep: 1, sec: 5 },
      { kind: 'repRest', sec: REP_REST_SEC },
    ]);
    expect(steps[19]).toEqual({ kind: 'setRest', sec: 30 });
  });

  it('par côté : 10 maintiens côté 1, changement de côté, 10 maintiens côté 2, puis repos entre séries', () => {
    const steps = holdSteps({ ...shortFoot, perSide: true });
    expect(count(steps, 'hold')).toBe(60);
    expect(count(steps, 'repRest')).toBe(54);
    expect(count(steps, 'side')).toBe(3);
    expect(count(steps, 'setRest')).toBe(2);
    expect(steps[19]).toEqual({ kind: 'side' });
    expect(steps[20]).toEqual({ kind: 'hold', set: 0, side: 2, rep: 0, sec: 5 });
  });

  it('maintien unique : un maintien par série, aucun repos entre répétitions', () => {
    const steps = holdSteps({ sets: 3, holdSec: 30, restSec: 60, perSide: false });
    expect(steps.map((s) => s.kind)).toEqual(['hold', 'setRest', 'hold', 'setRest', 'hold']);
  });

  // Tous les dosages « répétitions × maintien » du catalogue (exercices et phases des pathologies).
  const dosages: [string, Dosage | undefined][] = [
    ...content.exercises.flatMap((e) => e.levels.map((lv): [string, Dosage] => [`${e.id} niv. ${lv.level}`, lv.dosage])),
    ...content.pathologies.flatMap((p) => p.phases.flatMap((ph) => ph.exercises.map((x): [string, Dosage | undefined] => [`${p.id} ${ph.phase} · ${x.exerciseId}`, x.dosage]))),
  ];
  const holdReps = dosages.filter((x): x is [string, Dosage] => !!x[1]?.reps && !!x[1].holdSec);

  it('le catalogue contient des dosages « répétitions × maintien »', () => {
    expect(holdReps.map(([name]) => name)).toContain('short-foot niv. 1');
  });

  it.each(holdReps)('%s : séries × côtés × répétitions maintenues, repos compris dans la durée', (_, d) => {
    const steps = holdSteps(d);
    const sides = d.perSide ? 2 : 1;
    const reps = d.reps![1];
    expect(count(steps, 'hold')).toBe(d.sets * sides * reps);
    expect(count(steps, 'repRest')).toBe(d.sets * sides * (reps - 1));
    expect(count(steps, 'setRest')).toBe(d.sets - 1);
    expect(seconds(steps)).toBe(exerciseWorkSeconds(d));
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
