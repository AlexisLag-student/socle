import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router';
import { buildTimeline, contactWorld, createFrame, resolve, sample, timeOfKeyframe, type Timeline } from '@/animation/engine';
import { animationLoaders, loadAnimation } from '@/animation/loaders';
import type { Animation } from '@/animation/schema';
import { CENTRAL_JOINTS, CH, JOINT_BOUNDS, SIDED_JOINTS, type Channel } from '@/animation/skeleton';
import { CONTACT_TOL, activeContacts, contactDeviations, validateAnimation } from '@/animation/validate';
import { animationMuscles } from '@/animation/zones';
import { Player, type RigHandle } from '@/components/animation/player';
import { Rig } from '@/components/animation/Rig';
import { drawnMuscles } from '@/components/anatomy/drawings/registry';
import { exerciseById } from '@/content/index';

const drawnSet = () => {
  const d = drawnMuscles();
  return new Set([...d.front!, ...d.back!, ...d.sole!]);
};

/**
 * Outil de vérification des animations (route /dev/animations, hors navigation) :
 * lecture, curseur image par image, angles, poses clés superposées, appuis qui quittent le sol.
 * Mode capture : ?id=squat&t=0.5&capture=1 (t = fraction du cycle) ou &pose=start|mid|end
 * (pose de départ, milieu du mouvement, fin = pose représentative).
 */
