/**
 * Export calendrier (.ics, RFC 5545) des séances récurrentes : la solution fiable pour les rappels,
 * puisqu'une PWA sans serveur ne peut pas garantir une notification quand elle est fermée.
 */

const BYDAY = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'] as const;

export interface IcsOptions {
  /** Jours de la semaine (0 = dimanche … 6 = samedi). */
  days: number[];
  /** Heure locale « HH:MM ». */
  time: string;
  durationMin: number;
  summary: string;
  description: string;
  /** URL de l'app, ajoutée à l'événement. */
  url?: string;
  /** Rappel N minutes avant (0 = à l'heure). */
  alarmMinutesBefore?: number;
  alarmText?: string;
  now?: Date;
  uid?: string;
}

/** Échappement des valeurs texte (RFC 5545 § 3.3.11). */
export function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Pliage des lignes à 75 octets (RFC 5545 § 3.1), sans couper un caractère multi-octets. */
export function foldLine(line: string): string {
  const enc = new TextEncoder();
  const out: string[] = [];
  let current = '';
  let bytes = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // les lignes de continuation commencent par une espace
    if (bytes + b > limit) {
      out.push(current);
      current = '';
      bytes = 0;
    }
    current += ch;
    bytes += b;
  }
  out.push(current);
  return out.join('\r\n ');
}

const pad = (n: number) => String(n).padStart(2, '0');
const localStamp = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
const utcStamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

/** Prochaine occurrence (aujourd'hui inclus si l'heure n'est pas passée) parmi les jours choisis. */
export function firstOccurrence(days: number[], time: string, now: Date): Date {
  const [h, m] = time.split(':').map(Number) as [number, number];
  for (let i = 0; i < 8; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, h, m, 0, 0);
    if (days.includes(d.getDay()) && d > now) return d;
  }
  throw new Error('aucun jour sélectionné');
}

export function buildIcs(o: IcsOptions): string {
  if (!o.days.length) throw new Error('aucun jour sélectionné');
  const now = o.now ?? new Date();
  const start = firstOccurrence(o.days, o.time, now);
  const end = new Date(start.getTime() + o.durationMin * 60_000);
  const byday = [...new Set(o.days)].sort().map((d) => BYDAY[d]).join(',');
  const uid = o.uid ?? `socle-${start.getTime()}-${byday}@socle.app`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Socle//Seances de renforcement//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${localStamp(start)}`,
    `DTEND:${localStamp(end)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${byday}`,
    `SUMMARY:${escapeText(o.summary)}`,
    `DESCRIPTION:${escapeText(o.description)}`,
    ...(o.url ? [`URL:${o.url}`] : []),
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(o.alarmText ?? o.summary)}`,
    `TRIGGER:-PT${o.alarmMinutesBefore ?? 0}M`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(foldLine).join('\r\n') + '\r\n';
}

/** Déclenche le téléchargement d'un fichier .ics dans le navigateur. */
export function downloadIcs(content: string, filename = 'socle-seances.ics') {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
