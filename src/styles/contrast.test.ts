/**
 * Contraste des couleurs du « cahier » (WCAG 2.1), lues directement dans tokens.css :
 * - tout texte ≥ 4,5:1 sur ses fonds réels (papier, carte, surlignages), dans les deux thèmes ;
 * - et ≥ 3:1 sur une ligne Seyès principale (1 px), pour qu'une lettre qui croise la ligne reste nette.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(__dirname, 'tokens.css'), 'utf8');

function block(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`bloc introuvable : ${selector}`);
  const open = css.indexOf('{', start);
  let depth = 0;
  let end = open;
  for (; end < css.length; end++) {
    if (css[end] === '{') depth++;
    if (css[end] === '}' && --depth === 0) break;
  }
  const out: Record<string, string> = {};
  for (const m of css.slice(open + 1, end).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]!] = m[2]!.trim();
  return out;
}

const light = block(':root {');
const dark = { ...light, ...block(":root[data-theme='dark'] {") };

function value(theme: Record<string, string>, name: string, depth = 0): string {
  const v = theme[name];
  if (!v) throw new Error(`variable inconnue : ${name}`);
  const ref = /^var\((--[\w-]+)\)$/.exec(v);
  if (ref && depth < 10) return value(theme, ref[1]!, depth + 1);
  return v;
}

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

export function ratio(a: string, b: string): number {
  const [la, lb] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (la! + 0.05) / (lb! + 0.05);
}

/** Textes et fonds sur lesquels ils peuvent être posés. */
const TEXT_ON: [string, string[]][] = [
  ['--text', ['--paper', '--surface', '--ink-soft']],
  ['--text-2', ['--paper', '--surface']],
  ['--text-muted', ['--paper', '--surface', '--ink-soft']],
  ['--ink', ['--paper', '--surface', '--ink-soft']],
  ['--red', ['--paper', '--surface', '--red-faint']],
  ['--stamp-strong', ['--paper', '--surface']],
  ['--stamp-low', ['--paper', '--surface']],
  ['--on-ink', ['--ink']],
  ['--surface', ['--red']],
];

describe.each([
  ['clair', light],
  ['sombre', dark],
])('contrastes du thème %s', (_name, theme) => {
  for (const [fg, bgs] of TEXT_ON)
    for (const bg of bgs)
      it(`${fg} sur ${bg} ≥ 4,5:1`, () => {
        expect(ratio(value(theme, fg), value(theme, bg))).toBeGreaterThanOrEqual(4.5);
      });

  it.each(['--text', '--text-2', '--text-muted', '--ink', '--red', '--stamp-strong', '--stamp-low'])('%s reste net sur une ligne Seyès (≥ 3:1)', (fg) => {
    expect(ratio(value(theme, fg), value(theme, '--line-main'))).toBeGreaterThanOrEqual(3);
  });

  it('les traits d’interface (cases, bordures) se distinguent du papier (≥ 3:1)', () => {
    expect(ratio(value(theme, '--ink'), value(theme, '--paper'))).toBeGreaterThanOrEqual(3);
    expect(ratio(value(theme, '--disabled'), value(theme, '--paper'))).toBeGreaterThanOrEqual(2);
  });
});
