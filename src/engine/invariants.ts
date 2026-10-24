/**
 * Invariants qu'un programme généré doit respecter (utilisés par les tests et le rapport des profils).
 */
import type { Exercise, Muscle, Pathology } from '@/domain/schema';
import { availableLevels, equipmentSet, variantAvailable } from './availability';
import { itemBounds } from './duration';
import { needsRecovery, primaryGroup, sessionTypeCount, type EngineProfile, type GenerationResult } from './generate';

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
  const expectedSessions = sessionTypeCount(profile.sessionsPerWeek);
  const { min, max } = itemBounds(profile.minutes);

  if (result.sessions.length !== expectedSessions) issues.push(`${result.sessions.length} séance(s) au lieu de ${expectedSessions}`);

  const avoid = new Set<string>();
  for (const used of result.pathologies) {
    const p = content.pathologies.find((x) => x.id === used.id);
    p?.phases.find((ph) => ph.phase === used.phase)?.avoid?.forEach((a) => avoid.add(a.exerciseId));
  }

  for (const s of result.sessions) {
    const tag = `séance ${s.key}`;
    if (s.items.length < min || s.items.length > max) issues.push(`${tag} : ${s.items.length} exercices (attendu ${min}–${max})`);
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

  // À partir de 4 séances : deux séances voisines dans la rotation (la dernière précède la première) ne partagent
  // ni un exercice qui demande de la récupération, ni le groupe musculaire principal d'un tel exercice.
  // Deux séances types ne sont jamais identiques.
  if (result.sessions.length >= 4) {
    const heavy = result.sessions.map((s) =>
      s.items
        .map((it) => ({ it, ex: exById.get(it.exerciseId) }))
        .filter((x): x is { it: (typeof s.items)[number]; ex: Exercise } => !!x.ex && needsRecovery(x.ex, x.it.dosage))
        .map(({ it, ex }) => ({ id: it.exerciseId, group: primaryGroup(ex, groups) ?? 'other' })),
    );
    result.sessions.forEach((s, k) => {
      const n = (k + 1) % result.sessions.length;
      const other = result.sessions[n]!;
      for (const h of heavy[k]!) {
        if (heavy[n]!.some((o) => o.id === h.id)) issues.push(`séances ${s.key} et ${other.key} voisines : ${h.id} deux fois de suite`);
        else if (heavy[n]!.some((o) => o.group === h.group)) issues.push(`séances ${s.key} et ${other.key} voisines : ${h.group} chargé deux fois de suite`);
      }
    });
    // Exception : une séance faite des seuls exercices des pathologies (le protocole impose son contenu).
    const varied = result.sessions.filter((s) => s.items.some((i) => i.reason.kind !== 'pathology'));
    const signature = varied.map((s) => s.items.map((i) => i.exerciseId).sort().join(','));
    if (new Set(signature).size !== signature.length) issues.push('deux séances types identiques');
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
