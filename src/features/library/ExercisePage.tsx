import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Dialog, Empty, EvidenceBadge, Field, Notice, PageHeader, Section, Select, ui } from '@/components/ui';
import { MuscleMap } from '@/components/anatomy/MuscleMap';
import { content, exerciseById, referenceById } from '@/content/index';
import { formatAuthors, pathologiesForExercise, referenceLinks } from '@/content/query';
import { resolveExerciseId } from '@/content/aliases';
import { useActiveProgram, useExerciseStates, usePrograms, useProfile } from '@/app/hooks';
import { usePrefs } from '@/app/prefs';
import { addItemToProgram } from '@/db/repo';
import { equipmentSet, pickVariant } from '@/engine/availability';
import { formatDosage } from '@/features/exercise/format';
import { useLocalized } from '@/i18n/useLocalized';
import type { Exercise } from '@/domain/schema';
import type { Program } from '@/domain/user';
import css from './library.module.css';

function AddDialog({ ex, open, onClose }: { ex: Exercise; open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const active = useActiveProgram();
  const programs = usePrograms();
  const profile = useProfile();
  const states = useExerciseStates();
  const { proDraftId } = usePrefs();
  const drafts = (programs ?? []).filter((p) => p.origin === 'pro-draft');
  const targets: Program[] = [...(active ? [active] : []), ...drafts];
  const [targetId, setTargetId] = useState<string>('');
  const target = targets.find((p) => p.id === (targetId || proDraftId || active?.id)) ?? targets[0];
  const [sessionKey, setSessionKey] = useState<Program['sessions'][number]['key']>('A');
  const [done, setDone] = useState(false);

  const add = async () => {
    if (!target) return;
    const variant = pickVariant(ex, equipmentSet(profile?.equipment ?? ['dumbbells', 'gym', 'band', 'step', 'barbell', 'swiss-ball', 'suspension']), states?.get(ex.id)?.variantId) ?? ex.variants[0]!;
    const level = ex.levels.find((x) => x.level === (states?.get(ex.id)?.level ?? 1)) ?? ex.levels[0]!;
    await addItemToProgram(target.id, sessionKey, {
      exerciseId: ex.id,
      variantId: variant.id,
      level: level.level,
      dosage: level.dosage,
      reason: { kind: 'manual', ref: 'library' },
    });
    setDone(true);
  };

  return (
    <Dialog open={open} onClose={() => { setDone(false); onClose(); }} title={t('library.addTitle')}>
      {!targets.length ? (
        <p>{t('library.noTarget')}</p>
      ) : done ? (
        <div className={ui.stack}>
          <Notice icon="check">{t('library.added', { title: target?.title })}</Notice>
          <Link to={target?.origin === 'pro-draft' ? `/pro/edit/${target.id}` : '/program'}>{t('library.openTarget')}</Link>
        </div>
      ) : (
        <div className={ui.stack}>
          <Field label={t('library.target')} htmlFor="add-target">
            <Select id="add-target" value={target?.id} onChange={(e) => setTargetId(e.target.value)}>
              {targets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.origin === 'pro-draft' ? `${t('library.draft')} — ${p.title}` : `${t('library.myProgram')} — ${p.title}`}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t('library.session')} htmlFor="add-session">
            <Select id="add-session" value={sessionKey} onChange={(e) => setSessionKey(e.target.value as typeof sessionKey)}>
              {(['A', 'B', 'C', 'D'] as const)
                .filter((k) => target?.sessions.some((s) => s.key === k) || k === 'A')
                .map((k) => (
                  <option key={k} value={k}>
                    {t('program.session', { key: k })}
                  </option>
                ))}
            </Select>
          </Field>
          <Button icon="plus" onClick={() => void add()}>
            {t('library.add')}
          </Button>
        </div>
      )}
    </Dialog>
  );
}

