/** Mise en forme lisible d'un dosage (« 3 × 12–15 · tempo 3-0-3 · repos 1 min 30 »). */
import type { TFunction } from 'i18next';
import type { Dosage, L } from '@/domain/schema';

export function formatDuration(sec: number, t: TFunction): string {
  if (sec < 60) return t('common.seconds', { count: sec });
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s ? t('format.minSec', { m, s: String(s).padStart(2, '0') }) : t('common.minutes', { count: m });
}

export function formatVolume(d: Dosage, t: TFunction): string {
  const work = d.holdSec
    ? formatDuration(d.holdSec, t)
    : d.reps
      ? d.reps[0] === d.reps[1]
        ? String(d.reps[0])
        : `${d.reps[0]}–${d.reps[1]}`
      : '';
  return `${d.sets} × ${work}${d.perSide ? ` ${t('common.perSide')}` : ''}`;
}

export function formatDosage(d: Dosage, t: TFunction, l: (x: L | undefined) => string): string[] {
  return [
    formatVolume(d, t),
    ...(d.tempo ? [t('format.tempo', { tempo: d.tempo })] : []),
    t('format.rest', { rest: formatDuration(d.restSec, t) }),
    l(d.intensity.value),
    ...(d.frequency ? [l(d.frequency)] : []),
  ];
}

/** Durée d'une séance choisie (15, 30, 45 min, « 1 h »). */
export function formatSessionLength(minutes: number, t: TFunction): string {
  return minutes === 60 ? t('common.oneHour') : t('common.minutes', { count: minutes });
}

export function formatMinutes(sec: number): number {
  return Math.max(1, Math.round(sec / 60));
}
