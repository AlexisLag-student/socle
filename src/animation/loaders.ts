/**
 * Chargement paresseux des animations, une par exercice (petit fichier précaché par le service worker).
 * Ajouter une animation = créer src/animation/data/<id>.ts et l'inscrire ici.
 */
import type { Animation } from './schema';

type Loader = () => Promise<{ default: Animation }>;

export const animationLoaders: Record<string, Loader> = {
  squat: () => import('./data/squat'),
  'split-squat': () => import('./data/split-squat'),
  'calf-raise-straight-knee': () => import('./data/calf-raise-straight-knee'),
  'glute-bridge': () => import('./data/glute-bridge'),
  'side-plank': () => import('./data/side-plank'),
  'nordic-hamstring': () => import('./data/nordic-hamstring'),
  'romanian-deadlift': () => import('./data/romanian-deadlift'),
  'lateral-band-walk': () => import('./data/lateral-band-walk'),
  'step-up': () => import('./data/step-up'),
  'countermovement-jump': () => import('./data/countermovement-jump'),
  'calf-raise-bent-knee': () => import('./data/calf-raise-bent-knee'),
  'calf-isometric-hold': () => import('./data/calf-isometric-hold'),
  'eccentric-heel-drop': () => import('./data/eccentric-heel-drop'),
  'windlass-heel-raise': () => import('./data/windlass-heel-raise'),
  'ball-squeeze-heel-raise': () => import('./data/ball-squeeze-heel-raise'),
  'calf-raise-explosive': () => import('./data/calf-raise-explosive'),
  'seated-soleus-isometric': () => import('./data/seated-soleus-isometric'),
  'band-plantar-flexion': () => import('./data/band-plantar-flexion'),
  'toe-walk-carry': () => import('./data/toe-walk-carry'),
  'pogo-hops': () => import('./data/pogo-hops'),
  'single-leg-balance': () => import('./data/single-leg-balance'),
  'hop-stabilization': () => import('./data/hop-stabilization'),
  'star-excursion-reach': () => import('./data/star-excursion-reach'),
  'tibialis-anterior-raise': () => import('./data/tibialis-anterior-raise'),
  'heel-walk': () => import('./data/heel-walk'),
  'knee-to-wall-mobility': () => import('./data/knee-to-wall-mobility'),
  'line-hops': () => import('./data/line-hops'),
  'plantar-fascia-stretch': () => import('./data/plantar-fascia-stretch'),
  'calf-wall-stretch': () => import('./data/calf-wall-stretch'),
  'ankling-drill': () => import('./data/ankling-drill'),
  'jump-rope': () => import('./data/jump-rope'),
  'band-ankle-eversion': () => import('./data/band-ankle-eversion'),
  'lunge': () => import('./data/lunge'),
  'step-down': () => import('./data/step-down'),
  'single-leg-squat': () => import('./data/single-leg-squat'),
  'leg-extension': () => import('./data/leg-extension'),
  'isometric-knee-extension': () => import('./data/isometric-knee-extension'),
  'wall-sit': () => import('./data/wall-sit'),
  'spanish-squat': () => import('./data/spanish-squat'),
  'leg-press': () => import('./data/leg-press'),
  'decline-squat': () => import('./data/decline-squat'),
  'terminal-knee-extension': () => import('./data/terminal-knee-extension'),
  'straight-leg-raise': () => import('./data/straight-leg-raise'),
  'reverse-nordic': () => import('./data/reverse-nordic'),
  'backward-sled-drag': () => import('./data/backward-sled-drag'),
  'side-lying-hip-abduction': () => import('./data/side-lying-hip-abduction'),
  'side-plank-hip-abduction': () => import('./data/side-plank-hip-abduction'),
  'clamshell': () => import('./data/clamshell'),
  'hip-hike': () => import('./data/hip-hike'),
  'hip-flexor-march': () => import('./data/hip-flexor-march'),
  'hip-flexor-isometric': () => import('./data/hip-flexor-isometric'),
  'hip-flexor-stretch': () => import('./data/hip-flexor-stretch'),
  'glute-kickback': () => import('./data/glute-kickback'),
  'hip-abduction-isometric': () => import('./data/hip-abduction-isometric'),
  'seated-hip-external-rotation': () => import('./data/seated-hip-external-rotation'),
  'single-leg-deadlift': () => import('./data/single-leg-deadlift'),
  'leg-curl': () => import('./data/leg-curl'),
  'hamstring-bridge': () => import('./data/hamstring-bridge'),
  'askling-extender': () => import('./data/askling-extender'),
  'askling-glider': () => import('./data/askling-glider'),
  'adductor-squeeze': () => import('./data/adductor-squeeze'),
  'hamstring-slider-curl': () => import('./data/hamstring-slider-curl'),
  'hamstring-isometric-hold': () => import('./data/hamstring-isometric-hold'),
  'copenhagen-adductor': () => import('./data/copenhagen-adductor'),
  'side-lying-hip-adduction': () => import('./data/side-lying-hip-adduction'),
  'standing-hip-adduction': () => import('./data/standing-hip-adduction'),
  'lateral-lunge': () => import('./data/lateral-lunge'),
  'bird-dog': () => import('./data/bird-dog'),
  'cat-cow': () => import('./data/cat-cow'),
  'front-plank': () => import('./data/front-plank'),
  'dead-bug': () => import('./data/dead-bug'),
  'back-extension': () => import('./data/back-extension'),
  'mcgill-curl-up': () => import('./data/mcgill-curl-up'),
  'reverse-crunch': () => import('./data/reverse-crunch'),
  'rollout': () => import('./data/rollout'),
  'suitcase-carry': () => import('./data/suitcase-carry'),
  'pallof-press': () => import('./data/pallof-press'),
  'chin-tuck': () => import('./data/chin-tuck'),
  'neck-isometric': () => import('./data/neck-isometric'),
  'quadruped-neck-extension': () => import('./data/quadruped-neck-extension'),
  'band-pull-apart': () => import('./data/band-pull-apart'),
  'pec-minor-stretch': () => import('./data/pec-minor-stretch'),
  'wrist-extension': () => import('./data/wrist-extension'),
  'median-nerve-glide': () => import('./data/median-nerve-glide'),
  'ulnar-nerve-glide': () => import('./data/ulnar-nerve-glide'),
  'push-up': () => import('./data/push-up'),
  'row': () => import('./data/row'),
  'shoulder-external-rotation': () => import('./data/shoulder-external-rotation'),
  'wall-slide': () => import('./data/wall-slide'),
  'thoracic-extension': () => import('./data/thoracic-extension'),
  'deadlift': () => import('./data/deadlift'),
  'kettlebell-swing': () => import('./data/kettlebell-swing'),
  'split-jump': () => import('./data/split-jump'),
  'lateral-bound': () => import('./data/lateral-bound'),
  'explosive-step-up': () => import('./data/explosive-step-up'),
};

