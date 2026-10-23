import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Empty, ButtonLink, HandNote, Icon, Notice, ui } from '@/components/ui';
import { MuscleMap } from '@/components/anatomy/MuscleMap';
import { useActiveProgram, useExerciseStates, useProfile } from '@/app/hooks';
import { setPrefs, usePrefs } from '@/app/prefs';
import { useMarkSessionRunning } from '@/app/sessionActivity';
import { exerciseById } from '@/content/index';
import type { Feedback } from '@/domain/ids';
import type { ProgramItem, SessionEntry, SessionLog, SetLog } from '@/domain/user';
import { applyFeedback, decideAndApply, newLog, saveLog } from '@/db/repo';
import { availableLevels, equipmentSet, pickVariant } from '@/engine/availability';
import { beep, keepScreenOn, tempoPhases, vibrate } from '@/lib/device';
import { formatClock, useCountdown } from '@/lib/useCountdown';
import { formatDosage, formatDuration } from '@/features/exercise/format';
import { useLocalized } from '@/i18n/useLocalized';
import css from './session.module.css';

type Stage = 'work' | 'rest' | 'feedback';

/**
 * Rythme d'une répétition : consigne de la phase en cours, secondes restantes en très grand,
 * barre en segments (phase en cours en rouge) et compteur de répétitions noté à la main.
 */
function TempoIndicator({ tempo, sound, reps }: { tempo: string; sound: boolean; reps?: number }) {
  const { t } = useTranslation();
  const phases = useMemo(() => tempoPhases(tempo), [tempo]);
  const [i, setI] = useState(0);
  const [rep, setRep] = useState(1);
  const [left, setLeft] = useState(phases[0]?.sec ?? 0);
  useEffect(() => {
    const p = phases[i];
    if (!p) return;
    if (sound) beep(i === 0 ? 'tick' : 'phase');
    const end = Date.now() + p.sec * 1000;
    const tick = setInterval(() => setLeft(Math.max(0, (end - Date.now()) / 1000)), 200);
    const id = setTimeout(() => {
      const next = (i + 1) % phases.length;
      if (next === 0) setRep((r) => r + 1);
      setLeft(phases[next]!.sec);
      setI(next);
    }, p.sec * 1000);
    return () => {
      clearTimeout(id);
      clearInterval(tick);
    };
  }, [i, phases, sound]);
  const p = phases[i];
  if (!p) return null;
  return (
    <div className={css.tempo} aria-live="off">
      <span className="kicker">{t(`session.tempo.${p.kind}`)}</span>
      <span className={css.clock}>{Math.max(1, Math.ceil(left))}</span>
      <div className={css.tempoTrack} style={{ gridTemplateColumns: phases.map((x) => `${x.sec}fr`).join(' ') } as CSSProperties} aria-hidden>
        {phases.map((x, k) => (
          <span key={k} className={k < i ? css.segDone : k === i ? css.segNow : css.segNext}>
            {k === i && <span key={`${rep}-${i}`} className={css.segFill} style={{ animationDuration: `${x.sec}s` }} />}
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
      <HandNote className={css.repCount}>{reps ? t('session.repOf', { n: rep, total: reps }) : t('session.tempo.rep', { n: rep })}</HandNote>
    </div>
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
  const started = useRef(false);
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

  const persist = useCallback((next: SessionLog) => {
    setLog(next);
    void saveLog(next);
  }, []);

  const timer = useCountdown(
    () => {
      signalEnd();
      if (stage === 'rest') setStage('work');
      else if (stage === 'work' && item?.dosage.holdSec) {
        if (item.dosage.perSide && side === 1) {
          setSide(2);
          return;
        }
        updateSet(setNo, { done: true });
        nextSet();
      }
    },
    (left) => {
      if (prefs.tempoSound && left <= 3 && left > 0) beep('tick');
    },
  );

  function updateSet(i: number, patch: Partial<SetLog>) {
    if (!log) return;
    const entries = log.entries.map((e, k) => (k === idx ? { ...e, sets: e.sets.map((s, j) => (j === i ? { ...s, ...patch } : s)) } : e));
    persist({ ...log, entries });
  }

  function signalEnd() {
    if (prefs.tempoSound) beep('end');
    if (prefs.vibration) vibrate([200, 100, 200]);
  }

  function nextSet() {
    if (!item) return;
    if (setNo + 1 >= item.dosage.sets) {
      setStage('feedback');
      timer.stop();
    } else {
      setSetNo((s) => s + 1);
      setSide(1);
      setStage('rest');
      timer.start(item.dosage.restSec);
    }
  }

  const completeSet = () => {
    updateSet(setNo, { done: true });
    nextSet();
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
    goNext(updated);
  };

  /** Passe à l'exercice suivant ; « current » = journal le plus récent (évite d'écraser le dernier retour). */
  const goNext = (current: SessionLog | null = log) => {
    timer.stop();
    setSetNo(0);
    setSide(1);
    setStage('work');
    setShowMap(false);
    setTempoOn(false);
    if (idx + 1 >= items.length) finish(current);
    else setIdx((i) => i + 1);
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

  return (
    <div className={css.page}>
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
        <span className={css.count}>{t('session.progress', { n: idx + 1, total: items.length })}</span>
        <div
          className={css.progress}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-valuenow={idx}
          aria-label={t('session.progressLabel')}
        >
          {items.map((_, k) => (
            <span key={k} className={k < idx ? css.pDone : k === idx ? css.pNow : undefined} />
          ))}
        </div>
      </div>

      <header className={css.head}>
        <h1 className={css.name}>{l(ex.name)}</h1>
        <p>
          {level && l(level.name)}
          {variant ? ` · ${l(variant.name)}` : ''}
        </p>
        <p className={css.doseLine}>{formatDosage(d, t, l).slice(1).join(' · ')}</p>
      </header>
      {item.note && <Notice icon="pro">{item.note}</Notice>}

      {/* --- Carte du minuteur --- */}
      <Card featured as="section" className={css.action}>
        <div aria-live="polite" className={css.actionInner}>
          {stage === 'rest' && (
            <>
              <span className="kicker">{t('session.rest')}</span>
              <p className={css.clock}>{formatClock(timer.remaining)}</p>
              <p className={css.sub}>{t('session.nextSet', { n: setNo + 1, total: d.sets })}</p>
            </>
          )}

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
                <TempoIndicator tempo={d.tempo} sound={prefs.tempoSound} reps={d.reps?.[1]} />
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
              {d.tempo && (
                <div className={css.tempoTools}>
                  <Button size="small" variant="ghost" onClick={() => setTempoOn((v) => !v)}>
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
                    <input type="number" inputMode="numeric" min={0} value={s.reps ?? ''} onChange={(e) => updateSet(i, { reps: e.target.value === '' ? undefined : Number(e.target.value) })} />
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
              <Button variant="secondary" onClick={() => timer.add(15)}>
                +15 s
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
          {stage === 'work' && !d.holdSec && (
            <>
              <Button variant="secondary" icon={tempoOn ? 'pause' : 'play'} iconOnly label={tempoOn ? t('session.tempo.hide') : t('session.tempo.show')} onClick={() => setTempoOn((v) => !v)} disabled={!d.tempo} />
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
