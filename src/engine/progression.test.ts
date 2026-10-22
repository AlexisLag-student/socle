import { describe, expect, it } from 'vitest';
import type { Feedback } from '@/domain/ids';
import type { ExerciseState } from '@/domain/user';
import { initialState, recordFeedback, resolveSuggestion, roundLoad, suggest } from './progression';

const ctx = { availableLevels: [1, 2, 3, 4], loadable: false };
const st = (level: number, feedback: Feedback[], loadKg?: number) => ({ level, feedback, loadKg });

describe('suggest', () => {
  it.each<[string, ReturnType<typeof st>, typeof ctx, string | undefined, number | undefined]>([
    ['un seul « facile » : rien', st(2, ['easy']), ctx, undefined, undefined],
    ['« facile » ×2 : niveau suivant', st(2, ['easy', 'easy']), ctx, 'level-up', 3],
    ['« facile » ×2 non consécutifs : rien', st(2, ['easy', 'ok', 'easy']), ctx, undefined, undefined],
    ['« correct » : rien', st(2, ['ok', 'ok']), ctx, undefined, undefined],
    ['« trop dur » : niveau précédent', st(3, ['hard']), ctx, 'level-down', 2],
    ['« trop dur » au niveau 1 : moins de volume', st(1, ['hard']), ctx, 'volume-down', 1],
    ['« trop dur » au niveau 1 chargé : moins de charge', st(1, ['hard'], 20), { ...ctx, loadable: true }, 'load-down', 1],
    ['« facile » ×2 au niveau max chargeable : plus de charge', st(4, ['easy', 'easy']), { ...ctx, loadable: true }, 'load-up', 4],
    ['« facile » ×2 au niveau max non chargeable : plus de répétitions', st(4, ['easy', 'easy']), ctx, 'reps-up', 4],
    ['saute un niveau inaccessible', st(1, ['easy', 'easy']), { availableLevels: [1, 3], loadable: false }, 'level-up', 3],
    ['régresse vers un niveau accessible', st(3, ['hard']), { availableLevels: [1, 3], loadable: false }, 'level-down', 1],
  ])('%s', (_label, state, c, kind, toLevel) => {
    const s = suggest(state, c, 0);
    expect(s?.kind).toBe(kind);
    if (toLevel !== undefined) expect(s?.toLevel).toBe(toLevel);
  });
});

describe('cycle complet : retour → proposition → décision', () => {
  const s0: ExerciseState = initialState('squat', 2, 0);

  it('deux « facile » puis acceptation : niveau suivant et série remise à zéro', () => {
    let s = recordFeedback(s0, 'easy', ctx, 1);
    expect(s.pending).toBeUndefined();
    s = recordFeedback(s, 'easy', ctx, 2);
    expect(s.pending?.kind).toBe('level-up');
    s = resolveSuggestion(s, true, 3);
    expect(s.level).toBe(3);
    expect(s.feedback).toEqual([]);
    expect(s.pending).toBeUndefined();
  });

  it('refus : le niveau ne change pas et il faut à nouveau deux « facile »', () => {
    let s = recordFeedback(recordFeedback(s0, 'easy', ctx, 1), 'easy', ctx, 2);
    s = resolveSuggestion(s, false, 3);
    expect(s.level).toBe(2);
    s = recordFeedback(s, 'easy', ctx, 4);
    expect(s.pending).toBeUndefined();
  });

  it('acceptation d’une hausse de charge : +5 % arrondi', () => {
    const loaded: ExerciseState = { ...initialState('squat', 4, 0), loadKg: 40 };
    let s = recordFeedback(recordFeedback(loaded, 'easy', { ...ctx, loadable: true }, 1), 'easy', { ...ctx, loadable: true }, 2);
    s = resolveSuggestion(s, true, 3);
    expect(s.loadKg).toBe(42);
  });

  it('un « trop dur » remplace une proposition de progression', () => {
    let s = recordFeedback(recordFeedback(s0, 'easy', ctx, 1), 'easy', ctx, 2);
    s = recordFeedback(s, 'hard', ctx, 3);
    expect(s.pending?.kind).toBe('level-down');
  });

  it('garde un historique borné', () => {
    let s = s0;
    for (let i = 0; i < 20; i++) s = recordFeedback(s, 'ok', ctx, i);
    expect(s.feedback.length).toBe(6);
  });
});

it('arrondit les charges', () => {
  expect(roundLoad(7.3)).toBe(7.5);
  expect(roundLoad(42.4)).toBe(42);
});
