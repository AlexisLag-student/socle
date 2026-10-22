import type { Exercise, Pathology, Reference } from '@/domain/schema';

/** Contenu d'une zone du corps. Chaque zone a ses propres fichiers (pas de conflit d'édition). */
export interface ZoneBundle {
  references: Reference[];
  exercises: Exercise[];
  pathologies: Pathology[];
}
