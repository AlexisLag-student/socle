/**
 * Invariants qu'un programme généré doit respecter (utilisés par les tests et le rapport des profils).
 */
import type { Exercise, Muscle, Pathology } from '@/domain/schema';
import { availableLevels, equipmentSet, variantAvailable } from './availability';
import { MAX_ITEMS, MIN_ITEMS, type EngineProfile, type GenerationResult } from './generate';

export interface InvariantReport {
  ok: boolean;
  issues: string[];
}

export function checkInvariants(
  profile: EngineProfile,
  result: GenerationResult,
  content: { exercises: readonly Exercise[]; pathologies: readonly Pathology[]; muscles: readonly Muscle[] },
): InvariantReport {
  const issues: string[] = [];
  const eq = equipmentSet(profile.equipment);
  const exById = new Map(content.exercises.map((e) => [e.id, e]));
  const groups = new Map(content.muscles.map((m) => [m.id as string, m.group]));
  const budget = profile.minutes * 60;
  const expectedSessions = Math.min(Math.max(profile.sessionsPerWeek, 1), 3);

  if (result.sessions.length !== expectedSessions) issues.push(`${result.sessions.length} séance(s) au lieu de ${expectedSessions}`);

  const avoid = new Set<string>();
  for (const used of result.pathologies) {
    const p = content.pathologies.find((x) => x.id === used.id);
    p?.phases.find((ph) => ph.phase === used.phase)?.avoid?.forEach((a) => avoid.add(a.exerciseId));
  }

  for (const s of result.sessions) {
    const tag = `séance ${s.key}`;
    if (s.items.length < MIN_ITEMS || s.items.length > MAX_ITEMS) issues.push(`${tag} : ${s.items.length} exercices (attendu ${MIN_ITEMS}–${MAX_ITEMS})`);
    if (s.estimatedSec > budget * 1.1) issues.push(`${tag} : ${Math.round(s.estimatedSec / 60)} min estimées pour ${profile.minutes} min`);
    const families = new Set<string>();
    s.items.forEach((it, i) => {
      const ex = exById.get(it.exerciseId);
      if (!ex) return issues.push(`${tag} : exercice inconnu ${it.exerciseId}`);
      if (!ex.sports.some((sp) => profile.sports.includes(sp))) issues.push(`${tag} : ${ex.id} ne concerne pas le sport`);
      const v = ex.variants.find((x) => x.id === it.variantId);
      if (!v || !variantAvailable(v, eq)) issues.push(`${tag} : ${ex.id} variante ${it.variantId} incompatible avec le matériel`);
      else if (!availableLevels(ex, v, eq).includes(it.level)) issues.push(`${tag} : ${ex.id} niveau ${it.level} inaccessible`);
      if (it.maxLevel && it.level > it.maxLevel) issues.push(`${tag} : ${ex.id} niveau au-dessus du plafond de phase`);
      if (families.has(ex.family)) issues.push(`${tag} : deux exercices de la famille ${ex.family}`);
      families.add(ex.family);
      if (avoid.has(ex.id)) issues.push(`${tag} : ${ex.id} est à éviter dans la phase`);
      if (i >= 2) {
        const g = (k: number) => groups.get(exById.get(s.items[k]!.exerciseId)?.muscles.primary[0] ?? '');
        if (g(i) && g(i) === g(i - 1) && g(i) === g(i - 2)) issues.push(`${tag} : trois exercices de suite sur ${g(i)}`);
      }
    });
  }

  // Les exercices essentiels (priorité 1) réalisables des pathologies déclarées doivent être présents
  // (ou un exercice de la même famille, le moteur n'en mettant jamais deux par séance).
  for (const used of result.pathologies) {
    const p = content.pathologies.find((x) => x.id === used.id);
    const ph = p?.phases.find((x) => x.phase === used.phase);
    for (const pe of ph?.exercises.filter((e) => e.priority === 1) ?? []) {
      const ex = exById.get(pe.exerciseId);
      if (!ex || !ex.variants.some((v) => variantAvailable(v, eq))) continue;
      if (!ex.sports.some((sp) => profile.sports.includes(sp))) continue;
      // Une autre pathologie déclarée peut l'exclure (« à éviter ») : la prudence l'emporte.
      if (avoid.has(ex.id)) continue;
      // Un exercice de la même famille (variante du même geste) remplit le même rôle.
      if (!result.sessions.some((s) => s.items.some((i) => exById.get(i.exerciseId)?.family === ex.family)))
        issues.push(`${p!.id} : exercice essentiel ${ex.id} absent`);
    }
  }
  return { ok: issues.length === 0, issues };
}
