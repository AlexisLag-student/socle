import { useId, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { PROP_SIZE, isScenery, type Frame, type Timeline } from '@/animation/engine';
import type { PointRef, Prop } from '@/animation/schema';
import { H, SEGMENTS, SEG_INDEX, strokesOf, type SegmentId, type View } from '@/animation/skeleton';
import { faceSign, type AnimMuscle, type Zone } from '@/animation/zones';
import { HatchPattern } from '@/components/anatomy/MuscleFigure';
import { refPoint, type RigHandle } from './player';
import css from './animation.module.css';

/** Ordre de dessin : côté éloigné derrière, bras proche devant. */
const LAYERS: Record<View, { segs: SegmentId[]; far: boolean }[]> = {
  profile: [
    { segs: ['thighF', 'shankF', 'footF'], far: true },
    { segs: ['upperArmF', 'forearmF', 'handF'], far: true },
    { segs: ['pelvis', 'trunk', 'neck', 'head', 'thighN', 'shankN', 'footN'], far: false },
    { segs: ['upperArmN', 'forearmN', 'handN'], far: false },
  ],
  face: [
    { segs: ['thighF', 'shankF', 'footF', 'thighN', 'shankN', 'footN', 'pelvis', 'trunk', 'neck', 'head'], far: false },
    { segs: ['upperArmF', 'forearmF', 'handF'], far: false },
    { segs: ['upperArmN', 'forearmN', 'handN'], far: false },
  ],
};

const f1 = (n: number) => Math.round(n * 100) / 100;
const tf = (f: Frame, i: number) => `translate(${f1(f.ox[i]!)} ${f1(f.oy[i]!)}) rotate(${f1(f.dir[i]!)}) scale(${f1(f.fs[i]!)} ${f.m[i]!})`;

/** Zone musculaire : fuseau le long du segment (repère local). */
function zonePaths(z: Zone, segIndex: number, view: View): string[] {
  const s = SEGMENTS[segIndex]!;
  const r = s.radius[view];
  const a = s.u0 + z.from * s.span;
  const b = s.u0 + z.to * s.span;
  const m = (a + b) / 2;
  const w = z.w ?? 1;
  return faceSign(z.seg, z.face, view).map((side) => {
    if (side === 0) {
      const c = f1(1.3 * w * r);
      return `M${f1(a)} 0Q${f1(m)} ${c} ${f1(b)} 0Q${f1(m)} ${-c} ${f1(a)} 0Z`;
    }
    const o0 = side * r * 0.12;
    const peak = side * r * (0.12 + 0.78 * w);
    return `M${f1(a)} ${f1(o0)}Q${f1(m)} ${f1(2 * peak - o0)} ${f1(b)} ${f1(o0)}Z`;
  });
}

function AttachedProp({ p, view, behind }: { p: Extract<Prop, { attach: string }>; view: View; behind?: boolean }) {
  const s = SEGMENTS[SEG_INDEX[p.attach as SegmentId]]!;
  const r = s.radius[view];
  const [fu, fv] = p.at ?? [0.55, 0];
  const u = s.u0 + fu * s.span;
  const v = fv * r;
  // Bâton le long du dos (repère de la charnière de hanche) : du bassin au-dessus de la tête.
  if (p.kind === 'stick') return <line className={css.prop} x1={-0.06 * H} y1={v} x2={0.42 * H} y2={v} />;
  // Barre vue en bout : le disque est dessiné derrière le personnage (calque `behind`), le manchon devant.
  if (p.kind === 'barbell')
    return behind ? <circle className={css.prop} cx={u} cy={v} r={0.105 * H} /> : <circle className={css.prop} cx={u} cy={v} r={0.018 * H} />;
  if (behind) return null;
  if (p.kind === 'kettlebell') {
    const c = u + 0.07 * H;
    return (
      <g className={css.prop}>
        <path d={`M${f1(u - 0.02 * H)} ${f1(v)}L${f1(c)} ${f1(v - 0.025 * H)}M${f1(u - 0.02 * H)} ${f1(v)}L${f1(c)} ${f1(v + 0.025 * H)}`} />
        <circle cx={c} cy={v} r={0.045 * H} />
      </g>
    );
  }
  // Haltère : vu dans l'axe (rond) ou de côté (barre perpendiculaire à la main).
  if (p.axis === 'vertical')
    return (
      <g className={css.prop}>
        <line x1={u} y1={v - 0.06 * H} x2={u} y2={v + 0.06 * H} />
        <rect x={u - 0.03 * H} y={v - 0.085 * H} width={0.06 * H} height={0.03 * H} rx={2} />
        <rect x={u - 0.03 * H} y={v + 0.055 * H} width={0.06 * H} height={0.03 * H} rx={2} />
      </g>
    );
  return (
    <g className={css.prop}>
      <circle cx={u} cy={v} r={0.04 * H} />
      <circle cx={u} cy={v} r={0.012 * H} />
    </g>
  );
}

function Scenery({ p }: { p: Extract<Prop, { size?: unknown }> }) {
  const [w, h] = p.size ?? PROP_SIZE[p.kind];
  const [x, y] = p.at;
  switch (p.kind) {
    case 'ball':
      return <circle className={css.prop} cx={x} cy={y} r={w / 2} />;
    case 'wall':
      // Mur : trait de façade et hachures du côté de la maçonnerie.
      return (
        <g className={css.prop}>
          <line x1={x} y1={y} x2={x} y2={y + h} />
          {Array.from({ length: Math.floor(h / 12) }, (_, i) => (
            <line key={i} x1={x} y1={y + 4 + i * 12} x2={x + (p.flip ? -1.6 : 1.6) * w} y2={y + 10 + i * 12} />
          ))}
        </g>
      );
    case 'chair':
      return (
        <g className={css.prop}>
          <rect x={x} y={y + h - 0.025 * H} width={w} height={0.025 * H} rx={2} />
          <line x1={x + 3} y1={y} x2={x + 3} y2={y + h} />
          <line x1={x + w - 3} y1={y} x2={x + w - 3} y2={y + h} />
          <line x1={x + 3} y1={y + h} x2={x + 3} y2={y + h + 0.24 * H} />
        </g>
      );
    case 'bench':
      return (
        <g className={css.prop}>
          <rect x={x} y={y + h - 0.035 * H} width={w} height={0.035 * H} rx={2} />
          <line x1={x + 0.04 * H} y1={y} x2={x + 0.04 * H} y2={y + h - 0.035 * H} />
          <line x1={x + w - 0.04 * H} y1={y} x2={x + w - 0.04 * H} y2={y + h - 0.035 * H} />
        </g>
      );
    default:
      return <rect className={css.prop} x={x} y={y} width={w} height={h} rx={p.kind === 'pad' || p.kind === 'mat' ? 3 : 2} />;
  }
}

export interface RigProps {
  tl: Timeline;
  frame: Frame;
  muscles: AnimMuscle[];
  mirrored: boolean;
  title: string;
  desc?: string;
  /** Animation bilatérale : muscles dessinés aussi sur les membres du côté éloigné. */
  bilateral: boolean;
  /** Anneau de respiration (maintien). */
  breath?: boolean;
  /** Pose fantôme (superposition des poses clés, outil de vérification). */
  ghost?: boolean;
  className?: string;
  onHandle?: (h: RigHandle | null) => void;
  children?: ReactNode;
}

/**
 * Personnage au trait : chaque segment = trait épais à bouts ronds, dessiné deux fois
 * (contour à l'encre, puis intérieur couleur papier) pour obtenir une silhouette continue.
 * Les muscles sont des fuseaux rouges posés sur les segments. Repère du monde (y vers le haut) retourné en SVG.
 */
export function Rig({ tl, frame, muscles, mirrored, title, desc, bilateral, breath, ghost, className, onHandle, children }: RigProps) {
  const uid = useId().replace(/:/g, '');
  const view = tl.r.view;
  const svgRef = useRef<SVGSVGElement>(null);
  const groups = useRef<SVGGElement[][]>(SEGMENTS.map(() => []));
  const bandEls = useRef<(SVGLineElement | null)[]>([]);
  const breathRef = useRef<SVGCircleElement>(null);
  const b = tl.bounds;
  const pad = 6;
  const minX = mirrored ? -b.maxX : b.minX;
  const vb = [minX - pad, -b.maxY - pad, b.maxX - b.minX + 2 * pad, b.maxY - b.minY + 2 * pad];
  const hatch = `${uid}-h`;
  const bands = tl.r.props.filter((p): p is Extract<Prop, { kind: 'band' }> => p.kind === 'band');
  const pt = { x: 0, y: 0 };
  const bandXY = (ref: PointRef) => {
    refPoint(frame, view, ref, pt);
    return [f1(pt.x), f1(pt.y)] as const;
  };

  // Contour de 2 px à l'écran quelle que soit la taille d'affichage (vignette ou fiche).
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const px = svg.getBoundingClientRect().width;
      if (px > 0) svg.style.setProperty('--edge', `${f1((4 * vb[2]!) / px)}px`);
    });
    ro.observe(svg);
    return () => ro.disconnect();
  }, [vb[2]]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (!onHandle || !svgRef.current) return;
    onHandle({
      svg: svgRef.current,
      groups: groups.current,
      bands: bands.map((p, i) => ({ el: bandEls.current[i]!, from: p.from, to: p.to })),
      breath: breathRef.current,
    });
    return () => onHandle(null);
    // La poignée ne dépend que des éléments rendus (nouvelle timeline = nouveau rendu complet par la clé du parent).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onHandle, tl]);

  const musclesOn = (segIndex: number) => {
    const s = SEGMENTS[segIndex]!;
    const base = s.id.replace(/[NF]$/, '');
    if (s.side === 'F' && view === 'profile' && !bilateral) return null;
    const shapes = muscles.flatMap((m) =>
      m.zones
        .filter((z) => z.seg === base)
        .flatMap((z, zi) =>
          zonePaths(z, segIndex, view).map((d, k) => (
            <path
              key={`${m.id}-${zi}-${k}`}
              d={d}
              data-muscle={m.id}
              data-role={m.role}
              className={[css.m, m.tendon ? css.mTendon : m.role === 'primary' ? css.mPrimary : css.mSecondary, m.deep ? css.mDeep : ''].join(' ')}
              style={m.role === 'secondary' && !m.tendon && !m.deep ? { fill: `url(#${hatch})` } : undefined}
            />
          )),
        ),
    );
    return shapes.length ? <g className={css.muscles}>{shapes}</g> : null;
  };

  const attachedTo = (segId: SegmentId) => tl.r.props.filter((p): p is Extract<Prop, { attach: string }> => 'attach' in p && p.attach === segId);
  const attached = (segId: SegmentId) => attachedTo(segId).map((p, i) => <AttachedProp key={i} p={p} view={view} />);
  // Segments qui portent du matériel dessiné derrière le personnage (disques de barre).
  const behindSegs = [...new Set(tl.r.props.flatMap((p) => (p.kind === 'barbell' ? [p.attach as SegmentId] : [])))];

  return (
    <svg
      ref={svgRef}
      viewBox={vb.map(f1).join(' ')}
      className={[css.rig, ghost ? css.ghost : '', className].filter(Boolean).join(' ')}
      role="img"
      aria-labelledby={`${uid}-t${desc ? ` ${uid}-d` : ''}`}
      style={{ '--edge': `${f1(0.014 * H)}px` } as CSSProperties}
    >
      <title id={`${uid}-t`}>{title}</title>
      {desc && <desc id={`${uid}-d`}>{desc}</desc>}
      <defs>
        <HatchPattern id={hatch} size={0.016 * H} background="var(--anim-paper)" />
      </defs>
      <line className={css.ground} x1={vb[0]} x2={vb[0]! + vb[2]!} y1={0} y2={0} />
      <g transform={`scale(${mirrored ? -1 : 1} -1)`}>
        {tl.r.props.filter(isScenery).map((p, i) => (
          <Scenery key={i} p={p} />
        ))}
        {behindSegs.map((id) => {
          const si = SEG_INDEX[id];
          return (
            <g
              key={`behind-${id}`}
              transform={tf(frame, si)}
              ref={(el) => {
                if (el) groups.current[si]![2] = el;
              }}
            >
              {attachedTo(id).map((p, i) => (
                <AttachedProp key={i} p={p} view={view} behind />
              ))}
            </g>
          );
        })}
        {LAYERS[view].map((layer, li) => (
          <g key={li} className={layer.far ? css.far : css.near}>
            {(['outer', 'inner'] as const).map((pass, pi) => (
              <g key={pass} className={pass === 'outer' ? css.outer : css.inner}>
                {layer.segs.map((id) => {
                  const si = SEG_INDEX[id];
                  const seg = SEGMENTS[si]!;
                  return (
                    <g
                      key={id}
                      transform={tf(frame, si)}
                      ref={(el) => {
                        if (el) groups.current[si]![pi] = el;
                      }}
                    >
                      {strokesOf(seg, view).map(([u0, v0, u1, v1, r], k) => (
                        <line key={k} className={css.bone} x1={f1(u0)} y1={f1(v0)} x2={f1(u1)} y2={f1(v1)} style={{ '--w': f1(2 * r) } as CSSProperties} />
                      ))}
                      {pass === 'inner' && musclesOn(si)}
                      {pass === 'inner' && id === 'trunk' && breath && <circle ref={breathRef} className={css.breath} cx={0.45 * seg.length} cy={0} r={6} />}
                      {pass === 'inner' && attached(id)}
                    </g>
                  );
                })}
              </g>
            ))}
          </g>
        ))}
        {bands.map((p, i) => {
          const [x1, y1] = bandXY(p.from);
          const [x2, y2] = bandXY(p.to);
          return (
            <line
              key={i}
              ref={(el) => {
                bandEls.current[i] = el;
              }}
              className={css.band}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          );
        })}
        {children}
      </g>
    </svg>
  );
}
