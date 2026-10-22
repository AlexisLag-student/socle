import { useTranslation } from 'react-i18next';
import { Segmented } from '@/components/ui';
import { LANGS, type Lang } from '@/i18n';

export function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const lang: Lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'fr';
  return (
    <Segmented<Lang>
      label={t('settings.language')}
      value={lang}
      onChange={(l) => void i18n.changeLanguage(l)}
      options={LANGS.map((l) => ({ value: l, label: l === 'fr' ? 'Français' : 'English' }))}
    />
  );
}
