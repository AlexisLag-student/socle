import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Segmented } from '@/components/ui';
import { buildTimeline, createFrame, holdTime, resolve, sample, timeOfKeyframe, type Timeline } from '@/animation/engine';
import { hasAnimation } from '@/animation/loaders';
import { SAYINGS, type Animation } from '@/animation/schema';
import { animationMuscles } from '@/animation/zones';
import { exerciseById } from '@/content/index';
import { useLocalized } from '@/i18n/useLocalized';
import { useAnimationData, usePrefersReducedMotion } from './hooks';
import { Player, type RigHandle } from './player';
import { Rig } from './Rig';
import css from './animation.module.css';

// ---------------------------------------------------------------------------
// Préparation (résolution, timeline, muscles)
// ---------------------------------------------------------------------------

export interface AnimOptions {
  level?: number;
  variant?: string;
  /** Tempo du dosage (« 3-0-1 ») : durées des phases recalées. */
  tempo?: string;
}

function usePrepared(anim: Animation | null, opts: AnimOptions) {
  const { level, variant, tempo } = opts;
  return useMemo(() => {
    if (!anim) return null;
    const ex = exerciseById.get(anim.exerciseId);
    if (!ex) return null;
    const r = resolve(anim, { level, variant });
    const tl = buildTimeline(r, { tempo });
    return { ex, tl, muscles: animationMuscles(ex, r.view, r.muscles) };
  }, [anim, level, variant, tempo]);
}

function frameAt(tl: Timeline, t: number) {
  return sample(tl, t, createFrame());
}

// ---------------------------------------------------------------------------
// Bande de poses clés (mouvements réduits)
// ---------------------------------------------------------------------------

/** 2 à 4 poses clés distinctes : départ, pose représentative, autres poses. */
function keyPoseIndexes(tl: Timeline): number[] {
  const n = tl.r.keyframes.length;
  const out = [0];
  const distinct = (i: number) => out.every((j) => tl.r.poses[j]!.some((v, c) => Math.abs(v - tl.r.poses[i]![c]!) > 4));
  if (distinct(tl.r.still)) out.push(tl.r.still);
  for (let i = 1; i < n && out.length < 4; i++) if (!out.includes(i) && distinct(i)) out.push(i);
  return out.sort((a, b) => a - b);
}

function HandArrow() {
  return (
    <svg viewBox="0 0 40 24" className={css.arrow} aria-hidden>
      <path d="M3 14 C 12 6, 24 6, 33 11" />
      <path d="M27 6 L 34 11 L 27 16" />
    </svg>
  );
}

