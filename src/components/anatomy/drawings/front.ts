/**
 * Silhouette de face — dessin original simplifié (grille 200 × 440, axe x = 100).
 * Les formes sont dessinées sur la moitié gauche de l'image (côté droit du corps) puis reflétées.
 */
import type { Drawing } from './types';

export const front: Drawing = {
  id: 'front',
  viewBox: [0, 0, 200, 440],
  axis: 100,
  base: [
    { d: 'M100 8 C109 8 115 16 115 27 C115 39 109 47 100 47 C91 47 85 39 85 27 C85 16 91 8 100 8 Z', mirror: false },
    { d: 'M92 40 L108 40 L110 60 L90 60 Z', mirror: false },
    // tronc
    { d: 'M100 56 L92 57 C82 60 68 60 60 64 C55 72 57 86 61 98 C64 114 66 132 67 148 C66 160 65 172 66 184 C67 196 69 204 73 210 L100 214 Z' },
    // bras
    { d: 'M60 64 C52 66 47 76 47 90 C47 108 48 126 49 146 L60 148 C61 130 62 112 62 96 C62 84 62 72 60 64 Z' },
    { d: 'M49 146 C45 164 42 186 41 206 L50 208 C53 190 57 168 60 148 Z' },
    { d: 'M41 206 C36 214 35 228 39 238 C43 242 50 241 52 234 C53 224 52 214 50 208 Z' },
    // jambe
    { d: 'M66 184 C64 210 64 250 70 290 L96 292 C97 262 98 236 99 214 L73 210 Z' },
    { d: 'M70 290 C68 310 69 336 72 360 C73 376 74 390 76 400 L92 400 C93 388 96 370 97 350 C98 330 97 310 96 292 Z' },
    { d: 'M76 400 C74 410 72 418 70 424 C72 430 92 430 96 426 C95 418 93 408 92 400 Z' },
  ],
  details: [
    // rotule
    { d: 'M84 280 C89 280 91 284 91 288 C91 293 88 296 84 296 C80 296 77 293 77 288 C77 284 80 280 84 280 Z' },
    // nombril
    { d: 'M100 150 C101 150 101 152 100 152 C99 152 99 150 100 150 Z', mirror: false },
    // malléoles
    { d: 'M93 394 C95 394 96 397 94 399' },
    { d: 'M75 392 C73 393 73 396 75 398' },
  ],
  muscles: [
    // --- cou / épaules ---
    { id: 'sternocleidomastoid', shapes: [{ d: 'M96 42 C95 49 93 55 91 61 L95 62 C97 56 98 49 98 42 Z' }] },
    { id: 'deep-neck-flexors', shapes: [{ d: 'M97 44 L99 44 L99 58 L97 58 Z' }] },
    { id: 'trapezius-upper', shapes: [{ d: 'M90 54 C84 59 74 61 64 64 L72 67 C80 65 88 63 92 60 Z' }] },
    { id: 'deltoid-anterior', shapes: [{ d: 'M66 64 C60 66 56 72 55 82 C55 89 56 95 58 99 C62 91 66 81 71 72 C71 68 70 65 66 64 Z' }] },
    { id: 'deltoid-lateral', shapes: [{ d: 'M60 65 C53 67 49 75 48 85 C48 93 50 99 53 103 L56 100 C54 94 53 87 54 80 C55 74 57 70 61 67 Z' }] },
    { id: 'pectoralis-major', shapes: [{ d: 'M98 66 L73 68 C67 74 63 84 62 94 C70 102 84 104 98 100 Z' }] },
    { id: 'serratus-anterior', shapes: [{ d: 'M64 101 C62 108 63 116 66 122 L71 120 C69 114 69 108 70 102 Z' }] },
    { id: 'rotator-cuff', shapes: [{ d: 'M70 70 C66 72 63 76 62 80 C64 82 67 82 70 80 C72 77 72 73 70 70 Z' }] },
    // --- bras ---
    { id: 'biceps-brachii', shapes: [{ d: 'M56 102 C52 112 51 124 51 136 C53 142 57 144 59 140 C61 128 61 114 60 104 Z' }] },
    { id: 'triceps-brachii', shapes: [{ d: 'M50 104 C48 116 48 128 49 140 L51 140 C51 128 52 116 53 106 Z' }] },
    { id: 'forearm-flexors', shapes: [{ d: 'M53 152 C50 166 47 182 46 198 L50 202 C53 186 56 168 59 152 Z' }] },
    { id: 'forearm-extensors', shapes: [{ d: 'M49 150 C45 164 43 180 42 198 L46 200 C47 182 49 166 52 152 Z' }] },
    { id: 'hand-intrinsics', shapes: [{ d: 'M42 210 C39 216 39 226 41 232 C44 236 48 236 50 232 C51 224 50 216 49 210 Z' }] },
    // --- tronc ---
    { id: 'rectus-abdominis', shapes: [{ d: 'M99 104 L88 104 C87 120 87 140 88 162 C90 172 94 180 99 184 Z' }] },
    { id: 'external-oblique', shapes: [{ d: 'M86 106 C77 108 71 116 70 124 C69 138 70 150 74 162 C78 166 83 168 86 166 C85 146 85 124 86 106 Z' }] },
    { id: 'internal-oblique', shapes: [{ d: 'M84 128 C79 134 77 144 78 156 C80 160 83 160 85 158 C84 148 84 138 84 128 Z' }] },
    { id: 'transversus-abdominis', shapes: [{ d: 'M86 140 C80 146 76 156 77 166 C84 172 92 176 99 178 L99 140 Z' }] },
    // --- hanche ---
    { id: 'iliopsoas', shapes: [{ d: 'M92 156 C88 168 86 184 88 200 L93 203 C95 190 96 172 96 158 Z' }] },
    { id: 'glute-med', shapes: [{ d: 'M70 168 C67 172 66 178 66 184 L71 186 C71 180 72 174 74 170 Z' }] },
    { id: 'tensor-fasciae-latae', shapes: [{ d: 'M72 172 C69 182 68 194 70 204 L76 206 C76 194 76 182 76 172 Z' }] },
    // --- cuisse ---
    { id: 'sartorius', shapes: [{ d: 'M75 168 L79 168 C85 200 92 240 97 278 L93 284 C87 246 81 204 75 168 Z' }] },
    { id: 'rectus-femoris', shapes: [{ d: 'M81 202 C77 222 77 250 80 272 L88 274 C91 250 91 224 88 202 Z' }] },
    { id: 'vastus-intermedius', shapes: [{ d: 'M82 216 C80 234 80 252 82 266 L87 266 C89 252 89 234 87 216 Z' }] },
    { id: 'vastus-lateralis', shapes: [{ d: 'M71 206 C65 228 65 256 71 280 L79 280 C76 256 76 228 80 208 Z' }] },
    { id: 'vastus-medialis', shapes: [{ d: 'M92 246 C88 255 87 268 89 280 L96 282 C98 272 97 258 92 246 Z' }] },
    { id: 'adductor-longus', shapes: [{ d: 'M97 202 C94 212 91 224 89 238 L93 242 C96 228 98 214 99 204 Z' }] },
    { id: 'gracilis', shapes: [{ d: 'M99 214 C99 236 98 258 97 278 L95 278 C96 258 96 236 97 214 Z' }] },
    { id: 'it-band', shapes: [{ d: 'M67 208 C64 232 65 260 68 288 L71 288 C69 260 68 232 70 208 Z' }] },
    { id: 'patellar-tendon', shapes: [{ d: 'M82 296 L87 296 L87 310 L82 310 Z' }] },
    // --- jambe ---
    { id: 'tibialis-anterior', shapes: [{ d: 'M79 312 C77 330 77 352 79 380 L83 380 C84 352 85 330 85 312 Z' }] },
    { id: 'extensor-digitorum-longus', shapes: [{ d: 'M75 316 C73 334 73 356 75 382 L78 382 C77 356 77 334 78 316 Z' }] },
    { id: 'fibularis-longus', shapes: [{ d: 'M71 312 C69 330 69 348 71 366 L74 366 C73 348 73 330 74 312 Z' }] },
    { id: 'fibularis-brevis', shapes: [{ d: 'M71 366 C71 374 72 382 74 390 L76 388 C75 380 74 374 74 366 Z' }] },
    { id: 'gastrocnemius-medial', shapes: [{ d: 'M90 306 C95 320 96 336 94 352 L90 350 C91 336 90 320 88 306 Z' }] },
    { id: 'soleus', shapes: [{ d: 'M91 354 C93 364 92 376 90 386 L88 384 C89 374 89 364 89 354 Z' }] },
    { id: 'tibialis-posterior', shapes: [{ d: 'M86 330 C87 350 87 370 86 388 L84 388 C84 370 84 350 84 330 Z' }] },
    { id: 'flexor-digitorum-longus', shapes: [{ d: 'M88 340 C89 356 89 372 88 388 L87 388 C87 372 87 356 87 340 Z' }] },
  ],
};
