import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Empty, ButtonLink, HandNote, Icon, Notice, ui } from '@/components/ui';
import { MuscleMap } from '@/components/anatomy/MuscleMap';
import { AnimationThumb, ExerciseAnimation, type AnimSync } from '@/components/animation/ExerciseAnimation';
import { hasAnimation, loadAnimation } from '@/animation/loaders';
import { useActiveProgram, useExerciseStates, useProfile } from '@/app/hooks';
import { setPrefs, usePrefs } from '@/app/prefs';
import { useMarkSessionRunning } from '@/app/sessionActivity';
import { exerciseById } from '@/content/index';
import type { Feedback } from '@/domain/ids';
import type { ProgramItem, SessionEntry, SessionLog, SetLog } from '@/domain/user';
import { applyFeedback, decideAndApply, newLog, saveLog } from '@/db/repo';
import { availableLevels, equipmentSet, pickVariant } from '@/engine/availability';
import { restBetweenExercises } from '@/engine/duration';
import { beep, keepScreenOn, tempoPhases, vibrate } from '@/lib/device';
import { formatClock, useCountdown } from '@/lib/useCountdown';
import { formatDosage, formatDuration } from '@/features/exercise/format';
import { useLocalized } from '@/i18n/useLocalized';
import { tempoPosition, useTempoClock, type TempoClock } from './tempoClock';
import { afterFeedback, afterWork, clampElapsed, clampReps, cycleSeconds, quotaReached, repQuota, repsDone } from './flow';
import css from './session.module.css';

/** work → (rest → work)… → feedback → between (repos avant l'exercice suivant) → work. */
type Stage = 'work' | 'rest' | 'feedback' | 'between';

/**
 * Rythme d'une répétition : consigne de la phase en cours, secondes restantes en très grand,
 * barre en segments (phase en cours en rouge) et compteur de répétitions noté à la main.
 */
