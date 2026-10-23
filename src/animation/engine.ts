/**
 * Moteur d'animation (fonctions pures, sans DOM) : résolution des surcharges, timeline,
 * recalage sur le tempo du dosage, interpolation, cinématique directe, ancrage au sol, IK à deux segments.
 *
 * L'échantillonnage écrit dans des tampons pré-alloués (`Frame`) : aucune allocation par image.
 */
import type { Animation, AnimPhase, Contact, Easing, Ik, Keyframe, Pose, Prop, Saying } from './schema';
import { SAYINGS } from './schema';
import {
  CH,
  CHANNELS,
  IS_ANGLE,
  N_CHANNELS,
  N_SEGMENTS,
  SEGMENTS,
  SEG_INDEX,
  SIDED_JOINTS,
  SIDED_SEGMENTS,
  contactDef,
  mirrorOf,
  neutralPose,
  strokesOf,
  H,
  type Channel,
  type ContactPoint,
  type SegmentId,
  type View,
} from './skeleton';

const RAD = Math.PI / 180;

// ---------------------------------------------------------------------------
// Tempo
// ---------------------------------------------------------------------------

/** Durée d'une phase explosive « X » (identique à `tempoPhases` de src/lib/device.ts). */
export const EXPLOSIVE_SEC = 0.8;

/** Même format que `Dosage.tempo` (src/domain/schema.ts). */
export const TEMPO_RE = /^([0-9]|X)(-([0-9]|X)){2,3}$/;

/** « 3-0-1(-2) » → [excentrique, pause basse, concentrique, pause haute] en secondes. */
export function parseTempo(tempo: string): [number, number, number, number] {
  const p = tempo.split('-').map((x) => (x === 'X' ? EXPLOSIVE_SEC : Number(x)));
  return [p[0] ?? 0, p[1] ?? 0, p[2] ?? 0, p[3] ?? 0];
}

// ---------------------------------------------------------------------------
// Résolution (niveau, variante)
// ---------------------------------------------------------------------------

export interface ResolveOptions {
  level?: number;
  variant?: string;
}

export interface Resolved {
  exerciseId: string;
  view: View;
  loop: 'cycle' | 'pingpong';
  side: 'bilateral' | 'unilateral';
  anchor: { point: ContactPoint; x: number; y: number };
  ik: Ik[];
  still: number;
  keyframes: Keyframe[];
  /** Poses complètes (toutes les articulations), une par pose clé. */
  poses: Float64Array[];
  contacts: Contact[];
  props: Prop[];
  muscles?: Animation['muscles'];
}

/** Applique une pose partielle (raccourcis sans suffixe = deux côtés) à une pose complète. */
export function applyPose(target: Float64Array, pose: Pose): void {
  for (const [k, v] of Object.entries(pose)) {
    if (v === undefined) continue;
    if ((CHANNELS as readonly string[]).includes(k)) target[CH[k as Channel]] = v;
    else if ((SIDED_JOINTS as readonly string[]).includes(k) || k.startsWith('fs_')) {
      target[CH[`${k}N` as Channel]] = v;
      target[CH[`${k}F` as Channel]] = v;
    }
  }
}

function matches(o: NonNullable<Animation['overrides']>[number], opts: ResolveOptions): boolean {
  if (o.levels && (opts.level === undefined || !o.levels.includes(opts.level))) return false;
  if (o.variants && (opts.variant === undefined || !o.variants.includes(opts.variant))) return false;
  return true;
}

