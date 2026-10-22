/** Statistiques d'historique (fonctions pures). Les semaines commencent le lundi. */
import type { SessionLog } from '@/domain/user';

const DAY = 86_400_000;

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function startOfWeek(d: Date): Date {
  const s = startOfDay(d);
  const offset = (s.getDay() + 6) % 7; // lundi = 0
  return new Date(s.getFullYear(), s.getMonth(), s.getDate() - offset);
}

export function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const finished = (logs: readonly SessionLog[]) => logs.filter((l): l is SessionLog & { finishedAt: number } => !!l.finishedAt);

/** Séances terminées par semaine, de la plus ancienne à la plus récente. */
export function weeklyCounts(logs: readonly SessionLog[], weeks: number, now: Date): { weekStart: Date; count: number }[] {
  const current = startOfWeek(now);
  const out = Array.from({ length: weeks }, (_, i) => ({
    weekStart: new Date(current.getFullYear(), current.getMonth(), current.getDate() - 7 * (weeks - 1 - i)),
    count: 0,
  }));
  for (const l of finished(logs)) {
    const ws = startOfWeek(new Date(l.finishedAt)).getTime();
    const slot = out.find((w) => w.weekStart.getTime() === ws);
    if (slot) slot.count++;
  }
  return out;
}

/** Nombre de séances terminées par jour (clé AAAA-MM-JJ). */
export function dailyCounts(logs: readonly SessionLog[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const l of finished(logs)) {
    const k = dayKey(new Date(l.finishedAt));
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

/** Grille calendrier : `weeks` colonnes de 7 jours (lundi → dimanche), se terminant la semaine courante. */
export function calendarGrid(weeks: number, now: Date): Date[][] {
  const first = new Date(startOfWeek(now).getTime() - (weeks - 1) * 7 * DAY);
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => new Date(first.getFullYear(), first.getMonth(), first.getDate() + w * 7 + d)),
  );
}

/** Semaines consécutives (jusqu'à la semaine courante ou la précédente) avec au moins une séance. */
export function weekStreak(logs: readonly SessionLog[], now: Date): number {
  const counts = weeklyCounts(logs, 104, now);
  let i = counts.length - 1;
  if (counts[i]!.count === 0) i--; // la semaine en cours n'est pas finie
  let streak = 0;
  for (; i >= 0 && counts[i]!.count > 0; i--) streak++;
  return streak;
}

export interface ExercisePoint {
  t: number;
  level: number;
  /** Charge maximale notée pendant la séance (kg), si renseignée. */
  load?: number;
}

/** Évolution du niveau et de la charge d'un exercice. */
export function exerciseSeries(logs: readonly SessionLog[], exerciseId: string): ExercisePoint[] {
  return finished(logs)
    .sort((a, b) => a.finishedAt - b.finishedAt)
    .flatMap((l) =>
      l.entries
        .filter((e) => e.exerciseId === exerciseId && !e.skipped)
        .map((e) => {
          const loads = e.sets.map((s) => s.loadKg).filter((x): x is number => typeof x === 'number' && x > 0);
          return { t: l.finishedAt, level: e.level, ...(loads.length ? { load: Math.max(...loads) } : {}) };
        }),
    );
}

/** Exercices présents dans l'historique, du plus pratiqué au moins pratiqué. */
export function practisedExercises(logs: readonly SessionLog[]): { exerciseId: string; count: number }[] {
  const m = new Map<string, number>();
  for (const l of finished(logs)) for (const e of l.entries) if (!e.skipped) m.set(e.exerciseId, (m.get(e.exerciseId) ?? 0) + 1);
  return [...m.entries()].map(([exerciseId, count]) => ({ exerciseId, count })).sort((a, b) => b.count - a.count);
}
