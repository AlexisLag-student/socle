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
};

export function hasAnimation(exerciseId: string): boolean {
  return Object.hasOwn(animationLoaders, exerciseId);
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
