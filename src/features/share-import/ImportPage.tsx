import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, ButtonLink, Empty, Notice, PageHeader, Section, ui } from '@/components/ui';
import { PENDING_SHARE_KEY } from '@/app/Layout';
import { usePrograms } from '@/app/hooks';
import { exerciseById } from '@/content/index';
import { newProgram, saveProgram } from '@/db/repo';
import { decodeProgram, ShareError, type DecodedProgram } from '@/share/codec';
import { ExerciseCard } from '@/features/exercise/ExerciseCard';

function readToken(state: unknown): string | undefined {
  const fromState = (state as { token?: string } | null)?.token;
  if (fromState) return fromState;
  try {
    return sessionStorage.getItem(PENDING_SHARE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

export default function ImportPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const programs = usePrograms();
  const [activate, setActivate] = useState(true);
  const [saving, setSaving] = useState(false);
  const token = readToken(location.state);

  const decoded = useMemo((): { ok: DecodedProgram } | { error: string } | null => {
    if (!token) return null;
    try {
      return { ok: decodeProgram(token, (id) => exerciseById.get(id)) };
    } catch (e) {
      return { error: e instanceof ShareError ? e.code : 'corrupt' };
    }
  }, [token]);

  if (!decoded)
    return (
      <Empty>
        <p>{t('import.noLink')}</p>
        <ButtonLink to="/">{t('nav.home')}</ButtonLink>
      </Empty>
    );
  if ('error' in decoded)
    return (
      <>
        <PageHeader title={t('import.title')} />
        <Notice tone="danger">{t(`import.error.${decoded.error as 'corrupt'}`)}</Notice>
      </>
    );

  const { program, unknownExercises } = decoded.ok;
  const existing = (programs ?? []).find((p) => p.origin === 'imported' && p.title === program.title && p.createdAt === program.sharedAt);

  const save = async () => {
    setSaving(true);
    const { sharedAt, ...rest } = program;
    const p = newProgram({ ...rest, active: activate });
    await saveProgram(sharedAt ? { ...p, createdAt: sharedAt, id: existing?.id ?? p.id } : p);
    try {
      sessionStorage.removeItem(PENDING_SHARE_KEY);
    } catch {
      /* ignore */
    }
    navigate(activate ? '/program' : `/program/${existing?.id ?? p.id}`, { replace: true });
  };

  return (
    <div className={ui.stack}>
      <PageHeader title={program.title} subtitle={program.author ? t('import.from', { author: program.author }) : t('import.subtitle')} />
      <Notice>{t('import.privacy')}</Notice>
      {unknownExercises.length > 0 && <Notice tone="warning">{t('import.unknown', { count: unknownExercises.length })}</Notice>}
      {existing && <Notice tone="warning">{t('import.already')}</Notice>}
      {program.notes && (
        <Section title={t('program.notes')}>
          <p style={{ whiteSpace: 'pre-wrap' }}>{program.notes}</p>
        </Section>
      )}
      {program.sessions.map((s) => (
        <Section key={s.key} title={`${t('program.session', { key: s.key })}${s.title ? ` — ${s.title}` : ''}`}>
          <div className={ui.stack}>
            {s.items.map((it, i) => (
              <ExerciseCard key={i} item={it} index={i} showMap={false} />
            ))}
          </div>
        </Section>
      ))}
      <label className={ui.row}>
        <input type="checkbox" checked={activate} onChange={(e) => setActivate(e.target.checked)} style={{ width: 22, height: 22 }} />
        {t('import.activate')}
      </label>
      <Button size="large" icon="download" disabled={saving} onClick={() => void save()}>
        {existing ? t('import.replace') : t('import.save')}
      </Button>
    </div>
  );
}
