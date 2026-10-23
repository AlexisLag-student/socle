import { useId, type ReactNode } from 'react';
import type { MuscleId } from '@/domain/ids';
import { buildFigure, isTendon, type FigureShape } from './figure';
import type { DrawingId } from './drawings/registry';
import type { Box } from './drawings/geometry';
import css from './anatomy.module.css';

export interface MuscleFigureProps {
  drawing: DrawingId;
  primary?: readonly MuscleId[];
  secondary?: readonly MuscleId[];
  /** Recadrage (zoom). */
  box?: Box;
  /** Cadre dessiné sur la figure pour situer un zoom. */
  locator?: Box;
  title: string;
  desc?: string;
  className?: string;
  /** Contenu SVG supplémentaire (ex. zones cliquables de la carte du corps). */
  children?: ReactNode;
  showMuscles?: boolean;
}

/** Regroupe les formes consécutives d'un même muscle (côtés gauche et droit) dans un <g>. */
function groupShapes(shapes: FigureShape[]) {
  const groups: { muscle?: MuscleId; shapes: FigureShape[] }[] = [];
  for (const s of shapes) {
    const last = groups[groups.length - 1];
    if (s.muscle && last?.muscle === s.muscle) last.shapes.push(s);
    else groups.push({ muscle: s.muscle, shapes: [s] });
  }
  return groups;
}

export function MuscleFigure({
  drawing,
  primary,
  secondary,
  box,
  locator,
  title,
  desc,
  className,
  children,
  showMuscles = true,
}: MuscleFigureProps) {
  const uid = useId().replace(/:/g, '');
  const fig = buildFigure(drawing, { primary, secondary, box });
  const shapes = showMuscles ? fig.shapes : fig.shapes.filter((s) => s.kind !== 'muscle');
  // Hachures à 45° des muscles secondaires : motif propre à chaque figure, pas proportionnel au cadrage.
  const hatch = `${uid}-hatch`;
  const hatchTendon = `${uid}-hatch-t`;
  const unit = Number(fig.viewBox.split(' ')[2]) / 32;
  const fillFor = (s: FigureShape) =>
    s.role === 'secondary' ? { fill: `url(#${s.muscle && isTendon(s.muscle) ? hatchTendon : hatch})` } : undefined;

  return (
    <svg
      viewBox={fig.viewBox}
      className={[css.figure, className].filter(Boolean).join(' ')}
      role="img"
      aria-labelledby={`${uid}-t${desc ? ` ${uid}-d` : ''}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${uid}-t`}>{title}</title>
      {desc && <desc id={`${uid}-d`}>{desc}</desc>}
      <defs>
        <HatchPattern id={hatch} size={unit} background="var(--m-hatch-bg)" />
        <HatchPattern id={hatchTendon} size={unit} background="var(--m-tendon)" />
      </defs>
      {groupShapes(shapes).map((g, gi) =>
        g.muscle ? (
          <g key={g.muscle} id={`${uid}-${g.muscle}`} data-muscle={g.muscle} data-role={g.shapes[0]!.role}>
            {g.shapes.map((s) => (
              <path
                key={s.key}
                d={s.d}
                className={[css.muscle, css[s.role ?? 'neutral'], s.deep ? css.deep : '', s.muscle && isTendon(s.muscle) ? css.tendon : ''].join(' ')}
                style={fillFor(s)}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ) : (
          <g key={`g${gi}`}>
            {g.shapes.map((s) => (
              <path
                key={s.key}
                d={s.d}
                className={s.kind === 'base' ? css.base : css.detail}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ),
      )}
      {locator && (
        <rect
          x={locator.x}
          y={locator.y}
          width={locator.w}
          height={locator.h}
          rx={4}
          className={css.locator}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {children}
    </svg>
  );
}

/** Motif de hachures rouges à 45° (muscle secondaire), réutilisé par la légende. */
export function HatchPattern({ id, size, background }: { id: string; size: number; background: string }) {
  return (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width={size} height={size} style={{ fill: background }} />
      <line x1={0} y1={0} x2={0} y2={size} style={{ stroke: 'var(--m-hatch)', strokeWidth: size * 0.6 }} />
    </pattern>
  );
}
