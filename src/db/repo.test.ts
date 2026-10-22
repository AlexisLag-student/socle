import { beforeEach, describe, expect, it } from 'vitest';
import { SocleDB } from './db';
import {
  applyFeedback,
  decideSuggestion,
  exportBackup,
  getActiveProgram,
  importBackup,
  listPrograms,
  newLog,
  newProgram,
  nextSessionKey,
  regenerateProgram,
  saveLog,
  saveProfile,
  saveProgram,
} from './repo';
import { fixtureContent } from '@/engine/fixtures';

let d: SocleDB;
let n = 0;
beforeEach(() => {
  d = new SocleDB(`test-${n++}`);
});

const profile = {
  sports: ['run' as const],
  objectives: ['prevention' as const],
  perfGoals: [],
  pathologies: [],
  equipment: [],
  sessionsPerWeek: 2,
  minutes: 30 as const,
};
const meta = { title: 'Mon programme', contentVersion: 'test' };

describe('programmes', () => {
  it('un seul programme actif à la fois', async () => {
    await saveProgram(newProgram({ origin: 'custom', active: true, title: 'a', sessions: [{ key: 'A', items: [] }] }), d);
    await saveProgram(newProgram({ origin: 'imported', active: true, title: 'b', sessions: [{ key: 'A', items: [] }] }), d);
    expect((await listPrograms(d)).filter((p) => p.active).map((p) => p.title)).toEqual(['b']);
  });

  it('régénérer archive l’ancien programme auto et conserve l’historique et les niveaux', async () => {
    const p = await saveProfile(profile, d);
    const { program: first } = await regenerateProgram(p, fixtureContent(), meta, d);
    await saveLog({ ...newLog(first.id, 'A', []), finishedAt: Date.now() }, d);
    const ex = first.sessions[0]!.items[0]!;
    await d.exerciseStates.put({ exerciseId: ex.exerciseId, level: 2, feedback: [], updatedAt: 0 });

    const { program: second } = await regenerateProgram({ ...p, minutes: 45 }, fixtureContent(), meta, d);
    const all = await listPrograms(d);
    expect(all.find((x) => x.id === first.id)?.archivedAt).toBeDefined();
    expect((await getActiveProgram(d))?.id).toBe(second.id);
    expect(await d.logs.count()).toBe(1);
    const again = second.sessions.flatMap((s) => s.items).find((i) => i.exerciseId === ex.exerciseId);
    expect(again?.level).toBe(2);
  });

  it('alterne les séances A → B → A', async () => {
    const prog = await saveProgram(
      newProgram({ origin: 'custom', active: true, title: 'x', sessions: [{ key: 'A', items: [] }, { key: 'B', items: [] }] }),
      d,
    );
    expect(await nextSessionKey(prog, d)).toBe('A');
    await saveLog({ ...newLog(prog.id, 'A', []), finishedAt: 1 }, d);
    expect(await nextSessionKey(prog, d)).toBe('B');
    await saveLog({ ...newLog(prog.id, 'B', []), finishedAt: 2 }, d);
    expect(await nextSessionKey(prog, d)).toBe('A');
  });
});

describe('progression enregistrée', () => {
  it('deux « facile » → proposition, acceptée → niveau suivant', async () => {
    const ctx = { availableLevels: [1, 2, 3], loadable: false };
    await applyFeedback('squat', 1, 'bw', 'easy', ctx, undefined, d);
    const s = await applyFeedback('squat', 1, 'bw', 'easy', ctx, undefined, d);
    expect(s.pending?.kind).toBe('level-up');
    const after = await decideSuggestion('squat', true, d);
    expect(after?.level).toBe(2);
    expect(after?.pending).toBeUndefined();
  });
});

describe('sauvegarde', () => {
  it('export puis import restaure les données', async () => {
    const p = await saveProfile(profile, d);
    await regenerateProgram(p, fixtureContent(), meta, d);
    const backup = await exportBackup(d);
    const other = new SocleDB(`test-${n++}`);
    await importBackup(JSON.parse(JSON.stringify(backup)), other);
    expect((await other.profile.get('me'))?.sports).toEqual(['run']);
    expect(await other.programs.count()).toBe(1);
  });

  it('refuse un fichier invalide', async () => {
    await expect(importBackup({ app: 'autre' }, d)).rejects.toThrow();
  });
});
