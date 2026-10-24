/**
 * Schéma Zod des animations d'exercices (un fichier par exercice dans src/animation/data/).
 * Objets stricts : une clé inconnue (faute de frappe sur une articulation) fait échouer la validation.
 */
import { z } from 'zod';
import { MuscleIdSchema } from '@/domain/schema';
import { CHANNELS, CONTACT_POINTS, SIDED_JOINTS, SIDED_SEGMENTS, SIDES, VIEWS } from './skeleton';

export const PHASES = ['excentrique', 'pause', 'concentrique', 'isométrique', 'retour'] as const;
export type AnimPhase = (typeof PHASES)[number];

export const EASINGS = ['easeInOut', 'linear', 'easeIn', 'easeOut'] as const;
export type Easing = (typeof EASINGS)[number];

/** Annotations manuscrites de phase (clés i18n `anim.say.*`). */
export const SAYINGS = ['lower', 'brake', 'hold', 'push', 'rise', 'return', 'land', 'jump', 'step', 'lift', 'flatBack'] as const;
export type Saying = (typeof SAYINGS)[number];

/**
 * Clés d'une pose : les canaux du squelette (`kneeN`, `fs_forearmN`…), plus des raccourcis
 * sans suffixe qui s'appliquent aux deux côtés (`knee`, `fs_shank`).
 */
export const POSE_KEYS = [...CHANNELS, ...SIDED_JOINTS, ...SIDED_SEGMENTS.map((s) => `fs_${s}` as const)] as const;
export type PoseKey = (typeof POSE_KEYS)[number];
export const PoseSchema = z.partialRecord(z.enum(POSE_KEYS), z.number().finite());
export type Pose = z.infer<typeof PoseSchema>;

const sidedContacts = CONTACT_POINTS.filter((c) => c !== 'shoulder' && c !== 'seat').flatMap((c) => SIDES.map((s) => `${c}${s}` as const));
export const ContactPointSchema = z.enum([...sidedContacts, 'shoulder', 'seat']);

const vec2 = z.tuple([z.number().finite(), z.number().finite()]);

export const KeyframeSchema = z.strictObject({
  /** Changements par rapport à la pose précédente (la première part de la pose neutre). */
  pose: PoseSchema,
  /** Durée vers la pose suivante, en secondes (vitesse 1×). */
  dur: z.number().min(0).max(10),
  ease: z.enum(EASINGS).optional(),
  phase: z.enum(PHASES),
  /** Annotation affichée pendant ce passage (sinon déduite de la phase). */
  say: z.enum(SAYINGS).optional(),
  /** Point d'appui qui place la racine pendant ce passage (sinon celui de l'animation). */
  anchor: ContactPointSchema.optional(),
});
export type Keyframe = z.infer<typeof KeyframeSchema>;

export const ContactSchema = z.strictObject({
  point: ContactPointSchema,
  /** Hauteur de la surface d'appui (0 = sol ; ex. hauteur d'une marche). */
  y: z.number().min(0).optional(),
  /**
   * Le contact n'existe qu'entre ces poses clés (incluses ; index dans la liste résolue).
   * `from` > `to` : la fenêtre fait le tour du cycle (ex. appui partout sauf pendant l'envol).
   */
  from: z.number().int().min(0).optional(),
  to: z.number().int().min(0).optional(),
});
export type Contact = z.infer<typeof ContactSchema>;

const SEGMENT_REFS = ['pelvis', 'trunk', 'neck', 'head', ...SIDED_SEGMENTS.flatMap((s) => SIDES.map((d) => `${s}${d}` as const))] as const;
export const SegmentRefSchema = z.enum(SEGMENT_REFS);

/** Point dans le repère d'un segment : u en fraction de l'étendue dessinée, v en rayons (+1 = bord du côté v). */
export const PointRefSchema = z.union([
  z.strictObject({ seg: SegmentRefSchema, u: z.number().min(-0.5).max(1.5), v: z.number().min(-3).max(3).optional() }),
  z.strictObject({ world: vec2 }),
]);
export type PointRef = z.infer<typeof PointRefSchema>;

export const PropSchema = z.discriminatedUnion('kind', [
  z.strictObject({
    kind: z.enum(['dumbbell', 'kettlebell', 'barbell', 'stick']),
    attach: SegmentRefSchema,
    /** Position dans le repère du segment (u en fraction, v en rayons). Par défaut : dans la main. */
    at: vec2.optional(),
    /** Haltère vu dans l'axe (rond) ou de côté (barre verticale). */
    axis: z.enum(['depth', 'vertical']).optional(),
  }),
  z.strictObject({ kind: z.literal('band'), from: PointRefSchema, to: PointRefSchema }),
  z.strictObject({
    kind: z.enum(['step', 'bench', 'chair', 'wall', 'mat', 'ball', 'pad', 'box']),
    /** Coin bas gauche (ou centre pour le ballon), repère du monde. */
    at: vec2,
    size: vec2.optional(),
    /** Mur : maçonnerie à gauche du trait (personnage dos au mur, à droite du mur). */
    flip: z.boolean().optional(),
  }),
]);
export type Prop = z.infer<typeof PropSchema>;

