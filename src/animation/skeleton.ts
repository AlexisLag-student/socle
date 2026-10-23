/**
 * Squelette 2D des animations : segments, longueurs, articulations et bornes physiologiques.
 *
 * Repère « monde » : unités arbitraires (taille du personnage = 180), y vers le haut, sol en y = 0.
 * Chaque segment a un repère local : origine à l'articulation proximale, axe u le long du segment,
 * axe v à +90° de u (sens trigonométrique). Côté éloigné en vue de face : axe v inversé (miroir),
 * ce qui permet de décrire une seule fois la géométrie et les zones musculaires des membres.
 *
 * Conventions d'angle (profil, personnage tourné vers la droite) : flexion positive.
 * Vue de face : abduction positive (le membre s'écarte de l'axe du corps), flexion latérale
 * du tronc positive vers le côté proche.
 */

/** Taille de référence du personnage (unités du monde). */
export const H = 180;

export const VIEWS = ['profile', 'face'] as const;
export type View = (typeof VIEWS)[number];

export const SIDES = ['N', 'F'] as const;
export type Side = (typeof SIDES)[number];

/** Articulations d'un côté (bras, avant-bras, main ; cuisse, jambe, pied). */
export const SIDED_JOINTS = ['shoulder', 'elbow', 'wrist', 'hip', 'knee', 'ankle'] as const;
export type SidedJoint = (typeof SIDED_JOINTS)[number];

/** Articulations centrales. */
export const CENTRAL_JOINTS = ['trunk', 'neck', 'head'] as const;
export type CentralJoint = (typeof CENTRAL_JOINTS)[number];

/** Segments latéraux (raccourci `fs` possible en vue de face). */
export const SIDED_SEGMENTS = ['upperArm', 'forearm', 'hand', 'thigh', 'shank', 'foot'] as const;
export type SidedSegment = (typeof SIDED_SEGMENTS)[number];

/**
 * Canaux d'une pose complète, dans un ordre fixe : position et inclinaison de la racine,
 * angles des articulations, raccourcis des segments latéraux.
 */
export const CHANNELS = [
  'x',
  'y',
  'tilt',
  ...CENTRAL_JOINTS,
  ...SIDED_JOINTS.flatMap((j) => [`${j}N`, `${j}F`] as const),
  ...SIDED_SEGMENTS.flatMap((s) => [`fs_${s}N`, `fs_${s}F`] as const),
] as const;
export type Channel = (typeof CHANNELS)[number];
export const CH: Record<Channel, number> = Object.fromEntries(CHANNELS.map((c, i) => [c, i])) as Record<Channel, number>;
export const N_CHANNELS = CHANNELS.length;

/** Canaux angulaires (interpolés par le plus court chemin). */
export const ANGLE_CHANNELS: readonly Channel[] = ['tilt', ...CENTRAL_JOINTS, ...SIDED_JOINTS.flatMap((j) => [`${j}N`, `${j}F`] as const)];
export const IS_ANGLE = CHANNELS.map((c) => ANGLE_CHANNELS.includes(c));

/** Bornes physiologiques (degrés), par vue. `tilt` = inclinaison du bassin, libre (le corps peut être couché). */
export const JOINT_BOUNDS: Record<View, Record<CentralJoint | SidedJoint, readonly [number, number]>> = {
  profile: {
    trunk: [-30, 60],
    neck: [-40, 50],
    head: [-30, 30],
    shoulder: [-60, 180],
    elbow: [0, 150],
    wrist: [-70, 80],
    hip: [-30, 140],
    knee: [0, 150],
    ankle: [-50, 30],
  },
  face: {
    trunk: [-40, 40],
    neck: [-40, 40],
    head: [-30, 30],
    shoulder: [-20, 180],
    elbow: [0, 150],
    wrist: [-70, 80],
    hip: [-25, 50],
    // Genou vu de face : flexion vue en raccourci (fs) ; l'angle frontal reste proche de 0 (genou dans l'axe du pied).
    knee: [-10, 10],
    ankle: [-30, 30],
  },
};

