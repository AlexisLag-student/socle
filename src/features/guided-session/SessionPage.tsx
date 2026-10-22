import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Empty, ButtonLink, Notice, ui } from '@/components/ui';
import { MuscleMap } from '@/components/anatomy/MuscleMap';
import { useActiveProgram, useExerciseStates, useProfile } from '@/app/hooks';
import { setPrefs, usePrefs } from '@/app/prefs';
import { exerciseById } from '@/content/index';
import type { Feedback } from '@/domain/ids';
import type { ProgramItem, SessionEntry, SessionLog, SetLog } from '@/domain/user';
import { applyFeedback, decideAndApply, newLog, saveLog } from '@/db/repo';
import { availableLevels, equipmentSet, pickVariant } from '@/engine/availability';
import { beep, keepScreenOn, tempoPhases, vibrate } from '@/lib/device';
import { formatClock, useCountdown } from '@/lib/useCountdown';
import { formatDosage } from '@/features/exercise/format';
import { useLocalized } from '@/i18n/useLocalized';
import css from './session.module.css';

type Stage = 'work' | 'rest' | 'feedback';

/** Indicateur visuel (et sonore en option) du tempo d'une répétition. */
function TempoIndicator({ tempo, sound }: { tempo: string; sound: boolean }) {
  const { t } = useTranslation();
  const phases = useMemo(() => tempoPhases(tempo), [tempo]);
  const [i, setI] = useState(0);
  const [rep, setRep] = useState(1);
  useEffect(() => {
    const p = phases[i];
    if (!p) return;
    if (sound) beep(i === 0 ? 'tick' : 'phase');
    const id = setTimeout(() => {
      const next = (i + 1) % phases.length;
      if (next === 0) setRep((r) => r + 1);
      setI(next);
    }, p.sec * 1000);
    return () => clearTimeout(id);
  }, [i, phases, sound]);
  const p = phases[i];
  if (!p) return null;
  return (
    <div className={css.tempo} aria-live="off">
      <div className={css.tempoLabel}>
        <span className={css[`tempo-${p.kind}`]}>{t(`session.tempo.${p.kind}`)}</span>
        <span className={ui.muted}>{t('session.tempo.rep', { n: rep })}</span>
      </div>
      <div className={css.tempoTrack}>
        <div key={`${rep}-${i}`} className={`${css.tempoBar} ${css[`tempo-${p.kind}`]}`} style={{ animationDuration: `${p.sec}s` }} />
      </div>
    </div>
  );
}