export function resolve(anim: Animation, opts: ResolveOptions = {}): Resolved {
  let keyframes = anim.keyframes;
  let contacts = anim.contacts;
  let anchor = anim.anchor;
  let ik = anim.ik ?? [];
  let still = anim.still;
  let loop = anim.loop;
  let sideMode = anim.side;
  const props = [...(anim.props ?? [])];
  const patches: Pose[] = [];
  for (const o of anim.overrides ?? []) {
    if (!matches(o, opts)) continue;
    if (o.keyframes) {
      keyframes = o.keyframes;
      still = o.still;
    }
    if (o.contacts) contacts = o.contacts;
    if (o.anchor) anchor = o.anchor;
    if (o.ik) ik = o.ik;
    if (o.still !== undefined) still = o.still;
    if (o.loop) loop = o.loop;
    if (o.side) sideMode = o.side;
    if (o.props) props.push(...o.props);
    if (o.pose) patches.push(o.pose);
  }
  const poses: Float64Array[] = [];
  let cur = neutralPose(anim.view);
  for (const k of keyframes) {
    const p = new Float64Array(cur);
    applyPose(p, k.pose);
    for (const patch of patches) applyPose(p, patch);
    poses.push(p);
    cur = p;
  }
  if (anim.view === 'profile')
    for (const p of poses) for (const s of SIDED_SEGMENTS) {
      p[CH[`fs_${s}N`]] = 1;
      p[CH[`fs_${s}F`]] = 1;
    }
  return {
    exerciseId: anim.exerciseId,
    view: anim.view,
    loop,
    side: sideMode,
    anchor: { point: anchor.point, x: anchor.x ?? 0, y: (anchor.y ?? 0) + contactDef(anchor.point).lift },
    ik,
    still: still ?? Math.floor((keyframes.length - 1) / 2),
    keyframes,
    poses,
    contacts,
    props,
    muscles: anim.muscles,
  };
}

// ---------------------------------------------------------------------------
// Courbes
// ---------------------------------------------------------------------------

const EASE_CODE: Record<Easing, number> = { easeInOut: 0, linear: 1, easeIn: 2, easeOut: 3 };

function ease(code: number, x: number): number {
  switch (code) {
    case 1:
      return x;
    case 2:
      return 1 - Math.cos((x * Math.PI) / 2);
    case 3:
      return Math.sin((x * Math.PI) / 2);
    default:
      return 0.5 - 0.5 * Math.cos(Math.PI * x);
  }
}

/** Écart angulaire signé le plus court (−180…180]. */
export function shortestDelta(a: number, b: number): number {
  let d = (b - a) % 360;
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d;
}

