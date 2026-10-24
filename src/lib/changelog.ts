/**
 * Lecture de CHANGELOG.md (embarqué au build) : une entrée par version, puces en français et en anglais.
 * Format attendu : `## [x.y.z] — AAAA-MM-JJ`, puis `### Français` / `### English` suivis de puces `- …`.
 * La section `## [À venir]` (évolutions pas encore publiées) n'est jamais affichée dans l'app :
 * `npm run release` la transforme en entrée datée (scripts/release.ts).
 */
import type { Lang } from '@/i18n';

export interface ChangelogEntry {
  version: string;
  /** Date ISO (AAAA-MM-JJ). */
  date: string;
  notes: Record<Lang, string[]>;
}

const VERSION_RE = /^##\s+\[(\d+\.\d+\.\d+)\]\s+[—–-]\s+(\d{4}-\d{2}-\d{2})\s*$/;
const UNRELEASED_RE = /^##\s+\[À venir\]\s*$/;
const LANG_RE = /^###\s+(Français|English)\s*$/;

const UNRELEASED_TEMPLATE = ['## [À venir]', '', '### Français', '', '### English', ''];

function parse(md: string): { entries: ChangelogEntry[]; unreleased?: Record<Lang, string[]> } {
  const entries: ChangelogEntry[] = [];
  let unreleased: Record<Lang, string[]> | undefined;
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
    if (UNRELEASED_RE.test(line)) {
      entry = { version: '', date: '', notes: { fr: [], en: [] } };
      unreleased = entry.notes;
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
  return { entries, unreleased };
}

/** Versions publiées, de la plus récente à la plus ancienne (sans la section « À venir »). */
export function parseChangelog(md: string): ChangelogEntry[] {
  return parse(md).entries;
}

/** Puces de la section « À venir », ou `undefined` si le journal n'en a pas. */
export function unreleasedNotes(md: string): Record<Lang, string[]> | undefined {
  return parse(md).unreleased;
}

/**
 * Publie la section « À venir » sous `## [version] — date` et remet au-dessus une section « À venir » vide.
 * Refuse une section absente ou sans puce dans l'une des deux langues.
 */
export function releaseChangelog(md: string, version: string, date: string): string {
  const notes = unreleasedNotes(md);
  if (!notes) throw new Error('CHANGELOG.md n’a pas de section « ## [À venir] ».');
  if (!notes.fr.length || !notes.en.length) throw new Error('La section « À venir » doit avoir des puces en français et en anglais.');
  const eol = md.includes('\r\n') ? '\r\n' : '\n';
  const lines = md.split(/\r?\n/);
  const i = lines.findIndex((l) => UNRELEASED_RE.test(l.trimEnd()));
  lines.splice(i, 1, ...UNRELEASED_TEMPLATE, `## [${version}] — ${date}`);
  return lines.join(eol);
}

/** Découpe le texte d'une puce en morceaux normaux et en gras (`**…**`). */
export function splitBold(text: string): { text: string; bold: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part) => (part.startsWith('**') && part.endsWith('**') ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false }));
}
