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

describe('moteur sur le contenu réel — 4 et 5 séances, séances d’1 h', () => {
  const cases = TEST_PROFILES.flatMap((t) =>
    [4, 5].flatMap((spw) => ([30, 60] as const).map((minutes) => [`${t.id} ${spw}×${minutes}`, { ...t.profile, sessionsPerWeek: spw, minutes }] as const)),
  );
  it.each(cases)('%s : invariants (alternance, séances différentes)', (_name, profile) => {
    const report = checkInvariants(profile, generateProgram(profile, content), content);
    expect(report.issues).toEqual([]);
  });

  it.each(TEST_PROFILES.flatMap((t) => [2, 4, 5].map((spw) => [`${t.id} ${spw}×1 h`, { ...t.profile, sessionsPerWeek: spw, minutes: 60 as const }] as const)))(
    '%s : environ 1 h, repos compris (54 à 66 min)',
    (_name, profile) => {
      for (const s of generateProgram(profile, content).sessions) {
        expect(s.estimatedSec / 60).toBeGreaterThanOrEqual(54);
        expect(s.estimatedSec / 60).toBeLessThanOrEqual(66);
      }
    },
  );
});

describe('moteur sur le contenu réel — balayage de profils', () => {
  const equipments: EquipmentId[][] = [[], ['band'], ['dumbbells', 'step'], ['gym', 'barbell'], [...EQUIPMENT].filter((e) => e !== 'bodyweight')];
  const profiles: { name: string; p: EngineProfile }[] = [];
  for (const sports of [['run'], ['bike'], ['run', 'bike']] as EngineProfile['sports'][])
    for (const minutes of [15, 30, 45, 60] as const)
      for (const [i, equipment] of equipments.entries())
        profiles.push({
          name: `${sports.join('+')} ${minutes}min eq${i}`,
          p: {
            sports,
            objectives: [OBJECTIVES[(i + minutes) % OBJECTIVES.length]!, 'prevention'],
            perfGoals: i % 2 ? ['strength', 'power'] : [],
            pathologies: content.pathologies
              .filter((pa) => pa.sports.some((s) => sports.includes(s)))
              .slice(i, i + (minutes >= 45 ? 2 : 1))
              .map((pa) => ({ id: pa.id, phase: pa.phases[0]!.phase })),
            equipment,
            sessionsPerWeek: 1 + ((i + minutes) % 5),
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
