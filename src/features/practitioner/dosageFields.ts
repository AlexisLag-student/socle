/**
 * Champs numériques du dosage en mode praticien : saisie libre (texte), validation au moment de « Valider ».
 * Le texte tapé est gardé tel quel pendant la frappe (un champ peut rester vide) ; seules les valeurs valides
 * sont reportées dans le dosage. Bornes = celles du schéma du dosage et du lien de partage v1 (DECISIONS n° 88).
 */
import type { Dosage } from '@/domain/schema';

export type DosageField = 'sets' | 'repsMin' | 'repsMax' | 'hold' | 'rest';
export type DosageTexts = Record<DosageField, string>;
/** `required` : vide ou 0 ; `requiredRest` : repos vide (0 permis) ; `range` : hors bornes ; `order` : minimum > maximum. */
export type FieldError = 'required' | 'requiredRest' | 'range' | 'order';

export const FIELD_BOUNDS: Record<DosageField, readonly [number, number]> = {
  sets: [1, 10],
  repsMin: [1, 200],
  repsMax: [1, 200],
  hold: [5, 600],
  rest: [0, 600],
};

/** Champs affichés : répétitions et maintien peuvent coexister (répétitions maintenues, n° 87). */
export function visibleFields(d: Dosage): DosageField[] {
  return ['sets', ...(d.reps || !d.holdSec ? (['repsMin', 'repsMax'] as const) : []), ...(d.holdSec ? (['hold'] as const) : []), 'rest'];
}

export function toTexts(d: Dosage): DosageTexts {
  return {
    sets: String(d.sets),
    repsMin: String(d.reps?.[0] ?? 10),
    repsMax: String(d.reps?.[1] ?? 10),
    hold: String(d.holdSec ?? ''),
    rest: String(d.restSec),
  };
}

/** Ne garde que les chiffres (collage, clavier physique) : un entier, jamais de décimale ni de signe. */
export const digitsOnly = (raw: string) => raw.replace(/\D/g, '').slice(0, 3);

function checkOne(field: DosageField, text: string): FieldError | undefined {
  const [min, max] = FIELD_BOUNDS[field];
  if (text === '') return field === 'rest' ? 'requiredRest' : 'required';
  const n = Number(text);
  if (n === 0 && min > 0) return 'required';
  return n < min || n > max ? 'range' : undefined;
}

/** Erreurs des champs affichés ; l'ordre minimum ≤ maximum est signalé sur le minimum. */
export function fieldErrors(texts: DosageTexts, fields: DosageField[]): Partial<Record<DosageField, FieldError>> {
  const errors: Partial<Record<DosageField, FieldError>> = {};
  for (const f of fields) {
    const e = checkOne(f, texts[f]);
    if (e) errors[f] = e;
  }
  if (fields.includes('repsMin') && !errors.repsMin && !errors.repsMax && Number(texts.repsMin) > Number(texts.repsMax)) errors.repsMin = 'order';
  return errors;
}

/** Dosage mis à jour avec les seules valeurs valides : un champ vide ou hors bornes garde la dernière valeur valide. */
export function applyTexts(d: Dosage, texts: DosageTexts, fields: DosageField[]): Dosage {
  const errors = fieldErrors(texts, fields);
  const next = { ...d };
  if (!errors.sets) next.sets = Number(texts.sets);
  if (fields.includes('repsMin') && !errors.repsMin && !errors.repsMax) next.reps = [Number(texts.repsMin), Number(texts.repsMax)];
  if (fields.includes('hold') && !errors.hold) next.holdSec = Number(texts.hold);
  if (!errors.rest) next.restSec = Number(texts.rest);
  return next;
}
