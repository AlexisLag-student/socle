import { useCallback, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon, type IconName } from '@/components/ui';
import { tokenFromHash } from '@/share/codec';
import { usePrefs } from './prefs';
import { DisclaimerScreen } from '@/features/disclaimer/DisclaimerScreen';
import { PwaUpdate } from './PwaUpdate';
import { useLogs, useReminders } from './hooks';
import { setReminders } from '@/db/db';
import { showReminder, useReminderScheduler } from '@/lib/reminders';
import css from './layout.module.css';

export const PENDING_SHARE_KEY = 'socle.pendingShare';

/** Logo : trois barres empilées (rouge, contour à l'encre, encre pleine). */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect x="7" y="4" width="14" height="5" rx="1.5" fill="var(--red)" />
      <rect x="4" y="11" width="20" height="5" rx="1.5" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <rect x="2" y="18" width="24" height="6" rx="1.5" fill="var(--ink)" />
    </svg>
  );
}

/** Date du jour, écrite à la main dans l'en-tête. */
function Today() {
  const { i18n } = useTranslation();
  const label = new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', { weekday: 'long', day: 'numeric', month: 'short' }).format(new Date());
  return <span className={css.today}>{label}</span>;
}

const NAV: { to: string; key: string; icon: IconName; end?: boolean }[] = [
  { to: '/', key: 'nav.home', icon: 'home', end: true },
  { to: '/program', key: 'nav.program', icon: 'program' },
  { to: '/library', key: 'nav.library', icon: 'library' },
  { to: '/history', key: 'nav.history', icon: 'history' },
  { to: '/settings', key: 'nav.settings', icon: 'settings' },
];

/** Intercepte un lien de partage (#share=…) à l'ouverture de l'app. */
function useShareCatcher() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = tokenFromHash(window.location.hash);
    if (!token) return;
    try {
      sessionStorage.setItem(PENDING_SHARE_KEY, token);
    } catch {
      /* ignore */
    }
    history.replaceState(null, '', window.location.pathname + window.location.search);
    navigate('/import', { replace: true, state: { token } });
  }, [navigate]);
}

export function Layout() {
  const { t } = useTranslation();
  const prefs = usePrefs();
  const { pathname } = useLocation();
  useShareCatcher();
  const reminders = useReminders();
  const logs = useLogs();
  const send = useCallback(() => showReminder(t('reminder.title'), t('reminder.body')), [t]);
  const markSent = useCallback((day: string) => reminders && void setReminders({ ...reminders, lastNotifiedOn: day }), [reminders]);
  useReminderScheduler(reminders, logs, send, markSent);
  const immersive = pathname.startsWith('/session');
  const wide = pathname.startsWith('/pro/edit') || pathname.startsWith('/library') || pathname.startsWith('/bibliography');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const gated = !prefs.disclaimerAccepted && pathname !== '/disclaimer';

  return (
    <div className={`${css.shell} ${immersive ? css.immersive : ''} ${wide ? css.wideShell : ''}`}>
      <a href="#main" className={css.skip}>
        {t('nav.skipToContent')}
      </a>
      <header className={css.header}>
        <Link to="/" className={css.brand} aria-label={t('app.name')}>
          <Logo className={css.logo} />
          <span>{t('app.name')}</span>
        </Link>
        {!gated && !immersive && <Today />}
        {!gated && (
          <nav className={css.headerNav} aria-label={t('nav.main')}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end}>
                {t(n.key as 'nav.home')}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main id="main" className={css.main} tabIndex={-1}>
        {gated ? <DisclaimerScreen /> : <Outlet />}
      </main>
      {!gated && (
        <>
          <footer className={css.footer}>
            <Link to="/disclaimer">{t('nav.disclaimer')}</Link>
            <Link to="/bibliography">{t('nav.bibliography')}</Link>
            <Link to="/pathologies">{t('nav.pathologies')}</Link>
            <span>
              {t('app.name')} · v{__APP_VERSION__}
            </span>
          </footer>
          <nav className={css.bottomNav} aria-label={t('nav.main')}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end}>
                <Icon name={n.icon} size={22} />
                <span>{t(n.key as 'nav.home')}</span>
              </NavLink>
            ))}
          </nav>
        </>
      )}
      <PwaUpdate />
    </div>
  );
}
