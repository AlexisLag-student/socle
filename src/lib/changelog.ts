/**
 * Lecture de CHANGELOG.md (embarqué au build) : une entrée par version, puces en français et en anglais.
 * Format attendu : `## [x.y.z] — AAAA-MM-JJ`, puis `### Français` / `### English` suivis de puces `- …`.
 */
import type { Lang } from '@/i18n';

export interface ChangelogEntry {
  version: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  notes: Record<Lang, string[]>;
}

const VERSION_RE = /^##\s+\[(\d+\.\d+\.\d+)\]\s+[—–-]\s+(\d{4}-\d{2}-\d{2})\s*$/;
const LANG_RE = /^###\s+(Français|English)\s*$/;

export function parseChangelog(md: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  let entry: ChangelogEntry | undefined;
  let lang: Lang | undefined;
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const v = VERSION_RE.exec(line);
    if (v) {
      entry = { version: v[1]!, date: v[2]!, notes: { fr: [], en: [] } };
      entries.push(entry);
      lang = undefined;
      continue;
    }
    if (line.startsWith('## ')) {
      entry = undefined;
      continue;
    }
    const l = LANG_RE.exec(line);
    if (l) {
      lang = l[1] === 'Français' ? 'fr' : 'en';
      continue;
    }
    if (!entry || !lang) continue;
    if (line.startsWith('- ')) entry.notes[lang].push(line.slice(2).trim());
    // Puce sur plusieurs lignes : suite indentée.
    else if (/^\s+\S/.test(line) && entry.notes[lang].length) entry.notes[lang][entry.notes[lang].length - 1] += ` ${line.trim()}`;
  }
  return entries;
}

/** Découpe le texte d'une puce en morceaux normaux et en gras (`**…**`). */
export function splitBold(text: string): { text: string; bold: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) => (part.startsWith('**') && part.endsWith('**') ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false }));
}
