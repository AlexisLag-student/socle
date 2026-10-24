import { describe, expect, it } from 'vitest';
import { content } from '@/content/index';
import { equipmentSet, levelVariants, shownVariant } from './availability';

describe('variante montrée pour un niveau (animation de la fiche et de la bibliothèque)', () => {
  it('un niveau lesté ne propose que des variantes avec charge', () => {
    for (const ex of content.exercises)
      for (const lv of ex.levels.filter((l) => l.loaded)) {
        const ok = levelVariants(ex, lv);
        if (ex.variants.some((v) => v.loadable)) expect(ok.every((v) => v.loadable), `${ex.id} niveau ${lv.level}`).toBe(true);
        expect(ok.length).toBeGreaterThan(0);
      }
  });

  it('sans préférence : poids du corps pour un niveau sans charge, sinon le matériel de l’utilisateur', () => {
    for (const ex of content.exercises)
      for (const lv of ex.levels) {
        const v = shownVariant(ex, lv, undefined, equipmentSet(['dumbbells']));
        expect(levelVariants(ex, lv)).toContain(v);
        if (!lv.loaded && ex.variants.some((x) => x.equipment.length === 0)) expect(v.equipment, `${ex.id} niveau ${lv.level}`).toEqual([]);
      }
  });

  it('la variante choisie est gardée si elle convient au niveau, ignorée sinon', () => {
    const ex = content.exercises.find((e) => e.levels.some((l) => l.loaded) && e.variants.some((v) => !v.loadable) && e.variants.filter((v) => v.loadable).length > 1)!;
    const loaded = ex.levels.find((l) => l.loaded)!;
    const loadable = ex.variants.filter((v) => v.loadable);
    expect(shownVariant(ex, loaded, loadable[1]!.id).id).toBe(loadable[1]!.id);
    const bodyweight = ex.variants.find((v) => !v.loadable)!;
    expect(shownVariant(ex, loaded, bodyweight.id).loadable).toBe(true);
  });
});
