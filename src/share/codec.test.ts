import { describe, expect, it } from 'vitest';
import { exerciseById } from '@/content/index';
import type { Program } from '@/domain/user';
import { decodeProgram, encodeProgram, shareUrl, ShareError, tokenFromHash } from './codec';
import { V1_ACHILLES, V1_FOUR_SESSIONS, V1_HOLD_TEMPO } from './fixtures/v1';

const lookup = (id: string) => exerciseById.get(id);
const calf = exerciseById.get('calf-raise-straight-knee')!;

const program: Pick<Program, 'title' | 'author' | 'notes' | 'sessions' | 'sessionsPerWeek' | 'createdAt'> = {
  title: 'Programme genou — Mme L.',
  author: 'Kiné « Les Pins »',
  notes: 'Accents, guillemets « » et emoji 🏃‍♀️ doivent survivre.',
  sessionsPerWeek: 2,
  createdAt: 1790000000000,
  sessions: [
    {
      key: 'A',
      items: [
        {
          exerciseId: calf.id,
          variantId: 'bodyweight',
          level: 2,
          dosage: calf.levels[1]!.dosage,
          reason: { kind: 'manual', ref: 'practitioner' },
          note: 'Lentement !',
        },
        {
          exerciseId: 'calf-isometric-hold',
          variantId: 'bodyweight',
          level: 1,
          dosage: { ...exerciseById.get('calf-isometric-hold')!.levels[0]!.dosage, holdSec: 40, sets: 4 },
          reason: { kind: 'manual', ref: 'practitioner' },
        },
      ],
    },
  ],
};