function norm180(x: number): number {
  let v = x % 360;
  if (v > 180) v -= 360;
  if (v < -180) v += 360;
  return v;
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

export const PHASE_CODE: Record<AnimPhase, number> = { excentrique: 0, pause: 1, concentrique: 2, isométrique: 3, retour: 4 };
const DEFAULT_SAY: Record<AnimPhase, Saying> = { excentrique: 'lower', pause: 'hold', concentrique: 'push', isométrique: 'hold', retour: 'return' };
const INTENSITY: Record<AnimPhase, number> = { excentrique: 0.85, pause: -1, concentrique: 1, isométrique: 1, retour: 0.45 };

export interface Segment {
  from: number;
  to: number;
  dur: number;
  start: number;
  ease: number;
  phase: AnimPhase;
  say: Saying;
  anchor: ContactPoint;
  ax: number;
  ay: number;
  /** Intensité musculaire au début et à la fin du passage. */
  i0: number;
  i1: number;
}

export interface TimelineOptions {
  /** Tempo du dosage : recale les durées des phases excentrique / pause / concentrique. */
  tempo?: string;
}

export interface Timeline {
  r: Resolved;
  segs: Segment[];
  total: number;
  /** Début de la première phase excentrique : point de synchronisation avec l'indicateur de tempo. */
  tempoOffset: number;
  /** Cibles fixes des membres en IK. */
  ikTargets: { limb: Ik['limb']; pin: Ik['pin']; x: number; y: number; dir: number | null }[];
  /** Cadre englobant de toute l'animation (repère du monde, y vers le haut). */
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
}

function invert(phase: AnimPhase): AnimPhase {
  return phase === 'excentrique' ? 'concentrique' : phase === 'concentrique' ? 'excentrique' : phase;
}

export function buildTimeline(r: Resolved, opts: TimelineOptions = {}): Timeline {
  const K = r.keyframes.length;
  const kf = (i: number) => r.keyframes[i]!;
  const segs: Segment[] = [];
  const mk = (from: number, to: number, src: Keyframe, reversed: boolean, anchorKf: Keyframe): Segment => {
    const phase = reversed ? invert(src.phase) : src.phase;
    let e = EASE_CODE[src.ease ?? 'easeInOut'];
    if (reversed && e >= 2) e = e === 2 ? 3 : 2;
    return {
      from,
      to,
      dur: src.dur,
      start: 0,
      ease: e,
      phase,
      say: reversed || !src.say ? DEFAULT_SAY[phase] : src.say,
      anchor: (anchorKf.anchor ?? r.anchor.point) as ContactPoint,
      ax: 0,
      ay: 0,
      i0: 0,
      i1: 0,
    };
  };
  for (let i = 0; i < K - 1; i++) segs.push(mk(i, i + 1, kf(i), false, kf(i)));
  if (r.loop === 'cycle') segs.push(mk(K - 1, 0, kf(K - 1), false, kf(K - 1)));
  else for (let i = K - 2; i >= 0; i--) segs.push(mk(i + 1, i, kf(i), true, kf(i)));

  // Positions des appuis : continues d'un passage à l'autre (calculées sur l'aller, réutilisées au retour).
  const tl: Timeline = { r, segs, total: 0, tempoOffset: 0, ikTargets: [], bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 } };
  const scratch = createFrame();
  const forward = r.loop === 'cycle' ? segs : segs.slice(0, K - 1);
  forward.forEach((s, k) => {
    if (k === 0) {
      s.ax = r.anchor.x;
      s.ay = r.anchor.y;
      return;
    }
    const prev = forward[k - 1]!;
    if (prev.anchor === s.anchor) {
      s.ax = prev.ax;
      s.ay = prev.ay;
      return;
    }
    // Le nouvel appui reste là où il se trouvait à la fin du passage précédent (décalage de racine retiré).
    posePose(tl, prev, 1, scratch);
    const c = contactWorld(scratch, r.view, s.anchor);
    const end = r.poses[prev.to]!;
    s.ax = c.x - end[CH.x]!;
    s.ay = c.y - end[CH.y]!;
  });
  if (r.loop === 'pingpong')
    for (let k = K - 1; k < segs.length; k++) {
      const twin = segs[segs.length - 1 - k]!;
      segs[k]!.ax = twin.ax;
      segs[k]!.ay = twin.ay;
      segs[k]!.anchor = twin.anchor;
    }

  // Tempo ignoré s'il est mal formé (saisie en cours dans l'éditeur praticien) ou s'il annule tout le mouvement.
  if (opts.tempo && TEMPO_RE.test(opts.tempo)) {
    const backup = segs.map((x) => ({ ...x }));
    applyTempo(segs, parseTempo(opts.tempo));
    if (segs.reduce((n, x) => n + x.dur, 0) <= 0) segs.splice(0, segs.length, ...backup);
  }

  // Intensité musculaire : une pause garde l'intensité du passage précédent.
  const targets = segs.map((s) => INTENSITY[s.phase]);
  for (let pass = 0; pass < 2; pass++)
    targets.forEach((v, k) => {
      if (v < 0) targets[k] = targets[(k - 1 + segs.length) % segs.length]!;
    });
  // Animation faite uniquement de pauses : intensité moyenne.
  const level = (v: number) => (v < 0 ? 0.6 : v);
  segs.forEach((s, k) => {
    s.i1 = level(targets[k]!);
    s.i0 = level(targets[(k - 1 + segs.length) % segs.length]!);
  });

  let t = 0;
  for (const s of segs) {
    s.start = t;
    t += s.dur;
  }
  tl.total = t;
  tl.tempoOffset = segs.find((s) => s.phase === 'excentrique')?.start ?? 0;

  // Cibles des membres en IK : position du point à la première pose (sans IK).
  if (r.ik.length) {
    posePose(tl, segs[0]!, 0, scratch, true);
    tl.ikTargets = r.ik.map((k) => {
      const p = ikPinWorld(scratch, r.view, k);
      const sd = k.limb.endsWith('N') ? 'N' : 'F';
      const onSurface = k.pin !== 'ankle' && k.pin !== 'wrist';
      const y = onSurface ? (k.y ?? 0) + contactDef(`${k.pin}${sd}` as ContactPoint).lift : p.y;
      const end = SEG_INDEX[(k.limb.startsWith('leg') ? `foot${sd}` : `hand${sd}`) as SegmentId];
      return { limb: k.limb, pin: k.pin, x: p.x, y, dir: k.flat ? scratch.dir[end]! : null };
    });
  }
  tl.bounds = computeBounds(tl);
  return tl;
}

