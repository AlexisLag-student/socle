/**
 * Point d'entrée du contenu. Le contenu est organisé par zone du corps (src/content/zones/*.ts) ;
 * chaque zone importe ses propres fichiers de références, d'exercices et de pathologies.
 * Pour ajouter un fichier, l'importer dans le fichier de zone concerné (skills add-exercise / add-pathology).
 */
import type { ContentBundle } from './validate';
import type { ZoneBundle } from './zone';
import { muscles } from './muscles';
import { bodyAreas, equipment } from './equipment';
import footAnkle from './zones/foot-ankle';
import knee from './zones/knee';
import hip from './zones/hip';
import thigh from './zones/thigh';
import trunk from './zones/trunk';
import cycling from './zones/cycling';
import performance from './zones/performance';

/** Version du contenu, à incrémenter à chaque publication de contenu (AAAA.MM.n). */
export const CONTENT_VERSION = '2026.10.0';

const zones: ZoneBundle[] = [footAnkle, knee, hip, thigh, trunk, cycling, performance];

export const content: ContentBundle = {
  muscles,
  equipment,
  bodyAreas,
  references: zones.flatMap((z) => z.references),
  exercises: zones.flatMap((z) => z.exercises),
  pathologies: zones.flatMap((z) => z.pathologies),
};

export const exerciseById = new Map(content.exercises.map((e) => [e.id, e]));
export const pathologyById = new Map(content.pathologies.map((p) => [p.id, p]));
export const referenceById = new Map(content.references.map((r) => [r.id, r]));
export const muscleById = new Map(content.muscles.map((m) => [m.id, m]));
