import { describe, expect, it } from 'vitest';
import type { SessionLog } from '@/domain/user';
import { calendarGrid, dailyCounts, exerciseSeries, practisedExercises, startOfWeek, weekStreak, weeklyCounts } from './stats';

const now = new Date(2026, 9, 22, 12); // jeudi 22 octobre 2026
const log = (d: Date, entries: SessionLog['entries'] = [], finished = true): SessionLog => ({
  id: String(d.getTime()),
  programId: 'p',
  sessionKey: 'A',
  startedAt: d.getTime() - 1000,
  ...(finished ? { finishedAt: d.getTime() } : {}),
  entries,
});

describe('statistiques', () => {
  it('la semaine commence le lundi', () => {
    expect(startOfWeek(now)).toEqual(new Date(2026, 9, 19));
    expect(startOfWeek(new Date(2026, 9, 25, 23))).toEqual(new Date(2026, 9, 19)); // dimanche
  });

  it('compte les séances terminées par semaine', () => {
    const logs = [log(new Date(2026, 9, 20)), log(new Date(2026, 9, 21)), log(new Date(2026, 9, 14)), log(new Date(2026, 9, 21), [], false)];
    expect(weeklyCounts(logs, 3, now).map((w) => w.count)).toEqual([0, 1, 2]);
  });

  it('compte par jour et construit le calendrier', () => {
    expect(dailyCounts([log(new Date(2026, 9, 20, 8)), log(new Date(2026, 9, 20, 19))]).get('2026-10-20')).toBe(2);
    const grid = calendarGrid(2, now);
    expect(grid).toHaveLength(2);
    expect(grid[1]![0]).toEqual(new Date(2026, 9, 19));
    expect(grid[0]![6]).toEqual(new Date(2026, 9, 18));
  });

  it('calcule la régularité en semaines consécutives', () => {
    const logs = [log(new Date(2026, 9, 13)), log(new Date(2026, 9, 6)), log(new Date(2026, 8, 22))];
    expect(weekStreak(logs, now)).toBe(2);
  });

  it('suit le niveau et la charge par exercice', () => {
    const logs = [
      log(new Date(2026, 9, 1), [{ exerciseId: 'squat', variantId: 'v', level: 2, sets: [{ done: true, loadKg: 20 }, { done: true, loadKg: 25 }] }]),
      log(new Date(2026, 9, 8), [{ exerciseId: 'squat', variantId: 'v', level: 3, sets: [{ done: true }] }]),
    ];
    expect(exerciseSeries(logs, 'squat')).toEqual([
      { t: new Date(2026, 9, 1).getTime(), level: 2, load: 25 },
      { t: new Date(2026, 9, 8).getTime(), level: 3 },
    ]);
    expect(practisedExercises(logs)).toEqual([{ exerciseId: 'squat', count: 2 }]);
  });
});
