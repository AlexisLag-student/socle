/**
 * Registre des dessins et des zooms. Calcule automatiquement quels muscles
 * sont visibles dans chaque vue et chaque zoom (pour la validation du contenu).
 */
import type { MuscleId, ZoomRegion } from '@/domain/ids';
import type { DrawnMuscles } from '@/content/validate';
import { back } from './back';
import { front } from './front';
import { sole } from './sole';
import { mirrorPath, overlapRatio, pathBBox, type Box } from './geometry';
import type { Drawing } from './types';

export const drawings = { front, back, sole } as const;
export type DrawingId = keyof typeof drawings;

export interface ZoomDef {
  drawing: DrawingId;
  /** Zone recadrée dans les coordonnées du dessin. */
  box: Box;
}

/** Les zooms sont des recadrages des silhouettes : mêmes formes, mêmes identifiants. */
export const zooms: Record<ZoomRegion, ZoomDef> = {
  'leg-front': { drawing: 'front', box: { x: 58, y: 196, w: 84, h: 236 } },
  'leg-back': { drawing: 'back', box: { x: 58, y: 196, w: 84, h: 236 } },
  'foot-sole': { drawing: 'sole', box: { x: 26, y: 6, w: 76, h: 228 } },
  'pelvis-front': { drawing: 'front', box: { x: 54, y: 136, w: 92, h: 116 } },
  'pelvis-back': { drawing: 'back', box: { x: 54, y: 146, w: 92, h: 116 } },
  'trunk-front': { drawing: 'front', box: { x: 50, y: 52, w: 100, h: 140 } },
  'trunk-back': { drawing: 'back', box: { x: 50, y: 52, w: 100, h: 140 } },
  'shoulders-neck': { drawing: 'back', box: { x: 42, y: 30, w: 116, h: 92 } },
  'forearm-hand': { drawing: 'front', box: { x: 30, y: 124, w: 34, h: 120 } },
};

/** Silhouette entière associée à un zoom, et cadre à y dessiner pour situer la zone. */
export function silhouetteFor(zoom: ZoomRegion): { view: 'front' | 'back'; locator: Box } {
  const def = zooms[zoom];
  if (def.drawing === 'sole') return { view: 'back', locator: { x: 70, y: 398, w: 60, h: 34 } };
  return { view: def.drawing, locator: def.box };
}

/** Toutes les formes d'un dessin, reflets compris. */
export function expandShapes(drawing: Drawing, shapes: { d: string; mirror?: boolean }[]): string[] {
  return shapes.flatMap((s) => (s.mirror === false ? [s.d] : [s.d, mirrorPath(s.d, drawing.axis)]));
}

function visibleIn(drawing: Drawing, box?: Box): Set<MuscleId> {
  const set = new Set<MuscleId>();
  for (const m of drawing.muscles) {
    const paths = expandShapes(drawing, m.shapes);
    if (!box || paths.some((d) => overlapRatio(pathBBox(d), box) > 0.5)) set.add(m.id);
  }
  return set;
}

export function drawnMuscles(): DrawnMuscles {
  const out: Record<string, ReadonlySet<MuscleId>> = {
    front: visibleIn(front),
    back: visibleIn(back),
    sole: visibleIn(sole),
  };
  for (const [zoom, def] of Object.entries(zooms)) out[zoom] = visibleIn(drawings[def.drawing], def.box);
  return out;
}
