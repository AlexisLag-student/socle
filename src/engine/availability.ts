/**
 * Disponibilité d'un exercice selon le matériel : choix de la variante et niveaux accessibles.
 */
import type { EquipmentId } from '@/domain/ids';
import type { EquipmentVariant, Exercise, ProgressionLevel } from '@/domain/schema';

export type EquipmentSet = ReadonlySet<EquipmentId>;

export function equipmentSet(list: readonly EquipmentId[]): EquipmentSet {
  return new Set<EquipmentId>(['bodyweight', ...list]);
}

export function variantAvailable(v: EquipmentVariant, eq: EquipmentSet): boolean {
  return v.equipment.every((e) => eq.has(e));
}

/** Meilleure variante possible avec le matériel (rang le plus élevé), ou `undefined`. */
export function pickVariant(ex: Exercise, eq: EquipmentSet, preferredId?: string): EquipmentVariant | undefined {
  const ok = ex.variants.filter((v) => variantAvailable(v, eq));
  const preferred = preferredId ? ok.find((v) => v.id === preferredId) : undefined;
  if (preferred) return preferred;
  return [...ok].sort((a, b) => b.rank - a.rank || a.id.localeCompare(b.id))[0];
}

export function levelAvailable(l: ProgressionLevel, v: EquipmentVariant, eq: EquipmentSet): boolean {
  return (l.requires ?? []).every((e) => eq.has(e)) && (!l.loaded || v.loadable);
}

/** Numéros des niveaux accessibles avec cette variante et ce matériel, croissants. */
export function availableLevels(ex: Exercise, v: EquipmentVariant, eq: EquipmentSet): number[] {
  return ex.levels.filter((l) => levelAvailable(l, v, eq)).map((l) => l.level);
}

/** Niveau accessible le plus proche de `wanted` (on préfère descendre plutôt que monter). */
export function clampLevel(wanted: number, available: readonly number[]): number | undefined {
  if (available.length === 0) return undefined;
  const below = available.filter((l) => l <= wanted);
  if (below.length) return Math.max(...below);
  return Math.min(...available);
}