export function KeyPoseStrip({ tl, muscles, title, bilateral }: { tl: Timeline; muscles: ReturnType<typeof animationMuscles>; title: string; bilateral: boolean }) {
  const { t } = useTranslation();
  const idx = keyPoseIndexes(tl);
  return (
    <ol className={css.strip} aria-label={t('anim.keyPoses', { name: title })}>
      {idx.map((k, i) => (
        <Fragment key={k}>
          {i > 0 && (
            <li className={css.arrowItem} aria-hidden>
              <HandArrow />
            </li>
          )}
          <li className={css.stripPose}>
            <Rig tl={tl} frame={frameAt(tl, timeOfKeyframe(tl, k))} muscles={muscles} mirrored={false} bilateral={bilateral} title={t('anim.poseN', { n: i + 1, total: idx.length, name: title })} />
          </li>
        </Fragment>
      ))}
    </ol>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export interface AnimSync {
  /** Temps écoulé de l'horloge de tempo (s). */
  time: () => number;
  running: boolean;
  /** Repos ou attente : pose de départ affichée, immobile. */
  idle: boolean;
  onToggle: () => void;
}

export interface ExerciseAnimationProps extends AnimOptions {
  exerciseId: string;
  /** Lecture automatique à l'affichage (jamais si l'appareil demande de réduire les animations). */
  autoPlay?: boolean;
  /** Séance guidée, répétitions : animation calée sur l'horloge du tempo. */
  sync?: AnimSync;
  /** Séance guidée, maintien : pose tenue, respiration pendant le minuteur. */
  hold?: { running: boolean; seconds: number };
  /** Côté 2 d'un exercice unilatéral : figure en miroir. */
  side?: 1 | 2;
  /** Affiché si l'exercice n'a pas d'animation (ou si elle n'a pas pu être chargée). */
  fallback?: ReactNode;
  /** Masque l'annotation manuscrite de phase. */
  noCaption?: boolean;
  className?: string;
}

export function ExerciseAnimation({ exerciseId, level, variant, tempo, autoPlay = true, sync, hold, side, fallback = null, noCaption, className }: ExerciseAnimationProps) {
  const { anim, status } = useAnimationData(exerciseId);
  const prep = usePrepared(anim, { level, variant, tempo });
  if (status === 'loading') return <div className={[css.box, css.loading, className].filter(Boolean).join(' ')} aria-hidden />;
  if (!prep) return <>{fallback}</>;
  return <Player_ key={`${exerciseId}-${level}-${variant}-${tempo}`} prep={prep} autoPlay={autoPlay} sync={sync} hold={hold} side={side} noCaption={noCaption} className={className} />;
}

function Player_({
  prep,
  autoPlay,
  sync,
  hold,
  side,
  noCaption,
  className,
}: {
  prep: NonNullable<ReturnType<typeof usePrepared>>;
  autoPlay: boolean;
  sync?: AnimSync;
  hold?: { running: boolean; seconds: number };
  side?: 1 | 2;
  noCaption?: boolean;
  className?: string;
}) {
  const { t } = useTranslation();
  const l = useLocalized();
  const reduced = usePrefersReducedMotion();
  const { ex, tl, muscles } = prep;
  const unilateral = tl.r.side === 'unilateral';
  const [mirrorChoice, setMirror] = useState(false);
  const mirrored = side ? side === 2 : mirrorChoice;
  const [speed, setSpeed] = useState<0.5 | 1>(1);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [handle, setHandle] = useState<RigHandle | null>(null);
  const player = useRef<Player | null>(null);
  const caption = useRef<HTMLSpanElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const name = l(ex.name);
  const showStrip = reduced && !started;

  const restTime = useCallback(() => {
    if (hold) return holdTime(tl);
    if (sync) return sync.idle ? timeOfKeyframe(tl, 0) : sync.time() + tl.tempoOffset;
    return 0;
  }, [hold, sync, tl]);
  const [initial] = useState(() => frameAt(tl, restTime()));

  // Lecteur : créé quand les éléments SVG sont en place.
  useEffect(() => {
    if (!handle) return;
    const p = new Player(handle, tl);
    player.current = p;
    p.onPlayingChange = setPlaying;
    p.onSay = (k) => {
      if (caption.current) caption.current.textContent = t(`anim.say.${SAYINGS[k] ?? 'hold'}`);
    };
    p.t = restTime();
    p.render();
    return () => {
      p.destroy();
      player.current = null;
    };
    // Le lecteur suit la timeline ; le temps de départ est relu à la création seulement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle, tl, t]);

  // Hors de l'écran : pause (reprise au retour).
  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // Plusieurs entrées peuvent arriver d'un coup (WebKit) : la dernière donne l'état actuel.
    const io = new IntersectionObserver((entries) => player.current?.setOnScreen(!!entries[entries.length - 1]?.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [handle]);

  // Lecture libre (fiche, praticien) : démarrage automatique, sauf mouvements réduits.
  useEffect(() => {
    const p = player.current;
    if (!p || sync || hold) return;
    if (autoPlay && !reduced) p.play();
  }, [handle, autoPlay, reduced, sync, hold]);

  // Séance : répétitions calées sur l'horloge du tempo.
  useEffect(() => {
    const p = player.current;
    if (!p || !sync) return;
    p.clock = () => sync.time() + tl.tempoOffset;
    if (sync.running && !sync.idle && (!reduced || started)) p.play();
    else {
      p.pause();
      p.seek(restTime());
    }
  }, [handle, sync, sync?.running, sync?.idle, reduced, started, tl, restTime]);

  // Séance : maintien, respiration pendant le minuteur.
  useEffect(() => {
    const p = player.current;
    if (!p || !hold) return;
    p.seek(holdTime(tl));
    const n = Math.max(1, Math.round(hold.seconds / 5));
    p.breathPeriod = hold.running && (!reduced || started) ? hold.seconds / n : 0;
    p.setOnScreen(true);
    p.render();
  }, [handle, hold, hold?.running, hold?.seconds, reduced, started, tl]);

  useEffect(() => {
    if (player.current) player.current.speed = speed;
  }, [speed, handle]);

  const toggle = () => {
    const p = player.current;
    if (sync) return sync.onToggle();
    if (!p) return;
    if (p.playing) p.pause();
    else p.play();
  };

  const label = t('anim.label', { name });
  if (showStrip)
    return (
      <div className={[css.box, className].filter(Boolean).join(' ')}>
        <KeyPoseStrip tl={tl} muscles={muscles} title={name} bilateral={!unilateral} />
        <div className={css.controls}>
          <Button
            variant="secondary"
            icon="play"
            onClick={() => {
              setStarted(true);
              if (!sync && !hold) requestAnimationFrame(() => player.current?.play());
            }}
          >
            {t('anim.playAnyway')}
          </Button>
        </div>
      </div>
    );

  const isPlaying = sync ? sync.running && !sync.idle : playing;
  return (
    <div ref={box} className={[css.box, className].filter(Boolean).join(' ')}>
      <div className={css.stage}>
        <Rig
          key={`${mirrored}`}
          tl={tl}
          frame={initial}
          muscles={muscles}
          mirrored={mirrored}
          bilateral={!unilateral}
          breath={!!hold}
          title={label}
          desc={l(ex.how.movement)}
          onHandle={setHandle}
        />
        {!noCaption && !hold && <span ref={caption} className={css.caption} aria-hidden />}
        {hold && <span className={css.caption} aria-hidden>{t('anim.say.hold')}</span>}
      </div>
      {!hold && (
        <div className={css.controls}>
          <Button variant="secondary" iconOnly icon={isPlaying ? 'pause' : 'play'} label={isPlaying ? t('anim.pause') : t('anim.play')} onClick={toggle} disabled={sync?.idle} />
          {!sync && (
            <Segmented
              label={t('anim.speed')}
              value={speed}
              onChange={setSpeed}
              options={[
                { value: 0.5, label: t('anim.slow') },
                { value: 1, label: t('anim.normal') },
              ]}
            />
          )}
          {unilateral && !side && (
            <Button variant="ghost" icon="refresh" onClick={() => setMirror((m) => !m)} aria-pressed={mirrorChoice}>
              {t('anim.switchSide')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Vignette (bibliothèque, compositeur praticien)
// ---------------------------------------------------------------------------

/**
 * Vignette : pose représentative fixe ; l'animation joue au survol (souris), au focus (clavier)
 * ou à l'appui (bouton dédié sur mobile). Données chargées à l'approche de l'écran.
 */
export function AnimationThumb({ exerciseId, className }: { exerciseId: string; className?: string }) {
  const { t } = useTranslation();
  const l = useLocalized();
  const reduced = usePrefersReducedMotion();
  const wrap = useRef<HTMLButtonElement>(null);
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined');
  const { anim } = useAnimationData(exerciseId, near);
  const prep = usePrepared(anim, {});
  const [handle, setHandle] = useState<RigHandle | null>(null);
  const player = useRef<Player | null>(null);
  const [playing, setPlaying] = useState(false);
  // Appui avant le chargement des données : la lecture démarre dès que le lecteur est prêt.
  const pendingPlay = useRef(false);
  // Lecture lancée par le survol : le clic qui suit la confirme au lieu de l'arrêter.
  const hoverStarted = useRef(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = !!entries[entries.length - 1]?.isIntersecting;
        if (visible) setNear(true);
        player.current?.setOnScreen(visible);
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const still = prep ? timeOfKeyframe(prep.tl, prep.tl.r.still) : 0;
  // Pose fixe mémorisée : un nouveau rendu ne doit pas réécrire les transformations animées.
  const frame = useMemo(() => (prep ? frameAt(prep.tl, still) : null), [prep, still]);
  useEffect(() => {
    if (!handle || !prep) return;
    const p = new Player(handle, prep.tl);
    p.onPlayingChange = (v) => {
      setPlaying(v);
      // Une autre vignette a pris la main : retour à la pose fixe.
      if (!v) p.seek(still);
    };
    p.t = still;
    p.render();
    player.current = p;
    if (pendingPlay.current) {
      pendingPlay.current = false;
      p.play();
    }
    return () => {
      p.destroy();
      player.current = null;
    };
  }, [handle, prep, still]);

  if (!hasAnimation(exerciseId)) return null;
  const ex = exerciseById.get(exerciseId);
  const name = ex ? l(ex.name) : exerciseId;
  const start = () => {
    if (player.current) player.current.play();
    else pendingPlay.current = true;
  };
  const stop = () => {
    pendingPlay.current = false;
    player.current?.pause();
  };

  return (
    <button
      ref={wrap}
      type="button"
      className={[css.thumb, className].filter(Boolean).join(' ')}
      aria-label={t(playing ? 'anim.stopThumb' : 'anim.playThumb', { name })}
      aria-pressed={playing}
      // Survol à la souris et focus au clavier : lecture. Au doigt, seul l'appui compte (bouton dédié).
      onPointerEnter={(e) => {
        if (reduced || e.pointerType !== 'mouse') return;
        hoverStarted.current = true;
        start();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return;
        hoverStarted.current = false;
        stop();
      }}
      onFocus={(e) => !reduced && e.currentTarget.matches(':focus-visible') && start()}
      onBlur={stop}
      onClick={() => {
        if (hoverStarted.current) hoverStarted.current = false;
        else if (player.current?.playing) stop();
        else start();
      }}
    >
      {prep && frame ? (
        <Rig tl={prep.tl} frame={frame} muscles={prep.muscles} mirrored={false} bilateral={prep.tl.r.side === 'bilateral'} title={t('anim.label', { name })} onHandle={setHandle} />
      ) : (
        <span className={css.thumbPlaceholder} />
      )}
      <span className={css.thumbBadge} aria-hidden>
        <Icon name={playing ? 'pause' : 'play'} size={14} />
      </span>
    </button>
  );
}