/**
 * Recalage sur le tempo : la somme des passages excentriques = tempo[0], les pauses qui suivent
 * un excentrique = tempo[1], les concentriques = tempo[2], les pauses qui suivent un concentrique = tempo[3].
 * Une pause demandée par le tempo mais absente de l'animation est insérée (pose tenue).
 */
export function applyTempo(segs: Segment[], [ecc, low, con, high]: [number, number, number, number]): void {
  const prevMove = (k: number): AnimPhase | undefined => {
    for (let j = 1; j <= segs.length; j++) {
      const p = segs[(k - j + segs.length) % segs.length]!.phase;
      if (p !== 'pause') return p;
    }
    return undefined;
  };
  const classOf = (k: number) => {
    const p = segs[k]!.phase;
    if (p === 'excentrique') return 'ecc';
    if (p === 'concentrique') return 'con';
    if (p === 'pause') {
      const before = prevMove(k);
      return before === 'excentrique' ? 'low' : before === 'concentrique' ? 'high' : 'other';
    }
    return 'other';
  };
  const insertPause = (after: 'excentrique' | 'concentrique') => {
    let idx = -1;
    segs.forEach((s, k) => {
      if (s.phase === after) idx = k;
    });
    if (idx < 0) return;
    const s = segs[idx]!;
    segs.splice(idx + 1, 0, { ...s, from: s.to, to: s.to, dur: 0, phase: 'pause', say: 'hold', ease: 1 });
  };
  if (low > 0 && !segs.some((_, k) => classOf(k) === 'low')) insertPause('excentrique');
  if (high > 0 && !segs.some((_, k) => classOf(k) === 'high')) insertPause('concentrique');
  const classes = segs.map((_, k) => classOf(k));
  const scale = (cls: string, target: number) => {
    const idx = classes.flatMap((c, k) => (c === cls ? [k] : []));
    if (!idx.length) return;
    const sum = idx.reduce((n, k) => n + segs[k]!.dur, 0);
    for (const k of idx) segs[k]!.dur = sum > 0 ? (segs[k]!.dur * target) / sum : target / idx.length;
  };
  scale('ecc', ecc);
  scale('low', low);
  scale('con', con);
  scale('high', high);
}

// ---------------------------------------------------------------------------
// Image (tampons pré-alloués)
// ---------------------------------------------------------------------------

export interface Frame {
  /** Pose complète après IK (racine comprise). */
  pose: Float64Array;
  /** Origine, direction (degrés), raccourci et miroir de chaque segment, repère du monde. */
  ox: Float64Array;
  oy: Float64Array;
  dir: Float64Array;
  fs: Float64Array;
  m: Float64Array;
  seg: number;
  phase: number;
  say: number;
  intensity: number;
  /** Temps dans le cycle (s). */
  t: number;
}

export function createFrame(): Frame {
  return {
    pose: new Float64Array(N_CHANNELS),
    ox: new Float64Array(N_SEGMENTS),
    oy: new Float64Array(N_SEGMENTS),
    dir: new Float64Array(N_SEGMENTS),
    fs: new Float64Array(N_SEGMENTS),
    m: new Float64Array(N_SEGMENTS),
    seg: 0,
    phase: 0,
    say: 0,
    intensity: 1,
    t: 0,
  };
}

