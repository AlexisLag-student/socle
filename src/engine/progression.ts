/**
 * Règles de progression après chaque exercice (retour facile / correct / trop dur).
 *  - « facile » deux fois de suite → proposer le niveau suivant (ou plus de charge / de répétitions au niveau max) ;
 *  - « trop dur » → proposer la régression (niveau précédent, ou moins de charge / de volume) ;
 *  - l'utilisateur accepte ou refuse ; dans les deux cas, la série de retours repart de zéro.
 * Fonctions pures, testées.
 */
import type { Feedback } from '@/domain/ids';
import type { ExerciseState, Suggestion } from '@/domain/user';

/** Nombre de retours conservés par exercice. */
export const FEEDBACK_HISTORY = 6;
export const EASY_STREAK = 2;
export const LOAD_UP_PCT = 5;
export const LOAD_DOWN_PCT = -10;

export interface ProgressionContext {
  /** Niveaux accessibles avec le matériel et la variante actuels, croissants. */
  availableLevels: readonly number[];
  /** La variante permet d'augmenter la charge. */
  loadable: boolean;
}

export function suggest(state: Pick<ExerciseState, 'level' | 'feedback' | 'loadKg'>, ctx: ProgressionContext, now: number): Suggestion | undefined {
  const fb = state.feedback;
  const last = fb[fb.length - 1];
  const levels = [...ctx.availableLevels].sort((a, b) => a - b);
  const base = { fromLevel: state.level, createdAt: now };

  if (last === 'hard') {
    const lower = levels.filter((l) => l < state.level);
    if (lower.length) return { ...base, kind: 'level-down', toLevel: Math.max(...lower) };
    if (ctx.loadable && (state.loadKg ?? 0) > 0)
      return { ...base, kind: 'load-down', toLevel: state.level, loadChangePct: LOAD_DOWN_PCT };
    return { ...base, kind: 'volume-down', toLevel: state.level };
  }

  const streak = fb.slice(-EASY_STREAK);
  if (streak.length === EASY_STREAK && streak.every((f) => f === 'easy')) {
    const higher = levels.filter((l) => l > state.level);
    if (higher.length) return { ...base, kind: 'level-up', toLevel: Math.min(...higher) };
    if (ctx.loadable) return { ...base, kind: 'load-up', toLevel: state.level, loadChangePct: LOAD_UP_PCT };
    return { ...base, kind: 'reps-up', toLevel: state.level };
  }
  return undefined;
}

/** Enregistre un retour et calcule l'éventuelle proposition. */
export function recordFeedback(
  state: ExerciseState,
  feedback: Feedback,
  ctx: ProgressionContext,
  now: number,
): ExerciseState {
  const next: ExerciseState = {
    ...state,
    feedback: [...state.feedback, feedback].slice(-FEEDBACK_HISTORY),
    updatedAt: now,
  };
  const s = suggest(next, ctx, now);
  if (s) next.pending = s;
  else delete next.pending;
  return next;
}

/** L'utilisateur accepte ou refuse la proposition en attente. */
export function resolveSuggestion(state: ExerciseState, accepted: boolean, now: number): ExerciseState {
  const s = state.pending;
  if (!s) return state;
  const next: ExerciseState = { ...state, feedback: [], updatedAt: now };
  delete next.pending;
  if (!accepted) return next;
  next.level = s.toLevel;
  if (s.loadChangePct && state.loadKg) {
    next.loadKg = roundLoad(state.loadKg * (1 + s.loadChangePct / 100));
  }
  return next;
}

/** Arrondi pratique des charges (0,5 kg en dessous de 10 kg, 1 kg au-dessus). */
export function roundLoad(kg: number): number {
  const step = kg < 10 ? 0.5 : 1;
  return Math.max(0, Math.round(kg / step) * step);
}

export function initialState(exerciseId: string, level: number, now: number, variantId?: string): ExerciseState {
  return { exerciseId, level, variantId, feedback: [], updatedAt: now };
}
