import { useTranslation } from 'react-i18next';
import { CardLink, EvidenceBadge, Icon, PageHeader, Section } from '@/components/ui';
import { content } from '@/content/index';
import { PATHOLOGY_REGIONS } from '@/domain/ids';
import { useLocalized } from '@/i18n/useLocalized';
import css from './pathology.module.css';

export default function PathologiesPage() {
  const { t } = useTranslation();
  const l = useLocalized();
  return (
    <>
      <PageHeader title={t('nav.pathologies')} subtitle={t('pathology.listSubtitle')} />
      {PATHOLOGY_REGIONS.map((r) => {
        const list = content.pathologies.filter((p) => p.region === r);
        if (!list.length) return null;
        return (
          <Section key={r} title={t(`regions.${r}`)}>
            <div className={css.grid}>
              {list.map((p) => (
                <CardLink key={p.id} to={`/pathologies/${p.id}`} className={css.card}>
                  <strong>{l(p.name)}</strong>
                  <span className={css.desc}>{l(p.description)}</span>
                  <span className={css.meta}>
                    <EvidenceBadge level={p.evidence.level} compact seed={p.id} />
                    {p.sports.map((s) => (
                      <Icon key={s} name={s === 'bike' ? 'bike' : 'run'} size={16} title={t(`sports.${s}`)} />
                    ))}
                  </span>
                </CardLink>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
