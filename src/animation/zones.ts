/**
 * Zones musculaires dessinées sur le personnage animé : chaque muscle (id stable de src/domain/ids.ts)
 * est posé sur un segment, entre deux fractions de sa longueur, sur une face.
 *
 * Faces : `ant` / `post` (avant / arrière), `lat` / `med` (dehors / dedans), `mid` (au centre du segment),
 * `both` (deux côtés du tronc, vue de face). En profil, on voit la face latérale du côté proche :
 * les muscles latéraux sont donc au centre (`mid`). Un muscle sans zone dans une vue n'est pas dessiné
 * sur le personnage (il reste sur le schéma musculaire de la fiche).
 */
import type { MuscleId } from '@/domain/ids';
import type { Exercise } from '@/domain/schema';
import { isDeep, isTendon } from '@/components/anatomy/figure';
import type { Animation } from './schema';
import type { View } from './skeleton';

export type ZoneSeg = 'pelvis' | 'trunk' | 'neck' | 'upperArm' | 'forearm' | 'hand' | 'thigh' | 'shank' | 'foot';
export type Face = 'ant' | 'post' | 'lat' | 'med' | 'mid' | 'both' | 'plantar';

export interface Zone {
  seg: ZoneSeg;
  from: number;
  to: number;
  face: Face;
  /** Épaisseur relative (1 = jusqu'au bord du segment). */
  w?: number;
}

type Z = [ZoneSeg, number, number, Face, number?];
const z = (list: Z[]): Zone[] => list.map(([seg, from, to, face, w]) => ({ seg, from, to, face, w }));

