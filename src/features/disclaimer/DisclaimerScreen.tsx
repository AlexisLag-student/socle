import { useTranslation } from 'react-i18next';
import { Button, Icon } from '@/components/ui';
import { setPrefs, usePrefs } from '@/app/prefs';
import { LanguageSwitch } from '@/features/settings/LanguageSwitch';
import css from './disclaimer.module.css';

/** Écran d'avertissement médical : bloquant au premier lancement, consultable ensuite. */
export function DisclaimerScreen({ standalone }: { standalone?: boolean }) {
  const { t } = useTranslation();
  const { disclaimerAccepted } = usePrefs();
  return (
    <div className={css.wrap}>
      {!standalone && (
        <div className={css.lang}>
          <LanguageSwitch />
        </div>
      )}
      <div className={css.icon} aria-hidden>
        <Icon name="info" size={32} />
      </div>
      <h1>{t('disclaimer.title')}</h1>
      {!standalone && <p className={css.lead}>{t('app.tagline')}</p>}
      <div className={css.box}>
        <p>{t('disclaimer.body')}</p>
        <p className={css.stop}>
          <strong>{t('disclaimer.stop')}</strong>
        </p>
        <p className={css.muted}>{t('disclaimer.data')}</p>
      </div>
      {disclaimerAccepted ? (
        <p className={css.accepted}>
          <Icon name="check" size={18} /> {t('disclaimer.accepted')}
        </p>
      ) : (
        <Button size="large" block onClick={() => setPrefs({ disclaimerAccepted: true })}>
          {t('disclaimer.accept')}
        </Button>
      )}
    </div>
  );
}

export default function DisclaimerPage() {
  return <DisclaimerScreen standalone />;
}
