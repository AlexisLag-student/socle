import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '@/components/ui';
import { AnimationExplorer } from '@/components/animation/AnimationExplorer';
import { useExerciseStates, useProfile } from '@/app/hooks';
import { equipmentSet, shownVariant } from '@/engine/availability';
import type { Exercise } from '@/domain/schema';
import css from './library.module.css';

/** Aperçu depuis la bibliothèque : animation de chaque niveau et de chaque matériel, sans ouvrir la fiche. */
export function LevelPreview({ ex, linkToDetail }: { ex: Exercise; linkToDetail: boolean }) {
  const { t } = useTranslation();
  const states = useExerciseStates();
  const profile = useProfile();
  const current = states?.get(ex.id)?.level;
  const [pick, setPick] = useState<{ level?: number; variant?: string }>({});
  const shown = ex.levels.find((x) => x.level === (pick.level ?? current ?? 1)) ?? ex.levels[0]!;
  const variant = shownVariant(ex, shown, pick.variant ?? states?.get(ex.id)?.variantId, equipmentSet(profile?.equipment ?? []));
  return (
    <div className={css.preview}>
      <AnimationExplorer
        ex={ex}
        level={shown.level}
        variant={variant.id}
        userLevel={current}
        describe
        onLevel={(level) => setPick({ level, variant: pick.variant })}
        onVariant={(v) => setPick({ level: shown.level, variant: v })}
      />
      {linkToDetail && (
        <ButtonLink to={`/library/${ex.id}`} variant="secondary" icon="right">
          {t('library.openDetail')}
        </ButtonLink>
      )}
    </div>
  );
}
