import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button, Toast } from '@/components/ui';

/** Enregistre le service worker et propose la mise à jour quand une nouvelle version est prête. */
export function PwaUpdate() {
  const { t } = useTranslation();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, reg) {
      // Vérifie les mises à jour toutes les heures quand l'app reste ouverte.
      if (reg) setInterval(() => void reg.update(), 60 * 60 * 1000);
    },
  });
  useEffect(() => {
    if (!offlineReady) return;
    const id = setTimeout(() => setOfflineReady(false), 4000);
    return () => clearTimeout(id);
  }, [offlineReady, setOfflineReady]);

  if (needRefresh)
    return (
      <Toast>
        <span>{t('pwa.updateAvailable')}</span>
        <Button size="small" onClick={() => void updateServiceWorker(true)}>
          {t('pwa.reload')}
        </Button>
        <Button size="small" variant="ghost" iconOnly icon="x" label={t('common.close')} onClick={() => setNeedRefresh(false)} />
      </Toast>
    );
  if (offlineReady) return <Toast>{t('pwa.offlineReady')}</Toast>;
  return null;
}
