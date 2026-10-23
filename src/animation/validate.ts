/**
 * Validation des animations (lancée par `npm run validate:content` et par Vitest) :
 * schéma, cohérence avec l'exercice, bornes articulaires, appuis au sol, continuité, règle du tempo.
 * Chaque combinaison niveau × variante est échantillonnée à 120 images par seconde.
 */
import type { Exercise } from '@/domain/schema';
import type { MuscleId } from '@/domain/ids';
import { AnimationSchema, type Animation, type Contact } from './schema';
import { buildTimeline, contactWorld, createFrame, resolve, sample, timeOfKeyframe, type Resolved, type Timeline } from './engine';
import { CENTRAL_JOINTS, CH, JOINT_BOUNDS, N_SEGMENTS, SIDED_JOINTS, SIDED_SEGMENTS, contactDef, type Channel, type ContactPoint } from './skeleton';

/** Tolérance des appuis (unités du monde, taille du personnage = 180 ; ≈ 1 cm). */
export const CONTACT_TOL = 2;
/** Écart angulaire maximal entre deux images à 120 i/s. */
export const MAX_ANGLE_STEP = 8;
/**
 * Déplacement maximal d'une articulation entre deux images à 120 i/s : 8 unités ≈ 9,6 m/s
 * (un lancer de bras explosif atteint 7 à 8 m/s ; un vrai saut de pose dépasse largement ce seuil).
 */
export const MAX_MOVE_STEP = 8;
const FPS = 120;

export interface ContactSample {
  point: ContactPoint;
  t: number;
  dy: number;
  dx: number;
}

/** La pose clé k est-elle dans la fenêtre du contact (fenêtre qui peut faire le tour du cycle) ? */
export function inWindow(c: Contact, k: number, count: number): boolean {
  const from = c.from ?? 0;
  const to = c.to ?? count - 1;
  return from <= to ? k >= from && k <= to : k >= from || k <= to;
}

/** Contacts actifs pendant un passage (les deux poses du passage dans la fenêtre du contact). */
export function activeContacts(tl: Timeline, segIndex: number) {
  const s = tl.segs[segIndex]!;
  const n = tl.r.keyframes.length;
  return tl.r.contacts.filter((c) => inWindow(c, s.from, n) && inWindow(c, s.to, n));
}

/** Écarts des appuis sur un cycle : hauteur par rapport à la surface et glissement depuis le début de la fenêtre. */
export function contactDeviations(tl: Timeline, fps = FPS): ContactSample[] {
  const f = createFrame();
  const out: ContactSample[] = [];
  const anchorX = new Map<string, number>();
  const n = Math.max(1, Math.ceil(tl.total * fps));
  const pt = { x: 0, y: 0 };
  let lastSeg = -1;
  // Appuis ponctuels : contrôlés aussi à l'instant de chaque pose clé de leur fenêtre.
  const K = tl.r.keyframes.length;
  for (const c of tl.r.contacts)
    for (let k = 0; k < K; k++) {
      if (!inWindow(c, k, K)) continue;
      sample(tl, timeOfKeyframe(tl, k), f);
      contactWorld(f, tl.r.view, c.point, pt);
      out.push({ point: c.point, t: f.t, dy: pt.y - ((c.y ?? 0) + contactDef(c.point).lift), dx: 0 });
    }
  for (let i = 0; i <= n; i++) {
    const t = Math.min(tl.total - 1e-9, (tl.total * i) / n);
    sample(tl, t, f);
    if (f.seg !== lastSeg) {
      // Nouvelle fenêtre de contact : on oublie les positions des contacts qui n'étaient plus actifs.
      const act = new Set(activeContacts(tl, f.seg).map((c) => c.point));
      for (const k of anchorX.keys()) if (!act.has(k as ContactPoint)) anchorX.delete(k);
      lastSeg = f.seg;
    }
    for (const c of activeContacts(tl, f.seg)) {
      contactWorld(f, tl.r.view, c.point, pt);
      const surface = (c.y ?? 0) + contactDef(c.point).lift;
      if (!anchorX.has(c.point)) anchorX.set(c.point, pt.x);
      out.push({ point: c.point, t, dy: pt.y - surface, dx: pt.x - anchorX.get(c.point)! });
    }
  }
  return out;
}

const JOINTS: { ch: Channel; joint: (typeof CENTRAL_JOINTS)[number] | (typeof SIDED_JOINTS)[number] }[] = [
  ...CENTRAL_JOINTS.map((j) => ({ ch: j as Channel, joint: j })),
  ...SIDED_JOINTS.flatMap((j) => [
    { ch: `${j}N` as Channel, joint: j },
    { ch: `${j}F` as Channel, joint: j },
  ]),
];

