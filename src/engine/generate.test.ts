import { describe, expect, it } from 'vitest';
import { generateProgram, needsRecovery, neighbours, resolvePhase, collectCandidates, type EngineProfile } from './generate';
import { availableLevels, clampLevel, equipmentSet, pickVariant } from './availability';
import { exerciseSeconds, itemBounds, reduceDosage, repSeconds, restBetweenExercises, sessionSeconds } from './duration';
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
  it('estime la durée d’un exercice, repos avant l’exercice suivant compris', () => {
    // 3 séries × 11 reps × 4 s + 2 repos de 60 s + 60 s de repos avant l’exercice suivant
    expect(exerciseSeconds(dose(3, [10, 12], 60))).toBe(3 * 44 + 120 + 60);
  });
  it('repos entre exercices : le repos entre séries, borné entre 60 et 120 s', () => {
    expect(restBetweenExercises({ restSec: 30 })).toBe(60);
    expect(restBetweenExercises({ restSec: 90 })).toBe(90);
    expect(restBetweenExercises({ restSec: 180 })).toBe(120);
  });
  it('une séance compte les repos entre exercices, sauf après le dernier', () => {
    const a = dose(3, [10, 12], 60);
    const b = dose(2, [8, 8], 120);
    const work = (d: typeof a) => exerciseSeconds(d) - restBetweenExercises(d);
    expect(sessionSeconds([{ dosage: a }, { dosage: b }])).toBe(work(a) + 60 + work(b));
    expect(sessionSeconds([])).toBe(0);
  });
  it('nombre d’exercices selon la durée', () => {
    expect(itemBounds(15)).toEqual({ min: 3, max: 4 });
    expect(itemBounds(60)).toEqual({ min: 6, max: 12 });
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
    [4, 4],
    [5, 5],
  ])('%i séance(s)/semaine → %i séance(s) type', (perWeek, expected) => {
    expect(generateProgram({ ...base, sessionsPerWeek: perWeek }, content).sessions).toHaveLength(expected);
  });

  it.each([15, 30, 45, 60] as const)('%i min : nombre d’exercices et durée respectés (±10 %%)', (minutes) => {
    const r = generateProgram({ ...base, sports: ['run', 'bike'], minutes, sessionsPerWeek: 2 }, content);
    const { min, max } = itemBounds(minutes);
    for (const s of r.sessions) {
      expect(s.items.length).toBeGreaterThanOrEqual(min);
      expect(s.items.length).toBeLessThanOrEqual(max);
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

describe('4 et 5 séances par semaine', () => {
  const freq = (en: string) => ({ fr: en, en });
  it('séances voisines dans la rotation, la dernière précédant la première', () => {
    expect(neighbours(0, 5)).toEqual([4, 1]);
    expect(neighbours(4, 5)).toEqual([3, 0]);
    expect(neighbours(0, 1)).toEqual([]);
  });

  it('un exercice demande de la récupération selon la fréquence du contenu, sinon selon ses qualités', () => {
    const strength = mkExercise('s');
    const control = mkExercise('c', { qualities: ['control'] });
    expect(needsRecovery(strength, dose())).toBe(true);
    expect(needsRecovery(control, dose())).toBe(false);
    expect(needsRecovery(strength, dose(3, [10, 12], 60, { frequency: freq('Daily') }))).toBe(false);
    expect(needsRecovery(control, dose(3, [10, 12], 60, { frequency: freq('2 times a week') }))).toBe(true);
  });

  it.each([4, 5])('%i séances : jamais le même muscle chargé deux séances de suite, séances toutes différentes', (n) => {
    const r = generateProgram({ ...base, sports: ['run', 'bike'], objectives: ['prevention', 'performance'], minutes: 30, sessionsPerWeek: n }, content);
    expect(r.sessions.map((s) => s.key)).toEqual(['A', 'B', 'C', 'D', 'E'].slice(0, n));
    const exById = new Map(content.exercises.map((e) => [e.id, e]));
    const heavyGroups = r.sessions.map(
      (s) => new Set(s.items.filter((i) => needsRecovery(exById.get(i.exerciseId)!, i.dosage)).map((i) => exById.get(i.exerciseId)!.muscles.primary[0])),
    );
    heavyGroups.forEach((g, k) => {
      const next = heavyGroups[(k + 1) % n]!;
      expect([...g].filter((m) => next.has(m))).toEqual([]);
    });
    const signatures = r.sessions.map((s) => s.items.map((i) => i.exerciseId).sort().join());
    expect(new Set(signatures).size).toBe(n);
  });

  it('un exercice essentiel qui demande de la récupération va une séance sur deux ; quotidien, dans chaque séance', () => {
    const c = fixtureContent();
    const ph = c.pathologies[0]!.phases[0]!;
    const daily = ph.exercises.find((e) => e.exerciseId === 'rehab-iso')!;
    const r = generateProgram({ ...base, objectives: ['pain'], pathologies: [{ id: 'knee-pain', phase: 'irritable' }], sessionsPerWeek: 4 }, c);
    const withIso = r.sessions.filter((s) => s.items.some((i) => i.exerciseId === 'rehab-iso'));
    const isoDosage = r.sessions[0]!.items.find((i) => i.exerciseId === 'rehab-iso')?.dosage ?? daily.dosage!;
    const iso = c.exercises.find((e) => e.id === 'rehab-iso')!;
    if (needsRecovery(iso, isoDosage)) {
      expect(withIso.length).toBe(2);
      const [a, b] = withIso.map((s) => r.sessions.indexOf(s));
      expect(neighbours(a!, 4)).not.toContain(b);
    } else expect(withIso.length).toBe(4);
  });
});

describe('plafond de niveau par phase', () => {
  it('ne dépasse pas le niveau maximal de la phase, même avec un niveau acquis plus élevé', () => {
    const c = fixtureContent();
    const ph = c.pathologies[0]!.phases[1]!;
    (ph.exercises[0] as { maxLevel?: number }).maxLevel = 2;
    const r = generateProgram(
      { ...base, pathologies: [{ id: 'knee-pain', phase: 'rebuild' }], equipment: ['dumbbells'] },
      c,
      new Map([['rehab-load', { level: 3 }]]),
    );
    const item = r.sessions[0]!.items.find((i) => i.exerciseId === 'rehab-load')!;
    expect(item.level).toBe(2);
    expect(item.maxLevel).toBe(2);
  });
});
