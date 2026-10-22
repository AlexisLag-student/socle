/**
 * Point d'entrée du contenu. Chaque nouveau fichier de contenu doit être importé ici
 * (voir les skills add-exercise et add-pathology).
 */
import type { ContentBundle } from './validate';
import { muscles } from './muscles';
import { bodyAreas, equipment } from './equipment';

// --- Références ---------------------------------------------------------------
import refsFootAnkle from './references/foot-ankle';

// --- Exercices ----------------------------------------------------------------
import exCalf from './exercises/calf';

// --- Pathologies --------------------------------------------------------------
import achillesMidportion from './pathologies/achilles-midportion';

/** Version du contenu, à incrémenter à chaque publication de contenu (AAAA.MM.n). */
export const CONTENT_VERSION = '2026.10.0';

export const content: ContentBundle = {
  muscles,
  equipment,
  bodyAreas,
  references: [...refsFootAnkle],
  exercises: [...exCalf],
  pathologies: [achillesMidportion],
};

export const exerciseById = new Map(content.exercises.map((e) => [e.id, e]));
export const pathologyById = new Map(content.pathologies.map((p) => [p.id, p]));
export const referenceById = new Map(content.references.map((r) => [r.id, r]));
export const muscleById = new Map(content.muscles.map((m) => [m.id, m]));
