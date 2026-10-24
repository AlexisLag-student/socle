import { defineAnimation } from '../schema';

/**
 * Gainage latéral avec abduction de hanche — « Décollez le bassin pour former une ligne droite, puis montez la jambe du dessus
 * de 20 à 30 cm et redescendez-la lentement, sans laisser tomber le bassin. » Vue de face (comme le gainage latéral),
 * appui sur l'avant-bras proche, coude sous l'épaule, corps aligné. Niveau 1 : sur le genou du dessous.
 */
export default defineAnimation({
  exerciseId: 'side-plank-hip-abduction',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'elbowN' },
  still: 1,
  keyframes: [
    { pose: { tilt: 73, trunk: 0, hipN: 0, hipF: 0, shoulderN: 73, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
    { pose: { hipF: 22 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'elbowN' }, { point: 'toeN' }],
  overrides: [
    // Niveau 1 : sur le genou du dessous (jambe du dessous fléchie vers l'arrière), jambe du dessus tendue.
    {
      levels: [1],
      keyframes: [
        { pose: { tilt: 64, trunk: 0, hipN: 0, hipF: 0, fs_shankN: 0.18, fs_footN: 0.6, shoulderN: 64, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
        { pose: { hipF: 24 }, dur: 1, phase: 'pause' },
        { pose: {}, dur: 2, phase: 'excentrique' },
      ],
      contacts: [{ point: 'elbowN' }, { point: 'kneeN' }],
    },
    // Niveau 2 : abductions courtes.
    { levels: [2], keyframes: [
      { pose: { tilt: 73, trunk: 0, hipN: 0, hipF: 0, shoulderN: 73, elbowN: 90, fs_forearmN: 0.35, fs_handN: 0.4, shoulderF: 4, elbowF: 10 }, dur: 1, phase: 'concentrique', say: 'lift' },
      { pose: { hipF: 12 }, dur: 1, phase: 'pause' },
      { pose: {}, dur: 2, phase: 'excentrique' },
    ] },
    // Niveau 4 : mini-bande autour des chevilles.
    { levels: [4], props: [{ kind: 'band', from: { seg: 'shankF', u: 0.9 }, to: { seg: 'shankN', u: 0.9 } }] },
  ],
});
