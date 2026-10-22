import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Card, Empty, Field, Input, PageHeader, Section, ui, ButtonLink } from '@/components/ui';
import { usePrograms } from '@/app/hooks';
import { setPrefs, usePrefs } from '@/app/prefs';
import { deleteProgram, newProgram, saveProgram } from '@/db/repo';
import css from './pro.module.css';

export default function ProHomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const programs = usePrograms();
  const { proName } = usePrefs();
  const drafts = (programs ?? []).filter((p) => p.origin === 'pro-draft');

  const create = async () => {
    const p = await saveProgram(
      newProgram({
        origin: 'pro-draft',
        active: false,
        title: t('pro.newTitle'),
        author: proName || undefined,
        sessionsPerWeek: 2,
        sessions: [{ key: 'A', items: [] }],
      }),
    );
    setPrefs({ proDraftId: p.id, mode: 'pro' });
    navigate(`/pro/edit/${p.id}`);
  };

  return (
    <>
      <PageHeader title={t('pro.title')} subtitle={t('pro.subtitle')} />
      <Card className={css.intro}>
        <ol className={css.steps}>
          <li>{t('pro.step1')}</li>
          <li>{t('pro.step2')}</li>
          <li>{t('pro.step3')}</li>
        </ol>
        <p className={ui.muted}>{t('pro.privacy')}</p>
      </Card>
      <Section title={t('pro.identity')}>
        <Field label={t('pro.name')} hint={t('pro.nameHint')} htmlFor="pro-name">
          <Input id="pro-name" value={proName} onChange={(e) => setPrefs({ proName: e.target.value })} autoComplete="name" />
        </Field>
      </Section>
      <Section
        title={t('pro.drafts')}
        actions={
          <Button icon="plus" onClick={() => void create()}>
            {t('pro.new')}
          </Button>
        }
      >
        {programs === undefined ? null : drafts.length === 0 ? (
          <Empty>{t('pro.noDrafts')}</Empty>
        ) : (
          <ul className={css.drafts}>
            {drafts.map((p) => (
              <li key={p.id} className={css.draft}>
                <div>
                  <strong>{p.title}</strong>
                  <span className={ui.muted}>
                    {t('pro.draftMeta', {
                      count: p.sessions.reduce((n, s) => n + s.items.length, 0),
                      date: new Date(p.updatedAt).toLocaleDateString(i18n.language),
                    })}
                  </span>
                </div>
                <div className={ui.row}>
                  <ButtonLink to={`/pro/edit/${p.id}`} size="small" icon="edit" variant="secondary">
                    {t('common.edit')}
                  </ButtonLink>
                  <Button
                    size="small"
                    variant="ghost"
                    iconOnly
                    icon="trash"
                    label={t('common.delete')}
                    onClick={() => {
                      if (confirm(t('pro.confirmDelete', { title: p.title }))) void deleteProgram(p.id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