function TempoIndicator({ tempo, sound, reps, side, clock }: { tempo: string; sound: boolean; reps?: number; side?: 1 | 2; clock: TempoClock }) {
  const { t } = useTranslation();
  const phases = useMemo(() => tempoPhases(tempo), [tempo]);
  // Au quota, l'indicateur reste figé sur la dernière répétition (jamais « 13 / 12 »).
  const cycle = useMemo(() => cycleSeconds(tempo), [tempo]);
  const elapsed = useCallback(() => clampElapsed(clock.elapsed(), cycle, reps), [clock, cycle, reps]);
  const [pos, setPos] = useState(() => tempoPosition(phases, elapsed()));
  // Remplissage du segment en cours : départ décalé si l'indicateur s'affiche en cours de phase.
  const [fill, setFill] = useState({ key: '', delay: 0 });
  useEffect(() => {
    let last = '';
    const tick = () => {
      const p = tempoPosition(phases, elapsed());
      const key = `${p.rep}-${p.index}`;
      if (key !== last) {
        if (clock.running && sound) beep(p.index === 0 ? 'tick' : 'phase');
        setFill({ key, delay: (phases[p.index]?.sec ?? 0) - p.left });
        last = key;
      }
      setPos((prev) => (prev.rep === p.rep && prev.index === p.index && Math.ceil(prev.left) === Math.ceil(p.left) ? prev : p));
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [phases, sound, clock, elapsed]);
  const i = pos.index;
  const rep = pos.rep;
  const left = pos.left;
  const p = phases[i];
  if (!p) return null;
  return (
    <div className={css.tempo} aria-live="off">
      <span className="kicker">{t(`session.tempo.${p.kind}`)}</span>
      <span className={css.clock}>{Math.max(1, Math.ceil(left))}</span>
      <div className={css.tempoTrack} style={{ gridTemplateColumns: phases.map((x) => `${x.sec}fr`).join(' ') } as CSSProperties} aria-hidden>
        {phases.map((x, k) => (
          <span key={k} className={k < i ? css.segDone : k === i ? css.segNow : css.segNext}>
            {k === i && (
              <span
                key={fill.key}
                className={css.segFill}
                style={{ animationDuration: `${x.sec}s`, animationDelay: `${-fill.delay}s`, animationPlayState: clock.running ? 'running' : 'paused' }}
              />
            )}
          </span>
        ))}
      </div>
      <div className={css.tempoLabels} style={{ gridTemplateColumns: phases.map((x) => `${x.sec}fr`).join(' ') } as CSSProperties} aria-hidden>
        {phases.map((x, k) => (
          <span key={k} className={k === i ? css.labelNow : undefined}>
            {t(`session.tempo.${x.kind}`)} {x.sec >= 1 ? `${x.sec} s` : ''}
          </span>
        ))}
      </div>
      <HandNote className={css.repCount}>
        {reps ? t('session.repOf', { n: rep, total: reps }) : t('session.tempo.rep', { n: rep })}
        {side ? ` · ${t('session.side', { n: side })}` : ''}
      </HandNote>
    </div>
  );
}

/**
 * Carte de repos, commune au repos entre séries et au repos entre exercices : minuteur, réglette qui se vide
 * (sans transition si les animations sont réduites) et ce qui suit. Le minuteur n'est pas lu à chaque seconde :
 * les annonces passent par la région dédiée de l'écran de séance.
 */
function RestCard({ remaining, total, next }: { remaining: number; total: number; next: string }) {
  const { t } = useTranslation();
  const ratio = total > 0 ? Math.min(1, Math.max(0, remaining / total)) : 0;
  return (
    <>
      <span className="kicker">{t('session.rest')}</span>
      <p className={css.clock} role="timer" aria-label={t('session.restLeft', { time: formatClock(remaining) })}>
        {formatClock(remaining)}
      </p>
      <div className={css.ruler} aria-hidden>
        <span style={{ transform: `scaleX(${ratio})` }} />
      </div>
      <p className={css.sub}>{next}</p>
    </>
  );
}

function GuidedSession() {
  const { t } = useTranslation();
  const l = useLocalized();
  const navigate = useNavigate();
  const { key } = useParams();
  const program = useActiveProgram();
  const profile = useProfile();
  const states = useExerciseStates();
  const prefs = usePrefs();

  const session = program?.sessions.find((s) => s.key === key);
  const items = useMemo(() => session?.items.filter((i) => exerciseById.has(i.exerciseId)) ?? [], [session]);

  const [log, setLog] = useState<SessionLog | null>(null);
  const [idx, setIdx] = useState(0);
  const [setNo, setSetNo] = useState(0);
  const [side, setSide] = useState<1 | 2>(1);
  const [stage, setStage] = useState<Stage>('work');
  const [finished, setFinished] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [tempoOn, setTempoOn] = useState(false);
  /** Durée totale du repos en cours (pour la réglette ; « +15 s » l'allonge). */
  const [restTotal, setRestTotal] = useState(0);
  /** Côté 1 terminé au rythme : le côté 2 attend que l'utilisateur démarre. */
  const [awaitingSide, setAwaitingSide] = useState(false);
  /** Annonce « 10 secondes » du repos en cours (lecteur d'écran). */
  const [tenLeft, setTenLeft] = useState(false);
  const started = useRef(false);
  const clock = useTempoClock();
  useMarkSessionRunning(!finished);

  // Démarrage : crée le journal de séance, garde l'écran allumé.
  useEffect(() => {
    if (!program || !session || started.current || !states) return;
    started.current = true;
    const entries: SessionEntry[] = items.map((it) => ({
      exerciseId: it.exerciseId,
      variantId: it.variantId,
      level: it.level,
      sets: Array.from({ length: it.dosage.sets }, (): SetLog => ({
        done: false,
        ...(it.dosage.reps ? { reps: it.dosage.reps[1] } : {}),
        ...(it.dosage.holdSec ? { sec: it.dosage.holdSec } : {}),
        ...(states.get(it.exerciseId)?.loadKg ? { loadKg: states.get(it.exerciseId)!.loadKg } : {}),
      })),
    }));
    const l0 = newLog(program.id, session.key, entries);
    setLog(l0);
    void saveLog(l0);
  }, [program, session, items, states]);

  useEffect(() => {
    let release: (() => void) | undefined;
    void keepScreenOn().then((r) => (release = r));
    return () => release?.();
  }, []);

  const item: ProgramItem | undefined = items[idx];
  const ex = item ? exerciseById.get(item.exerciseId) : undefined;
  const entry = log?.entries[idx];
  const isReps = !!item && !item.dosage.holdSec;
  const quota = item ? repQuota(item.dosage) : undefined;
  const nextItem: ProgramItem | undefined = items[idx + 1];
  const nextEx = nextItem ? exerciseById.get(nextItem.exerciseId) : undefined;

  // Horloge du tempo : tourne pendant chaque série de répétitions, à l'arrêt pendant le repos.
  useEffect(() => {
    if (stage === 'work' && isReps && !finished) clock.restart();
    else clock.stop();
  }, [stage, idx, setNo, isReps, finished, clock]);

  // L'animation de l'exercice suivant est chargée à l'avance (fonctionne aussi hors ligne).
  useEffect(() => {
    const next = items[idx + 1];
    if (next) void loadAnimation(next.exerciseId);
  }, [idx, items]);

  // Nouvel exercice : retour en haut de l'écran (nom, animation et minuteur visibles).
  const firstExercise = useRef(true);
  useEffect(() => {
    if (firstExercise.current) {
      firstExercise.current = false;
      return;
    }
    window.scrollTo?.({ top: 0 });
  }, [idx]);

  const animSync = useMemo<AnimSync>(
    () => ({ time: clock.elapsed, running: clock.running, idle: stage !== 'work', onToggle: clock.toggle }),
    // clock.running est relu à chaque changement d'état de l'horloge (useTempoClock).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clock, clock.running, stage],
  );

  const persist = useCallback((next: SessionLog) => {
    setLog(next);
    void saveLog(next);
  }, []);

  const timer = useCountdown(
    () => {
      signalEnd();
      if (stage === 'rest') setStage('work');
      else if (stage === 'between') advance();
      // Maintien : le minuteur s'arrête à la durée prévue, la série (ou le côté) est validée.
      else if (stage === 'work' && item?.dosage.holdSec) workDone({}, true);
    },
    (left) => {
      if (prefs.tempoSound && left <= 3 && left > 0) beep('tick');
      if ((stage === 'rest' || stage === 'between') && left === 10) setTenLeft(true);
    },
  );

  // Maintien : pose tenue, respiration pendant le minuteur.
  const holdSec = item?.dosage.holdSec;
  const animHold = useMemo(() => (holdSec ? { running: timer.running && stage === 'work', seconds: holdSec } : undefined), [holdSec, timer.running, stage]);

  function updateSet(i: number, patch: Partial<SetLog>) {
    if (!log) return;
    const entries = log.entries.map((e, k) => (k === idx ? { ...e, sets: e.sets.map((s, j) => (j === i ? { ...s, ...patch } : s)) } : e));
    persist({ ...log, entries });
  }

  function signalEnd() {
    if (prefs.tempoSound) beep('end');
    if (prefs.vibration) vibrate([200, 100, 200]);
  }

  function startRest(sec: number) {
    setRestTotal(sec);
    setTenLeft(false);
    timer.start(sec);
  }

  /**
   * Série (ou côté) terminée : côté 2, repos entre séries ou retour sur l'exercice.
   * `bySide` : les côtés s'enchaînent séparément (maintien par côté, rythme affiché).
   */
  function workDone(patch: Partial<SetLog>, bySide: boolean) {
    if (!item) return;
    const next = afterWork(item.dosage, setNo, side, bySide);
    if (next.kind === 'side') {
      setSide(2);
      if (!item.dosage.holdSec) setAwaitingSide(true);
      return;
    }
    updateSet(setNo, { done: true, ...patch });
    setAwaitingSide(false);
    if (next.kind === 'rest') {
      setSetNo(next.nextSet);
      setSide(1);
      setStage('rest');
      startRest(item.dosage.restSec);
    } else {
      setStage('feedback');
      timer.stop();
    }
  }

  // Quota de répétitions au rythme affiché : l'horloge s'arrête à la dernière répétition prévue,
  // puis la série est validée et le repos démarre (ou le côté 2 attend son départ).
  const tempo = item?.dosage.tempo;
  useEffect(() => {
    if (stage !== 'work' || !tempoOn || !tempo || !quota || awaitingSide) return;
    const cycle = cycleSeconds(tempo);
    const id = setInterval(() => {
      if (!clock.running || !quotaReached(clock.elapsed(), cycle, quota)) return;
      clock.pause();
      signalEnd();
      workDone({ reps: quota }, true);
    }, 100);
    return () => clearInterval(id);
    // workDone et signalEnd lisent l'état courant à chaque rendu ; l'intervalle est recréé quand il change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, tempoOn, tempo, quota, awaitingSide, clock, setNo, side, log]);

  /** Afficher le tempo repart du début d'une répétition (indicateur et animation ensemble). */
  const toggleTempo = () => {
    if (!tempoOn) clock.restart();
    setTempoOn(!tempoOn);
  };

  /** « Série terminée » (possible avant le quota) : au rythme affiché, les répétitions faites sont notées. */
  const completeSet = () => {
    const patch = tempoOn && tempo && quota ? { reps: repsDone(clock.elapsed(), cycleSeconds(tempo), quota) } : {};
    workDone(patch, false);
  };

  const startSide = () => {
    setAwaitingSide(false);
    clock.restart();
  };

  const giveFeedback = async (fb: Feedback) => {
    if (!log || !item || !ex) return;
    const entries = log.entries.map((e, k) => (k === idx ? { ...e, feedback: fb } : e));
    const updated = { ...log, entries };
    persist(updated);
    const eq = equipmentSet([...(profile?.equipment ?? []), ...(ex.variants.find((v) => v.id === item.variantId)?.equipment ?? [])]);
    const variant = pickVariant(ex, eq, item.variantId);
    const loads = entries[idx]!.sets.map((s) => s.loadKg).filter((x): x is number => !!x);
    await applyFeedback(
      ex.id,
      item.level,
      item.variantId,
      fb,
      { availableLevels: (variant ? availableLevels(ex, variant, eq) : [item.level]).filter((lv) => !item.maxLevel || lv <= item.maxLevel), loadable: !!variant?.loadable },
      loads.length ? Math.max(...loads) : undefined,
    );
    if (afterFeedback(idx, items.length) === 'between') startBetween();
    else finish(updated);
  };

  /** Repos entre deux exercices, d'après le repos entre séries de l'exercice terminé (60 à 120 s). */
  const startBetween = () => {
    if (!item) return;
    setStage('between');
    startRest(restBetweenExercises(item.dosage));
  };

  const addRest = () => {
    timer.add(15);
    setRestTotal((r) => r + 15);
  };

  /** Fin du repos entre exercices (minuteur écoulé ou « Passer le repos ») : exercice suivant. */
  function advance() {
    timer.stop();
    setSetNo(0);
    setSide(1);
    setStage('work');
    setShowMap(false);
    setTempoOn(false);
    setAwaitingSide(false);
    setIdx((i) => i + 1);
  }

  /** Exercice passé : exercice suivant sans repos ; « current » = journal le plus récent (évite d'écraser le dernier retour). */
  const goNext = (current: SessionLog | null = log) => {
    if (idx + 1 >= items.length) {
      timer.stop();
      finish(current);
    } else advance();
  };

  const skip = () => {
    const updated = log ? { ...log, entries: log.entries.map((e, k) => (k === idx ? { ...e, skipped: true } : e)) } : null;
    if (updated) persist(updated);
    goNext(updated);
  };

  const finish = (current: SessionLog | null = log) => {
    if (current) persist({ ...current, finishedAt: Date.now() });
    setFinished(true);
  };

  if (program === undefined || states === undefined) return null;
  if (!program || !session)
    return (
      <Empty>
        <p>{t('session.notFound')}</p>
        <ButtonLink to="/program">{t('nav.program')}</ButtonLink>
      </Empty>
    );

  // --- Récapitulatif --------------------------------------------------------------
  if (finished) {
    const done = log?.entries.filter((e) => !e.skipped && e.sets.some((s) => s.done)).length ?? 0;
    const minutes = log ? Math.max(1, Math.round(((log.finishedAt ?? Date.now()) - log.startedAt) / 60000)) : 0;
    const pending = items.map((i) => states.get(i.exerciseId)).filter((s) => s?.pending);
    return (
      <div className={css.summary}>
        <span className="kicker">{t('program.session', { key: session.key })}</span>
        <h1>{t('session.doneTitle')}</h1>
        <p className={ui.muted}>{t('session.doneMeta', { count: done, minutes })}</p>
        {pending.length > 0 && (
          <section className={css.suggestions} aria-labelledby="done-sugg">
            <h2 id="done-sugg">{t('program.suggestionsTitle')}</h2>
            {pending.map((s) => {
              const e = exerciseById.get(s!.exerciseId)!;
              const p = s!.pending!;
              const target = e.levels.find((x) => x.level === p.toLevel);
              return (
                <div key={s!.exerciseId} className={css.suggestion}>
                  <HandNote red pencil>
                    {l(e.name)} — {t(`progression.${p.kind}`, { level: target ? l(target.name) : p.toLevel, pct: Math.abs(p.loadChangePct ?? 0) })}
                  </HandNote>
                  <div className={ui.row}>
                    <Button size="small" icon="check" flat onClick={() => void decideAndApply(e.id, true, (id) => exerciseById.get(id))}>
                      {t('progression.accept')}
                    </Button>
                    <Button size="small" variant="secondary" onClick={() => void decideAndApply(e.id, false, (id) => exerciseById.get(id))}>
                      {t('progression.decline')}
                    </Button>
                  </div>
                </div>
              );
            })}
            <p className={ui.muted}>{t('progression.youDecide')}</p>
          </section>
        )}
        <div className={ui.row}>
          <Button size="large" onClick={() => navigate('/history')}>
            {t('session.seeHistory')}
          </Button>
          <Button size="large" variant="secondary" onClick={() => navigate('/')}>
            {t('nav.home')}
          </Button>
        </div>
      </div>
    );
  }

  if (!item || !ex || !entry) return null;
  const level = ex.levels.find((x) => x.level === item.level);
  const variant = ex.variants.find((v) => v.id === item.variantId);
  const d = item.dosage;
  const showLoad = !!variant?.loadable || d.intensity.kind === 'load';
  const lastSet = setNo + 1 >= d.sets;
  const loadNote = entry.sets.find((s) => s.loadKg)?.loadKg;
  const holdStarted = timer.running || timer.paused;
  const doneCount = stage === 'between' ? idx + 1 : idx;

  // Annonces pour les lecteurs d'écran : au changement d'étape et 10 s avant la fin d'un repos, jamais à chaque seconde.
  const rest = formatDuration(restTotal, t);
  const announce =
    stage === 'rest' || stage === 'between'
      ? tenLeft
        ? t('session.announce.tenLeft')
        : stage === 'between' && nextEx
          ? t('session.announce.restExercise', { rest, name: l(nextEx.name) })
          : t('session.announce.restSet', { rest, n: setNo + 1, total: d.sets })
      : stage === 'feedback'
        ? t('session.announce.feedback')
        : awaitingSide
          ? t('session.announce.side')
          : t('session.announce.work', {
              n: setNo + 1,
              total: d.sets,
              side: d.perSide && (d.holdSec || tempoOn) ? t('session.announce.sidePart', { n: side }) : '',
            });
  const announcer = (
    <p className="visually-hidden" aria-live="polite" aria-atomic="true">
      {announce}
    </p>
  );

  const top = (
    <div className={css.top}>
      <Button
        variant="ghost"
        icon="x"
        iconOnly
        label={t('session.quit')}
        onClick={() => {
          if (log && log.entries.some((e) => e.sets.some((s) => s.done))) finish();
          else navigate('/program');
        }}
      />
      <span className={css.count}>{t('session.progress', { n: Math.min(doneCount + 1, items.length), total: items.length })}</span>
      <div
        className={css.progress}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={doneCount}
        aria-label={t('session.progressLabel')}
      >
        {items.map((_, k) => (
          <span key={k} className={k < doneCount ? css.pDone : k === doneCount ? css.pNow : undefined} />
        ))}
      </div>
    </div>
  );

  // --- Repos entre deux exercices : minuteur, aperçu de l'exercice suivant, « Passer le repos » ---------------
  if (stage === 'between' && nextItem && nextEx) {
    const nLevel = nextEx.levels.find((x) => x.level === nextItem.level);
    const nVariant = nextEx.variants.find((v) => v.id === nextItem.variantId);
    return (
      <div className={css.page}>
        {top}
        {announcer}
        <Card featured as="section" className={css.action} aria-label={t('session.rest')}>
          <div className={css.actionInner}>
            <RestCard remaining={timer.remaining} total={restTotal} next={t('session.nextExercise', { name: l(nextEx.name) })} />
          </div>
        </Card>
        <section className={css.nextUp} aria-labelledby="next-up">
          <span className="kicker" id="next-up">
            {t('session.nextUp')}
          </span>
          <div className={css.nextBody}>
            <div className={css.nextVisual}>
              {hasAnimation(nextEx.id, nextItem.level) ? (
                <AnimationThumb exerciseId={nextEx.id} />
              ) : (
                <MuscleMap name={l(nextEx.name)} primary={nextEx.muscles.primary} secondary={nextEx.muscles.secondary} zoom={nextEx.zoom} compact showLegend={false} />
              )}
            </div>
            <div className={css.nextText}>
              <h2 className={css.nextName}>{l(nextEx.name)}</h2>
              <p>
                {nLevel && l(nLevel.name)}
                {nVariant ? ` · ${l(nVariant.name)}` : ''}
              </p>
              <p className={css.doseLine}>{formatDosage(nextItem.dosage, t, l).slice(0, 3).join(' · ')}</p>
            </div>
          </div>
        </section>
        <div className={css.bar}>
          <Button variant="secondary" className={css.addRest} onClick={addRest} aria-label={t('session.addRestLabel')}>
            {t('session.addRest')}
          </Button>
          <Button onClick={advance}>{t('session.skipRest')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={css.page}>
      {top}
      {announcer}

      <header className={css.head}>
        <h1 className={css.name}>{l(ex.name)}</h1>
        <p>
          {level && l(level.name)}
          {variant ? ` · ${l(variant.name)}` : ''}
        </p>
        <p className={css.doseLine}>{formatDosage(d, t, l).slice(1).join(' · ')}</p>
      </header>
      {item.note && <Notice icon="pro">{item.note}</Notice>}

      {/* --- Animation de l'exercice (au rythme du tempo) --- */}
      {hasAnimation(ex.id, item.level) && (
        <section className={css.anim} aria-label={t('exercise.movementAnim')}>
          {prefs.sessionAnimation && (
            <ExerciseAnimation
              key={idx}
              exerciseId={ex.id}
              level={item.level}
              variant={item.variantId}
              tempo={d.tempo}
              sync={d.holdSec ? undefined : animSync}
              hold={animHold}
              side={d.perSide && d.holdSec ? side : undefined}
            />
          )}
          <Button size="small" variant="ghost" onClick={() => setPrefs({ sessionAnimation: !prefs.sessionAnimation })} aria-expanded={prefs.sessionAnimation}>
            {prefs.sessionAnimation ? t('anim.hide') : t('anim.show')}
          </Button>
        </section>
      )}

      {/* --- Carte du minuteur --- */}
      <Card featured as="section" className={css.action}>
        <div className={css.actionInner}>
          {stage === 'rest' && <RestCard remaining={timer.remaining} total={restTotal} next={t('session.nextSet', { n: setNo + 1, total: d.sets })} />}

          {stage === 'work' && d.holdSec && (
            <>
              <span className="kicker">
                {t('session.set', { n: setNo + 1, total: d.sets })}
                {d.perSide ? ` · ${t('session.side', { n: side })}` : ''}
              </span>
              <p className={css.clock}>{formatClock(holdStarted ? timer.remaining : d.holdSec)}</p>
              <p className={css.sub}>{t('session.hold')}</p>
            </>
          )}

          {stage === 'work' && !d.holdSec && (
            <>
              {tempoOn && d.tempo ? (
                <TempoIndicator tempo={d.tempo} sound={prefs.tempoSound} reps={quota} side={d.perSide ? side : undefined} clock={clock} />
              ) : (
                <>
                  <span className="kicker">{t('session.set', { n: setNo + 1, total: d.sets })}</span>
                  <p className={css.clock}>{d.reps && (d.reps[0] === d.reps[1] ? d.reps[0] : `${d.reps[0]}–${d.reps[1]}`)}</p>
                  <p className={css.sub}>
                    {t('session.reps')}
                    {d.perSide ? ` ${t('common.perSide')}` : ''}
                    {d.tempo ? ` · ${t('format.tempo', { tempo: d.tempo })}` : ''}
                  </p>
                </>
              )}
              {awaitingSide && <p className={css.sub}>{t('session.switchSide')}</p>}
              {d.tempo && (
                <div className={css.tempoTools}>
                  <Button size="small" variant="ghost" onClick={toggleTempo}>
                    {tempoOn ? t('session.tempo.hide') : t('session.tempo.show')}
                  </Button>
                  <Button size="small" variant="ghost" icon={prefs.tempoSound ? 'sound' : 'mute'} onClick={() => setPrefs({ tempoSound: !prefs.tempoSound })}>
                    {prefs.tempoSound ? t('session.soundOn') : t('session.soundOff')}
                  </Button>
                </div>
              )}
            </>
          )}

          {stage === 'feedback' && (
            <fieldset className={css.feedback}>
              <legend>{t('session.feedbackTitle')}</legend>
              <div className={css.fbRow}>
                {(['easy', 'ok', 'hard'] as const).map((fb) => (
                  <button key={fb} type="button" className={css.fbBtn} onClick={() => void giveFeedback(fb)}>
                    {t(`session.fb.${fb}`)}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>
      </Card>

      {/* --- Séries --- */}
      <section className={css.sets} aria-labelledby="sets-h">
        <div className={css.setsHead}>
          <h2 id="sets-h">{t('session.setsTitle')}</h2>
          {(loadNote || d.intensity.kind === 'bodyweight') && (
            <HandNote as="span">{t('session.loadNote', { load: loadNote ? `${loadNote} kg` : l(d.intensity.value).toLocaleLowerCase() })}</HandNote>
          )}
        </div>
        <ul className={css.tiles} aria-label={t('session.setsLabel')}>
          {entry.sets.map((s, i) => {
            const state = s.done ? css.tileDone : i === setNo && stage !== 'feedback' ? css.tileNow : css.tileNext;
            return (
              <li key={i}>
                <label className={`${css.tile} ${state}`}>
                  <input type="checkbox" checked={s.done} onChange={(e) => updateSet(i, { done: e.target.checked })} />
                  {s.done && <Icon name="check" size={18} />}
                  {t('session.setShort', { n: i + 1 })}
                </label>
              </li>
            );
          })}
        </ul>
        {(d.reps || showLoad) && (
          <details className={css.details}>
            <summary>{t('session.noteSets')}</summary>
            {entry.sets.map((s, i) => (
              <div key={i} className={css.setRow}>
                <span>{t('session.setShort', { n: i + 1 })}</span>
                {d.reps && (
                  <label className={css.setField}>
                    <span className="visually-hidden">{t('session.reps')}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={quota}
                      value={s.reps ?? ''}
                      onChange={(e) => updateSet(i, { reps: e.target.value === '' ? undefined : clampReps(Number(e.target.value), quota) })}
                    />
                    <span>{t('session.repsShort')}</span>
                  </label>
                )}
                {showLoad && (
                  <label className={css.setField}>
                    <span className="visually-hidden">{t('session.load')}</span>
                    <input type="number" inputMode="decimal" min={0} step={0.5} value={s.loadKg ?? ''} onChange={(e) => updateSet(i, { loadKg: e.target.value === '' ? undefined : Number(e.target.value) })} />
                    <span>kg</span>
                  </label>
                )}
              </div>
            ))}
          </details>
        )}
      </section>

      {/* --- Consignes et schéma --- */}
      <details className={css.details}>
        <summary>{t('session.howTo')}</summary>
        <p>
          <strong>{t('exercise.setup')} :</strong> {l(ex.how.setup)}
        </p>
        <p>
          <strong>{t('exercise.movement')} :</strong> {l(ex.how.movement)}
        </p>
        <ul>
          {ex.how.cues.map((c, i) => (
            <li key={i}>{l(c)}</li>
          ))}
        </ul>
        {ex.how.breathing && <p className={ui.muted}>{l(ex.how.breathing)}</p>}
        {variant && <p className={ui.muted}>{l(variant.instructions)}</p>}
      </details>
      <details className={css.details} open={showMap} onToggle={(e) => setShowMap((e.target as HTMLDetailsElement).open)}>
        <summary>{t('session.showMap')}</summary>
        {showMap && <MuscleMap name={l(ex.name)} primary={ex.muscles.primary} secondary={ex.muscles.secondary} zoom={ex.zoom} compact />}
      </details>

      <div className={css.footer}>
        <Button variant="ghost" icon="skip" onClick={skip}>
          {t('session.skipExercise')}
        </Button>
        {stage !== 'feedback' && (
          <Button
            variant="ghost"
            onClick={() => {
              timer.stop();
              setStage('feedback');
            }}
          >
            {t('session.endExercise')}
          </Button>
        )}
      </div>

      {/* --- Barre d'action, au pouce --- */}
      {stage !== 'feedback' && (
        <div className={css.bar}>
          {stage === 'rest' && (
            <>
              <Button variant="secondary" className={css.addRest} onClick={addRest} aria-label={t('session.addRestLabel')}>
                {t('session.addRest')}
              </Button>
              <Button
                onClick={() => {
                  timer.stop();
                  setStage('work');
                }}
              >
                {t('session.skipRest')}
              </Button>
            </>
          )}
          {stage === 'work' && d.holdSec && (
            <>
              {timer.running && <Button variant="secondary" icon="pause" iconOnly label={t('session.pause')} onClick={timer.pause} />}
              {timer.paused && <Button variant="secondary" icon="play" iconOnly label={t('session.resume')} onClick={timer.resume} />}
              {!holdStarted ? (
                <Button icon="play" onClick={() => timer.start(d.holdSec!)}>
                  {t('session.startHold')}
                </Button>
              ) : (
                <p className={css.barNote}>{t('session.holding')}</p>
              )}
            </>
          )}
          {stage === 'work' && !d.holdSec && awaitingSide && (
            <Button icon="play" onClick={startSide}>
              {t('session.startSide')}
            </Button>
          )}
          {stage === 'work' && !d.holdSec && !awaitingSide && (
            <>
              <Button variant="secondary" icon={tempoOn ? 'pause' : 'play'} iconOnly label={tempoOn ? t('session.tempo.hide') : t('session.tempo.show')} onClick={toggleTempo} disabled={!d.tempo} />
              <Button onClick={completeSet}>
                {t('session.setDone')}
                {!lastSet ? ` · ${t('session.restFor', { rest: formatDuration(d.restSec, t) })}` : ''}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/** Réinitialise complètement la séance quand on passe d'une séance à l'autre (A → B). */
export default function SessionPage() {
  const { key } = useParams();
  return <GuidedSession key={key} />;
}