describe('liens de partage', () => {
  it('aller-retour sans perte', () => {
    const token = encodeProgram(program, lookup);
    const { program: p, unknownExercises, version } = decodeProgram(token, lookup);
    expect(version).toBe(1);
    expect(unknownExercises).toEqual([]);
    expect(p.title).toBe(program.title);
    expect(p.author).toBe(program.author);
    expect(p.notes).toBe(program.notes);
    expect(p.sessionsPerWeek).toBe(2);
    expect(p.origin).toBe('imported');
    const items = p.sessions[0]!.items;
    expect(items[0]).toMatchObject({ exerciseId: calf.id, level: 2, note: 'Lentement !' });
    expect(items[0]!.dosage).toEqual(calf.levels[1]!.dosage);
    expect(items[1]!.dosage).toMatchObject({ holdSec: 40, sets: 4 });
  });

  it('produit un fragment d’URL sans caractère à échapper', () => {
    const url = shareUrl('https://socle.example/', encodeProgram(program, lookup));
    expect(url.startsWith('https://socle.example/#share=1.')).toBe(true);
    expect(url).toMatch(/^[\w:/.#=\-+$]+$/);
    expect(tokenFromHash(new URL(url).hash)).toBe(url.split('#share=')[1]);
    // un « + » transformé en espace par une messagerie reste décodable
    const token = url.split('#share=')[1]!;
    expect(decodeProgram(token.replaceAll('+', ' '), lookup).program.title).toBe(program.title);
  });

  it('reste compact pour un programme réaliste', () => {
    const big = { ...program, sessions: (['A', 'B', 'C'] as const).map((key) => ({ key, items: Array(8).fill(program.sessions[0]!.items[0]!) })) };
    expect(encodeProgram(big, lookup).length).toBeLessThan(2000);
  });

  it('décode un lien v1 figé (compatibilité dans le temps)', () => {
    const { program: p, unknownExercises } = decodeProgram(V1_ACHILLES, lookup);
    expect(unknownExercises).toEqual([]);
    expect(p.title).toBe('Rééducation Achille — semaine 1');
    expect(p.author).toBe('Cabinet Dupont, kinésithérapeute');
    expect(p.sessions.map((s) => s.key)).toEqual(['A', 'B']);
    expect(p.sessions[1]!.title).toBe('Jour léger');
    const a = p.sessions[0]!.items;
    expect(a[0]).toMatchObject({ exerciseId: 'calf-isometric-hold', level: 2, note: 'Avant la course' });
    expect(a[1]!.dosage).toMatchObject({ sets: 4, reps: [6, 8], intensity: { kind: 'load', value: { fr: '12 kg', en: '12 kg' } } });
  });

  it('décode les autres liens v1 figés à l’identique', () => {
    const four = decodeProgram(V1_FOUR_SESSIONS, lookup);
    expect(four.version).toBe(1);
    expect(four.program).toMatchObject({ title: 'Genou — 4 séances', author: 'Cabinet Martin', notes: 'Alternez les séances.', sessionsPerWeek: 4, sharedAt: 1792000000000 });
    expect(four.program.minutes).toBeUndefined();
    expect(four.program.sessions.map((s) => [s.key, s.title, s.items.map((i) => i.exerciseId)])).toEqual([
      ['A', 'Force', ['squat', 'glute-bridge']],
      ['B', undefined, ['calf-raise-straight-knee']],
      ['C', 'Léger', ['calf-isometric-hold']],
      ['D', undefined, ['copenhagen-adductor']],
    ]);
    expect(four.program.sessions[1]!.items[0]!.dosage.sets).toBe(4);
    expect(four.program.sessions[3]!.items[0]!.note).toBe('Levier court');

    const mixed = decodeProgram(V1_HOLD_TEMPO, lookup).program.sessions[0]!.items;
    expect(mixed[0]!.dosage).toMatchObject({ holdSec: 30, sets: 5, perSide: true });
    expect(mixed[1]!.dosage).toMatchObject({ tempo: '4-1-2', reps: [6, 8], restSec: 120, intensity: { kind: 'load', value: { fr: '20 kg' } } });
  });

  it('un programme qui tient dans la v1 produit toujours un lien v1 (lisible par les anciennes versions)', () => {
    expect(encodeProgram({ ...program, sessionsPerWeek: 4 }, lookup).startsWith('1.')).toBe(true);
  });

  describe('v2 : 5 séances et durée visée', () => {
    const five = {
      ...program,
      sessionsPerWeek: 5,
      minutes: 60 as const,
      sessions: (['A', 'B', 'C', 'D', 'E'] as const).map((key) => ({ key, items: [program.sessions[0]!.items[(key.charCodeAt(0) % 2)]!] })),
    };

    it('aller-retour sans perte', () => {
      const token = encodeProgram(five, lookup);
      expect(token.startsWith('2.')).toBe(true);
      const { program: p, version } = decodeProgram(token, lookup);
      expect(version).toBe(2);
      expect(p.sessionsPerWeek).toBe(5);
      expect(p.minutes).toBe(60);
      expect(p.sessions.map((s) => s.key)).toEqual(['A', 'B', 'C', 'D', 'E']);
      expect(p.sessions[4]!.items[0]!.dosage).toEqual(five.sessions[4]!.items[0]!.dosage);
    });

    it.each([
      ['5 par semaine', { ...program, sessionsPerWeek: 5 }],
      ['durée visée', { ...program, minutes: 45 as const }],
      ['séance E', { ...program, sessions: [...program.sessions, { key: 'E' as const, items: program.sessions[0]!.items }] }],
    ])('passe en v2 dès qu’une nouvelle valeur est utilisée (%s)', (_label, p) => {
      expect(encodeProgram(p, lookup).startsWith('2.')).toBe(true);
    });

    it('une app qui ne lit que la v1 refuse un lien v2 avec « mettez l’app à jour »', () => {
      // Ancienne app = décodeur sans entrée pour la version 2 : même chemin que « 9.xxx » ci-dessous.
      const token = encodeProgram(five, lookup).replace(/^2\./, '9.');
      expect(() => decodeProgram(token, lookup)).toThrow(expect.objectContaining({ code: 'bad-version' }));
    });

    it('le décodeur v1 refuse toujours 5 séances (la v1 n’est pas élargie)', async () => {
      const LZ = (await import('lz-string')).default;
      const token = '1.' + LZ.compressToEncodedURIComponent(JSON.stringify({ t: 'x', w: 5, s: [{ k: 'E', i: [] }] }));
      expect(() => decodeProgram(token, lookup)).toThrow(expect.objectContaining({ code: 'invalid' }));
    });
  });

  it('signale les exercices inconnus sans casser le programme', () => {
    const token = encodeProgram(
      { ...program, sessions: [{ key: 'A', items: [{ ...program.sessions[0]!.items[0]!, exerciseId: 'exercice-du-futur' }] }] },
      lookup,
    );
    const r = decodeProgram(token, lookup);
    expect(r.unknownExercises).toEqual(['exercice-du-futur']);
    expect(r.program.sessions[0]!.items).toHaveLength(1);
  });

  it.each([
    ['', 'empty'],
    ['abc', 'corrupt'],
    ['9.xxx', 'bad-version'],
    ['1.%%%%', 'corrupt'],
  ])('rejette un lien invalide « %s » (%s)', (token, code) => {
    try {
      decodeProgram(token, lookup);
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(ShareError);
      expect((e as ShareError).code).toBe(code);
    }
  });

  it('rejette une charge utile qui ne respecte pas le schéma', async () => {
    const LZ = (await import('lz-string')).default;
    const token = '1.' + LZ.compressToEncodedURIComponent(JSON.stringify({ t: 'x', s: [] }));
    expect(() => decodeProgram(token, lookup)).toThrow(ShareError);
  });
});