export default function AnimationLab() {
  const [params, setParams] = useSearchParams();
  const ids = Object.keys(animationLoaders);
  const id = params.get('id') ?? ids[0]!;
  const capture = params.has('capture');
  const [anim, setAnim] = useState<Animation | null>(null);
  useEffect(() => {
    let alive = true;
    void loadAnimation(id).then((a) => alive && setAnim(a));
    return () => {
      alive = false;
    };
  }, [id]);
  const ex = exerciseById.get(id);
  const set = (k: string, v: string | null) => {
    const next = new URLSearchParams(params);
    if (v === null || v === '') next.delete(k);
    else next.set(k, v);
    setParams(next, { replace: true });
  };

  if (!anim || !ex) return <p style={{ padding: 16 }}>Chargement…</p>;
  const level = params.get('level') ? Number(params.get('level')) : undefined;
  const variant = params.get('variant') ?? undefined;
  const useTempo = params.get('tempo') === '1';
  const tempo = useTempo ? ex.levels.find((l) => l.level === (level ?? 1))?.dosage.tempo : undefined;

  return (
    <main style={{ padding: 16, maxWidth: capture ? 420 : 1100, margin: '0 auto' }}>
      {!capture && (
        <>
          <h1>Animations ({ids.length})</h1>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {ids.map((x) => (
              <button key={x} type="button" aria-pressed={x === id} onClick={() => setParams({ id: x })} style={{ fontWeight: x === id ? 700 : 400 }}>
                {x}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <label>
              Niveau{' '}
              <select value={level ?? ''} onChange={(e) => set('level', e.target.value)}>
                <option value="">—</option>
                {ex.levels.map((l) => (
                  <option key={l.level} value={l.level}>
                    {l.level}. {l.name.fr} {l.dosage.tempo ? `(${l.dosage.tempo})` : ''}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Variante{' '}
              <select value={variant ?? ''} onChange={(e) => set('variant', e.target.value)}>
                <option value="">—</option>
                {ex.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.id}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <input type="checkbox" checked={useTempo} onChange={(e) => set('tempo', e.target.checked ? '1' : null)} /> Tempo du niveau {tempo ? `(${tempo})` : ''}
            </label>
          </div>
        </>
      )}
      <Lab
        key={`${id}-${level}-${variant}-${tempo}`}
        anim={anim}
        level={level}
        variant={variant}
        tempo={tempo}
        capture={capture}
        start={Number(params.get('t') ?? 0)}
        pose={params.get('pose') as 'start' | 'mid' | 'end' | null}
        mirrored={params.has('mirror')}
      />
    </main>
  );
}

const JOINT_CH: { ch: Channel; joint: (typeof CENTRAL_JOINTS)[number] | (typeof SIDED_JOINTS)[number] }[] = [
  ...CENTRAL_JOINTS.map((j) => ({ ch: j as Channel, joint: j })),
  ...SIDED_JOINTS.flatMap((j) => [
    { ch: `${j}N` as Channel, joint: j },
    { ch: `${j}F` as Channel, joint: j },
  ]),
];

function Lab({
  anim,
  level,
  variant,
  tempo,
  capture,
  start: startFraction,
  pose,
  mirrored,
}: {
  anim: Animation;
  level?: number;
  variant?: string;
  tempo?: string;
  capture: boolean;
  start: number;
  pose: 'start' | 'mid' | 'end' | null;
  mirrored: boolean;
}) {
  const ex = exerciseById.get(anim.exerciseId)!;
  const tl: Timeline = useMemo(() => buildTimeline(resolve(anim, { level, variant }), { tempo }), [anim, level, variant, tempo]);
  // Pose demandée : départ (t = 0), fin = pose représentative, milieu = à mi-chemin.
  const end = timeOfKeyframe(tl, tl.r.still);
  const start = tl.total > 0 ? (pose === 'start' ? 0 : pose === 'end' ? end : pose === 'mid' ? end / 2 : startFraction * tl.total) / tl.total : 0;
  const muscles = useMemo(() => animationMuscles(ex, tl.r.view, tl.r.muscles), [ex, tl]);
  const errors = useMemo(() => validateAnimation(anim, exerciseById, drawnSet()), [anim]);
  const devs = useMemo(() => contactDeviations(tl), [tl]);
  const [t, setT] = useState(start * tl.total);
  const [playing, setPlaying] = useState(false);
  const [ghosts, setGhosts] = useState(!capture);
  const [handle, setHandle] = useState<RigHandle | null>(null);
  const player = useRef<Player | null>(null);
  const [initial] = useState(() => sample(tl, start * tl.total, createFrame()));
  const frame = useMemo(() => sample(tl, t, createFrame()), [tl, t]);

  useEffect(() => {
    if (!handle) return;
    const p = new Player(handle, tl);
    p.onPlayingChange = setPlaying;
    p.seek(start * tl.total);
    player.current = p;
    // Pendant la lecture, l'affichage des angles suit à 10 i/s.
    const id = setInterval(() => p.playing && setT(p.t % tl.total), 100);
    return () => {
      clearInterval(id);
      p.destroy();
    };
  }, [handle, tl, start]);

  const seek = (v: number) => {
    setT(v);
    player.current?.pause();
    player.current?.seek(v);
  };
  const live = contactDeviations(tl, 120).filter((d) => Math.abs(d.t - t) < 1 / 120);
  const pt = { x: 0, y: 0 };
  const markers = activeContacts(tl, frame.seg).map((c) => {
    contactWorld(frame, tl.r.view, c.point, pt);
    const dev = live.find((d) => d.point === c.point);
    const bad = !!dev && Math.max(Math.abs(dev.dy), Math.abs(dev.dx)) > CONTACT_TOL;
    return { point: c.point, x: pt.x, y: pt.y, bad };
  });
  const worst = new Map<string, number>();
  for (const d of devs) worst.set(d.point, Math.max(worst.get(d.point) ?? 0, Math.abs(d.dy), Math.abs(d.dx)));
  const bounds = JOINT_BOUNDS[tl.r.view];

  const figure = (
    <div style={{ position: 'relative', border: '2px solid var(--ink)', borderRadius: 4, background: 'var(--paper)', padding: 8 }} data-testid="lab-figure">
      {ghosts &&
        tl.r.keyframes.map((_, k) => (
          <div key={k} style={{ position: 'absolute', inset: 8 }}>
            <Rig ghost tl={tl} frame={sample(tl, timeOfKeyframe(tl, k), createFrame())} muscles={[]} mirrored={mirrored} bilateral title={`Pose ${k}`} />
          </div>
        ))}
      <div style={{ position: 'relative' }}>
        <Rig tl={tl} frame={initial} muscles={muscles} mirrored={mirrored} bilateral={tl.r.side === 'bilateral'} title={`Animation : ${ex.name.fr}`} onHandle={setHandle}>
          {!capture &&
            markers.map((m) => (
              <circle key={m.point} cx={m.x} cy={m.y} r={2.5} style={{ fill: m.bad ? 'var(--red)' : 'var(--stamp-strong)' }} />
            ))}
        </Rig>
      </div>
    </div>
  );
  if (capture) return figure;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 340px)', gap: 16, marginTop: 12 }}>
      <div>
        {figure}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => (playing ? player.current?.pause() : player.current?.play())}>
            {playing ? 'Pause' : 'Lecture'}
          </button>
          <button type="button" onClick={() => seek(Math.max(0, t - 1 / 60))}>
            −1 image
          </button>
          <button type="button" onClick={() => seek(Math.min(tl.total, t + 1 / 60))}>
            +1 image
          </button>
          <label>
            <input type="checkbox" checked={ghosts} onChange={(e) => setGhosts(e.target.checked)} /> Poses clés
          </label>
          <span>
            t = {t.toFixed(3)} / {tl.total.toFixed(2)} s · {tl.segs[frame.seg]?.phase} · intensité {frame.intensity.toFixed(2)}
          </span>
        </div>
        <input type="range" aria-label="Temps" min={0} max={tl.total} step={1 / 60} value={t} onChange={(e) => seek(Number(e.target.value))} style={{ width: '100%' }} />
        <h2>Validation</h2>
        {errors.length ? (
          <ul style={{ color: 'var(--red)' }}>
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--stamp-strong)' }}>✅ Bornes, appuis, continuité et tempo conformes (toutes combinaisons).</p>
        )}
        <h2>Appuis (écart maximal sur le cycle)</h2>
        <ul>
          {[...worst].map(([p, w]) => (
            <li key={p} style={{ color: w > CONTACT_TOL ? 'var(--red)' : undefined }}>
              {p} : {w.toFixed(2)} {w > CONTACT_TOL ? '⚠️ quitte le sol' : ''}
            </li>
          ))}
        </ul>
        <h2>Texte de l’exercice</h2>
        <p>
          <strong>Mise en place :</strong> {ex.how.setup.fr}
        </p>
        <p>
          <strong>Mouvement :</strong> {ex.how.movement.fr}
        </p>
        <ul>
          {[...ex.how.cues, ...ex.mistakes].map((c) => (
            <li key={c.fr}>{c.fr}</li>
          ))}
        </ul>
      </div>
      <table style={{ fontSize: 13, borderCollapse: 'collapse', alignSelf: 'start' }}>
        <caption style={{ textAlign: 'left', fontWeight: 700 }}>Angles (°)</caption>
        <tbody>
          <tr>
            <th>racine</th>
            <td>
              x {frame.pose[CH.x]!.toFixed(1)} · y {frame.pose[CH.y]!.toFixed(1)} · inclinaison {frame.pose[CH.tilt]!.toFixed(1)}
            </td>
          </tr>
          {JOINT_CH.map(({ ch, joint }) => {
            const v = frame.pose[CH[ch]]!;
            const [lo, hi] = bounds[joint];
            const out = v < lo || v > hi;
            return (
              <tr key={ch} style={{ color: out ? 'var(--red)' : undefined, '--b': 0 } as CSSProperties}>
                <th style={{ textAlign: 'left', paddingRight: 8 }}>{ch}</th>
                <td>
                  {v.toFixed(1)} <span style={{ color: 'var(--text-muted)' }}>[{lo}, {hi}]</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