export default function SessionPage() {
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
    persist({ ...log, entries });
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
    goNext();
  };

  const goNext = () => {
    timer.stop();
    setSetNo(0);
    setSide(1);
    setStage('work');
    setShowMap(false);
    if (idx + 1 >= items.length) finish();
    else setIdx((i) => i + 1);
  };

  const skip = () => {
    if (log) persist({ ...log, entries: log.entries.map((e, k) => (k === idx ? { ...e, skipped: true } : e)) });
    goNext();
  };

  const finish = () => {
    if (log) persist({ ...log, finishedAt: Date.now() });
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
        <div className={css.trophy} aria-hidden>
          ✓
        </div>
        <h1>{t('session.doneTitle')}</h1>
        <p className={ui.muted}>{t('session.doneMeta', { count: done, minutes })}</p>
        {pending.length > 0 && (
          <section className={ui.stack}>
            <h2>{t('program.suggestionsTitle')}</h2>
            {pending.map((s) => {
              const e = exerciseById.get(s!.exerciseId)!;
              const p = s!.pending!;
              const target = e.levels.find((x) => x.level === p.toLevel);
              return (
                <div key={s!.exerciseId} className={css.suggestion}>
                  <p>
                    <strong>{l(e.name)}</strong> — {t(`progression.${p.kind}`, { level: target ? l(target.name) : p.toLevel, pct: Math.abs(p.loadChangePct ?? 0) })}
                  </p>
                  <div className={ui.row}>
                    <Button size="small" icon="check" onClick={() => void decideAndApply(e.id, true, (id) => exerciseById.get(id))}>
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
        <div className={ui.row} style={{ justifyContent: 'center' }}>
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

  return (
    <div className={css.page}>
      <div className={css.top}>
        <Button variant="ghost" icon="x" iconOnly label={t('session.quit')} onClick={() => { if (log && log.entries.some((e) => e.sets.some((s) => s.done))) finish(); else navigate('/program'); }} />
        <div className={css.progress} role="progressbar" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={idx} aria-label={t('session.progress', { n: idx + 1, total: items.length })}>
          <span style={{ width: `${(idx / items.length) * 100}%` }} />
        </div>
        <span className={css.count}>
          {idx + 1}/{items.length}
        </span>
      </div>

      <header className={css.head}>
        <h1 className={css.name}>{l(ex.name)}</h1>
        <p className={ui.muted}>
          {level && l(level.name)}
          {variant ? ` · ${l(variant.name)}` : ''}
        </p>
      </header>

      <ul className={css.dosage}>
        {formatDosage(d, t, l).map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
      {item.note && <Notice icon="pro">{item.note}</Notice>}

      {/* --- Zone d'action principale --- */}
      <section className={css.action} aria-live="polite">
        {stage === 'rest' && (
          <>
            <p className={css.stageLabel}>{t('session.rest')}</p>
            <p className={css.clock}>{formatClock(timer.remaining)}</p>
            <div className={ui.row} style={{ justifyContent: 'center' }}>
              <Button variant="secondary" onClick={() => timer.add(15)}>
                +15 s
              </Button>
              <Button onClick={() => { timer.stop(); setStage('work'); }}>{t('session.skipRest')}</Button>
            </div>
            <p className={ui.muted}>{t('session.nextSet', { n: setNo + 1, total: d.sets })}</p>
          </>
        )}

        {stage === 'work' && (
          <>
            <p className={css.stageLabel}>
              {t('session.set', { n: setNo + 1, total: d.sets })}
              {d.perSide && d.holdSec ? ` · ${t('session.side', { n: side })}` : ''}
            </p>
            {d.holdSec ? (
              <>
                <p className={css.clock}>{formatClock(timer.running || timer.paused ? timer.remaining : d.holdSec)}</p>
                {!timer.running && !timer.paused && (
                  <Button size="large" icon="play" onClick={() => timer.start(d.holdSec!)}>
                    {t('session.startHold')}
                  </Button>
                )}
                {timer.running && (
                  <Button size="large" variant="secondary" icon="pause" onClick={timer.pause}>
                    {t('session.pause')}
                  </Button>
                )}
                {timer.paused && (
                  <Button size="large" icon="play" onClick={timer.resume}>
                    {t('session.resume')}
                  </Button>
                )}
              </>
            ) : (
              <>
                <p className={css.clock}>
                  {d.reps && (d.reps[0] === d.reps[1] ? d.reps[0] : `${d.reps[0]}–${d.reps[1]}`)}
                  <small> {t('session.reps')}{d.perSide ? ` ${t('common.perSide')}` : ''}</small>
                </p>
                {d.tempo && (
                  <div className={css.tempoBox}>
                    {tempoOn ? (
                      <TempoIndicator tempo={d.tempo} sound={prefs.tempoSound} />
                    ) : (
                      <p className={ui.muted}>{t('format.tempo', { tempo: d.tempo })}</p>
                    )}
                    <div className={ui.row} style={{ justifyContent: 'center' }}>
                      <Button size="small" variant="ghost" onClick={() => setTempoOn((v) => !v)}>
                        {tempoOn ? t('session.tempo.hide') : t('session.tempo.show')}
                      </Button>
                      <Button
                        size="small"
                        variant="ghost"
                        icon={prefs.tempoSound ? 'sound' : 'mute'}
                        onClick={() => setPrefs({ tempoSound: !prefs.tempoSound })}
                      >
                        {prefs.tempoSound ? t('session.soundOn') : t('session.soundOff')}
                      </Button>
                    </div>
                  </div>
                )}
                <Button size="large" icon="check" onClick={completeSet}>
                  {t('session.setDone')}
                </Button>
              </>
            )}
          </>
        )}

        {stage === 'feedback' && (
          <>
            <p className={css.stageLabel}>{t('session.feedbackTitle')}</p>
            <div className={css.feedback}>
              {(['easy', 'ok', 'hard'] as const).map((fb) => (
                <button key={fb} type="button" className={`${css.fbBtn} ${css[`fb-${fb}`]}`} onClick={() => void giveFeedback(fb)}>
                  <span className={css.fbEmoji} aria-hidden>
                    {fb === 'easy' ? '🙂' : fb === 'ok' ? '💪' : '🥵'}
                  </span>
                  {t(`session.fb.${fb}`)}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* --- Séries --- */}
      <section className={css.sets} aria-label={t('session.setsLabel')}>
        {entry.sets.map((s, i) => (
          <div key={i} className={`${css.setRow} ${i === setNo && stage !== 'feedback' ? css.current : ''}`}>
            <label className={css.setCheck}>
              <input type="checkbox" checked={s.done} onChange={(e) => updateSet(i, { done: e.target.checked })} />
              <span>{t('session.setShort', { n: i + 1 })}</span>
            </label>
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
          <Button variant="ghost" onClick={() => { timer.stop(); setStage('feedback'); }}>
            {t('session.endExercise')}
          </Button>
        )}
      </div>
    </div>
  );
}
