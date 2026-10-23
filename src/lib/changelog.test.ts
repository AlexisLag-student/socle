import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseChangelog, splitBold } from './changelog';

const pkg = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as { version: string };
const md = readFileSync(new URL('../../CHANGELOG.md', import.meta.url), 'utf8');

describe('CHANGELOG.md', () => {
  const entries = parseChangelog(md);

  it('commence par la version de package.json (une entrée à chaque nouvelle version)', () => {
    expect(entries[0]?.version).toBe(pkg.version);
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

it('repère le gras', () => {
  expect(splitBold('a **b** c')).toEqual([
    { text: 'a ', bold: false },
    { text: 'b', bold: true },
    { text: ' c', bold: false },
  ]);
});
