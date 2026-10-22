/**
 * Requêtes sur le contenu pour l'interface : filtres de la bibliothèque, recherche, liens croisés.
 */
import type { BodyAreaId, BodyZone, EquipmentId, EvidenceLevel, MuscleId, Objective, Sport } from '@/domain/ids';
import type { Exercise, Pathology, Reference } from '@/domain/schema';
import type { ContentBundle } from './validate';

/** Minuscules, sans accents ni ponctuation : pour une recherche tolérante. */
export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export interface ExerciseFilters {
  q?: string;
  sport?: Sport;
  zone?: BodyZone;
  muscle?: MuscleId;
  pathology?: string;
  objective?: Objective;
  equipment?: EquipmentId;
  evidence?: EvidenceLevel;
}

export function exercisesForPathology(c: ContentBundle, pathologyId: string): Set<string> {
  const p = c.pathologies.find((x) => x.id === pathologyId);
  return new Set(p?.phases.flatMap((ph) => ph.exercises.map((e) => e.exerciseId)) ?? []);
}

export function pathologiesForExercise(c: ContentBundle, exerciseId: string): Pathology[] {
  return c.pathologies.filter((p) => p.phases.some((ph) => ph.exercises.some((e) => e.exerciseId === exerciseId)));
}

function searchText(e: Exercise, muscleNames: Map<string, string>): string {
  return normalize(
    [
      e.name.fr,
      e.name.en,
      e.id,
      ...e.variants.flatMap((v) => [v.name.fr, v.name.en]),
      ...[...e.muscles.primary, ...e.muscles.secondary].map((m) => muscleNames.get(m) ?? m),
    ].join(' '),
  );
}

export function filterExercises(c: ContentBundle, f: ExerciseFilters): Exercise[] {
  const muscleNames = new Map(c.muscles.map((m) => [m.id as string, `${m.name.fr} ${m.name.en}`]));
  const terms = f.q ? normalize(f.q).split(' ').filter(Boolean) : [];
  const forPath = f.pathology ? exercisesForPathology(c, f.pathology) : undefined;
  return c.exercises.filter((e) => {
    if (f.sport && !e.sports.includes(f.sport)) return false;
    if (f.zone && !e.zones.includes(f.zone)) return false;
    if (f.muscle && !e.muscles.primary.includes(f.muscle) && !e.muscles.secondary.includes(f.muscle)) return false;
    if (forPath && !forPath.has(e.id)) return false;
    if (f.objective && !e.objectives.includes(f.objective)) return false;
    if (f.equipment && !e.variants.some((v) => (f.equipment === 'bodyweight' ? v.equipment.length === 0 : v.equipment.includes(f.equipment!))))
      return false;
    if (f.evidence && e.evidence.level !== f.evidence) return false;
    if (terms.length) {
      const text = searchText(e, muscleNames);
      if (!terms.every((t) => text.includes(t))) return false;
    }
    return true;
  });
}

export function pathologiesForArea(c: ContentBundle, area: BodyAreaId): Pathology[] {
  return c.pathologies.filter((p) => p.bodyAreas.includes(area));
}

/** Où une référence est citée (exercices et pathologies). */
export function citedBy(c: ContentBundle, refId: string): { exercises: Exercise[]; pathologies: Pathology[] } {
  return {
    exercises: c.exercises.filter((e) => e.evidence.citations.some((x) => x.refId === refId)),
    pathologies: c.pathologies.filter((p) => p.evidence.citations.some((x) => x.refId === refId)),
  };
}

/** Références liées à une pathologie : celles de la fiche et celles des exercices de ses phases. */
export function referencesForPathology(c: ContentBundle, pathologyId: string): Reference[] {
  const p = c.pathologies.find((x) => x.id === pathologyId);
  if (!p) return [];
  const exIds = exercisesForPathology(c, pathologyId);
  const ids = new Set([
    ...p.evidence.citations.map((x) => x.refId),
    ...c.exercises.filter((e) => exIds.has(e.id)).flatMap((e) => e.evidence.citations.map((x) => x.refId)),
  ]);
  return c.references.filter((r) => ids.has(r.id));
}

export function referenceLinks(r: Reference): { doi?: string; pubmed?: string; url?: string } {
  return {
    ...(r.doi ? { doi: `https://doi.org/${r.doi}` } : {}),
    ...(r.pmid ? { pubmed: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` } : {}),
    ...(r.url ? { url: r.url } : {}),
  };
}

export function formatAuthors(authors: string[], max = 3): string {
  return authors.length > max ? `${authors.slice(0, max).join(', ')} et al.` : authors.join(', ');
}
