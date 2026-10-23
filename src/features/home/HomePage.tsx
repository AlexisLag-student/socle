import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ButtonLink, Card, CheckBox, HandNote, Icon } from '@/components/ui';
import { useActiveProgram, useExerciseStates, useLogs, useReminders } from '@/app/hooks';
import { setPrefs } from '@/app/prefs';
import { content, exerciseById } from '@/content/index';
import { nextSessionKey } from '@/db/repo';
import { exerciseSeconds } from '@/engine/duration';
import { formatMinutes } from '@/features/exercise/format';
import { doneExercises, isSameDay, todaysLog } from '@/features/exercise/notebook';
import { startOfWeek } from '@/features/history/stats';
import { useLocalized } from '@/i18n/useLocalized';
import type { Program, SessionLog } from '@/domain/user';
import css from './home.module.css';

const PREVIEW = 2;

/** Carte « Séance du jour » : les premiers exercices à cocher et le bouton pour commencer. */
function TodayCard({ program, logs }: { program: Program; logs: readonly SessionLog[] }) {
  const { t } = useTranslation();
  const l = useLocalized();
  const [key, setKey] = useState<Program['sessions'][number]['key']>();
  useEffect(() => {
    void nextSessionKey(program).then(setKey);
  }, [program, logs]);
  const session = program.sessions.find((s) => s.key === key) ?? program.sessions[0]!;
  const minutes = formatMinutes(session.items.reduce((s, i) => s + exerciseSeconds(i.dosage), 0));
  const log = todaysLog(logs, program.id, session.key);
  const done = doneExercises(log);
  const started = !!log && !log.finishedAt && done.size > 0;
  const doneToday = logs.some((x) => x.finishedAt && isSameDay(x.finishedAt, new Date()));
  const rest = session.items.length - PREVIEW;

  return (
    <Card featured as="section" className={css.today}>
      <div className={css.todayHead}>
        <span className="kicker">{t(doneToday ? 'home.nextSession' : 'home.todaySession')}</span>
        <span className={css.minutes}>{t('home.minutes', { minutes })}</span>
      </div>
      <h2 className={css.todayTitle}>{t('home.sessionTitle', { key: session.key, title: program.title })}</h2>
      <ul className={css.preview}>
        {session.items.slice(0, PREVIEW).map((it) => (
          <li key={it.exerciseId} className={done.has(it.exerciseId) ? css.done : undefined}>
            <CheckBox checked={done.has(it.exerciseId)} label={done.has(it.exerciseId) ? t('notebook.done') : undefined} />
            {l(exerciseById.get(it.exerciseId)?.name) || it.exerciseId}
          </li>
        ))}
        {rest > 0 && (
          <li className={css.more}>
            <CheckBox pending />
            {t('home.moreExercises', { count: rest })}
          </li>
        )}
      </ul>
      <ButtonLink to={`/session/${session.key}`} size="large" block flat className={css.startBtn}>
        {t(started ? 'home.resumeSession' : 'home.startSession')}
        <Icon name="arrow" size={18} />
      </ButtonLink>
    </Card>
  );
}

function Entry({ to, title, text, onClick }: { to: string; title: string; text: string; onClick?: () => void }) {
  return (
    <Link to={to} className={css.entry} onClick={onClick}>
      <span>
        <span className={css.entryTitle}>{title}</span>
        <span className={css.entryText}>{text}</span>
      </span>
      <Icon name="right" size={22} />
    </Link>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const program = useActiveProgram();
  const logs = useLogs();
  const states = useExerciseStates();
  const reminders = useReminders();
  const week = useMemo(() => {
    const start = startOfWeek(new Date()).getTime();
    return (logs ?? []).filter((l) => l.finishedAt && l.finishedAt >= start).length;
  }, [logs]);
  const pending = [...(states?.values() ?? [])].filter((s) => s.pending).length;
  const today = new Date();
  const doneToday = (logs ?? []).some((l) => l.finishedAt && isSameDay(l.finishedAt, today));
  const plannedToday = reminders?.enabled && reminders.days.includes(today.getDay()) && !doneToday;

  if (program === undefined) return null;

  return (
    <div className={css.page}>
      <h1 className={css.title}>{t('home.welcomeTitle')}</h1>
      <p className={css.tagline}>{t('app.tagline')}</p>

      {program && <TodayCard program={program} logs={logs ?? []} />}

      <nav className={css.entries} aria-label={t('home.start')}>
        <Entry
          to="/setup"
          title={t('home.athleteTitle')}
          text={t(program?.origin === 'auto' ? 'home.editProfile' : 'home.athleteSub')}
          onClick={() => setPrefs({ mode: 'athlete' })}
        />
        <Entry to="/pro" title={t('home.proTitle')} text={t('home.proSub')} onClick={() => setPrefs({ mode: 'pro' })} />
      </nav>

      {program && (
        <div className={css.notes}>
          {plannedToday && <HandNote>{t('home.plannedToday')}</HandNote>}
          {pending > 0 && (
            <HandNote red pencil>
              <Link to="/program">{t('home.pendingSuggestions', { count: pending })}</Link>
            </HandNote>
          )}
          <HandNote>{t('home.weekCount', { count: week, target: program.sessionsPerWeek ?? program.sessions.length })}</HandNote>
        </div>
      )}


      <HandNote className={css.count}>
        →{' '}
        <Link to="/library">{t('home.exercisesCount', { count: content.exercises.length })}</Link>,{' '}
        <Link to="/pathologies">{t('home.pathologiesCount', { count: content.pathologies.length })}</Link>
      </HandNote>
    </div>
  );
}