export type SegmentId =
  | 'pelvis'
  | 'trunk'
  | 'neck'
  | 'head'
  | `${SidedSegment}${Side}`;

export interface SegmentDef {
  id: SegmentId;
  parent: SegmentId | null;
  side: Side | null;
  /** Canal de l'angle de l'articulation proximale (null pour la racine). */
  joint: Channel | null;
  /** Sens de rotation d'un angle positif dans le repère du parent (1 = trigonométrique). */
  sign: 1 | -1;
  /** Direction au repos, relative à celle du parent (degrés). */
  rest: number;
  /** Longueur (unités) : position de l'articulation suivante sur l'axe u. */
  length: number;
  /** Point d'attache dans le repère du parent, par vue (côté proche ; le côté éloigné de face est symétrique). */
  attach: Record<View, readonly [number, number]>;
  /** Début de l'étendue dessinée sur l'axe u (le pied commence au talon, derrière la cheville). */
  u0: number;
  /** Étendue dessinée sur l'axe u (pour les zones musculaires). */
  span: number;
  /** Demi-largeur du segment (rayon du trait épais). */
  radius: Record<View, number>;
  /** Raccourci autorisé (vue de face). */
  fs: Channel | null;
}

const L = {
  pelvis: 0.09 * H,
  trunk: 0.2 * H,
  neck: 0.05 * H,
  head: 0.065 * H,
  upperArm: 0.186 * H,
  forearm: 0.146 * H,
  hand: 0.108 * H,
  thigh: 0.245 * H,
  shank: 0.246 * H,
  foot: 0.152 * H,
};
/** Hauteur de la cheville au-dessus du sol. */
export const ANKLE_H = 0.039 * H;
export const LENGTHS = L;

const side = (s: SidedSegment, sd: Side, def: Omit<SegmentDef, 'id' | 'side' | 'parent' | 'joint' | 'fs'> & { parent: string; joint: SidedJoint }): SegmentDef => ({
  ...def,
  id: `${s}${sd}`,
  side: sd,
  parent: (def.parent === 'trunk' || def.parent === 'pelvis' ? def.parent : `${def.parent}${sd}`) as SegmentId,
  joint: `${def.joint}${sd}` as Channel,
  fs: `fs_${s}${sd}` as Channel,
});

function sidedSegments(sd: Side): SegmentDef[] {
  return [
    side('thigh', sd, { parent: 'pelvis', joint: 'hip', sign: 1, rest: 180, length: L.thigh, attach: { profile: [0, 0], face: [0, -0.05 * H] }, u0: 0, span: L.thigh, radius: { profile: 0.05 * H, face: 0.048 * H } }),
    side('shank', sd, { parent: 'thigh', joint: 'knee', sign: -1, rest: 0, length: L.shank, attach: { profile: [L.thigh, 0], face: [L.thigh, 0] }, u0: 0, span: L.shank, radius: { profile: 0.036 * H, face: 0.034 * H } }),
    side('foot', sd, { parent: 'shank', joint: 'ankle', sign: 1, rest: 90, length: 0.75 * L.foot, attach: { profile: [L.shank, 0], face: [L.shank, 0] }, u0: -0.25 * L.foot, span: L.foot, radius: { profile: 0.018 * H, face: 0.018 * H } }),
    side('upperArm', sd, { parent: 'trunk', joint: 'shoulder', sign: 1, rest: 180, length: L.upperArm, attach: { profile: [0.92 * L.trunk, 0], face: [0.92 * L.trunk, -0.1 * H] }, u0: 0, span: L.upperArm, radius: { profile: 0.031 * H, face: 0.03 * H } }),
    side('forearm', sd, { parent: 'upperArm', joint: 'elbow', sign: 1, rest: 0, length: L.forearm, attach: { profile: [L.upperArm, 0], face: [L.upperArm, 0] }, u0: 0, span: L.forearm, radius: { profile: 0.026 * H, face: 0.025 * H } }),
    side('hand', sd, { parent: 'forearm', joint: 'wrist', sign: 1, rest: 0, length: 0.7 * L.hand, attach: { profile: [L.forearm, 0], face: [L.forearm, 0] }, u0: 0, span: 0.7 * L.hand, radius: { profile: 0.021 * H, face: 0.021 * H } }),
  ];
}

