import { defineAnimation } from '../schema';

/**
 * Adduction couché sur le côté — « Levez la jambe du dessous tendue de quelques centimètres à une vingtaine de centimètres,
 * marquez un temps, puis redescendez lentement. » Vue de face, couché sur le côté proche, tête sur le bras du dessous ;
 * jambe du dessus fléchie vers l'avant, genou posé devant (« ou genou sur un coussin » ; le pied posé devant le genou serait
 * caché par le bassin en vue de face). Jambe proche = jambe du dessous, qui travaille.
 */
export default defineAnimation({
  exerciseId: 'side-lying-hip-adduction',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'seat', y: 13 },
  still: 1,
  keyframes: [
    { pose: { tilt: 84, trunk: 0, hipN: -3.3, hipF: 9, fs_thighF: 0.7, fs_shankF: 0.7, shoulderN: 180, elbowN: 0, shoulderF: -8, elbowF: 10 }, dur: 2, phase: 'concentrique', say: 'lift' },
    { pose: { hipN: -14 }, dur: 1, phase: 'pause' },
    { pose: {}, dur: 2, phase: 'excentrique' },
  ],
  contacts: [{ point: 'heelN', from: 0, to: 0 }],
  overrides: [
    { variants: ['band'], props: [{ kind: 'band', from: { seg: 'shankN', u: 0.92 }, to: { world: [-110, 0] } }] },
    { levels: [3], variants: ['bodyweight', 'dumbbells'], props: [{ kind: 'dumbbell', attach: 'shankN', at: [0.9, -1.5] }] },
  ],
});