function checkTimeline(tl: Timeline, label: string, errors: string[], tempo?: string) {
  const view = tl.r.view;
  const bounds = JOINT_BOUNDS[view];
  if (tempo) {
    const bad = tl.segs.filter((s) => s.phase === 'retour' || s.phase === 'isométrique');
    if (bad.length) errors.push(`${label} : avec un tempo (${tempo}), seules les phases excentrique / pause / concentrique sont permises (trouvé ${bad[0]!.phase})`);
  }
  const f = createFrame();
  const prev = createFrame();
  const n = Math.max(2, Math.ceil(tl.total * FPS));
  let worstBound = '';
  let worstStep = '';
  for (let i = 0; i <= n; i++) {
    // Dernière image = première (boucle) : vérifie aussi la continuité au raccord du cycle.
    sample(tl, i === n ? 0 : (tl.total * i) / n, f);
    for (const { ch, joint } of JOINTS) {
      const v = f.pose[CH[ch]]!;
      const [lo, hi] = bounds[joint];
      if ((v < lo - 0.01 || v > hi + 0.01) && !worstBound) worstBound = `${ch} = ${v.toFixed(1)}° hors bornes [${lo}, ${hi}] à t = ${f.t.toFixed(2)} s`;
    }
    for (const s of SIDED_SEGMENTS)
      for (const sd of ['N', 'F'] as const) {
        const fs = f.pose[CH[`fs_${s}${sd}`]]!;
        if ((fs < 0.05 || fs > 1) && !worstBound) worstBound = `fs_${s}${sd} = ${fs.toFixed(2)} hors de [0,05 ; 1]`;
      }
    if (i > 0) {
      for (const { ch } of JOINTS) {
        let d = Math.abs(f.pose[CH[ch]]! - prev.pose[CH[ch]]!);
        if (d > 180) d = 360 - d;
        if (d > MAX_ANGLE_STEP && !worstStep) worstStep = `saut de ${d.toFixed(1)}° sur ${ch} à t = ${f.t.toFixed(2)} s`;
      }
      for (let si = 0; si < N_SEGMENTS; si++) {
        const d = Math.hypot(f.ox[si]! - prev.ox[si]!, f.oy[si]! - prev.oy[si]!);
        if (d > MAX_MOVE_STEP && !worstStep) worstStep = `saut de ${d.toFixed(1)} unités (segment ${si}) à t = ${f.t.toFixed(2)} s`;
      }
    }
    prev.pose.set(f.pose);
    prev.ox.set(f.ox);
    prev.oy.set(f.oy);
  }
  if (worstBound) errors.push(`${label} : ${worstBound}`);
  if (worstStep) errors.push(`${label} : mouvement discontinu, ${worstStep}`);
  const devs = contactDeviations(tl);
  const worst = new Map<string, ContactSample>();
  for (const d of devs) {
    const e = Math.max(Math.abs(d.dy), Math.abs(d.dx));
    const w = worst.get(d.point);
    if (e > CONTACT_TOL && (!w || e > Math.max(Math.abs(w.dy), Math.abs(w.dx)))) worst.set(d.point, d);
  }
  for (const d of worst.values())
    errors.push(`${label} : l’appui ${d.point} quitte sa surface (écart vertical ${d.dy.toFixed(1)}, glissement ${d.dx.toFixed(1)}) à t = ${d.t.toFixed(2)} s`);
}

/** Combinaisons niveau × variante qui donnent des animations différentes. */
export function combinations(anim: Animation, ex: Exercise): { level: number; variant: string; r: Resolved; tempo?: string }[] {
  const seen = new Set<string>();
  const out: { level: number; variant: string; r: Resolved; tempo?: string }[] = [];
  for (const lv of ex.levels)
    for (const v of ex.variants) {
      const r = resolve(anim, { level: lv.level, variant: v.id });
      const key = JSON.stringify([r.keyframes, r.props, r.contacts, r.anchor, r.ik, Array.from(r.poses, (p) => Array.from(p)), lv.dosage.tempo]);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ level: lv.level, variant: v.id, r, tempo: lv.dosage.tempo });
    }
  return out;
}

export function validateAnimation(raw: unknown, exercises: Map<string, Exercise>, drawn?: ReadonlySet<MuscleId>): string[] {
  const parsed = AnimationSchema.safeParse(raw);
  const id = (raw as { exerciseId?: string })?.exerciseId ?? '?';
  if (!parsed.success) return parsed.error.issues.map((i) => `animation ${id} : ${i.path.join('.')} ${i.message}`);
  const anim = parsed.data;
  const ex = exercises.get(anim.exerciseId);
  if (!ex) return [`animation ${id} : exercice inconnu`];
  const errors: string[] = [];
  const pre = `animation ${id}`;
  const levels = new Set(ex.levels.map((l) => l.level));
  const variants = new Set(ex.variants.map((v) => v.id));
  anim.overrides?.forEach((o, i) => {
    for (const l of o.levels ?? []) if (!levels.has(l)) errors.push(`${pre} : surcharge ${i}, niveau ${l} inexistant`);
    for (const v of o.variants ?? []) if (!variants.has(v)) errors.push(`${pre} : surcharge ${i}, variante « ${v} » inexistante`);
  });
  const exMuscles = new Set<MuscleId>([...ex.muscles.primary, ...ex.muscles.secondary]);
  for (const m of anim.muscles ?? []) {
    if (!exMuscles.has(m)) errors.push(`${pre} : muscle ${m} absent de l’exercice (aucun muscle nouveau ne peut être ajouté par l’animation)`);
    if (drawn && !drawn.has(m)) errors.push(`${pre} : muscle ${m} absent des schémas musculaires`);
  }
  const ikLimbs = (anim.ik ?? []).map((k) => k.limb);
  const anchorLimb = (p: string) => (/^(heel|toe|mid)/.test(p) ? `leg${p.slice(-1)}` : /^(hand|elbow)/.test(p) ? `arm${p.slice(-1)}` : '');
  if (ikLimbs.includes(anchorLimb(anim.anchor.point) as never)) errors.push(`${pre} : l’appui ${anim.anchor.point} ne peut pas être sur un membre recalé par IK`);
  if (errors.length) return errors;

  for (const c of combinations(anim, ex)) {
    const label = `${pre} (niveau ${c.level}, variante ${c.variant})`;
    checkTimeline(buildTimeline(c.r), label, errors);
    if (c.tempo) checkTimeline(buildTimeline(c.r, { tempo: c.tempo }), `${label}, tempo ${c.tempo}`, errors, c.tempo);
  }
  return [...new Set(errors)];
}

