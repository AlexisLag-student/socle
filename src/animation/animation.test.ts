import { describe, expect, it } from 'vitest';
import { exerciseById } from '@/content/index';
import { drawnMuscles } from '@/components/anatomy/drawings/registry';
import { tempoPhases } from '@/lib/device';
import type { MuscleId } from '@/domain/ids';
import {
  EXPLOSIVE_SEC,
  applyTempo,
  buildTimeline,
  contactWorld,
  createFrame,
  parseTempo,
  resolve,
  sample,
  shortestDelta,
  timeOfKeyframe,
  type Segment,
} from './engine';
import { animationLoaders, hasAnimation, loadAnimation } from './loaders';
import { AnimationSchema, defineAnimation, type Animation } from './schema';
import { CH, JOINT_BOUNDS } from './skeleton';
import { CONTACT_TOL, MAX_ANGLE_STEP, SCENERY_TOL, combinations, contactDeviations, sceneryPenetration, validateAnimation } from './validate';
import { animationMuscles } from './zones';

const drawn = (() => {
  const d = drawnMuscles();
  return new Set<MuscleId>([...d.front!, ...d.back!, ...d.sole!]);
})();

/**
 * Exercices dont les muscles principaux ne se voient pas dans la seule vue possible : adducteurs de profil (allongé sur
 * le dos), rotateurs profonds de la hanche, muscles du haut du dos de face (bras qui s'écartent devant le corps).
 */
const PRIMARY_HIDDEN = new Set(['adductor-squeeze', 'seated-hip-external-rotation', 'band-pull-apart']);

const all: [string, Animation][] = await Promise.all(Object.entries(animationLoaders).map(async ([id, load]) => [id, (await load()).default] as [string, Animation]));

describe('données d’animation', () => {
  it('au moins les 10 exercices pilotes sont animés', () => {
    expect(all.length).toBeGreaterThanOrEqual(10);
  });

  it.each(all)('%s : clé du chargeur = id de l’exercice, schéma Zod valide', (id, anim) => {
    expect(anim.exerciseId).toBe(id);
    expect(exerciseById.has(id)).toBe(true);
    expect(AnimationSchema.safeParse(anim).success).toBe(true);
  });

  it.each(all)('%s : bornes articulaires, appuis, continuité et tempo (toutes combinaisons niveau × variante)', (_id, anim) => {
    expect(validateAnimation(anim, exerciseById, drawn)).toEqual([]);
  });

  it.each(all)('%s : chaque muscle dessiné existe dans les schémas musculaires et dans l’exercice', (id, anim) => {
    const ex = exerciseById.get(id)!;
    const muscles = animationMuscles(ex, anim.view, anim.muscles);
    const exMuscles = new Set([...ex.muscles.primary, ...ex.muscles.secondary]);
    for (const m of muscles) {
      expect(drawn.has(m.id), m.id).toBe(true);
      expect(exMuscles.has(m.id), m.id).toBe(true);
      expect(m.role).toBe(ex.muscles.primary.includes(m.id) ? 'primary' : 'secondary');
    }
    // Au moins un muscle principal est visible sur le personnage, sauf quand la vue imposée par la position les cache
    // (ils restent sur le schéma musculaire de la fiche).
    if (!PRIMARY_HIDDEN.has(id)) expect(muscles.some((m) => m.role === 'primary')).toBe(true);
  });

  it.each(all)('%s : les appuis déclarés restent au sol (échantillonnage à 120 i/s)', (id, anim) => {
    for (const c of combinations(anim, exerciseById.get(id)!)) {
      for (const tempo of [undefined, c.tempo]) {
        const devs = contactDeviations(buildTimeline(c.r, { tempo }));
        const worst = Math.max(0, ...devs.map((d) => Math.max(Math.abs(d.dy), Math.abs(d.dx))));
        expect(worst, `niveau ${c.level}, ${c.variant}, tempo ${tempo}`).toBeLessThanOrEqual(CONTACT_TOL);
      }
    }
  });
});

