import { describe, expect, it } from 'vitest';
import { content } from '@/content/index';
import { stampAngle } from './stamp';

describe('inclinaison des tampons', () => {
  it('est stable pour un même exercice et reste entre -8° et +5°, jamais à plat', () => {
    for (const ex of content.exercises) {
      const a = stampAngle(ex.id);
      expect(stampAngle(ex.id)).toBe(a);
      expect(a).toBeGreaterThanOrEqual(-8);
      expect(a).toBeLessThanOrEqual(5);
      expect(Math.abs(a)).toBeGreaterThanOrEqual(2);
    }
  });

  it('varie d’un exercice à l’autre', () => {
    expect(new Set(content.exercises.map((e) => stampAngle(e.id))).size).toBeGreaterThan(20);
  });
});