export default function ExercisePage() {
  const { t } = useTranslation();
  const l = useLocalized();
  const { id = '' } = useParams();
  const ex = exerciseById.get(resolveExerciseId(id));
  const states = useExerciseStates();
  const [adding, setAdding] = useState(false);

  if (!ex)
    return (
      <Empty>
        <p>{t('library.notFound')}</p>
        <Link to="/library">{t('nav.library')}</Link>
      </Empty>
    );

  const current = states?.get(ex.id)?.level;
  const pathologies = pathologiesForExercise(content, ex.id);
  const eqName = (e: string) => l(content.equipment.find((x) => x.id === e)?.name);

  return (
    <article className={css.detail}>
      <PageHeader title={l(ex.name)} back={{ to: '/library', label: t('nav.library') }} />
      <div className={css.badges}>
        <EvidenceBadge level={ex.evidence.level} />
        {ex.sports.map((s) => (
          <Badge key={s}>{t(`sports.${s}`)}</Badge>
        ))}
        {ex.qualities.map((q) => (
          <Badge key={q}>{t(`qualities.${q}`)}</Badge>
        ))}
      </div>
      <p className={ui.muted}>{l({ fr: ex.name.en, en: ex.name.fr })}</p>
      <div className={css.actionsBar}>
        <Button icon="plus" variant="secondary" onClick={() => setAdding(true)}>
          {t('library.addTo')}
        </Button>
      </div>

      <Section title={t('exercise.muscles')}>
        <MuscleMap name={l(ex.name)} primary={ex.muscles.primary} secondary={ex.muscles.secondary} zoom={ex.zoom} />
      </Section>

      <Section title={t('exercise.why')}>
        <p>{l(ex.why)}</p>
      </Section>

      <Section title={t('exercise.how')}>
        <div className={css.prose}>
          <p>
            <strong>{t('exercise.setup')} :</strong> {l(ex.how.setup)}
          </p>
          <p>
            <strong>{t('exercise.movement')} :</strong> {l(ex.how.movement)}
          </p>
          <h3>{t('exercise.cues')}</h3>
          <ul>
            {ex.how.cues.map((c, i) => (
              <li key={i}>{l(c)}</li>
            ))}
          </ul>
          {ex.how.breathing && (
            <p>
              <strong>{t('exercise.breathing')} :</strong> {l(ex.how.breathing)}
            </p>
          )}
        </div>
      </Section>

      <Section title={t('exercise.mistakes')}>
        <ul className={css.prose}>
          {ex.mistakes.map((m, i) => (
            <li key={i}>{l(m)}</li>
          ))}
        </ul>
      </Section>

      <Section title={t('exercise.levels')}>
        <ol className={css.levels}>
          {ex.levels.map((lv) => (
            <li key={lv.level} className={`${css.level} ${current === lv.level ? css.levelCurrent : ''}`}>
              <span className={css.levelNum}>{lv.level}</span>
              <div>
                <p>
                  <strong>{l(lv.name)}</strong>
                  {current === lv.level && <Badge className={css.badgeCurrent}> {t('exercise.yourLevel')}</Badge>}
                </p>
                <p>{l(lv.description)}</p>
                <p className={ui.muted}>{formatDosage(lv.dosage, t, l).join(' · ')}</p>
                {(lv.requires?.length || lv.loaded) && (
                  <p className={css.mastery}>
                    {t('exercise.requires')} {[...(lv.requires ?? []).map(eqName), ...(lv.loaded ? [t('exercise.load')] : [])].join(', ')}
                  </p>
                )}
                <p className={css.mastery}>
                  {t('exercise.mastery')} {l(lv.mastery)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t('exercise.variants')}>
        <div className={css.variants}>
          {ex.variants.map((v) => (
            <div key={v.id} className={css.variant}>
              <strong>{l(v.name)}</strong>
              <span className={ui.muted}>{v.equipment.length ? v.equipment.map(eqName).join(' + ') : eqName('bodyweight')}</span>
              <p>{l(v.instructions)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t('exercise.precautions')}>
        <ul className={css.prose}>
          {ex.precautions.map((p, i) => (
            <li key={i}>{l(p)}</li>
          ))}
        </ul>
        {ex.contraindications && (
          <Notice tone="warning">
            <strong>{t('exercise.contraindications')}</strong>
            <ul className={css.prose}>
              {ex.contraindications.map((c, i) => (
                <li key={i}>{l(c)}</li>
              ))}
            </ul>
          </Notice>
        )}
      </Section>

      {pathologies.length > 0 && (
        <Section title={t('exercise.usedFor')}>
          <ul className={css.prose}>
            {pathologies.map((p) => (
              <li key={p.id}>
                <Link to={`/pathologies/${p.id}`}>{l(p.name)}</Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title={t('exercise.evidence')} id="refs">
        <p>
          <EvidenceBadge level={ex.evidence.level} /> <span className={ui.muted}>{t(`evidence.help.${ex.evidence.level}`)}</span>
        </p>
        {ex.evidence.citations.length === 0 ? (
          <p className={ui.muted}>{t('exercise.noRefs')}</p>
        ) : (
          <ReferenceList citations={ex.evidence.citations} />
        )}
      </Section>

      <AddDialog ex={ex} open={adding} onClose={() => setAdding(false)} />
    </article>
  );
}

export function ReferenceList({ citations }: { citations: { refId: string; finding: { fr: string; en: string } }[] }) {
  const { t } = useTranslation();
  const l = useLocalized();
  return (
    <ul className={css.refs}>
      {citations.map((c) => {
        const r = referenceById.get(c.refId);
        if (!r) return null;
        const links = referenceLinks(r);
        return (
          <li key={c.refId} className={css.ref}>
            <span>{l(c.finding)}</span>
            <span className={css.refCitation}>
              {formatAuthors(r.authors)} ({r.year}). <em>{r.title}</em>. {r.journal}. <Badge>{t(`refType.${r.type}`)}</Badge>
            </span>
            <span className={css.refLinks}>
              {links.doi && (
                <a href={links.doi} target="_blank" rel="noopener noreferrer">
                  DOI
                </a>
              )}
              {links.pubmed && (
                <a href={links.pubmed} target="_blank" rel="noopener noreferrer">
                  PubMed
                </a>
              )}
              {!links.doi && !links.pubmed && links.url && (
                <a href={links.url} target="_blank" rel="noopener noreferrer">
                  {t('exercise.link')}
                </a>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