/** [profil, face] ; `null` = non visible dans cette vue. */
const TABLE: Record<MuscleId, [Z[] | null, Z[] | null]> = {
  // Pied
  'plantar-fascia': [[['foot', 0.05, 0.85, 'plantar', 0.5]], [['foot', 0.1, 0.9, 'plantar', 0.5]]],
  'abductor-hallucis': [[['foot', 0.15, 0.7, 'plantar', 0.8]], [['foot', 0, 0.5, 'plantar', 0.8]]],
  'flexor-digitorum-brevis': [[['foot', 0.25, 0.8, 'plantar', 0.8]], [['foot', 0.2, 0.9, 'plantar', 0.8]]],
  'quadratus-plantae': [[['foot', 0.15, 0.55, 'plantar', 0.7]], [['foot', 0.2, 0.7, 'plantar', 0.7]]],
  'abductor-digiti-minimi': [[['foot', 0.1, 0.75, 'plantar', 0.7]], [['foot', 0.5, 1, 'plantar', 0.7]]],
  // Jambe
  'gastrocnemius-medial': [[['shank', 0.06, 0.52, 'post']], [['shank', 0.08, 0.5, 'med']]],
  'gastrocnemius-lateral': [[['shank', 0.08, 0.48, 'post', 0.85]], [['shank', 0.1, 0.45, 'lat']]],
  soleus: [[['shank', 0.35, 0.8, 'post', 0.75]], [['shank', 0.4, 0.8, 'lat', 0.6], ['shank', 0.4, 0.8, 'med', 0.6]]],
  'achilles-tendon': [[['shank', 0.78, 1, 'post', 0.45]], null],
  'tibialis-anterior': [[['shank', 0.08, 0.75, 'ant', 0.8]], [['shank', 0.08, 0.75, 'mid', 0.6]]],
  'tibialis-posterior': [[['shank', 0.3, 0.85, 'post', 0.5]], [['shank', 0.3, 0.85, 'med', 0.5]]],
  'fibularis-longus': [[['shank', 0.08, 0.6, 'mid', 0.6]], [['shank', 0.08, 0.6, 'lat', 0.7]]],
  'fibularis-brevis': [[['shank', 0.5, 0.88, 'mid', 0.6]], [['shank', 0.5, 0.88, 'lat', 0.7]]],
  'extensor-digitorum-longus': [[['shank', 0.15, 0.85, 'ant', 0.55]], [['shank', 0.15, 0.85, 'mid', 0.5]]],
  'flexor-hallucis-longus': [[['shank', 0.5, 0.92, 'post', 0.5]], [['shank', 0.5, 0.92, 'med', 0.45]]],
  'flexor-digitorum-longus': [[['shank', 0.35, 0.85, 'post', 0.45]], [['shank', 0.35, 0.85, 'med', 0.45]]],
  // Cuisse et genou
  'rectus-femoris': [[['thigh', 0.08, 0.85, 'ant', 0.85]], [['thigh', 0.08, 0.85, 'mid', 0.6]]],
  'vastus-lateralis': [[['thigh', 0.15, 0.9, 'mid', 0.75]], [['thigh', 0.15, 0.9, 'lat']]],
  'vastus-medialis': [[['thigh', 0.58, 0.94, 'ant', 0.9]], [['thigh', 0.55, 0.94, 'med']]],
  'vastus-intermedius': [[['thigh', 0.2, 0.85, 'ant', 0.55]], [['thigh', 0.2, 0.85, 'mid', 0.4]]],
  'patellar-tendon': [[['shank', 0, 0.16, 'ant', 0.55]], [['shank', 0, 0.16, 'mid', 0.4]]],
  'biceps-femoris': [[['thigh', 0.15, 0.92, 'post', 0.9]], null],
  semitendinosus: [[['thigh', 0.1, 0.85, 'post', 0.65]], null],
  semimembranosus: [[['thigh', 0.3, 0.92, 'post', 0.5]], null],
  sartorius: [[['thigh', 0.02, 0.95, 'ant', 0.35]], [['thigh', 0.02, 0.95, 'med', 0.4]]],
  gracilis: [null, [['thigh', 0.05, 0.98, 'med', 0.45]]],
  'adductor-longus': [null, [['thigh', 0.02, 0.45, 'med', 0.9]]],
  'adductor-magnus': [[['thigh', 0.05, 0.55, 'post', 0.55]], [['thigh', 0.05, 0.6, 'med', 0.7]]],
  'tensor-fasciae-latae': [[['thigh', 0, 0.25, 'mid', 0.7]], [['thigh', 0, 0.25, 'lat', 0.9]]],
  'it-band': [[['thigh', 0.25, 1, 'mid', 0.35]], [['thigh', 0.25, 1, 'lat', 0.4]]],
  // Hanche
  'glute-max': [[['pelvis', 0, 0.95, 'post']], null],
  'glute-med': [[['pelvis', 0.35, 1, 'mid', 0.8]], [['pelvis', 0.25, 0.95, 'both', 0.6]]],
  'glute-min': [[['pelvis', 0.4, 0.95, 'mid', 0.5]], [['pelvis', 0.3, 0.9, 'both', 0.4]]],
  piriformis: [[['pelvis', 0.1, 0.5, 'post', 0.5]], null],
  'deep-hip-rotators': [[['pelvis', 0, 0.4, 'post', 0.45]], null],
  iliopsoas: [[['pelvis', 0.1, 1, 'ant', 0.5], ['thigh', 0, 0.15, 'ant', 0.5]], [['pelvis', 0.1, 0.9, 'mid', 0.4]]],
  // Tronc
  'rectus-abdominis': [[['trunk', 0, 0.75, 'ant', 0.6]], [['trunk', 0, 0.75, 'mid', 0.35]]],
  'external-oblique': [[['trunk', 0, 0.6, 'mid', 0.6]], [['trunk', 0, 0.6, 'both', 0.5]]],
  'internal-oblique': [[['trunk', 0, 0.45, 'mid', 0.5]], [['trunk', 0, 0.45, 'both', 0.4]]],
  'transversus-abdominis': [[['trunk', 0, 0.4, 'ant', 0.45]], [['trunk', 0, 0.4, 'mid', 0.6]]],
  'erector-spinae': [[['trunk', 0, 0.9, 'post', 0.55], ['pelvis', 0.6, 1, 'post', 0.5]], null],
  multifidus: [[['trunk', 0, 0.4, 'post', 0.4], ['pelvis', 0.5, 1, 'post', 0.4]], null],
  'quadratus-lumborum': [[['trunk', 0, 0.3, 'post', 0.7]], [['trunk', 0, 0.3, 'both', 0.45]]],
  'latissimus-dorsi': [[['trunk', 0.3, 0.85, 'post', 0.85]], [['trunk', 0.3, 0.85, 'both', 0.5]]],
  // Épaules, cou, membres supérieurs
  'pectoralis-major': [[['trunk', 0.62, 0.95, 'ant', 0.8]], [['trunk', 0.62, 0.95, 'mid', 0.8]]],
  'serratus-anterior': [[['trunk', 0.45, 0.8, 'mid', 0.6]], [['trunk', 0.45, 0.8, 'both', 0.45]]],
  'trapezius-upper': [[['neck', 0, 1, 'post', 0.9]], [['neck', 0, 1, 'both', 0.9]]],
  'trapezius-middle': [[['trunk', 0.7, 0.98, 'post', 0.8]], null],
  'trapezius-lower': [[['trunk', 0.45, 0.85, 'post', 0.7]], null],
  rhomboids: [[['trunk', 0.6, 0.92, 'post', 0.5]], null],
  'levator-scapulae': [[['neck', 0, 1, 'mid', 0.6]], [['neck', 0, 1, 'both', 0.5]]],
  'deltoid-anterior': [[['upperArm', 0, 0.38, 'ant', 0.8]], [['upperArm', 0, 0.38, 'mid', 0.7]]],
  'deltoid-lateral': [[['upperArm', 0, 0.38, 'mid', 0.8]], [['upperArm', 0, 0.38, 'lat']]],
  'deltoid-posterior': [[['upperArm', 0, 0.38, 'post', 0.8]], null],
  'rotator-cuff': [[['upperArm', 0, 0.2, 'mid', 0.5]], [['upperArm', 0, 0.2, 'lat', 0.5]]],
  sternocleidomastoid: [[['neck', 0, 1, 'ant', 0.8]], [['neck', 0, 1, 'mid', 0.6]]],
  'deep-neck-flexors': [[['neck', 0, 1, 'ant', 0.5]], [['neck', 0, 1, 'mid', 0.35]]],
  'neck-extensors': [[['neck', 0, 1, 'post', 0.6]], null],
  'biceps-brachii': [[['upperArm', 0.25, 0.9, 'ant', 0.85]], [['upperArm', 0.25, 0.9, 'med', 0.7]]],
  'triceps-brachii': [[['upperArm', 0.15, 0.9, 'post', 0.85]], [['upperArm', 0.15, 0.9, 'lat', 0.6]]],
  'forearm-flexors': [[['forearm', 0.05, 0.7, 'ant', 0.8]], [['forearm', 0.05, 0.7, 'med', 0.7]]],
  'forearm-extensors': [[['forearm', 0.05, 0.7, 'post', 0.8]], [['forearm', 0.05, 0.7, 'lat', 0.7]]],
  'hand-intrinsics': [[['hand', 0.1, 0.9, 'mid', 0.6]], [['hand', 0.1, 0.9, 'mid', 0.6]]],
};

