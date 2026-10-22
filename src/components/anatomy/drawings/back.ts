/**
 * Silhouette de dos — dessin original simplifié (grille 200 × 440, axe x = 100).
 * Même gabarit que la vue de face pour que les deux vues se superposent.
 */
import type { Drawing } from './types';
import { front } from './front';

export const back: Drawing = {
  id: 'back',
  viewBox: [0, 0, 200, 440],
  axis: 100,
  // même contour que la face, sauf le pied (vu par le talon)
  base: [
    ...front.base.slice(0, -1),
    { d: 'M76 400 C75 410 76 420 80 426 C84 430 90 430 93 426 C95 418 94 408 92 400 Z' },
  ],
  details: [
    // colonne
    { d: 'M100 60 L100 200', mirror: false },
    // creux poplité
    { d: 'M78 292 C82 295 88 295 92 292' },
  ],
  muscles: [
    // --- cou / épaules ---
    { id: 'neck-extensors', shapes: [{ d: 'M98 42 L92 42 C91 48 90 54 90 60 L98 60 Z' }] },
    { id: 'levator-scapulae', shapes: [{ d: 'M93 46 C88 52 82 58 78 64 L81 66 C86 60 91 54 95 48 Z' }] },
    { id: 'trapezius-upper', shapes: [{ d: 'M99 46 C95 54 86 60 64 64 L72 70 C84 70 94 68 99 66 Z' }] },
    { id: 'trapezius-middle', shapes: [{ d: 'M99 67 C88 71 79 72 71 74 C75 81 87 86 99 88 Z' }] },
    { id: 'trapezius-lower', shapes: [{ d: 'M99 89 C93 91 87 94 85 100 C90 116 95 128 99 138 Z' }] },
    { id: 'rhomboids', shapes: [{ d: 'M98 72 C92 74 87 78 85 84 C87 92 91 100 96 106 L98 106 Z' }] },
    { id: 'rotator-cuff', shapes: [{ d: 'M81 80 C73 82 67 88 67 96 C73 100 81 100 86 96 C86 90 85 84 81 80 Z' }] },
    { id: 'deltoid-posterior', shapes: [{ d: 'M65 64 C58 68 55 76 55 86 C59 90 63 90 67 86 C70 78 70 70 65 64 Z' }] },
    { id: 'deltoid-lateral', shapes: [{ d: 'M60 65 C53 67 49 75 48 85 C48 93 50 99 53 103 L56 100 C54 94 53 87 54 80 C55 74 57 70 61 67 Z' }] },
    // --- dos ---
    { id: 'latissimus-dorsi', shapes: [{ d: 'M86 104 C76 104 68 108 66 116 C68 132 74 148 82 160 C88 150 94 141 98 139 C94 127 90 115 86 104 Z' }] },
    { id: 'erector-spinae', shapes: [{ d: 'M98 100 L91 100 C89 120 89 145 91 176 L98 178 Z' }] },
    { id: 'multifidus', shapes: [{ d: 'M99 140 L95 140 L95 182 L99 184 Z' }] },
    { id: 'quadratus-lumborum', shapes: [{ d: 'M90 146 C84 150 81 160 81 170 L89 172 C89 162 90 154 90 146 Z' }] },
    { id: 'external-oblique', shapes: [{ d: 'M70 140 C68 152 70 162 74 170 L80 168 C78 158 76 148 76 140 Z' }] },
    // --- bras ---
    { id: 'triceps-brachii', shapes: [{ d: 'M58 96 C52 106 50 120 50 138 C54 144 58 144 60 138 C62 124 62 108 60 98 Z' }] },
    { id: 'forearm-extensors', shapes: [{ d: 'M50 150 C46 166 44 182 43 200 L49 204 C52 186 55 168 57 152 Z' }] },
    { id: 'forearm-flexors', shapes: [{ d: 'M57 152 C56 168 53 186 50 204 L52 206 C56 188 59 168 60 152 Z' }] },
    // --- hanche ---
    { id: 'glute-med', shapes: [{ d: 'M74 166 C68 172 66 180 68 190 C76 186 86 180 94 176 C90 170 84 166 74 166 Z' }] },
    { id: 'glute-min', shapes: [{ d: 'M76 172 C72 176 70 182 72 188 C78 186 84 182 88 178 C84 174 80 172 76 172 Z' }] },
    { id: 'glute-max', shapes: [{ d: 'M97 178 C86 180 74 186 68 196 C66 206 68 216 74 222 C84 226 94 226 99 222 L99 180 Z' }] },
    { id: 'piriformis', shapes: [{ d: 'M96 194 C88 194 80 196 72 199 L72 203 C80 201 88 200 96 200 Z' }] },
    { id: 'deep-hip-rotators', shapes: [{ d: 'M96 205 C88 205 80 207 73 209 L73 213 C80 212 88 211 96 211 Z' }] },
    { id: 'tensor-fasciae-latae', shapes: [{ d: 'M68 192 C66 198 66 204 68 210 L71 210 C70 204 70 198 71 192 Z' }] },
    // --- cuisse ---
    { id: 'it-band', shapes: [{ d: 'M68 224 C66 248 66 270 70 292 L73 292 C71 270 71 248 72 226 Z' }] },
    { id: 'biceps-femoris', shapes: [{ d: 'M75 226 C71 246 71 268 75 288 L83 290 C83 268 83 246 85 228 Z' }] },
    { id: 'semitendinosus', shapes: [{ d: 'M86 228 C85 248 85 268 85 288 L91 290 C92 268 92 248 92 228 Z' }] },
    { id: 'adductor-magnus', shapes: [{ d: 'M98 222 C94 228 92 238 92 252 L98 254 Z' }] },
    { id: 'semimembranosus', shapes: [{ d: 'M93 256 C94 268 94 282 93 294 L97 294 C98 282 98 268 98 256 Z' }] },
    // --- jambe ---
    { id: 'gastrocnemius-lateral', shapes: [{ d: 'M77 300 C73 312 73 330 76 346 C80 350 84 348 85 342 C85 326 84 312 83 300 Z' }] },
    { id: 'gastrocnemius-medial', shapes: [{ d: 'M86 300 C86 312 85 326 86 344 C88 352 94 352 96 344 C98 328 96 312 92 300 Z' }] },
    { id: 'soleus', shapes: [{ d: 'M76 348 C76 360 78 372 82 382 L94 382 C96 372 97 360 96 348 C92 356 86 356 76 348 Z' }] },
    { id: 'fibularis-longus', shapes: [{ d: 'M73 306 C71 322 71 340 73 360 L75 360 C74 340 74 322 76 306 Z' }] },
    { id: 'fibularis-brevis', shapes: [{ d: 'M74 362 C74 372 75 382 77 392 L79 390 C78 380 77 372 76 362 Z' }] },
    { id: 'achilles-tendon', shapes: [{ d: 'M85 382 L91 382 L90 404 L86 404 Z' }] },
    { id: 'tibialis-posterior', shapes: [{ d: 'M84 312 C84 328 84 344 85 360 L89 360 C89 344 89 328 88 312 Z' }] },
    { id: 'flexor-hallucis-longus', shapes: [{ d: 'M85 352 C85 362 85 372 85 382 L88 382 C88 372 88 362 88 352 Z' }] },
    { id: 'flexor-digitorum-longus', shapes: [{ d: 'M91 348 C92 360 92 370 91 382 L93 382 C95 370 95 360 94 348 Z' }] },
  ],
};