/**
 * Niveaux animés, pour les exercices dont certains niveaux ne se dessinent pas avec le personnage
 * (mouvement des doigts, des orteils…) : ces niveaux gardent le seul schéma musculaire. Absent = tous les niveaux.
 */
export const animatedLevels: Record<string, readonly number[]> = {
  'plantar-fascia-stretch': [2, 3],
  'band-ankle-eversion': [4],
  'hip-abduction-isometric': [2, 3, 4],
  'front-plank': [1, 2, 3, 4],
  'reverse-crunch': [1, 2],
  rollout: [1, 2, 3],
  'median-nerve-glide': [2, 3],
  'ulnar-nerve-glide': [2, 3],
  'shoulder-external-rotation': [1, 3, 4, 5],
  'thoracic-extension': [1, 3],
  'explosive-step-up': [1, 2, 4],
};

/** L'exercice est-il animé (à ce niveau, si on le précise) ? */
export function hasAnimation(exerciseId: string, level?: number): boolean {
  if (!Object.hasOwn(animationLoaders, exerciseId)) return false;
  const levels = animatedLevels[exerciseId];
  return level === undefined || !levels || levels.includes(level);
}

const cache = new Map<string, Animation>();
const pending = new Map<string, Promise<Animation | null>>();

/** Animation déjà chargée (synchrone), sinon undefined. */
export function cachedAnimation(exerciseId: string): Animation | undefined {
  return cache.get(exerciseId);
}

/**
 * Charge l'animation d'un exercice. Résout `null` si l'exercice n'est pas animé ou si le fichier
 * est introuvable (ex. ancienne version de l'app dont le cache a été remplacé) : on garde alors l'illustration.
 */
export function loadAnimation(exerciseId: string): Promise<Animation | null> {
  const hit = cache.get(exerciseId);
  if (hit) return Promise.resolve(hit);
  const loader = animationLoaders[exerciseId];
  if (!loader) return Promise.resolve(null);
  let p = pending.get(exerciseId);
  if (!p) {
    p = loader()
      .then((m) => {
        cache.set(exerciseId, m.default);
        return m.default;
      })
      .catch(() => null)
      .finally(() => pending.delete(exerciseId));
    pending.set(exerciseId, p);
  }
  return p;
}
