import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, PageHeader, Section, ui } from '@/components/ui';
import { currentLang } from '@/i18n';
import { parseChangelog, splitBold } from '@/lib/changelog';
import changelogMd from '../../../CHANGELOG.md?raw';

/** « Nouveautés » : CHANGELOG.md embarqué au build, dans la langue de l'interface. */
export default function ChangelogPage() {
  const { t, i18n } = useTranslation();
  const lang = currentLang();
  const entries = useMemo(() => parseChangelog(changelogMd), []);
  const formatDate = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString(i18n.language === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <PageHeader title={t('changelog.title')} subtitle={t('changelog.subtitle')} back={{ to: '/settings', label: t('nav.settings') }} />
      {entries.length === 0 && <Empty>{t('changelog.empty')}</Empty>}
      {entries.map((e) => (
        <Section key={e.version} id={`v${e.version.replaceAll('.', '-')}`} title={t('changelog.version', { version: e.version })}>
          <p className={ui.muted}>
            <time dateTime={e.date}>{formatDate(e.date)}</time>
          </p>
          <ul>
            {e.notes[lang].map((note, i) => (
              <li key={i}>
                {splitBold(note).map((part, k) => (part.bold ? <strong key={k}>{part.text}</strong> : part.text))}
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </>
  );
}
