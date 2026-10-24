import { defineAnimation } from '../schema';

/**
 * Montée de genou (fléchisseurs de hanche) — « Montez un genou au-dessus de la hauteur de la hanche sans pencher le buste
 * en arrière, tenez puis redescendez lentement. » Debout, buste droit ; jambe proche = jambe qui monte, l'autre en appui.
 * Niveau 2 : allongé sur le dos, élastique autour des deux pieds. Niveaux 3 à 5 : élastique ou poulie à la cheville.
 */
export default defineAnimation({
  exerciseId: 'hip-flexor-march',
  view: 'profile',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midF' },
  still: 1,
  keyframes: [
    // Pied à plat : cheville = genou − hanche + inclinaison.
    { pose: { hip: 2, knee: 4, ankle: 2, shoulder: 4, elbow: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
    // Genou au-dessus de la hanche.
    { pose: { hipN: 108, kneeN: 100, ankleN: 5, shoulderN: -15, shoulderF: 25, elbow: 70 }, dur: 2, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelF' }, { point: 'toeF' }, { point: 'heelN', from: 0, to: 0 }, { point: 'toeN', from: 0, to: 0 }],
  overrides: [
    // Niveau 2 : allongé sur le dos, jambe éloignée tendue au sol, élastique autour des deux pieds.
    {
      levels: [2],
      anchor: { point: 'shoulder' },
      keyframes: [
        { pose: { tilt: -90, neck: 10, shoulder: 6, elbow: 0, hipN: -4.5, kneeN: 0, ankleN: 10, hipF: -4.5, kneeF: 0, ankleF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipN: 105, kneeN: 110, ankleN: 0 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'shoulder' }, { point: 'heelF' }, { point: 'heelN', from: 0, to: 0 }],
      props: [{ kind: 'band', from: { seg: 'footN', u: 0.6, v: -1 }, to: { seg: 'footF', u: 0.6, v: -1 } }],
    },
    // Niveau 3 : élastique sous le pied d'appui et sur l'autre pied.
    { levels: [3], props: [{ kind: 'band', from: { seg: 'footN', u: 0.5, v: 1 }, to: { seg: 'footF', u: 0.5, v: -1 } }] },
    // Niveaux 4 et 5 : poulie basse (ou élastique) derrière, sangle à la cheville.
    { levels: [4, 5], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92 }, to: { world: [-80, 6] } }] },
  ],
});
