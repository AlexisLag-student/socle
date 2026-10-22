import { describe, expect, it } from 'vitest';
import { generateProgram, resolvePhase, collectCandidates, MAX_ITEMS, MIN_ITEMS, type EngineProfile } from './generate';
import { availableLevels, clampLevel, equipmentSet, pickVariant } from './availability';
import { exerciseSeconds, reduceDosage, repSeconds } from './duration';
import { dose, fixtureContent, mkExercise } from './fixtures';

const content = fixtureContent();
const base: EngineProfile = {
  sports: ['run'],
  objectives: ['prevention'],
  perfGoals: [],
  pathologies: [],
  equipment: [],
  sessionsPerWeek: 2,
  minutes: 30,
};
const ids = (r: ReturnType<typeof generateProgram>, s = 0) => r.sessions[s]!.items.map((i) => i.exerciseId);
const all = (r: ReturnType<typeof generateProgram>) => r.sessions.flatMap((s) => s.items.map((i) => i.exerciseId));

describe('disponibilité selon le matériel', () => {
  const ex = content.exercises.find((e) => e.id === 'heavy-a')!;
  it('choisit la variante de meilleur rang disponible', () => {
    expect(pickVariant(ex, equipmentSet([]))?.id).toBe('bw');
    expect(pickVariant(ex, equipmentSet(['dumbbells']))?.id).toBe('db');
    expect(pickVariant(ex, equipmentSet(['dumbbells', 'barbell']))?.id).toBe('bar');
  });
  it('respecte une variante préférée si elle est disponible', () => {
    expect(pickVariant(ex, equipmentSet(['dumbbells', 'barbell']), 'db')?.id).toBe('db');
  });
  it('un niveau « chargé » exige une variante chargeable', () => {
    expect(availableLevels(ex, pickVariant(ex, equipmentSet([]))!, equipmentSet([]))).toEqual([1, 2]);
    expect(availableLevels(ex, pickVariant(ex, equipmentSet(['barbell']))!, equipmentSet(['barbell']))).toEqual([1, 2, 3]);
  });
  it('ramène le niveau au plus proche disponible', () => {
    expect(clampLevel(3, [1, 2])).toBe(2);
    expect(clampLevel(1, [2, 3])).toBe(2);
    expect(clampLevel(2, [])).toBeUndefined();
  });
  it('n’utilise jamais un exercice sans variante compatible', () => {
    const r = generateProgram({ ...base, equipment: [] }, content);
    expect(all(r)).not.toContain('calf-gym');
    const r2 = generateProgram({ ...base, equipment: ['gym'] }, content);
    expect(all(r2)).toContain('calf-gym');
  });
});

describe('durée', () => {
  it('somme le tempo', () => {
    expect(repSeconds('3-0-3')).toBe(6);
    expect(repSeconds()).toBe(3);
  });
  it('estime la durée d’un exercice', () => {
    // 3 séries × 11 reps × 4 s + 2 repos × 60 s + 30 s de transition
    expect(exerciseSeconds(dose(3, [10, 12], 60))).toBe(3 * 44 + 120 + 30);
  });
  it('réduit le volume jusqu’à un plancher', () => {
    let d: ReturnType<typeof reduceDosage> = dose(4, [8, 8], 120);
    const seen = [];
    while (d) {
      seen.push([d.sets, d.restSec]);
      d = reduceDosage(d);
    }
    expect(seen.at(-1)).toEqual([2, 45]);
  });
});

describe('priorités du moteur', () => {
  it('les exercices de la pathologie passent en premier et les essentiels sont dans chaque séance', () => {
    const r = generateProgram({ ...base, objectives: ['pain'], pathologies: [{ id: 'knee-pain', phase: 'irritable' }] }, content);
    for (const s of r.sessions) expect(s.items.map((i) => i.exerciseId)).toContain('rehab-iso');
    const { candidates } = collectCandidates({ ...base, pathologies: [{ id: 'knee-pain', phase: 'irritable' }] }, content);
    expect(candidates.slice(0, 2).map((c) => c.exercise.id)).toEqual(['rehab-iso', 'quad-c']);
  });

  it('applique le dosage propre à la phase', () => {
    const r = generateProgram({ ...base, pathologies: [{ id: 'knee-pain', phase: 'irritable' }] }, content);
    const iso = r.sessions[0]!.items.find((i) => i.exerciseId === 'rehab-iso')!;
    expect(iso.dosage.holdSec).toBe(45);
    expect(iso.reason).toEqual({ kind: 'pathology', ref: 'knee-pain' });
  });

  it('exclut les exercices à éviter dans la phase', () => {
    const r = generateProgram(
      { ...base, objectives: ['performance'], perfGoals: ['power'], pathologies: [{ id: 'knee-pain', phase: 'irritable' }] },
      content,
    );
    expect(all(r)).not.toContain('plyo-a');
    const r2 = generateProgram({ ...base, objectives: ['performance'], perfGoals: ['power'] }, content);
    expect(all(r2)).toContain('plyo-a');
  });

  it('les objectifs passent avant la prévention générale', () => {
    const { candidates } = collectCandidates({ ...base, objectives: ['performance'], perfGoals: ['strength'] }, content);
    expect(candidates[0]!.exercise.id).toBe('heavy-a');
    expect(candidates[0]!.reason.kind).toBe('objective');
  });

  it('à pertinence égale, le meilleur niveau de preuve passe devant', () => {
    const { candidates } = collectCandidates(base, content);
    const order = candidates.map((c) => c.exercise.id);
    expect(order.indexOf('quad-a')).toBeLessThan(order.indexOf('glute-b'));
    expect(order.indexOf('glute-b')).toBeLessThan(order.indexOf('glute-a'));
  });

  it('respecte le sport : pas d’exercice réservé au vélo pour un coureur', () => {
    const run = generateProgram({ ...base, sessionsPerWeek: 3, minutes: 45 }, content);
    expect(all(run)).not.toContain('upper-a');
    const bike = generateProgram({ ...base, sports: ['bike'], sessionsPerWeek: 3, minutes: 45 }, content);
    expect(all(bike)).toContain('upper-a');
  });

  it('jamais deux exercices de la même famille dans une séance', () => {
    const r = generateProgram({ ...base, minutes: 45, sessionsPerWeek: 1 }, content);
    const s = ids(r);
    expect(s.includes('quad-a') && s.includes('quad-b')).toBe(false);
  });
});