describe('mobilier', () => {
  it.each(all)('%s : le corps ne traverse jamais une chaise, un banc, une marche ou une box', (id, anim) => {
    for (const c of combinations(anim, exerciseById.get(id)!)) {
      const pen = sceneryPenetration(buildTimeline(c.r));
      expect(pen?.depth ?? 0, `niveau ${c.level}, ${c.variant}`).toBeLessThanOrEqual(SCENERY_TOL);
    }
  });
});

describe('chargement', () => {
  it('hasAnimation / loadAnimation', async () => {
    expect(hasAnimation('squat')).toBe(true);
    expect(hasAnimation('exercice-inconnu')).toBe(false);
    expect(await loadAnimation('exercice-inconnu')).toBeNull();
    expect((await loadAnimation('squat'))?.exerciseId).toBe('squat');
  });
});

/** Animation minimale pour tester le moteur. */
const swing = (from: number, to: number) =>
  defineAnimation({
    exerciseId: 'squat',
    view: 'profile',
    loop: 'pingpong',
    side: 'bilateral',
    anchor: { point: 'midN' },
    keyframes: [
      { pose: { tilt: from }, dur: 1, phase: 'excentrique', ease: 'linear' },
      { pose: { tilt: to }, dur: 1, phase: 'concentrique' },
    ],
    contacts: [],
  });

describe('interpolation', () => {
  it('plus court chemin entre deux angles', () => {
    expect(shortestDelta(350, 10)).toBe(20);
    expect(shortestDelta(10, 350)).toBe(-20);
    expect(shortestDelta(-170, 170)).toBe(-20);
    expect(Math.abs(shortestDelta(0, 180))).toBe(180);
  });

  it('pas de saut de 360° : de 170° à −170° on passe par 180°', () => {
    const tl = buildTimeline(resolve(swing(170, -170)));
    const f = createFrame();
    const values: number[] = [];
    for (let i = 0; i <= 20; i++) values.push(sample(tl, (0.999 * i) / 20, f).pose[CH.tilt]!);
    for (let i = 1; i < values.length; i++) expect(Math.abs(shortestDelta(values[i - 1]!, values[i]!))).toBeLessThan(2);
    expect(Math.abs(Math.abs(values[10]!) - 180)).toBeLessThan(1);
  });

  it.each(all)('%s : continuité, aucune articulation ne saute entre deux images', (id, anim) => {
    const f = createFrame();
    const prev = createFrame();
    let worst = { d: 0, at: '' };
    for (const c of combinations(anim, exerciseById.get(id)!)) {
      const tl = buildTimeline(c.r);
      const n = Math.ceil(tl.total * 120);
      for (let i = 0; i <= n; i++) {
        sample(tl, i === n ? 0 : (tl.total * i) / n, f);
        if (i > 0)
          for (const ch of ['hipN', 'kneeN', 'ankleN', 'trunk', 'shoulderN', 'elbowN'] as const) {
            const d = Math.abs(shortestDelta(prev.pose[CH[ch]]!, f.pose[CH[ch]]!));
            if (d > worst.d) worst = { d, at: `niveau ${c.level}, ${ch}, t = ${f.t.toFixed(2)}` };
          }
        prev.pose.set(f.pose);
      }
    }
    expect(worst.d, worst.at).toBeLessThanOrEqual(MAX_ANGLE_STEP);
  });

  it('les bornes du profil incluent celles du cahier des charges', () => {
    expect(JOINT_BOUNDS.profile.knee).toEqual([0, 150]);
    expect(JOINT_BOUNDS.profile.elbow).toEqual([0, 150]);
  });

  it('une animation hors bornes échoue à la validation', () => {
    const bad = defineAnimation({ ...swing(0, 10), keyframes: [{ pose: { knee: 0 }, dur: 1, phase: 'excentrique' }, { pose: { knee: 170 }, dur: 1, phase: 'concentrique' }] });
    expect(validateAnimation(bad, exerciseById).some((e) => e.includes('kneeN') && e.includes('hors bornes'))).toBe(true);
  });

  it('l’appui place la racine : le milieu du pied reste fixe quand le genou plie', () => {
    const anim = defineAnimation({
      ...swing(0, 0),
      keyframes: [
        { pose: {}, dur: 1, phase: 'excentrique' },
        { pose: { tilt: 30, hip: 110, knee: 100, ankle: 20 }, dur: 1, phase: 'concentrique' },
      ],
    });
    const tl = buildTimeline(resolve(anim));
    const f = createFrame();
    for (const t of [0, 0.3, 0.7, 1, 1.5]) {
      const p = contactWorld(sample(tl, t, f), 'profile', 'midN');
      expect(Math.abs(p.x)).toBeLessThan(1e-6);
      expect(Math.abs(p.y)).toBeLessThan(1e-6);
    }
  });
});

