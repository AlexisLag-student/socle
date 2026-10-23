/**
 * Lectures « cahier » des journaux de séance (fonctions pures, pour l'affichage uniquement) :
 * cases cochées du jour, dernière note manuscrite d'un exercice, bande de la semaine, numéro de semaine.
 */
import type { TFunction } from 'i18next';
import type { WeekDay } from '@/components/ui';
import type { Program, SessionLog } from '@/domain/user';
import { startOfDay, startOfWeek } from '@/features/history/stats';

const DAY = 86_400_000;
type SessionKey = Program['sessions'][number]['key'];

export function isSameDay(ts: number, now: Date): boolean {
  return startOfDay(new Date(ts)).getTime() === startOfDay(now).getTime();
}

/** Dernier journal du jour pour cette séance de ce programme (terminé ou en cours). */
export function todaysLog(logs: readonly SessionLog[], programId: string, key: SessionKey, now = new Date()): SessionLog | undefined {
  return logs
    .filter((l) => l.programId === programId && l.sessionKey === key && isSameDay(l.startedAt, now))
    .sort((a, b) => b.startedAt - a.startedAt)[0];
}

/** Exercices faits dans un journal : retour donné ou toutes les séries cochées (hors exercices passés). */
export function doneExercises(log: SessionLog | undefined): Set<string> {
  const out = new Set<string>();
  for (const e of log?.entries ?? []) {
    if (e.skipped) continue;
    if (e.feedback || (e.sets.length > 0 && e.sets.every((s) => s.done))) out.add(e.exerciseId);
  }
  return out;
}

/** Dernière note d'un exercice, telle qu'on l'écrirait dans la marge : « 12 kg » ou « facile ! ». */
export function lastNote(logs: readonly SessionLog[], exerciseId: string, t: TFunction): string | undefined {
  for (let i = logs.length - 1; i >= 0; i--) {
    const e = logs[i]!.entries.find((x) => x.exerciseId === exerciseId && !x.skipped);
    if (!e) continue;
    const load = Math.max(0, ...e.sets.map((s) => s.loadKg ?? 0));
    if (load > 0) return `${load.toLocaleString()} kg`;
    if (e.feedback) return t(`notebook.feedback.${e.feedback}`);
  }
  return undefined;
}

/** Semaine du programme (1 = semaine de création). */
export function programWeek(program: Program, now = new Date()): number {
  const diff = startOfWeek(now).getTime() - startOfWeek(new Date(program.createdAt)).getTime();
  return Math.max(1, Math.round(diff / (7 * DAY)) + 1);
}

/** Bande de la semaine en cours (lundi → dimanche) : séances terminées et séance du jour. */
export function weekDays(logs: readonly SessionLog[], todayKey: SessionKey | undefined, t: TFunction, locale: string, now = new Date()): WeekDay[] {
  const monday = startOfWeek(now);
  const letter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  const long = new Intl.DateTimeFormat(locale, { weekday: 'long' });
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const done = logs.filter((l) => l.finishedAt && isSameDay(l.finishedAt, date));
    const today = isSameDay(date.getTime(), now);
    const mark = done.length ? done.map((l) => l.sessionKey).join('') : today ? todayKey : undefined;
    const status = done.length
      ? t('notebook.dayDone', { keys: done.map((l) => l.sessionKey).join(', ') })
      : today && todayKey
        ? t('notebook.dayToday', { key: todayKey })
        : t('notebook.dayRest');
    return { letter: letter.format(date).toUpperCase(), name: `${long.format(date)} : ${status}`, mark, done: done.length > 0, today };
  });
}
