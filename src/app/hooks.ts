/** Accès réactif aux données locales (se met à jour automatiquement quand IndexedDB change). */
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';
import type { ExerciseState, Profile, Program, Reminders, SessionLog } from '@/domain/user';

export function useProfile(): Profile | undefined | null {
  return useLiveQuery(async () => (await db.profile.get('me')) ?? null, [], undefined);
}

export function usePrograms(): Program[] | undefined {
  return useLiveQuery(async () => (await db.programs.toArray()).sort((a, b) => b.createdAt - a.createdAt), []);
}

export function useActiveProgram(): Program | undefined | null {
  return useLiveQuery(async () => (await db.programs.toArray()).find((p) => p.active) ?? null, [], undefined);
}

export function useProgram(id: string | undefined): Program | undefined | null {
  return useLiveQuery(async () => (id ? ((await db.programs.get(id)) ?? null) : null), [id], undefined);
}

export function useLogs(): SessionLog[] | undefined {
  return useLiveQuery(async () => (await db.logs.toArray()).sort((a, b) => a.startedAt - b.startedAt), []);
}

export function useExerciseStates(): Map<string, ExerciseState> | undefined {
  return useLiveQuery(async () => new Map((await db.exerciseStates.toArray()).map((s) => [s.exerciseId, s])), []);
}

export function useReminders(): Reminders | null | undefined {
  return useLiveQuery(async () => ((await db.kv.get('reminders'))?.value as Reminders | undefined) ?? null, [], undefined);
}