export function zonesFor(id: MuscleId, view: View): Zone[] {
  const entry = TABLE[id][view === 'profile' ? 0 : 1];
  return entry ? z(entry) : [];
}

export type AnimRole = 'primary' | 'secondary';

export interface AnimMuscle {
  id: MuscleId;
  role: AnimRole;
  deep: boolean;
  tendon: boolean;
  zones: Zone[];
}

/**
 * Muscles dessinés sur le personnage : ceux de l'exercice (rôles repris du contenu), éventuellement
 * restreints par l'animation. Les muscles sans zone dans la vue sont écartés.
 */
export function animationMuscles(ex: Pick<Exercise, 'muscles'>, view: View, only?: Animation['muscles']): AnimMuscle[] {
  const all: [MuscleId, AnimRole][] = [...ex.muscles.primary.map((m) => [m, 'primary'] as [MuscleId, AnimRole]), ...ex.muscles.secondary.map((m) => [m, 'secondary'] as [MuscleId, AnimRole])];
  return all
    .filter(([id]) => !only || only.includes(id))
    .map(([id, role]) => ({ id, role, deep: isDeep(id), tendon: isTendon(id), zones: zonesFor(id, view) }))
    .filter((m) => m.zones.length > 0);
}

/** Côté de la face dans le repère local du segment (+1 = côté v positif), selon la vue. */
export function faceSign(seg: ZoneSeg, face: Face, view: View): number[] {
  if (face === 'mid') return [0];
  if (face === 'both') return [1, -1];
  // Segments orientés vers le haut (bassin, tronc, cou) : v positif = arrière en profil.
  const up = seg === 'pelvis' || seg === 'trunk' || seg === 'neck';
  if (view === 'profile') {
    if (seg === 'foot') return [face === 'plantar' ? -1 : 1];
    if (face === 'ant') return [up ? -1 : 1];
    if (face === 'post') return [up ? 1 : -1];
    return [0];
  }
  if (seg === 'foot') return [-1];
  if (face === 'lat') return [up ? -1 : 1];
  if (face === 'med') return [up ? 1 : -1];
  return [0];
}
