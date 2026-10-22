import { describe, expect, it } from 'vitest';
import { content } from './index';
import { checkEvidence, validateContent, type ContentBundle } from './validate';
import { drawnMuscles } from '@/components/anatomy/drawings/registry';
import type { Exercise, Reference } from '@/domain/schema';

const clone = <T>(x: T): T => structuredClone(x);

describe('contenu publié', () => {
  it('passe la validation complète (schémas + contrôles croisés + dessins)', () => {
    const { errors } = validateContent(content, drawnMuscles());
    expect(errors).toEqual([]);
  });
});

describe('validateContent détecte les erreurs', () => {
  const base = (): ContentBundle => clone(content);
  const firstExercise = (c: ContentBundle) => c.exercises[0] as Exercise;

  it('texte anglais manquant', () => {
    const c = base();
    firstExercise(c).name.en = '';
    expect(validateContent(c).errors.join('\n')).toMatch(/name\.en/);
  });

  it('moins de 3 niveaux de progression', () => {
    const c = base();
    firstExercise(c).levels = firstExercise(c).levels.slice(0, 2);
    expect(validateContent(c).errors.join('\n')).toMatch(/levels/);
  });

  it('identifiant de muscle inconnu', () => {
    const c = base();
    (firstExercise(c).muscles.primary as string[]).push('biceps-du-mollet');
    expect(validateContent(c).errors.join('\n')).toMatch(/muscles\.primary/);
  });

  it('référence sans DOI, PMID ni lien', () => {
    const c = base();
    const r = c.references[0] as Reference;
    delete r.doi;
    delete r.pmid;
    delete r.url;
    expect(validateContent(c).errors.join('\n')).toMatch(/DOI, un PMID ou une URL/);
  });

  it('référence citée mais inexistante', () => {
    const c = base();
    firstExercise(c).evidence.citations.push({ refId: 'inconnu-2099', finding: { fr: 'x', en: 'x' } });
    expect(validateContent(c).errors.join('\n')).toMatch(/inconnu-2099/);
  });

  it('exercice inconnu dans une pathologie', () => {
    const c = base();
    c.pathologies[0]!.phases[0]!.exercises.push({ exerciseId: 'n-existe-pas', priority: 1 });
    expect(validateContent(c).errors.join('\n')).toMatch(/n-existe-pas/);
  });

  it('identifiants en double', () => {
    const c = base();
    c.exercises.push(clone(firstExercise(c)));
    expect(validateContent(c).errors.join('\n')).toMatch(/en double/);
  });

  it('muscle non dessiné dans les schémas', () => {
    const drawn = drawnMuscles();
    if (!drawn) return; // les dessins arrivent en phase 3
    const without = Object.fromEntries(
      Object.entries(drawn).map(([k, v]) => [k, new Set([...v].filter((m) => m !== 'soleus'))]),
    );
    expect(validateContent(content, without).errors.join('\n')).toMatch(/soleus/);
  });
});

describe('cohérence du niveau de preuve', () => {
  const ref = (id: string, type: Reference['type']): Reference => ({
    id, type, authors: ['X'], year: 2020, title: 't', journal: 'j', pmid: '12345678',
    verification: { status: 'verified', checkedAt: '2026-01-01', via: 'pubmed', abstractChecked: true },
  });
  const refs = new Map([
    ['rct-a', ref('rct-a', 'rct')],
    ['rct-b', ref('rct-b', 'rct')],
    ['coh', ref('coh', 'cohort')],
    ['sr', ref('sr', 'systematic-review')],
  ]);
  const ev = (level: 'strong' | 'moderate' | 'low' | 'expert', ids: string[]) => ({
    level,
    citations: ids.map((refId) => ({ refId, finding: { fr: 'f', en: 'f' } })),
  });

  it.each([
    ['strong', ['sr'], true],
    ['strong', ['rct-a', 'rct-b'], true],
    ['strong', ['rct-a'], false],
    ['strong', ['coh'], false],
    ['moderate', ['rct-a'], true],
    ['moderate', ['coh'], false],
    ['low', ['coh'], true],
    ['low', [], false],
    ['expert', [], true],
  ] as const)('%s avec %j → valide : %s', (level, ids, ok) => {
    expect(checkEvidence('t', ev(level, [...ids]), refs).length === 0).toBe(ok);
  });
});