describe('phases et feu vert médical', () => {
  it('choisit la phase disponible la plus proche', () => {
    const p = content.pathologies[0]!;
    expect(resolvePhase(p, 'return-to-sport')).toBe('rebuild');
    expect(resolvePhase(p, 'irritable')).toBe('irritable');
  });
  it('fracture de fatigue : phase de retour imposée et avertissement de feu vert médical', () => {
    const r = generateProgram({ ...base, pathologies: [{ id: 'stress-fracture', phase: 'irritable' }] }, content);
    expect(r.pathologies).toEqual([{ id: 'stress-fracture', phase: 'return-to-sport' }]);
    expect(r.warnings.map((w) => w.kind)).toContain('medical-clearance');
  });
  it('signale une pathologie inconnue', () => {
    const r = generateProgram({ ...base, pathologies: [{ id: 'inconnue', phase: 'rebuild' }] }, content);
    expect(r.warnings).toContainEqual({ kind: 'pathology-unknown', ref: 'inconnue' });
  });
});

describe('structure des séances', () => {
  it.each([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 3],
  ])('%i séance(s)/semaine → %i séance(s) type', (perWeek, expected) => {
    expect(generateProgram({ ...base, sessionsPerWeek: perWeek }, content).sessions).toHaveLength(expected);
  });

  it.each([15, 30, 45] as const)('%i min : 4 à 8 exercices et durée respectée (±10 %%)', (minutes) => {
    const r = generateProgram({ ...base, sports: ['run', 'bike'], minutes, sessionsPerWeek: 2 }, content);
    for (const s of r.sessions) {
      expect(s.items.length).toBeGreaterThanOrEqual(MIN_ITEMS);
      expect(s.items.length).toBeLessThanOrEqual(MAX_ITEMS);
      expect(s.estimatedSec).toBeLessThanOrEqual(minutes * 60 * 1.1);
    }
  });

  it('les séances A et B diffèrent', () => {
    const r = generateProgram({ ...base, sports: ['run', 'bike'], minutes: 30 }, content);
    expect(ids(r, 0)).not.toEqual(ids(r, 1));
  });

  it('est déterministe', () => {
    const p = { ...base, sports: ['run', 'bike'] as EngineProfile['sports'], minutes: 45 as const };
    expect(generateProgram(p, content)).toEqual(generateProgram(p, content));
  });

  it('réutilise le niveau acquis', () => {
    const r = generateProgram(base, content, new Map([['quad-a', { level: 2 }]]));
    const item = r.sessions.flatMap((s) => s.items).find((i) => i.exerciseId === 'quad-a');
    expect(item?.level).toBe(2);
  });

  it('ne place pas trois exercices du même groupe musculaire d’affilée quand c’est évitable', () => {
    const many = {
      ...content,
      exercises: [
        ...['q1', 'q2', 'q3', 'q4'].map((id) => mkExercise(id, { primary: ['vastus-lateralis'] })),
        mkExercise('g1', { primary: ['glute-max'] }),
        mkExercise('c1', { primary: ['soleus'] }),
      ],
      pathologies: [],
    };
    const r = generateProgram({ ...base, minutes: 45, sessionsPerWeek: 1 }, many);
    const groups = r.sessions[0]!.items.map((i) => many.exercises.find((e) => e.id === i.exerciseId)!.muscles.primary[0]);
    for (let i = 2; i < groups.length; i++) expect(groups[i] === groups[i - 1] && groups[i] === groups[i - 2]).toBe(false);
  });
});
