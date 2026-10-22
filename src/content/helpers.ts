/**
 * Raccourcis d'écriture pour le contenu (intensités, consignes récurrentes).
 * Ils produisent des objets ordinaires validés par les schémas Zod.
 */
import type { Dosage, L } from '@/domain/schema';

type Intensity = Dosage['intensity'];

/** Répétitions en réserve (RIR) : nombre de répétitions qu'on pourrait encore faire en fin de série. */
export const rir = (range: string): Intensity => ({
  kind: 'rir',
  value: {
    fr: `${range} répétition(s) en réserve en fin de série`,
    en: `${range} rep(s) in reserve at the end of the set`,
  },
});

/** Effort perçu (RPE) sur 10. */
export const rpe = (range: string): Intensity => ({
  kind: 'rpe',
  value: { fr: `Effort perçu ${range}/10`, en: `Perceived effort ${range}/10` },
});

export const bodyweight = (): Intensity => ({
  kind: 'bodyweight',
  value: { fr: 'Poids du corps', en: 'Bodyweight' },
});

/** Charge exprimée librement (ex. « charge permettant 6 à 8 répétitions »). */
export const load = (fr: string, en: string): Intensity => ({ kind: 'load', value: { fr, en } });

/**
 * Intensité guidée par les symptômes (rééducation) : sans échelle chiffrée,
 * la gêne doit rester modérée pendant l'exercice et revenir à son niveau habituel le lendemain.
 */
export const symptomGuided = (): Intensity => ({
  kind: 'symptom-guided',
  value: {
    fr: 'Gêne acceptable si elle reste modérée et revient à son niveau habituel le lendemain matin',
    en: 'Discomfort is acceptable if it stays moderate and settles back to its usual level by the next morning',
  },
});

/** Fréquences usuelles. */
export const freq = {
  daily: { fr: 'Tous les jours', en: 'Daily' } satisfies L,
  twiceDaily: { fr: 'Deux fois par jour', en: 'Twice a day' } satisfies L,
  everyOtherDay: { fr: 'Un jour sur deux', en: 'Every other day' } satisfies L,
  threePerWeek: { fr: '3 fois par semaine', en: '3 times a week' } satisfies L,
  twoPerWeek: { fr: '2 fois par semaine', en: '2 times a week' } satisfies L,
};

/** Précautions récurrentes. */
export const caution = {
  painFlare: {
    fr: 'Si la douleur augmente nettement pendant l’exercice ou le lendemain, revenez au niveau précédent.',
    en: 'If pain clearly increases during the exercise or the next day, go back to the previous level.',
  } satisfies L,
  balanceSupport: {
    fr: 'Gardez un appui (mur, rampe) à portée de main pour l’équilibre.',
    en: 'Keep a support (wall, rail) within reach for balance.',
  } satisfies L,
  noPainJump: {
    fr: 'Pas d’impacts ni de sauts tant que la marche rapide et les exercices de force ne sont pas indolores.',
    en: 'No impacts or jumps until brisk walking and strength exercises are pain-free.',
  } satisfies L,
};
