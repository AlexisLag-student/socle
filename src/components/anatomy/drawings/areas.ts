/**
 * Zones cliquables de la carte du corps (choix des douleurs), dans les coordonnées des silhouettes.
 * Les formes sont reflétées : toucher le côté gauche ou droit sélectionne la même zone.
 */
import type { AreaShape } from './types';

export const frontAreas: AreaShape[] = [
  { id: 'shoulders-trapezius', shapes: [{ d: 'M90 56 C82 60 68 61 60 64 C56 70 60 76 68 76 C78 72 88 66 96 64 Z' }] },
  { id: 'hands-wrists', shapes: [{ d: 'M38 198 L53 198 L54 238 C49 244 40 243 36 236 Z' }] },
  { id: 'hip-anterior', shapes: [{ d: 'M76 170 C77 180 80 190 86 197 L92 192 C88 184 84 176 82 168 Z' }] },
  { id: 'hip-lateral', shapes: [{ d: 'M63 176 C61 186 62 198 65 208 L72 208 C70 196 70 186 71 176 Z' }] },
  { id: 'groin', shapes: [{ d: 'M87 197 C89 205 93 212 99 216 L99 201 C95 200 91 198 87 197 Z' }] },
  { id: 'knee-lateral', shapes: [{ d: 'M67 276 L75 276 L76 302 L70 302 Z' }] },
  { id: 'knee-anterior', shapes: [{ d: 'M76 280 C76 274 92 274 92 280 L90 309 C87 313 81 313 78 309 Z' }] },
  { id: 'knee-medial', shapes: [{ d: 'M93 278 L99 278 L98 304 L93 304 Z' }] },
  { id: 'shin-medial', shapes: [{ d: 'M87 318 L95 318 C95 340 94 362 92 386 L86 386 C87 362 87 340 87 318 Z' }] },
  { id: 'ankle-lateral', shapes: [{ d: 'M71 389 C71 386 79 386 79 389 C80 395 79 400 75 401 C71 400 70 395 71 389 Z' }] },
  { id: 'ankle-medial', shapes: [{ d: 'M89 391 C89 388 97 388 97 391 C98 396 97 401 93 402 C89 401 88 396 89 391 Z' }] },
  { id: 'forefoot', shapes: [{ d: 'M72 412 C78 408 90 408 96 412 L96 428 C90 431 74 431 69 426 Z' }] },
];

export const backAreas: AreaShape[] = [
  { id: 'neck', shapes: [{ d: 'M90 40 L100 40 L100 62 L88 62 Z' }] },
  { id: 'shoulders-trapezius', shapes: [{ d: 'M88 60 C80 64 68 64 58 68 C58 76 64 80 72 80 C82 78 90 74 100 72 L100 62 Z' }] },
  { id: 'lower-back', shapes: [{ d: 'M86 146 L100 146 L100 182 L84 180 C84 170 85 158 86 146 Z' }] },
  { id: 'buttock', shapes: [{ d: 'M70 186 C65 198 67 210 75 216 L97 216 L97 184 C88 181 78 181 70 186 Z' }] },
  { id: 'ischial', shapes: [{ d: 'M83 214 C83 222 90 228 98 228 L98 212 Z' }] },
  { id: 'thigh-posterior', shapes: [{ d: 'M72 234 C70 252 71 272 75 288 L97 290 C98 272 98 252 98 234 Z' }] },
  { id: 'calf', shapes: [{ d: 'M74 300 C72 320 74 342 78 362 L96 362 C98 340 98 318 94 300 Z' }] },
  { id: 'achilles', shapes: [{ d: 'M83 382 L93 382 L92 408 L84 408 Z' }] },
  { id: 'heel-plantar', shapes: [{ d: 'M78 410 C80 420 84 429 88 429 C92 429 95 420 95 410 Z' }] },
];
