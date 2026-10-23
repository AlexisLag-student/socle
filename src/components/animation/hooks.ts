import { useEffect, useState, useSyncExternalStore } from 'react';
import { cachedAnimation, hasAnimation, loadAnimation } from '@/animation/loaders';
import type { Animation } from '@/animation/schema';

// ---------------------------------------------------------------------------
// Préférence système « réduire les animations »
// ---------------------------------------------------------------------------

const RM = '(prefers-reduced-motion: reduce)';
function subscribeRM(cb: () => void) {
  const mq = window.matchMedia?.(RM);
  mq?.addEventListener?.('change', cb);
  return () => mq?.removeEventListener?.('change', cb);
}
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeRM,
    () => !!window.matchMedia?.(RM).matches,
    () => false,
  );
}

/** Animation d'un exercice (null tant qu'elle charge ou si l'exercice n'est pas animé). */
export function useAnimationData(exerciseId: string, enabled = true): { anim: Animation | null; status: 'none' | 'loading' | 'ready' } {
  const [loaded, setLoaded] = useState<{ id: string; anim: Animation | null } | null>(null);
  const cached = cachedAnimation(exerciseId);
  const animated = hasAnimation(exerciseId);
  useEffect(() => {
    if (!enabled || !animated || cached) return;
    let alive = true;
    void loadAnimation(exerciseId).then((a) => {
      if (alive) setLoaded({ id: exerciseId, anim: a });
    });
    return () => {
      alive = false;
    };
  }, [exerciseId, enabled, animated, cached]);
  if (!animated) return { anim: null, status: 'none' };
  if (cached) return { anim: cached, status: 'ready' };
  if (loaded?.id === exerciseId) return { anim: loaded.anim, status: loaded.anim ? 'ready' : 'none' };
  return { anim: null, status: 'loading' };
}
