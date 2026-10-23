import { defineAnimation } from '../schema';

/**
 * Éversion de cheville, niveau 4 debout — « Debout sur la jambe de travail, élastique autour de l’autre cheville :
 * balayages latéraux rapides qui obligent les fibulaires d’appui à stabiliser. » Vue de face, appui sur la jambe proche,
 * la jambe libre s'écarte puis revient contre l'élastique. Les niveaux 1 à 3 (assis, pied qui tourne vers l'extérieur)
 * ne se dessinent pas avec ce personnage : ils gardent le schéma musculaire seul.
 */
export default defineAnimation({
  exerciseId: 'band-ankle-eversion',
  view: 'face',
  loop: 'cycle',
  side: 'unilateral',
  anchor: { point: 'midN' },
  still: 1,
  keyframes: [
    { pose: { hipN: 2, hipF: 6, fs_shankF: 0.9, shoulder: 25 }, dur: 0.4, phase: 'concentrique', say: 'step' },
    { pose: { hipF: 30 }, dur: 0.4, phase: 'excentrique', say: 'return' },
  ],
  contacts: [{ point: 'midN' }],
  props: [{ kind: 'band', from: { seg: 'shankF', u: 0.9 }, to: { world: [0, 4] } }],
});
