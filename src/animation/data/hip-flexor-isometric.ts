import { defineAnimation } from '../schema';

/**
 * Maintien isométrique genou haut (psoas) — « Décollez un genou de quelques centimètres, cuisse au-dessus de l’horizontale,
 * et tenez la position sans pencher le buste en arrière. Reposez doucement. » Assis au bord d'une chaise, dos droit
 * sans s'appuyer au dossier. Niveau 2 : la main appuie sur le genou. Niveaux 3 et 4 : debout, genou au-dessus de la hanche.
 * Jambe proche = jambe qui tient.
 */
export default defineAnimation({
  exerciseId: 'hip-flexor-isometric',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'seat', y: 54.5 },
  still: 1,
  keyframes: [
    { pose: { hip: 90, knee: 90, ankle: 0, hipF: 88, kneeF: 95, ankleF: 7, shoulder: 10, elbow: 30 }, dur: 0.8, phase: 'concentrique', say: 'lift' },
    // Genou décollé de quelques centimètres.
    { pose: { hipN: 104, kneeN: 95 }, dur: 3, phase: 'isométrique' },
    { pose: {}, dur: 1, phase: 'retour' },
  ],
  contacts: [{ point: 'heelF' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }],
  overrides: [
    { levels: [1, 2], props: [{ kind: 'chair', at: [-14, 0], size: [40, 41] }] },
    // Niveau 2 : la main pousse le genou vers le bas pendant que la cuisse résiste.
    { levels: [2], pose: { shoulderN: 32, elbowN: 40 } },
    // Niveaux 3 et 4 : debout sur une jambe, l'autre genou au-dessus de la hanche.
    {
      levels: [3, 4],
      anchor: { point: 'midF' },
      keyframes: [
        { pose: { hip: 2, knee: 4, ankle: 2, shoulder: 4, elbow: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipN: 105, kneeN: 100, ankleN: 5 }, dur: 3, phase: 'isométrique' },
        { pose: {}, dur: 1, phase: 'retour' },
      ],
      contacts: [{ point: 'heelF' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }, { point: 'toeN', from: 0, to: 0 }],
    },
    { levels: [4], props: [{ kind: 'band', from: { seg: 'footN', u: 0.5, v: 1 }, to: { seg: 'footF', u: 0.5, v: -1 } }] },
  ],
});