/** Cinématique directe à partir de `frame.pose` (racine = canaux x, y, tilt). */
function forward(frame: Frame, view: View): void {
  const p = frame.pose;
  for (let i = 0; i < N_SEGMENTS; i++) {
    const s = SEGMENTS[i]!;
    const m = mirrorOf(s, view);
    frame.m[i] = m;
    frame.fs[i] = s.fs && view === 'face' ? p[CH[s.fs]]! : 1;
    if (!s.parent) {
      frame.ox[i] = p[CH.x]!;
      frame.oy[i] = p[CH.y]!;
      frame.dir[i] = s.rest - p[CH.tilt]!;
      continue;
    }
    const pi = SEG_INDEX[s.parent];
    const pd = frame.dir[pi]! * RAD;
    const pm = frame.m[pi]!;
    const pfs = frame.fs[pi]!;
    const [au, av0] = s.attach[view];
    const av = m === -1 && pm === 1 ? -av0 : av0;
    const c = Math.cos(pd);
    const sn = Math.sin(pd);
    frame.ox[i] = frame.ox[pi]! + au * pfs * c - av * pm * sn;
    frame.oy[i] = frame.oy[pi]! + au * pfs * sn + av * pm * c;
    frame.dir[i] = frame.dir[pi]! + m * (s.rest + s.sign * (s.joint ? p[CH[s.joint]]! : 0));
  }
}

/** Point local d'un segment → monde (u, v dans le repère du segment, éventuellement en miroir). */
export function segPoint(frame: Frame, segIndex: number, u: number, v: number, out = { x: 0, y: 0 }): { x: number; y: number } {
  const d = frame.dir[segIndex]! * RAD;
  const c = Math.cos(d);
  const s = Math.sin(d);
  const uu = u * frame.fs[segIndex]!;
  const vv = v * frame.m[segIndex]!;
  out.x = frame.ox[segIndex]! + uu * c - vv * s;
  out.y = frame.oy[segIndex]! + uu * s + vv * c;
  return out;
}

const tmp = { x: 0, y: 0 };

/** Position du monde d'un point de contact. */
export function contactWorld(frame: Frame, view: View, point: ContactPoint, out = { x: 0, y: 0 }): { x: number; y: number } {
  const c = contactDef(point);
  const [u, v] = c.at[view];
  return segPoint(frame, SEG_INDEX[c.seg], u, v, out);
}

function ikPinWorld(frame: Frame, view: View, k: Ik, out = { x: 0, y: 0 }) {
  const sd = k.limb.endsWith('N') ? 'N' : 'F';
  if (k.pin === 'ankle') return segPoint(frame, SEG_INDEX[`foot${sd}`], 0, 0, out);
  if (k.pin === 'wrist') return segPoint(frame, SEG_INDEX[`hand${sd}`], 0, 0, out);
  return contactWorld(frame, view, `${k.pin}${sd}` as ContactPoint, out);
}

