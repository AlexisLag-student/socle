import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button, Toast } from '@/components/ui';
import { isSessionRunning, useSessionRunning } from './sessionActivity';
import css from './layout.module.css';

/** Cherche une nouvelle version du service worker (ignoré hors ligne). */
function checkForUpdate(reg: ServiceWorkerRegistration) {
  if (navigator.onLine === false) return;
  void reg.update().catch(() => {
    /* réseau indisponible : on réessaiera plus tard */
  });
}

/**
 * Enregistre le service worker et propose la mise à jour quand une nouvelle version est prête.
 * Jamais de rechargement automatique pendant une séance guidée : le bandeau attend la fin de la séance.
 * Les données locales (IndexedDB, localStorage) ne sont pas touchées par la mise à jour.
 */
export function PwaUpdate() {
  const { t } = useTranslation();
  const sessionRunning = useSessionRunning();
  const [dismissed, setDismissed] = useState(false);
  // Nouvelle version déjà active (activée depuis un autre onglet) mais rechargement reporté.
  const [needReload, setNeedReload] = useState(false);
  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, reg) {
      if (!reg) return;
      // Vérifie les mises à jour toutes les heures quand l'app reste ouverte…
      setInterval(() => checkForUpdate(reg), 60 * 60 * 1000);
      // … et chaque fois qu'elle revient au premier plan.
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkForUpdate(reg);
      });
    },
    onNeedReload() {
      if (isSessionRunning()) setNeedReload(true);
      else window.location.reload();
    },
  });
  useEffect(() => {
    if (!offlineReady) return;
    const id = setTimeout(() => setOfflineReady(false), 4000);
    return () => clearTimeout(id);
  }, [offlineReady, setOfflineReady]);

  if ((needRefresh || needReload) && !dismissed && !sessionRunning)
    return (
      <UpdateBanner
        onReload={() => (needReload ? window.location.reload() : void updateServiceWorker(true))}
        onLater={() => setDismissed(true)}
      />
    );
  if (offlineReady && !sessionRunning) return <Toast>{t('pwa.offlineReady')}</Toast>;
  return null;
}

/** Bandeau « Nouvelle version disponible », façon note épinglée sur la page du cahier. */
export function UpdateBanner({ onReload, onLater }: { onReload: () => void; onLater: () => void }) {
  const { t } = useTranslation();
  return (
    <aside className={css.updateBanner} role="status" aria-live="polite" aria-labelledby="pwa-update-title">
      <p id="pwa-update-title" className={css.updateTitle}>
        {t('pwa.updateAvailable')}
      </p>
      <div className={css.updateActions}>
        <Button size="small" icon="refresh" onClick={onReload}>
          {t('pwa.reload')}
        </Button>
        <Button size="small" variant="ghost" onClick={onLater}>
          {t('pwa.later')}
        </Button>
      </div>
    </aside>
  );
}
