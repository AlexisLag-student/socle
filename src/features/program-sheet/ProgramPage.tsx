import { useEffect, useId, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, ButtonLink, CheckBox, Empty, HandNote, Icon, Notice, PageHeader, WeekStrip, ui } from '@/components/ui';
import { useActiveProgram, useExerciseStates, useLogs, useProfile, useProgram } from '@/app/hooks';
import { exerciseById, pathologyById } from '@/content/index';
import { activateProgram, decideAndApply, nextSessionKey } from '@/db/repo';
import { sessionSeconds } from '@/engine/duration';
import { ExerciseCard } from '@/features/exercise/ExerciseCard';
import { formatMinutes, formatSessionLength, formatVolume } from '@/features/exercise/format';
import { doneExercises, lastNote, programWeek, todaysLog, weekDays } from '@/features/exercise/notebook';
import { useLocalized } from '@/i18n/useLocalized';
import type { Program, ProgramItem, SessionLog } from '@/domain/user';
import css from './program.module.css';

type SessionKey = Program['sessions'][number]['key'];

/** Propositions de progression, écrites au stylo rouge dans la marge du programme. */
function Suggestions({ program }: { program: Program }) {
  const { t } = useTranslation();
  const l = useLocalized();
  const states = useExerciseStates();
  const ids = new Set(program.sessions.flatMap((s) => s.items.map((i) => i.exerciseId)));
  const pending = [...(states?.values() ?? [])].filter((s) => s.pending && ids.has(s.exerciseId));
  if (!pending.length) return null;
  return (
    <section className={css.suggestions} aria-labelledby="sugg-h">
      <h2 id="sugg-h" className="visually-hidden">
        {t('program.suggestionsTitle')}
      </h2>
      {pending.map((s) => {
        const ex = exerciseById.get(s.exerciseId);
        const p = s.pending!;
        const target = ex?.levels.find((x) => x.level === p.toLevel);
        return (
          <div key={s.exerciseId} className={css.suggestion}>
            <HandNote red pencil>
              {l(ex?.name)} — {t(`progression.${p.kind}`, { level: target ? l(target.name) : p.toLevel, pct: Math.abs(p.loadChangePct ?? 0) })}
            </HandNote>
            <div className={ui.row}>
              <Button size="small" icon="check" flat onClick={() => void decideAndApply(s.exerciseId, true, (id) => exerciseById.get(id))}>
                {t('progression.accept')}
              </Button>
              <Button size="small" variant="secondary" onClick={() => void decideAndApply(s.exerciseId, false, (id) => exerciseById.get(id))}>
                {t('progression.decline')}
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/** Ligne d'exercice : case à cocher, nom et dosage, note manuscrite ; la fiche détaillée se déplie dessous. */
function ExerciseRow({
  item,
  index,
  done,
  current,
  note,
  sessionKey,
}: {
  item: ProgramItem;
  index: number;
  done: boolean;
  current: boolean;
  note?: string;
  sessionKey: SessionKey;
}) {
  const { t } = useTranslation();
  const l = useLocalized();
  const [open, setOpen] = useState(false);
  const panel = useId();
  const ex = exerciseById.get(item.exerciseId);
  const summary = [formatVolume(item.dosage, t), item.dosage.tempo ? t('format.tempo', { tempo: item.dosage.tempo }) : ''].filter(Boolean).join(' · ');
  return (
    <li className={`${css.row} ${current ? css.current : ''} ${done ? css.done : ''}`}>
      <CheckBox checked={done} label={done ? t('notebook.done') : undefined} />
      <button type="button" className={css.rowMain} aria-expanded={open} aria-controls={panel} onClick={() => setOpen((o) => !o)}>
        <span className={css.rowName}>{ex ? l(ex.name) : t('program.unknownExercise', { id: item.exerciseId })}</span>
        <span className={css.rowDose}>{summary}</span>
      </button>
      {current ? (
        <Link to={`/session/${sessionKey}`} className={`${css.play} ${css.noPrint}`} aria-label={t('program.startSession', { key: sessionKey })}>
          <Icon name="play" size={18} />
        </Link>
      ) : note ? (
        <HandNote as="span" className={css.rowNote}>
          {note}
        </HandNote>
      ) : (
        <span className={css.dash} aria-hidden>
          —
        </span>
      )}
      <div id={panel} className={css.panel} hidden={!open}>
        <ExerciseCard item={item} index={index} />
      </div>
    </li>
  );
}

function SessionBlock({ program, s, logs, todayKey, isActive }: { program: Program; s: Program['sessions'][number]; logs: SessionLog[]; todayKey?: SessionKey; isActive: boolean }) {
  const { t } = useTranslation();
  const minutes = formatMinutes(sessionSeconds(s.items));
  const log = isActive ? todaysLog(logs, program.id, s.key) : undefined;
  const done = doneExercises(log);
  const isToday = isActive && s.key === todayKey && !log?.finishedAt;
  const currentIndex = isToday ? s.items.findIndex((i) => !done.has(i.exerciseId)) : -1;
  return (
    <section className={css.session} aria-labelledby={`s-${s.key}`}>
      <div className={css.sessionHead}>
        <h2 id={`s-${s.key}`}>
          {t('program.session', { key: s.key })}
          {s.title ? ` — ${s.title}` : ''}
        </h2>
        <span className={css.sessionMeta}>{t('home.sessionMeta', { count: s.items.length, minutes })}</span>
      </div>
      <ol className={css.rows}>
        {s.items.map((item, i) => (
          <ExerciseRow
            key={`${item.exerciseId}-${i}`}
            item={item}
            index={i}
            done={done.has(item.exerciseId)}
            current={i === currentIndex}
            note={done.has(item.exerciseId) ? lastNote(log ? [log] : [], item.exerciseId, t) : undefined}
            sessionKey={s.key}
          />
        ))}
      </ol>
      {isActive && s.items.length > 0 && currentIndex < 0 && (
        <ButtonLink to={`/session/${s.key}`} variant="secondary" size="small" icon="play" className={`${css.noPrint} ${css.startLink}`}>
          {t('program.startSession', { key: s.key })}
        </ButtonLink>
      )}
    </section>
  );
}

export default function ProgramPage() {
  const { t, i18n } = useTranslation();
  const l = useLocalized();
  const { id } = useParams();
  const location = useLocation();
  const active = useActiveProgram();
  const byId = useProgram(id);
  const profile = useProfile();
  const logs = useLogs();
  const program = id ? byId : active;
  const [nextKey, setNextKey] = useState<SessionKey>();
  useEffect(() => {
    if (program?.active) void nextSessionKey(program).then(setNextKey);
  }, [program, logs]);

  if (program === undefined) return null;
  if (!program)
    return (
      <Empty>
        <p>{t('program.none')}</p>
        <div className={ui.row}>
          <ButtonLink to="/setup" icon="run">
            {t('home.athleteCta')}
          </ButtonLink>
          <ButtonLink to="/pro" variant="secondary" icon="pro" flat>
            {t('home.proCta')}
          </ButtonLink>
        </div>
      </Empty>
    );

  const isActive = program.active;
  const programLogs = (logs ?? []).filter((x) => x.programId === program.id);
  const coveredPathologies = new Set(program.sessions.flatMap((s) => s.items.filter((i) => i.reason.kind === 'pathology').map((i) => i.reason.ref)));
  const missing = program.origin === 'auto' ? (profile?.pathologies ?? []).filter((p) => !coveredPathologies.has(p.id)) : [];
  const clearance = program.origin === 'auto' ? (profile?.pathologies ?? []).filter((p) => pathologyById.get(p.id)?.medicalClearanceRequired) : [];
  const date = new Date(program.createdAt).toLocaleDateString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' });
  const week = programWeek(program);

  return (
    <div className={css.page}>
      <PageHeader
        kicker={t(program.origin === 'auto' ? 'program.kickerAuto' : 'program.kicker', { n: week })}
        title={program.title}
        subtitle={
          <>
            {program.author ? t('program.by', { author: program.author }) + ' · ' : ''}
            {t('program.createdOn', { date })}
            {program.sessionsPerWeek ? ` · ${t('program.perWeek', { count: program.sessionsPerWeek })}` : ''}
            {program.minutes ? ` · ${formatSessionLength(program.minutes, t)}` : ''}
          </>
        }
      />

      {isActive && <WeekStrip days={weekDays(logs ?? [], nextKey, t, i18n.language)} label={t('program.week')} />}

      {(location.state as { generated?: boolean } | null)?.generated && <Notice icon="check">{t('program.generated')}</Notice>}
      {!isActive && (
        <Notice tone="warning">
          {t('program.notActive')}{' '}
          <Button size="small" variant="secondary" onClick={() => void activateProgram(program.id)}>
            {t('program.activate')}
          </Button>
        </Notice>
      )}
      {clearance.map((p) => (
        <Notice key={p.id} tone="warning">
          {t('program.clearance', { name: l(pathologyById.get(p.id)?.name) })}
        </Notice>
      ))}
      {missing.map((p) => (
        <Notice key={p.id} tone="warning">
          {t('program.missingPathology', { name: l(pathologyById.get(p.id)?.name) || p.id })}
        </Notice>
      ))}
      {program.notes && (
        <div className={css.notes}>
          <h2>{t('program.notes')}</h2>
          <p>{program.notes}</p>
        </div>
      )}

      {program.sessions.map((s) => (
        <SessionBlock key={s.key} program={program} s={s} logs={programLogs} todayKey={nextKey} isActive={isActive} />
      ))}

      {isActive && <Suggestions program={program} />}

      <div className={`${css.noPrint} ${css.tools}`}>
        <Button variant="secondary" icon="print" onClick={() => window.print()}>
          {t('program.print')}
        </Button>
        {program.origin === 'auto' && (
          <p className={css.links}>
            <Link to="/setup">{t('home.editProfile')}</Link>
            {profile?.pathologies.map((p) => (
              <Link key={p.id} to={`/pathologies/${p.id}`}>
                {t('program.pathologySheet', { name: l(pathologyById.get(p.id)?.name) })}
              </Link>
            ))}
          </p>
        )}
      </div>
      <p className={css.printFooter}>
        {t('disclaimer.body')} {t('disclaimer.stop')}
      </p>
    </div>
  );
}
