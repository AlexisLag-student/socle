/**
 * Construction (pure) d'une figure anatomique : liste ordonnée de formes à dessiner,
 * avec leur rôle (principal, secondaire, profond, neutre). Utilisée par le composant React
 * et par le script d'aperçu. Les couleurs viennent uniquement des données de l'exercice.
 */
import type { MuscleId } from '@/domain/ids';
import { muscles as registry } from '@/content/muscles';
import { drawings, expandShapes, type DrawingId } from './drawings/registry';
import type { Box } from './drawings/geometry';

export type MuscleRole = 'primary' | 'secondary' | 'neutral';

export interface FigureShape {
  key: string;
  d: string;
  kind: 'base' | 'detail' | 'muscle';
  muscle?: MuscleId;
  role?: MuscleRole;
  deep?: boolean;
}

export interface Figure {
  viewBox: string;
  shapes: FigureShape[];
}

const deepIds = new Set(registry.filter((m) => m.deep).map((m) => m.id));

export function isDeep(id: MuscleId): boolean {
  return deepIds.has(id);
}

export interface FigureOptions {
  primary?: readonly MuscleId[];
  secondary?: readonly MuscleId[];
  /** Recadrage (zoom). */
  box?: Box;
  /** Afficher les muscles profonds non concernés (sinon masqués pour la lisibilité). */
  showAllDeep?: boolean;
}

export function buildFigure(drawingId: DrawingId, opts: FigureOptions = {}): Figure {
  const drawing = drawings[drawingId];
  const primary = new Set(opts.primary ?? []);
  const secondary = new Set(opts.secondary ?? []);
  const roleOf = (id: MuscleId): MuscleRole =>
    primary.has(id) ? 'primary' : secondary.has(id) ? 'secondary' : 'neutral';

  const shapes: FigureShape[] = [];
  expandShapes(drawing, drawing.base).forEach((d, i) => shapes.push({ key: `b${i}`, d, kind: 'base' }));

  // Ordre : muscles superficiels neutres, puis superficiels colorés, puis profonds colorés (au-dessus, en pointillés).
  const superficial = drawing.muscles.filter((m) => !isDeep(m.id));
  const deep = drawing.muscles.filter((m) => isDeep(m.id));
  const ordered = [
    ...superficial.filter((m) => roleOf(m.id) === 'neutral'),
    ...superficial.filter((m) => roleOf(m.id) !== 'neutral'),
    ...deep.filter((m) => opts.showAllDeep || roleOf(m.id) !== 'neutral'),
  ];
  for (const m of ordered) {
    expandShapes(drawing, m.shapes).forEach((d, i) =>
      shapes.push({ key: `${m.id}-${i}`, d, kind: 'muscle', muscle: m.id, role: roleOf(m.id), deep: isDeep(m.id) }),
    );
  }
  expandShapes(drawing, drawing.details).forEach((d, i) => shapes.push({ key: `d${i}`, d, kind: 'detail' }));

  const [x, y, w, h] = drawing.viewBox;
  const b = opts.box ?? { x, y, w, h };
  return { viewBox: `${b.x} ${b.y} ${b.w} ${b.h}`, shapes };
}
