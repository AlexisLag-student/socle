import { describe, expect, it } from 'vitest';
import fr from './locales/fr.json';
import en from './locales/en.json';

function keys(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe('fichiers de traduction', () => {
  it('le français et l’anglais ont exactement les mêmes clés', () => {
    const f = new Set(keys(fr));
    const e = new Set(keys(en));
    expect([...f].filter((k) => !e.has(k))).toEqual([]);
    expect([...e].filter((k) => !f.has(k))).toEqual([]);
  });

  it('aucune traduction vide', () => {
    const empty = (o: unknown): boolean =>
      typeof o === 'string' ? o.trim() === '' : Object.values(o as object).some(empty);
    expect(empty(fr)).toBe(false);
    expect(empty(en)).toBe(false);
  });
});