/**
 * Segments dans l'ordre de calcul (parents avant enfants).
 * Le bassin est la racine : son origine est le centre des hanches.
 */
export const SEGMENTS: SegmentDef[] = [
  { id: 'pelvis', parent: null, side: null, joint: null, sign: -1, rest: 90, length: L.pelvis, attach: { profile: [0, 0], face: [0, 0] }, u0: -0.02 * H, span: L.pelvis + 0.02 * H, radius: { profile: 0.062 * H, face: 0.07 * H }, fs: null },
  { id: 'trunk', parent: 'pelvis', side: null, joint: 'trunk', sign: -1, rest: 0, length: L.trunk, attach: { profile: [L.pelvis, 0], face: [L.pelvis, 0] }, u0: 0, span: L.trunk, radius: { profile: 0.068 * H, face: 0.085 * H }, fs: null },
  { id: 'neck', parent: 'trunk', side: null, joint: 'neck', sign: -1, rest: 0, length: L.neck, attach: { profile: [L.trunk, 0], face: [L.trunk, 0] }, u0: 0, span: L.neck, radius: { profile: 0.024 * H, face: 0.026 * H }, fs: null },
  { id: 'head', parent: 'neck', side: null, joint: 'head', sign: -1, rest: 0, length: 2 * L.head, attach: { profile: [L.neck, 0], face: [L.neck, 0] }, u0: 0, span: 2 * L.head, radius: { profile: L.head, face: L.head }, fs: null },
  ...sidedSegments('F'),
  ...sidedSegments('N'),
];
export const SEG_INDEX = Object.fromEntries(SEGMENTS.map((s, i) => [s.id, i])) as Record<SegmentId, number>;
export const N_SEGMENTS = SEGMENTS.length;

/** Miroir du repère local : côté éloigné en vue de face. */
export function mirrorOf(seg: SegmentDef, view: View): 1 | -1 {
  return view === 'face' && seg.side === 'F' ? -1 : 1;
}

/**
 * Traits épais dessinant chaque segment (repère local) : [u0, v0, u1, v1] ; rayon = celui du segment.
 * Le pied : semelle (relevée du rayon pour que le dessous touche le sol) et talon relié à la cheville.
 */
export function strokesOf(seg: SegmentDef, view: View): [number, number, number, number, number][] {
  const r = seg.radius[view];
  const id = seg.id.replace(/[NF]$/, '');
  if (id === 'foot') {
    if (view === 'face') {
      // Vu de face, le pied pointe vers l'observateur : courte semelle sous la cheville.
      return [
        [0, 0, 0, -ANKLE_H + r, r],
        [-0.012 * H, -ANKLE_H + r, 0.03 * H, -ANKLE_H + r, r],
      ];
    }
    return [
      [0, 0, -0.18 * L.foot, -ANKLE_H + r, r * 1.25],
      [-0.25 * L.foot + r, -ANKLE_H + r, 0.75 * L.foot - r, -ANKLE_H + r, r],
    ];
  }
  if (id === 'pelvis') {
    return view === 'face'
      ? [[0.03 * H, -0.035 * H, 0.03 * H, 0.035 * H, r]]
      : [[0.01 * H, 0, 0.06 * H, 0, r]];
  }
  if (id === 'trunk') return [[0.12 * L.trunk, 0, 0.82 * L.trunk, 0, r]];
  if (id === 'head') return [[L.head, view === 'profile' ? -0.004 * H : 0, L.head, view === 'profile' ? -0.004 * H : 0, r]];
  if (id === 'hand') return [[0, 0, 0.55 * L.hand, 0, r]];
  return [[0, 0, seg.length, 0, r]];
}

