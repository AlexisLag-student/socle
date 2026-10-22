/**
 * Ordonnancement d'une séance : puissance → force → accessoires → tronc / contrôle → mobilité,
 * sans trois exercices de suite sur le même groupe musculaire, en alternant haut/bas du corps quand c'est possible.
 */
import type { MuscleGroup } from '@/domain/ids';
import type { Exercise } from '@/domain/schema';
import type { ProgramItem } from '@/domain/user';

/** Rang d'ordre dans la séance (plus petit = plus tôt). */
export function sessionCategory(ex: Exercise): number {
  const q = new Set(ex.qualities);
  if (q.has('power')) return 0;
  if (q.size === 1 && q.has('mobility')) return 4;
  if (ex.half === 'trunk' || (!q.has('strength') && (q.has('control') || q.has('isometric')))) return 3;
  if (q.has('strength') && (ex.objectives.includes('performance') || q.has('tendon-stiffness'))) return 1;
  return 2;
}

export function orderSession(
  items: readonly ProgramItem[],
  exById: ReadonlyMap<string, Exercise>,
  muscleGroups: ReadonlyMap<string, MuscleGroup>,
): ProgramItem[] {
  const info = items.map((item, index) => {
    const ex = exById.get(item.exerciseId)!;
    return { item, index, cat: sessionCategory(ex), half: ex.half, group: muscleGroups.get(ex.muscles.primary[0]!) ?? 'other' };
  });
  const remaining = [...info].sort((a, b) => a.cat - b.cat || a.index - b.index);
  const out: typeof info = [];

  while (remaining.length) {
    const last = out[out.length - 1];
    const prev = out[out.length - 2];
    const tripled = (x: (typeof info)[number]) => !!last && !!prev && last.group === x.group && prev.group === x.group;
    const minCat = remaining[0]!.cat;
    const sameCat = remaining.filter((x) => x.cat === minCat);
    const pick =
      // même catégorie, autre moitié du corps et pas de triplé
      sameCat.find((x) => !tripled(x) && (!last || x.half !== last.half || sameCat.every((y) => y.half === last.half))) ??
      sameCat.find((x) => !tripled(x)) ??
      remaining.find((x) => !tripled(x)) ??
      remaining[0]!;
    out.push(pick);
    remaining.splice(remaining.indexOf(pick), 1);
  }
  return out.map((x) => x.item);
}
