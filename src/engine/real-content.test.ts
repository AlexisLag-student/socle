import { describe, expect, it } from 'vitest';
import { content } from '@/content/index';
import { EQUIPMENT, OBJECTIVES, type EquipmentId } from '@/domain/ids';
import { generateProgram, type EngineProfile } from './generate';
import { checkInvariants } from './invariants';
import { TEST_PROFILES } from './profiles';

describe('moteur sur le contenu réel — 10 profils documentés', () => {
  it.each(TEST_PROFILES.map((p) => [p.id, p] as const))('%s', (_id, { profile }) => {
    const result = generateProgram(profile, content);
    const report = checkInvariants(profile, result, content);
    expect(report.issues).toEqual([]);
    expect(result.warnings.filter((w) => w.kind === 'pathology-unknown')).toEqual([]);
  });
});

describe('moteur sur le contenu réel — balayage de profils', () => {
  const equipments: EquipmentId[][] = [[], ['band'], ['dumbbells', 'step'], ['gym', 'barbell'], [...EQUIPMENT].filter((e) => e !== 'bodyweight')];
  const profiles: { name: string; p: EngineProfile }[] = [];
  for (const sports of [['run'], ['bike'], ['run', 'bike']] as EngineProfile['sports'][])
    for (const minutes of [15, 30, 45] as const)
      for (const [i, equipment] of equipments.entries())
        profiles.push({
          name: `${sports.join('+')} ${minutes}min eq${i}`,
          p: {
            sports,
            objectives: [OBJECTIVES[(i + minutes) % OBJECTIVES.length]!, 'prevention'],
            perfGoals: i % 2 ? ['strength', 'power'] : [],
            pathologies: content.pathologies
              .filter((pa) => pa.sports.some((s) => sports.includes(s)))
              .slice(i, i + (minutes === 45 ? 2 : 1))
              .map((pa) => ({ id: pa.id, phase: pa.phases[0]!.phase })),
            equipment,
            sessionsPerWeek: 1 + (i % 4),
            minutes,
          },
        });

  it(`${profiles.length} profils respectent les invariants`, () => {
    const failures = profiles
      .map(({ name, p }) => ({ name, r: checkInvariants(p, generateProgram(p, content), content) }))
      .filter((x) => !x.r.ok)
      .map((x) => `${x.name}: ${x.r.issues.join(' | ')}`);
    expect(failures).toEqual([]);
  });

  it('toutes les pathologies produisent au moins un exercice avec le seul poids du corps', () => {
    const missing = content.pathologies.filter((pa) => {
      const r = generateProgram(
        { sports: pa.sports, objectives: ['pain'], perfGoals: [], pathologies: [{ id: pa.id, phase: pa.phases[0]!.phase }], equipment: [], sessionsPerWeek: 2, minutes: 30 },
        content,
      );
      return r.warnings.some((w) => w.kind === 'pathology-no-exercise');
    });
    expect(missing.map((m) => m.id)).toEqual([]);
  });
});