/** IK analytique à deux segments : recale hanche/genou (ou épaule/coude) pour que le point fixé reste en place. */
function solveIk(frame: Frame, view: View, k: Timeline['ikTargets'][number], tx: number, ty: number): void {
  const sd = k.limb.endsWith('N') ? 'N' : 'F';
  const leg = k.limb.startsWith('leg');
  const i1 = SEG_INDEX[(leg ? `thigh${sd}` : `upperArm${sd}`) as SegmentId];
  const i2 = SEG_INDEX[(leg ? `shank${sd}` : `forearm${sd}`) as SegmentId];
  const i3 = SEG_INDEX[(leg ? `foot${sd}` : `hand${sd}`) as SegmentId];
  const s1 = SEGMENTS[i1]!;
  const s2 = SEGMENTS[i2]!;
  const s3 = SEGMENTS[i3]!;
  const m = frame.m[i1]!;
  if (k.dir !== null) frame.dir[i3] = k.dir;
  // Point de l'extrémité (cheville / poignet) qui place le point fixé sur la cible, orientation conservée.
  let ex = tx;
  let ey = ty;
  if (k.pin !== 'ankle' && k.pin !== 'wrist') {
    const c = contactDef(`${k.pin}${sd}` as ContactPoint);
    const [u, v] = c.at[view];
    const d = frame.dir[i3]! * RAD;
    const uu = u * frame.fs[i3]!;
    const vv = v * frame.m[i3]!;
    ex = tx - (uu * Math.cos(d) - vv * Math.sin(d));
    ey = ty - (uu * Math.sin(d) + vv * Math.cos(d));
  }
  const hx = frame.ox[i1]!;
  const hy = frame.oy[i1]!;
  const L1 = s1.length * frame.fs[i1]!;
  const L2 = s2.length * frame.fs[i2]!;
  const dx = ex - hx;
  const dy = ey - hy;
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(L1 - L2) + 1e-6), L1 + L2 - 1e-6);
  const base = Math.atan2(dy, dx);
  const alpha = Math.acos(Math.min(1, Math.max(-1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))));
  const bend = (leg ? 1 : -1) * m;
  const a1 = base + bend * alpha;
  const kx = hx + L1 * Math.cos(a1);
  const ky = hy + L1 * Math.sin(a1);
  const a2 = Math.atan2(ey - ky, ex - kx);
  const parentDir = frame.dir[SEG_INDEX[s1.parent!]]!;
  const d1 = a1 / RAD;
  const d2 = a2 / RAD;
  const p = frame.pose;
  p[CH[s1.joint!]] = norm180((m * norm180(d1 - parentDir) - s1.rest) / s1.sign);
  p[CH[s2.joint!]] = norm180((m * norm180(d2 - d1) - s2.rest) / s2.sign);
  p[CH[s3.joint!]] = norm180((m * norm180(frame.dir[i3]! - d2) - s3.rest) / s3.sign);
}

/** Pose interpolée d'un passage à l'avancement x (0…1), racine placée par l'appui ; IK sauf `noIk`. */
function posePose(tl: Timeline, s: Segment, x: number, frame: Frame, noIk = false): void {
  const a = tl.r.poses[s.from]!;
  const b = tl.r.poses[s.to]!;
  const e = ease(s.ease, x);
  const p = frame.pose;
  for (let c = 0; c < N_CHANNELS; c++) p[c] = IS_ANGLE[c] ? norm180(a[c]! + e * shortestDelta(a[c]!, b[c]!)) : a[c]! + e * (b[c]! - a[c]!);
  // Ancrage : x, y de la pose sont des décalages ajoutés à la position imposée par l'appui.
  const offX = p[CH.x]!;
  const offY = p[CH.y]!;
  p[CH.x] = 0;
  p[CH.y] = 0;
  forward(frame, tl.r.view);
  contactWorld(frame, tl.r.view, s.anchor, tmp);
  p[CH.x] = s.ax - tmp.x + offX;
  p[CH.y] = s.ay - tmp.y + offY;
  forward(frame, tl.r.view);
  if (!noIk && tl.ikTargets.length) {
    for (const t of tl.ikTargets) solveIk(frame, tl.r.view, t, t.x, t.y);
    forward(frame, tl.r.view);
  }
}

/**
 * Échantillonne la timeline au temps t (secondes, boucle) et remplit `frame`.
 * Le décalage de la racine dans les poses (x, y) est relatif à l'appui ; `frame.pose` contient la position finale.
 */
