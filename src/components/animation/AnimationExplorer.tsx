import { useTranslation } from 'react-i18next';
import { HandNote, Notice, Segmented, ToggleChip } from '@/components/ui';
import { hasAnimation } from '@/animation/loaders';
import { levelVariants } from '@/engine/availability';
import type { Exercise } from '@/domain/schema';
import { useLocalized } from '@/i18n/useLocalized';
import { ExerciseAnimation } from './ExerciseAnimation';
import css from './animation.module.css';

/**
 * Animation d'un exercice avec le choix du niveau et du matériel (fiche, aperçu de la bibliothèque).
 * Le choix ne modifie ni la progression ni le programme : il ne sert qu'à voir chaque version du mouvement.
 */
export function AnimationExplorer({
  ex,
  level,
  variant,
  onLevel,
  onVariant,
  userLevel,
  describe,
}: {
  ex: Exercise;
  level: number;
  variant: string;
  onLevel: (level: number) => void;
  onVariant: (variant: string) => void;
  /** Niveau atteint par l'utilisateur, marqué « votre niveau ». */
  userLevel?: number;
  /** Affiche la description du niveau (aperçu hors de la fiche, où la liste des niveaux n'est pas visible). */
  describe?: boolean;
}) {
  const { t } = useTranslation();
  const l = useLocalized();
  const lv = ex.levels.find((x) => x.level === level) ?? ex.levels[0]!;
  const variants = levelVariants(ex, lv);
  const shownVariant = variants.find((v) => v.id === variant) ?? variants[0]!;

  return (
    <div className={css.explorer}>
      {hasAnimation(ex.id, lv.level) ? (
        <ExerciseAnimation exerciseId={ex.id} level={lv.level} variant={shownVariant.id} tempo={lv.dosage.tempo} />
      ) : (
        <Notice tone="neutral">{t('anim.noAnimLevel')}</Notice>
      )}
      <div className={css.pick}>
        <span className={css.pickLabel} aria-hidden>
          {t('anim.levelPicker')}
        </span>
        <Segmented label={t('anim.levelPicker')} value={lv.level} onChange={onLevel} options={ex.levels.map((x) => ({ value: x.level, label: String(x.level) }))} />
      </div>
      <p className={css.pickLevel}>
        <strong>{l(lv.name)}</strong>
        {userLevel === lv.level && (
          <HandNote as="span" red className={css.pickYours}>
            {t('exercise.yourLevel')}
          </HandNote>
        )}
      </p>
      {describe && <p className={css.pickText}>{l(lv.description)}</p>}
      {variants.length > 1 ? (
        <div className={css.pick}>
          <span className={css.pickLabel} aria-hidden>
            {t('anim.variantPicker')}
          </span>
          <div className={css.chips} role="group" aria-label={t('anim.variantPicker')}>
            {variants.map((v) => (
              <ToggleChip key={v.id} pressed={v.id === shownVariant.id} onToggle={() => onVariant(v.id)}>
                {l(v.name)}
              </ToggleChip>
            ))}
          </div>
        </div>
      ) : (
        <p className={css.pickText}>
          {t('anim.variantPicker')} : {l(shownVariant.name)}
        </p>
      )}
    </div>
  );
}