describe('recalage du tempo du dosage', () => {
  const seg = (phase: Segment['phase'], dur: number): Segment => ({ from: 0, to: 1, dur, start: 0, ease: 0, phase, say: 'hold', anchor: 'midN', ax: 0, ay: 0, i0: 0, i1: 0 });
  const sum = (segs: Segment[], phase: Segment['phase']) => segs.filter((s) => s.phase === phase).reduce((n, s) => n + s.dur, 0);

  it('« X » = explosif, même durée que l’indicateur de tempo de la séance', () => {
    expect(parseTempo('2-0-X')).toEqual([2, 0, EXPLOSIVE_SEC, 0]);
    expect(tempoPhases('X-0-X')[0]!.sec).toBe(EXPLOSIVE_SEC);
    expect(parseTempo('2-0-1-2')).toEqual([2, 0, 1, 2]);
  });

  it('les durées des phases excentrique / pause / concentrique suivent le tempo', () => {
    const segs = [seg('excentrique', 1.6), seg('pause', 0.25), seg('concentrique', 1.1)];
    applyTempo(segs, parseTempo('3-1-1'));
    expect(sum(segs, 'excentrique')).toBeCloseTo(3);
    expect(sum(segs, 'pause')).toBeCloseTo(1);
    expect(sum(segs, 'concentrique')).toBeCloseTo(1);
  });

  it('une pause demandée mais absente est insérée ; une pause à 0 disparaît', () => {
    const a = [seg('concentrique', 1), seg('excentrique', 2)];
    applyTempo(a, parseTempo('2-0-1-2'));
    expect(a.map((s) => s.phase)).toEqual(['concentrique', 'pause', 'excentrique']);
    expect(a[1]!.dur).toBeCloseTo(2);
    const b = [seg('excentrique', 1), seg('pause', 0.5), seg('concentrique', 1)];
    applyTempo(b, parseTempo('3-0-1'));
    expect(sum(b, 'pause')).toBe(0);
  });

  it('squat 3-0-1 : cycle de 4 s calé sur l’indicateur (départ au début de la descente)', () => {
    const tl = buildTimeline(resolve(all.find(([id]) => id === 'squat')![1], { level: 1 }), { tempo: '3-0-1' });
    expect(tl.total).toBeCloseTo(4);
    expect(tl.tempoOffset).toBe(0);
    expect(tl.segs[tl.segs.length - 1]!.dur).toBeCloseTo(1);
  });

  it('pont fessier 2-0-1-2 : 1 s pour monter, 2 s tenues, 2 s pour descendre ; synchronisé sur la descente', () => {
    const tl = buildTimeline(resolve(all.find(([id]) => id === 'glute-bridge')![1], { level: 1 }), { tempo: '2-0-1-2' });
    expect(tl.total).toBeCloseTo(5);
    expect(sum(tl.segs, 'concentrique')).toBeCloseTo(1);
    expect(sum(tl.segs, 'pause')).toBeCloseTo(2);
    expect(tl.tempoOffset).toBeCloseTo(3);
    expect(timeOfKeyframe(tl, 0)).toBe(0);
  });

  it('un tempo mal formé est ignoré', () => {
    const r = resolve(all.find(([id]) => id === 'squat')![1]);
    expect(buildTimeline(r, { tempo: '3-' }).total).toBeCloseTo(buildTimeline(r).total);
    expect(buildTimeline(r, { tempo: '0-0-0' }).total).toBeGreaterThan(0);
  });
});
