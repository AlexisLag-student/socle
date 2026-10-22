/**
 * Accès aux fonctions de l'appareil, toutes optionnelles : son (WebAudio), vibration, écran allumé (Wake Lock).
 */

let ctx: AudioContext | undefined;

/** Bip court. `high` pour un signal de fin. Silencieux si l'audio est indisponible. */
export function beep(kind: 'tick' | 'phase' | 'end' = 'phase'): void {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const freq = { tick: 660, phase: 880, end: 1175 }[kind];
    const dur = kind === 'end' ? 0.45 : 0.12;
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur + 0.02);
  } catch {
    /* audio indisponible */
  }
}

export function vibrate(pattern: number | number[]): void {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* non supporté */
  }
}

type WakeLockSentinelLike = { release: () => Promise<void> };

/** Garde l'écran allumé tant que la séance est ouverte. Renvoie une fonction de libération. */
export async function keepScreenOn(): Promise<() => void> {
  const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<WakeLockSentinelLike> } };
  if (!nav.wakeLock) return () => {};
  let sentinel: WakeLockSentinelLike | undefined;
  const request = async () => {
    try {
      sentinel = await nav.wakeLock!.request('screen');
    } catch {
      /* refusé (batterie faible, onglet masqué…) */
    }
  };
  const onVisible = () => {
    if (document.visibilityState === 'visible') void request();
  };
  await request();
  document.addEventListener('visibilitychange', onVisible);
  return () => {
    document.removeEventListener('visibilitychange', onVisible);
    void sentinel?.release().catch(() => {});
  };
}

/** Phases d'une répétition à partir du tempo « excentrique-pause-concentrique(-pause) ». */
export interface TempoPhase {
  kind: 'ecc' | 'pause' | 'con' | 'top';
  sec: number;
}

export function tempoPhases(tempo: string): TempoPhase[] {
  const kinds: TempoPhase['kind'][] = ['ecc', 'pause', 'con', 'top'];
  return tempo
    .split('-')
    .map((p, i) => ({ kind: kinds[i]!, sec: p === 'X' ? 0.8 : Number(p) }))
    .filter((p) => p.sec > 0);
}
