import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Badge, Empty, EvidenceBadge, Notice, PageHeader, Section, ui } from '@/components/ui';
import { content, exerciseById, pathologyById } from '@/content/index';
import { resolvePathologyId } from '@/content/aliases';
import { formatDosage } from '@/features/exercise/format';
import { ReferenceList } from '@/features/library/ExercisePage';
import { useLocalized } from '@/i18n/useLocalized';
import type { L } from '@/domain/schema';
import css from './pathology.module.css';

function Bullets({ items }: { items: L[] }) {
  const l = useLocalized();
  return (
    <ul className={css.bullets}>
      {items.map((x, i) => (
        <li key={i}>{l(x)}</li>
      ))}
    </ul>
  );
}

export default function PathologyPage() {
  const { t } = useTranslation();
  const l = useLocalized();
  const { id = '' } = useParams();
  const p = pathologyById.get(resolvePathologyId(id));
  if (!p)
    return (
      <Empty>
        <p>{t('pathology.notFound')}</p>
        <Link to="/pathologies">{t('nav.pathologies')}</Link>
      </Empty>
    );

  return (
    <article className={css.page}>
      <PageHeader title={l(p.name)} back={{ to: '/pathologies', label: t('nav.pathologies') }} />
      <div className={css.meta}>
        <EvidenceBadge level={p.evidence.level} seed={p.id} />
        {p.sports.map((s) => (
          <Badge key={s}>{t(`sports.${s}`)}</Badge>
        ))}
        {p.aka?.map((a, i) => <Badge key={i}>{l(a)}</Badge>)}
      </div>
      <Notice>{t('pathology.noDiagnosis')}</Notice>
      {p.medicalClearanceRequired && <Notice tone="warning">{t('setup.phase.clearanceNotice')}</Notice>}
      {p.caveat && <Notice tone="warning">{l(p.caveat)}</Notice>}

      <Section title={t('pathology.what')}>
        <p>{l(p.description)}</p>
      </Section>
      <Section title={t('pathology.recognize')}>
        <p>{l(p.recognize)}</p>
        <h3>{t('pathology.symptoms')}</h3>
        <Bullets items={p.symptoms} />
      </Section>
      <Section title={t('pathology.riskFactors')}>
        <Bullets items={p.riskFactors} />
      </Section>

      <Section title={t('pathology.phases')}>
        <ol className={css.phases}>
          {p.phases.map((ph, i) => (
            <li key={ph.phase} className={css.phase}>
              <h3>
                <span className={css.phaseNum}>{i + 1}</span> {t(`phases.${ph.phase}`)}
              </h3>
              <p>{l(ph.summary)}</p>
              <h4>{t('pathology.goals')}</h4>
              <Bullets items={ph.goals} />
              <h4>{t('pathology.exercises')}</h4>
              <ul className={css.exList}>
                {ph.exercises.map((pe) => {
                  const ex = exerciseById.get(pe.exerciseId);
                  if (!ex) return null;
                  const level = ex.levels.find((x) => x.level === (pe.startLevel ?? 1)) ?? ex.levels[0]!;
                  return (
                    <li key={pe.exerciseId}>
                      <Link to={`/library/${ex.id}`}>{l(ex.name)}</Link>
                      <Badge>{t(`pathology.priority.${pe.priority}`)}</Badge>
                      <span className={ui.muted}>
                        {' '}
                        {l(level.name)} · {formatDosage(pe.dosage ?? level.dosage, t, l).slice(0, 2).join(' · ')}
                      </span>
                      {pe.note && <span className={css.note}>{l(pe.note)}</span>}
                    </li>
                  );
                })}
              </ul>
              {ph.avoid && ph.avoid.length > 0 && (
                <>
                  <h4>{t('pathology.avoid')}</h4>
                  <ul className={css.bullets}>
                    {ph.avoid.map((a) => (
                      <li key={a.exerciseId}>
                        <strong>{l(exerciseById.get(a.exerciseId)?.name) || a.exerciseId}</strong> — {l(a.reason)}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {ph.loadAdvice && <p className={css.advice}>{l(ph.loadAdvice)}</p>}
              {ph.nextPhaseCriteria.length > 0 && (
                <>
                  <h4>{t('pathology.nextPhase')}</h4>
                  <Bullets items={ph.nextPhaseCriteria} />
                </>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t('pathology.whenToConsult')}>
        <div className={css.consult}>
          <Bullets items={p.whenToConsult} />
        </div>
      </Section>

      {p.complementaryAdvice && (
        <Section title={t('pathology.advice')}>
          <Bullets items={p.complementaryAdvice} />
        </Section>
      )}

      <Section title={t('exercise.evidence')}>
        <p>
          <EvidenceBadge level={p.evidence.level} seed={p.id} /> <span className={ui.muted}>{t(`evidence.help.${p.evidence.level}`)}</span>
        </p>
        <ReferenceList citations={p.evidence.citations} />
        <p>
          <Link to={`/bibliography?pathology=${p.id}`}>{t('pathology.allRefs')}</Link>
        </p>
      </Section>
      <p className={ui.muted}>{content.pathologies.length > 0 && t('disclaimer.stop')}</p>
    </article>
  );
}