export function sample(tl: Timeline, t: number, frame: Frame): Frame {
  const total = tl.total;
  let tc = total > 0 ? t % total : 0;
  if (tc < 0) tc += total;
  let k = tl.segs.length - 1;
  for (let i = 0; i < tl.segs.length; i++) {
    const s = tl.segs[i]!;
    if (tc < s.start + s.dur) {
      k = i;
      break;
    }
  }
  const s = tl.segs[k]!;
  const x = s.dur > 0 ? Math.min(1, Math.max(0, (tc - s.start) / s.dur)) : 1;
  posePose(tl, s, x, frame);
  frame.seg = k;
  frame.phase = PHASE_CODE[s.phase];
  frame.say = SAYINGS.indexOf(s.say);
  const ramp = s.dur > 0 ? Math.min(1, (tc - s.start) / Math.min(0.35, s.dur)) : 1;
  frame.intensity = s.i0 + (s.i1 - s.i0) * (0.5 - 0.5 * Math.cos(Math.PI * ramp));
  frame.t = tc;
  return frame;
}

/** Temps (dans le cycle) où l'animation passe par la pose clé k (premier passage). */
export function timeOfKeyframe(tl: Timeline, k: number): number {
  const s = tl.segs.find((x) => x.from === k && x.dur > 0) ?? tl.segs.find((x) => x.from === k);
  if (s) return s.start;
  const e = tl.segs.find((x) => x.to === k);
  return e ? e.start + e.dur : 0;
}

/** Pose tenue d'un exercice isométrique : début du premier passage isométrique (sinon la pose de vignette). */
export function holdTime(tl: Timeline): number {
  const s = tl.segs.find((x) => x.phase === 'isométrique');
  return s ? s.start + Math.min(0.01, s.dur) : timeOfKeyframe(tl, tl.r.still);
}

// ---------------------------------------------------------------------------
// Cadre englobant
// ---------------------------------------------------------------------------

/** Taille par défaut du matériel posé dans le décor [largeur, hauteur]. */
export const PROP_SIZE: Record<'step' | 'bench' | 'chair' | 'wall' | 'mat' | 'ball' | 'pad' | 'box', [number, number]> = {
  step: [0.2 * H, 0.1 * H],
  bench: [0.36 * H, 0.25 * H],
  chair: [0.24 * H, 0.25 * H],
  wall: [0.025 * H, 1.15 * H],
  mat: [0.9 * H, 0.012 * H],
  ball: [0.36 * H, 0.36 * H],
  pad: [0.07 * H, 0.05 * H],
  box: [0.28 * H, 0.22 * H],
};

export type SceneryProp = Extract<Prop, { size?: unknown }>;
export function isScenery(p: Prop): p is SceneryProp {
  return Object.hasOwn(PROP_SIZE, p.kind);
}

function computeBounds(tl: Timeline): Timeline['bounds'] {
  const f = createFrame();
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = 0;
  let maxY = -Infinity;
  const steps = 48;
  const pt = { x: 0, y: 0 };
  for (let i = 0; i <= steps; i++) {
    sample(tl, (tl.total * i) / steps, f);
    for (let si = 0; si < N_SEGMENTS; si++) {
      const seg = SEGMENTS[si]!;
      for (const [u0, v0, u1, v1, r] of strokesOf(seg, tl.r.view)) {
        for (const [u, v] of [
          [u0, v0],
          [u1, v1],
        ] as const) {
          segPoint(f, si, u, v, pt);
          const pad = r + 4;
          minX = Math.min(minX, pt.x - pad);
          maxX = Math.max(maxX, pt.x + pad);
          minY = Math.min(minY, pt.y - pad);
          maxY = Math.max(maxY, pt.y + pad);
        }
      }
    }
  }
  for (const p of tl.r.props) {
    if (isScenery(p)) {
      const [w, h] = p.size ?? PROP_SIZE[p.kind];
      const x0 = p.kind === 'ball' ? p.at[0] - w / 2 : p.at[0];
      const y0 = p.kind === 'ball' ? p.at[1] - h / 2 : p.at[1];
      minX = Math.min(minX, x0 - 2);
      maxX = Math.max(maxX, x0 + w + 2);
      maxY = Math.max(maxY, y0 + h + 2);
    }
    if (p.kind === 'barbell') {
      minX -= 0.06 * H;
      maxX += 0.06 * H;
    }
  }
  return { minX, maxX, minY, maxY };
}