/** Points de contact possibles : segment, point local, hauteur au-dessus de la surface quand il touche. */
export const CONTACT_POINTS = ['heel', 'toe', 'mid', 'knee', 'hand', 'elbow', 'shoulder', 'seat'] as const;
export type ContactKind = (typeof CONTACT_POINTS)[number];
export type ContactPoint = `${Exclude<ContactKind, 'shoulder' | 'seat'>}${Side}` | 'shoulder' | 'seat';

export interface ContactDef {
  seg: SegmentId;
  /** Point local [u, v] (v exprimé tel quel, dans le repère éventuellement en miroir). */
  at: Record<View, readonly [number, number]>;
  /** Hauteur du point au-dessus de la surface quand le contact est établi (rayon du trait). */
  lift: number;
}

export function contactDef(p: ContactPoint): ContactDef {
  const sd = (p.endsWith('N') ? 'N' : 'F') as Side;
  const kind = p.replace(/[NF]$/, '') as ContactKind;
  const foot = SEGMENTS[SEG_INDEX[`foot${sd}`]]!;
  switch (kind) {
    case 'heel':
      return { seg: foot.id, at: { profile: [-0.22 * L.foot, -ANKLE_H], face: [-0.008 * H, -ANKLE_H] }, lift: 0 };
    case 'toe':
      return { seg: foot.id, at: { profile: [0.72 * L.foot, -ANKLE_H], face: [0.03 * H, -ANKLE_H] }, lift: 0 };
    case 'mid':
      return { seg: foot.id, at: { profile: [0.25 * L.foot, -ANKLE_H], face: [0.01 * H, -ANKLE_H] }, lift: 0 };
    case 'knee': {
      const s = SEGMENTS[SEG_INDEX[`shank${sd}`]]!;
      // Profil : devant du genou (à genoux) ; face : bord externe du genou (gainage latéral sur les genoux).
      return { seg: s.id, at: { profile: [0.06 * L.shank, s.radius.profile], face: [0.04 * L.shank, s.radius.face] }, lift: 0 };
    }
    case 'hand': {
      const s = SEGMENTS[SEG_INDEX[`hand${sd}`]]!;
      return { seg: s.id, at: { profile: [0.3 * L.hand, 0], face: [0.3 * L.hand, 0] }, lift: s.radius.profile };
    }
    case 'elbow': {
      const s = SEGMENTS[SEG_INDEX[`forearm${sd}`]]!;
      return { seg: s.id, at: { profile: [0.1 * L.forearm, 0], face: [0, 0] }, lift: s.radius.profile };
    }
    case 'shoulder': {
      const t = SEGMENTS[SEG_INDEX.trunk]!;
      return { seg: 'trunk', at: { profile: [0.75 * L.trunk, t.radius.profile], face: [0.75 * L.trunk, 0] }, lift: 0 };
    }
    case 'seat': {
      const pv = SEGMENTS[SEG_INDEX.pelvis]!;
      return { seg: 'pelvis', at: { profile: [0.01 * H, pv.radius.profile], face: [0, 0] }, lift: 0 };
    }
  }
}

/**
 * Pose neutre (debout, bras le long du corps), point de départ des poses clés.
 * x, y = 0 : la racine est placée par le point d'appui (x, y d'une pose sont des décalages).
 */
export function neutralPose(view: View): Float64Array {
  const p = new Float64Array(N_CHANNELS);
  for (const s of SIDED_SEGMENTS) {
    p[CH[`fs_${s}N`]] = 1;
    p[CH[`fs_${s}F`]] = 1;
  }
  if (view === 'profile') {
    p[CH.shoulderN] = 4;
    p[CH.shoulderF] = 4;
    p[CH.elbowN] = 8;
    p[CH.elbowF] = 8;
  } else {
    p[CH.shoulderN] = 6;
    p[CH.shoulderF] = 6;
  }
  return p;
}
