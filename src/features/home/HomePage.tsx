import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ButtonLink, Card, CardLink, Icon, Notice, ui } from '@/components/ui';
import { useActiveProgram, useExerciseStates, useLogs, useProfile, useReminders } from '@/app/hooks';
import { setPrefs } from '@/app/prefs';
import { Logo } from '@/app/Layout';
import { nextSessionKey } from '@/db/repo';
import { exerciseSeconds } from '@/engine/duration';
import { formatMinutes } from '@/features/exercise/format';
import { startOfWeek } from '@/features/history/stats';
import type { Program } from '@/domain/user';
import css from './home.module.css';

function NextSession({ program }: { program: Program }) {
  const { t } = useTranslation();
  const [key, setKey] = useState<Program['sessions'][number]['key']>();
  useEffect(() => {
    void nextSessionKey(program).then(setKey);
  }, [program]);
  const session = program.sessions.find((s) => s.key === key) ?? program.sessions[0]!;
  const minutes = formatMinutes(session.items.reduce((s, i) => s + exerciseSeconds(i.dosage), 0));
  return (
    <Card className={css.next}>
      <span className={css.kicker}>{t('home.nextSession')}</span>
      <h2 className={css.nextTitle}>{t('program.session', { key: session.key })}</h2>
      <p className={ui.muted}>
        {t('home.sessionMeta', { count: session.items.length, minutes })} · {program.title}
      </p>
      <div className={ui.row}>
        <ButtonLink to={`/session/${session.key}`} size="large" icon="play">
          {t('home.start')}
        </ButtonLink>
        <ButtonLink to="/program" variant="secondary" size="large">
          {t('home.viewProgram')}
        </ButtonLink>
      </div>
    </Card>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const profile = useProfile();
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
  const doneToday = (logs ?? []).some((l) => l.finishedAt && new Date(l.finishedAt).toDateString() === today.toDateString());
  const plannedToday = reminders?.enabled && reminders.days.includes(today.getDay()) && !doneToday;

  if (profile === undefined || program === undefined) return null;

  if (!program) {
    return (
      <div className={css.welcome}>
        <div className={css.hero}>
          <Logo className={css.heroLogo} />
          <h1>{t('home.welcomeTitle')}</h1>
          <p>{t('app.tagline')}</p>
        </div>
        <div className={css.modes}>
          <CardLink to="/setup" className={css.mode}>
            <span className={css.modeIcon}>
              <Icon name="run" size={26} />
              <Icon name="bike" size={26} />
            </span>
            <strong>{t('home.athleteTitle')}</strong>
            <span className={ui.muted}>{t('home.athleteText')}</span>
            <span className={css.modeCta} onClick={() => setPrefs({ mode: 'athlete' })}>
              {t('home.athleteCta')} <Icon name="right" size={18} />
            </span>
          </CardLink>
          <CardLink to="/pro" className={css.mode}>
            <span className={css.modeIcon}>
              <Icon name="pro" size={26} />
            </span>
            <strong>{t('home.proTitle')}</strong>
            <span className={ui.muted}>{t('home.proText')}</span>
            <span className={css.modeCta} onClick={() => setPrefs({ mode: 'pro' })}>
              {t('home.proCta')} <Icon name="right" size={18} />
            </span>
          </CardLink>
        </div>
        <div className={css.explore}>
          <Link to="/library">
            <Icon name="library" /> {t('home.exploreLibrary')}
          </Link>
          <Link to="/pathologies">
            <Icon name="book" /> {t('home.explorePathologies')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={ui.stack}>
      <h1 className={css.greeting}>{t('home.hello')}</h1>
      {plannedToday && <Notice icon="bell">{t('home.plannedToday')}</Notice>}
      <NextSession program={program} />
      <div className={css.stats}>
        <Card>
          <span className={css.statValue}>
            {week}
            <small>/{program.sessionsPerWeek ?? program.sessions.length}</small>
          </span>
          <span className={css.statLabel}>{t('home.thisWeek')}</span>
        </Card>
        <Card>
          <span className={css.statValue}>{(logs ?? []).filter((l) => l.finishedAt).length}</span>
          <span className={css.statLabel}>{t('home.totalSessions')}</span>
        </Card>
      </div>
      {pending > 0 && (
        <Notice icon="up">
          <Link to="/program">{t('home.pendingSuggestions', { count: pending })}</Link>
        </Notice>
      )}
      <div className={css.links}>
        {program.origin === 'auto' && (
          <ButtonLink to="/setup" variant="secondary" icon="edit">
            {t('home.editProfile')}
          </ButtonLink>
        )}
        <ButtonLink to="/library" variant="secondary" icon="library">
          {t('nav.library')}
        </ButtonLink>
        <ButtonLink to="/pro" variant="ghost" icon="pro">
          {t('home.proMode')}
        </ButtonLink>
      </div>
    </div>
  );
}
