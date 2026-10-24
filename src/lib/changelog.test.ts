import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseChangelog, releaseChangelog, splitBold, unreleasedNotes } from './changelog';

const pkg = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as { version: string };
const md = readFileSync(new URL('../../CHANGELOG.md', import.meta.url), 'utf8');

describe('CHANGELOG.md', () => {
  const entries = parseChangelog(md);

  it('commence par la version de package.json (une entrée à chaque nouvelle version)', () => {
    expect(entries[0]?.version).toBe(pkg.version);
  });

  it('a une section « À venir » en tête, où s’ajoutent les évolutions pas encore publiées', () => {
    expect(unreleasedNotes(md)).toBeDefined();
    expect(md.indexOf('## [À venir]')).toBeLessThan(md.indexOf(`## [${pkg.version}]`));
  });

  it('chaque entrée est datée, en français et en anglais', () => {
    for (const e of entries) {
      expect(e.date, e.version).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.notes.fr.length, `${e.version} fr`).toBeGreaterThan(0);
      expect(e.notes.en.length, `${e.version} en`).toBeGreaterThan(0);
    }
  });

  it('versions uniques, de la plus récente à la plus ancienne', () => {
    const key = (v: string) => v.split('.').map(Number).reduce((a, n) => a * 1000 + n, 0);
    const keys = entries.map((e) => key(e.version));
    expect(new Set(keys).size).toBe(keys.length);
    expect([...keys].sort((a, b) => b - a)).toEqual(keys);
  });
});

it('lit titres, langues et puces sur plusieurs lignes', () => {
  const entries = parseChangelog(
    ['# Titre', '', '## [1.2.0] — 2026-01-02', '### Français', '- un', '  suite', '### English', '- one', '## [1.1.0] - 2025-12-01', '### English', '- two'].join('\n'),
  );
  expect(entries).toEqual([
    { version: '1.2.0', date: '2026-01-02', notes: { fr: ['un suite'], en: ['one'] } },
    { version: '1.1.0', date: '2025-12-01', notes: { fr: [], en: ['two'] } },
  ]);
});

describe('section « À venir »', () => {
  const md = ['# Titre', '', '## [À venir]', '', '### Français', '', '- nouveau', '', '### English', '', '- new', '', '## [1.2.0] — 2026-01-02', '### Français', '- un', '### English', '- one'].join('\n');

  it('n’est pas une version affichée', () => {
    expect(parseChangelog(md).map((e) => e.version)).toEqual(['1.2.0']);
    expect(unreleasedNotes(md)).toEqual({ fr: ['nouveau'], en: ['new'] });
  });

  it('devient une entrée datée, avec une nouvelle section vide au-dessus', () => {
    const out = releaseChangelog(md, '1.3.0', '2026-02-03');
    expect(parseChangelog(out)).toEqual([
      { version: '1.3.0', date: '2026-02-03', notes: { fr: ['nouveau'], en: ['new'] } },
      { version: '1.2.0', date: '2026-01-02', notes: { fr: ['un'], en: ['one'] } },
    ]);
    expect(unreleasedNotes(out)).toEqual({ fr: [], en: [] });
    expect(out.startsWith('# Titre\n\n## [À venir]\n\n### Français\n\n### English\n\n## [1.3.0] — 2026-02-03\n')).toBe(true);
  });

  it('garde les fins de ligne Windows', () => {
    expect(releaseChangelog(md.replaceAll('\n', '\r\n'), '1.3.0', '2026-02-03')).not.toMatch(/[^\r]\n/);
  });

  it('refuse une section absente ou incomplète', () => {
    expect(() => releaseChangelog('## [1.2.0] — 2026-01-02', '1.3.0', '2026-02-03')).toThrow();
    expect(() => releaseChangelog(md.replace('- new', ''), '1.3.0', '2026-02-03')).toThrow(/anglais/);
  });
});

it('repère le gras', () => {
  expect(splitBold('a **b** c')).toEqual([
    { text: 'a ', bold: false },
    { text: 'b', bold: true },
    { text: ' c', bold: false },
  ]);
});
