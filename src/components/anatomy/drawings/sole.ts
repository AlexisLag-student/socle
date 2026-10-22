/**
 * Plante du pied droit vue de dessous (orteils en haut, gros orteil à gauche) — dessin original.
 * Grille 120 × 240. Formes non reflétées.
 */
import type { Drawing } from './types';

const c = (d: string) => ({ d, mirror: false });

export const sole: Drawing = {
  id: 'sole',
  viewBox: [0, 0, 120, 240],
  axis: 60,
  base: [
    c('M62 228 C46 228 37 216 37 198 C37 176 41 160 39 140 C37 118 31 96 33 72 C35 50 46 40 62 39 C80 38 91 46 93 64 C95 86 90 110 86 138 C84 160 86 180 86 200 C86 218 77 228 62 228 Z'),
    // orteils
    c('M40 14 C47 12 53 18 53 28 C53 37 48 42 42 41 C36 40 33 34 33 26 C33 19 35 15 40 14 Z'),
    c('M59 18 C64 17 67 21 67 28 C67 34 64 38 60 38 C56 38 54 34 54 28 C54 22 56 18 59 18 Z'),
    c('M72 22 C76 21 79 25 79 31 C79 36 76 40 72 40 C69 40 67 36 67 31 C67 26 69 22 72 22 Z'),
    c('M83 28 C86 27 89 31 89 36 C89 40 86 43 83 43 C80 43 79 40 79 36 C79 31 80 28 83 28 Z'),
    c('M92 36 C95 36 97 39 97 43 C97 47 95 49 92 49 C90 49 88 47 88 43 C88 39 90 36 92 36 Z'),
  ],
  details: [
    // têtes métatarsiennes
    c('M38 70 C50 62 74 60 92 66'),
    // talon
    c('M44 206 C52 214 72 214 80 206'),
  ],
  muscles: [
    { id: 'abductor-hallucis', shapes: [c('M40 204 C38 176 41 146 39 118 C38 98 37 82 39 70 L46 70 C48 94 50 132 51 170 C51 190 49 204 45 210 Z')] },
    { id: 'abductor-digiti-minimi', shapes: [c('M79 206 C81 182 84 152 86 128 C87 112 89 96 90 78 L92 80 C92 100 89 120 88 140 C87 160 87 184 85 206 Z')] },
    { id: 'flexor-digitorum-brevis', shapes: [c('M54 196 C52 166 52 128 54 88 L74 86 C74 126 70 166 68 196 Z')] },
    { id: 'quadratus-plantae', shapes: [c('M52 192 C51 178 53 166 57 156 L69 156 C72 166 72 180 70 192 Z')] },
    { id: 'plantar-fascia', shapes: [c('M57 214 C57 180 52 130 46 74 L52 72 C56 126 60 176 61 212 Z M63 212 C64 176 68 126 74 70 L80 72 C74 128 70 180 67 214 Z M59 214 L65 214 L66 120 L60 120 Z')] },
  ],
};
