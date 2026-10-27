import { describe, expect, it } from 'vitest';
import { DosageSchema, type Dosage } from '@/domain/schema';
import { content } from '@/content/index';
import { applyTexts, digitsOnly, fieldErrors, toTexts, visibleFields } from './dosageFields';

const base: Dosage = { sets: 3, reps: [8, 12], restSec: 60, perSide: false, intensity: { kind: 'rpe', value: { fr: '7', en: '7' } } };
const heldReps: Dosage = { ...base, reps: [10, 10], holdSec: 5, perSide: true, restSec: 30 };

describe('champs du dosage (mode praticien)', () => {
  it('affiche répétitions et maintien quand le dosage a les deux (pied court)', () => {
    expect(visibleFields(heldReps)).toEqual(['sets', 'repsMin', 'repsMax', 'hold', 'rest']);
    expect(visibleFields(base)).toEqual(['sets', 'repsMin', 'repsMax', 'rest']);
    const { reps: _r, ...plank } = { ...base, holdSec: 30 };
    expect(visibleFields(plank)).toEqual(['sets', 'hold', 'rest']);
  });

  it('un champ vide ou à 0 est une erreur ; le repos accepte 0 mais pas le vide', () => {
    const fields = visibleFields(heldReps);
    const t = { ...toTexts(heldReps), sets: '', repsMin: '0', hold: '0', rest: '0' };
    expect(fieldErrors(t, fields)).toEqual({ sets: 'required', repsMin: 'required', hold: 'required' });
    expect(fieldErrors({ ...t, sets: '2', repsMin: '4', hold: '6', rest: '' }, fields)).toEqual({ rest: 'requiredRest' });
  });

  it('signale les valeurs hors bornes et un minimum supérieur au maximum', () => {
    const fields = visibleFields(heldReps);
    const t = { ...toTexts(heldReps), sets: '11', hold: '3', rest: '601', repsMin: '12', repsMax: '8' };
    expect(fieldErrors(t, fields)).toEqual({ sets: 'range', hold: 'range', rest: 'range', repsMin: 'order' });
  });

  it('ne garde que les chiffres', () => {
    expect(digitsOnly('1,5')).toBe('15');
    expect(digitsOnly('-3e')).toBe('3');
    expect(digitsOnly('12345')).toBe('123');
  });

  it('ne reporte que les valeurs valides : un champ vide garde la dernière valeur', () => {
    const fields = visibleFields(heldReps);
    const next = applyTexts(heldReps, { ...toTexts(heldReps), sets: '', repsMin: '12', repsMax: '15', hold: '8', rest: '0' }, fields);
    expect(next).toEqual({ ...heldReps, reps: [12, 15], holdSec: 8, restSec: 0 });
    expect(applyTexts(heldReps, { ...toTexts(heldReps), repsMin: '20' }, fields).reps).toEqual([10, 10]);
  });

  it('toute saisie valide donne un dosage conforme au schéma, pour chaque niveau du catalogue', () => {
    for (const ex of content.exercises)
      for (const lv of ex.levels) {
        const fields = visibleFields(lv.dosage);
        expect(fieldErrors(toTexts(lv.dosage), fields), `${ex.id} niveau ${lv.level}`).toEqual({});
        const edited = applyTexts(lv.dosage, { sets: '10', repsMin: '1', repsMax: '200', hold: '600', rest: '0' }, fields);
        expect(DosageSchema.safeParse(edited).success, `${ex.id} niveau ${lv.level}`).toBe(true);
      }
  });
});
