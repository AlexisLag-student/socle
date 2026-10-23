/**
 * Lecteur d'animation : boucle requestAnimationFrame sur le temps réel, mise à jour directe des
 * transformations SVG (aucun rendu React ni aucune allocation par image).
 * Un seul lecteur joue à la fois dans toute l'app ; pause quand l'onglet est caché.
 */
import { createFrame, sample, segPoint, type Frame, type Timeline } from '@/animation/engine';
import { SEG_INDEX, SEGMENTS, type SegmentId, type View } from '@/animation/skeleton';
import type { PointRef } from '@/animation/schema';

/** Éléments du personnage manipulés à chaque image. */
export interface RigHandle {
  svg: SVGSVGElement;
  /** Deux groupes par segment (contour, intérieur), dans l'ordre de SEGMENTS. */
  groups: SVGGElement[][];
  bands: { el: SVGLineElement; from: PointRef; to: PointRef }[];
  breath: SVGCircleElement | null;
}

interface Bound {
  tr: SVGTransform;
  rot: SVGTransform;
  sc: SVGTransform;
  seg: number;
}

const MI = Array.from({ length: 9 }, (_, i) => (0.35 + (0.65 * i) / 8).toFixed(3));

let active: Player | null = null;

export class Player {
  readonly frame: Frame = createFrame();
  private bound: Bound[] = [];
  private raf = 0;
  private last = 0;
  private lastMi = -1;
  private lastSay = -1;
  private visible = true;
  private onScreen = true;
  /** Temps de l'animation (s). */
  t = 0;
  speed = 1;
  playing = false;
  /** Source de temps externe (séance guidée) : remplace l'horloge interne. */
  clock: (() => number) | null = null;
  /** Respiration (maintien) : amplitude 0…1 de l'anneau, période en secondes. */
  breathPeriod = 0;
  private breathT = 0;
  private bandPts = { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } };
  onSay: ((say: number) => void) | null = null;
  onPlayingChange: ((playing: boolean) => void) | null = null;

  constructor(
    private rig: RigHandle,
    private tl: Timeline,
  ) {
    // Transformations « translate rotate scale » posées par le rendu React, reprises ici une fois pour toutes.
    rig.groups.forEach((pair, si) =>
      pair.forEach((g) => {
        // Environnement sans API SVG complète (tests) : rien à animer.
        const list = g.transform?.baseVal;
        if (list && list.numberOfItems >= 3) this.bound.push({ tr: list.getItem(0), rot: list.getItem(1), sc: list.getItem(2), seg: si });
      }),
    );
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  destroy(): void {
    this.stop();
    document.removeEventListener('visibilitychange', this.onVisibility);
    if (active === this) active = null;
  }

  private onVisibility = () => {
    this.visible = document.visibilityState !== 'hidden';
    this.schedule();
  };

  setOnScreen(v: boolean): void {
    this.onScreen = v;
    this.schedule();
  }

  play(): void {
    if (active && active !== this) active.pause();
    // Registre global du lecteur actif (un seul à la fois).
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    active = this;
    if (!this.playing) {
      this.playing = true;
      this.onPlayingChange?.(true);
    }
    this.schedule();
  }

  pause(): void {
    if (this.playing) {
      this.playing = false;
      this.onPlayingChange?.(false);
    }
    this.schedule();
  }

  /** Affiche le temps t (s) sans lancer la lecture. */
  seek(t: number): void {
    this.t = t;
    this.render();
  }

  private stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private schedule() {
    const run = (this.playing || this.breathPeriod > 0) && this.visible && this.onScreen;
    if (run && !this.raf) {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    } else if (!run) this.stop();
  }

  private tick = (now: number) => {
    // Pas de saut après une interruption (onglet caché, élément hors écran) : écart borné à 100 ms.
    const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    if (this.playing) this.t = this.clock ? this.clock() : this.t + dt * this.speed;
    if (this.breathPeriod > 0) this.breathT += dt;
    this.render();
    this.raf = requestAnimationFrame(this.tick);
  };

  render(): void {
    const f = sample(this.tl, this.t, this.frame);
    for (const b of this.bound) {
      b.tr.setTranslate(f.ox[b.seg]!, f.oy[b.seg]!);
      b.rot.setRotate(f.dir[b.seg]!, 0, 0);
      b.sc.setScale(f.fs[b.seg]!, f.m[b.seg]!);
    }
    for (const band of this.rig.bands) {
      if (!band.el?.x1?.baseVal) continue;
      refPoint(f, this.tl.r.view, band.from, this.bandPts.a);
      refPoint(f, this.tl.r.view, band.to, this.bandPts.b);
      band.el.x1.baseVal.value = this.bandPts.a.x;
      band.el.y1.baseVal.value = this.bandPts.a.y;
      band.el.x2.baseVal.value = this.bandPts.b.x;
      band.el.y2.baseVal.value = this.bandPts.b.y;
    }
    const mi = Math.round(Math.min(1, Math.max(0, f.intensity)) * 8);
    if (mi !== this.lastMi) {
      this.lastMi = mi;
      this.rig.svg.style.setProperty('--mi', MI[mi]!);
    }
    if (this.rig.breath?.r?.baseVal) {
      const amp = this.breathPeriod > 0 ? 0.5 - 0.5 * Math.cos((2 * Math.PI * this.breathT) / this.breathPeriod) : 0;
      this.rig.breath.r.baseVal.value = 6 + 6 * amp;
    }
    if (f.say !== this.lastSay) {
      this.lastSay = f.say;
      this.onSay?.(f.say);
    }
  }

  /** Change de timeline (tempo, niveau…) en gardant les mêmes éléments SVG. */
  setTimeline(tl: Timeline): void {
    this.tl = tl;
    this.render();
  }
}

/** Point d'attache d'un élastique (segment ou monde). */
export function refPoint(f: Frame, view: View, ref: PointRef, out: { x: number; y: number }): { x: number; y: number } {
  if ('world' in ref) {
    out.x = ref.world[0];
    out.y = ref.world[1];
    return out;
  }
  const si = SEG_INDEX[ref.seg as SegmentId];
  const s = SEGMENTS[si]!;
  return segPoint(f, si, s.u0 + ref.u * s.span, (ref.v ?? 0) * s.radius[view], out);
}

