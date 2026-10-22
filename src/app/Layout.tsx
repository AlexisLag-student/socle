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

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <rect width="512" height="512" rx="112" fill="var(--brand)" />
      <rect x="186" y="132" width="140" height="62" rx="16" fill="#ff5a5f" />
      <rect x="146" y="216" width="220" height="62" rx="16" fill="#fff" fillOpacity="0.88" />
      <rect x="106" y="300" width="300" height="72" rx="18" fill="#fff" />
    </svg>
  );
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
    <div className={`${css.shell} ${immersive ? css.immersive : ''}`}>
      <a href="#main" className={css.skip}>
        {t('nav.skipToContent')}
      </a>
      <header className={css.header}>
        <Link to="/" className={css.brand} aria-label={t('app.name')}>
          <Logo className={css.logo} />
          <span>{t('app.name')}</span>
        </Link>
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
      <main id="main" className={`${css.main} ${wide ? css.wide : ''}`} tabIndex={-1}>
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