export const IkSchema = z.strictObject({
  limb: z.enum(['legN', 'legF', 'armN', 'armF']),
  /**
   * Point gardé fixe : x de la première pose, y = hauteur de la surface (`y`, 0 par défaut) pour un appui
   * (talon, pointe, milieu du pied, main). L'orientation du pied ou de la main suit les poses clés.
   */
  pin: z.enum(['heel', 'toe', 'mid', 'ankle', 'hand', 'wrist']),
  y: z.number().min(0).optional(),
  /** Le pied (ou la main) garde l'orientation de la première pose : reste à plat. */
  flat: z.boolean().optional(),
});
export type Ik = z.infer<typeof IkSchema>;

export const AnchorSchema = z.strictObject({
  point: ContactPointSchema,
  /** Position du point d'appui dans le monde (x, et y = hauteur de la surface). */
  x: z.number().optional(),
  y: z.number().min(0).optional(),
});
export type Anchor = z.infer<typeof AnchorSchema>;

export const OverrideSchema = z.strictObject({
  /** S'applique à ces niveaux de progression… */
  levels: z.array(z.number().int().min(1).max(5)).optional(),
  /** … et/ou à ces variantes de matériel (ids de l'exercice). */
  variants: z.array(z.string()).optional(),
  /** Retouche appliquée à toutes les poses (ex. position des bras qui tiennent une charge). */
  pose: PoseSchema.optional(),
  /** Nouvelles poses clés : seulement si le mouvement change. */
  keyframes: z.array(KeyframeSchema).min(2).optional(),
  /** Matériel ajouté. */
  props: z.array(PropSchema).optional(),
  /** Remplace les contacts (avec de nouvelles poses clés). */
  contacts: z.array(ContactSchema).optional(),
  anchor: AnchorSchema.optional(),
  ik: z.array(IkSchema).optional(),
  still: z.number().int().min(0).optional(),
  loop: z.enum(['cycle', 'pingpong']).optional(),
  side: z.enum(['bilateral', 'unilateral']).optional(),
});
export type Override = z.infer<typeof OverrideSchema>;

export const AnimationSchema = z
  .strictObject({
    exerciseId: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    view: z.enum(VIEWS),
    /** `cycle` : la dernière pose revient à la première ; `pingpong` : aller-retour. */
    loop: z.enum(['cycle', 'pingpong']),
    /** Unilatéral : bouton « changer de côté » (miroir). */
    side: z.enum(['bilateral', 'unilateral']),
    anchor: AnchorSchema,
    ik: z.array(IkSchema).optional(),
    /** Pose clé de la vignette (sinon celle du milieu). */
    still: z.number().int().min(0).optional(),
    keyframes: z.array(KeyframeSchema).min(2),
    contacts: z.array(ContactSchema),
    props: z.array(PropSchema).optional(),
    /**
     * Vue de face, cuisse hors du plan (couché sur le côté, assis face à l'observateur) : l'angle du genou dessiné est
     * une projection, la borne frontale du genou (genou dans l'axe du pied, debout) ne s'applique pas.
     */
    projectedKnee: z.boolean().optional(),
    /** Restreint les muscles dessinés (sous-ensemble des muscles de l'exercice ; rôles repris de l'exercice). */
    muscles: z.array(MuscleIdSchema).optional(),
    overrides: z.array(OverrideSchema).optional(),
  })
  .superRefine((a, ctx) => {
    const check = (kfs: Keyframe[], still: number | undefined, path: (string | number)[]) => {
      if (still !== undefined && still >= kfs.length) ctx.addIssue({ code: 'custom', path: [...path, 'still'], message: 'pose de vignette hors de la liste' });
    };
    check(a.keyframes, a.still, []);
    a.overrides?.forEach((o, i) => {
      if (!o.levels && !o.variants) ctx.addIssue({ code: 'custom', path: ['overrides', i], message: 'une surcharge doit préciser des niveaux ou des variantes' });
      check(o.keyframes ?? a.keyframes, o.still, ['overrides', i]);
    });
  });
export type Animation = z.infer<typeof AnimationSchema>;

/** Identité typée : autocomplétion des articulations et du matériel à l'écriture. */
export const defineAnimation = (a: Animation): Animation => a;
