import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { EvidenceBadge, Badge, Icon } from '@/components/ui';
import { MuscleMap } from '@/components/anatomy/MuscleMap';
import { exerciseById, pathologyById } from '@/content/index';
import type { ProgramItem } from '@/domain/user';
import { useLocalized } from '@/i18n/useLocalized';
import { formatDosage } from './format';
import css from './exercise.module.css';

/** Raison lisible de la présence d'un exercice dans le programme. */
export function useReasonLabel() {
  const { t } = useTranslation();
  const l = useLocalized();
  return (item: ProgramItem) => {
    const r = item.reason;
    if (r.kind === 'pathology') return t('program.reason.pathology', { name: l(pathologyById.get(r.ref)?.name) || r.ref });
    if (r.kind === 'objective') return t('program.reason.objective', { name: t(`objectives.${r.ref as 'performance'}`) });
    if (r.kind === 'prevention')
      return t('program.reason.prevention', { sports: r.ref.split('+').map((s) => t(`sports.${s as 'run'}`)).join(' / ') });
    return t('program.reason.manual');
  };
}

export function ExerciseCard({
  item,
  index,
  showMap = true,
  actions,
  footer,
}: {
  item: ProgramItem;
  index?: number;
  showMap?: boolean;
  actions?: ReactNode;
  footer?: ReactNode;
}) {
  const { t } = useTranslation();
  const l = useLocalized();
  const reason = useReasonLabel();
  const ex = exerciseById.get(item.exerciseId);

  if (!ex)
    return (
      <article className={css.card}>
        <h3 className={css.title}>{t('program.unknownExercise', { id: item.exerciseId })}</h3>
        <p className={css.muted}>{t('program.unknownExerciseHint')}</p>
      </article>
    );

  const level = ex.levels.find((x) => x.level === item.level);
  const variant = ex.variants.find((v) => v.id === item.variantId);

  return (
    <article className={css.card}>
      <header className={css.head}>
        {index !== undefined && <span className={css.index}>{index + 1}</span>}
        <div className={css.headText}>
          <h3 className={css.title}>
            <Link to={`/library/${ex.id}`}>{l(ex.name)}</Link>
          </h3>
          <div className={css.meta}>
            <EvidenceBadge level={ex.evidence.level} />
            <Badge>{t('program.level', { n: item.level, total: ex.levels.length })}</Badge>
            {variant && <Badge>{l(variant.name)}</Badge>}
          </div>
        </div>
        {actions && <div className={css.actions}>{actions}</div>}
      </header>

      <div className={showMap ? css.body : undefined}>
        {showMap && (
          <div className={css.map}>
            <MuscleMap name={l(ex.name)} primary={ex.muscles.primary} secondary={ex.muscles.secondary} zoom={ex.zoom} compact showLegend={false} />
          </div>
        )}
        <div className={css.text}>
          {level && <p className={css.levelName}>{l(level.name)}</p>}
          <ul className={css.dosage}>
            {formatDosage(item.dosage, t, l).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
          <ul className={css.cues}>
            {ex.how.cues.slice(0, 2).map((c, i) => (
              <li key={i}>{l(c)}</li>
            ))}
          </ul>
          {item.note && (
            <p className={css.note}>
              <Icon name="pro" size={16} /> {item.note}
            </p>
          )}
          <p className={css.reason}>{reason(item)}</p>
        </div>
      </div>
      {footer}
    </article>
  );
}
