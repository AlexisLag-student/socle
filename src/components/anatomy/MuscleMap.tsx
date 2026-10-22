import { useTranslation } from 'react-i18next';
import type { MuscleId, ZoomRegion } from '@/domain/ids';
import { muscleById } from '@/content/index';
import { useLocalized } from '@/i18n/useLocalized';
import { MuscleFigure } from './MuscleFigure';
import { silhouetteFor, zooms } from './drawings/registry';
import { isDeep } from './figure';
import css from './anatomy.module.css';

export interface MuscleMapProps {
  name: string;
  primary: readonly MuscleId[];
  secondary: readonly MuscleId[];
  zoom: ZoomRegion;
  /** Version compacte (séance guidée) : une silhouette + le zoom. */
  compact?: boolean;
  showLegend?: boolean;
}

/** Schéma musculaire d'un exercice : silhouettes entières pour situer la zone + zoom + légende. */
export function MuscleMap({ name, primary, secondary, zoom, compact, showLegend = true }: MuscleMapProps) {
  const { t } = useTranslation();
  const l = useLocalized();
  const names = (ids: readonly MuscleId[]) => ids.map((id) => l(muscleById.get(id)?.name)).join(', ');
  const { view, locator } = silhouetteFor(zoom);
  const zoomDef = zooms[zoom];
  const hasDeep = [...primary, ...secondary].some(isDeep);

  const desc = [
    t('muscles.altPrimary', { list: names(primary) }),
    secondary.length ? t('muscles.altSecondary', { list: names(secondary) }) : '',
  ]
    .filter(Boolean)
    .join(' ');
  const title = t('muscles.altFigure', { name });

  const views = compact ? [view] : (['front', 'back'] as const);

  return (
    <div className={compact ? css.compact : undefined}>
      <div className={css.map}>
        {views.map((v) => (
          <figure key={v} className={css.panel}>
            <MuscleFigure
              drawing={v}
              primary={primary}
              secondary={secondary}
              locator={v === view ? locator : undefined}
              title={`${title} — ${t(v === 'front' ? 'muscles.front' : 'muscles.back')}`}
              desc={desc}
            />
            <figcaption>{t(v === 'front' ? 'muscles.front' : 'muscles.back')}</figcaption>
          </figure>
        ))}
        <figure className={css.zoomPanel}>
          <MuscleFigure
            drawing={zoomDef.drawing}
            primary={primary}
            secondary={secondary}
            box={zoomDef.box}
            title={`${title} — ${t(`zooms.${zoom}`)}`}
            desc={desc}
          />
          <figcaption>{t(`zooms.${zoom}`)}</figcaption>
        </figure>
      </div>
      {showLegend && (
        <ul className={css.legend} aria-label={t('muscles.legend')}>
          <li>
            <span className={`${css.swatch} ${css.primary}`} aria-hidden />
            <span>
              <span className={css.legendLabel}>{t('muscles.legendPrimary')}</span>
              {' — '}
              <span className={css.legendNames}>{names(primary)}</span>
            </span>
          </li>
          {secondary.length > 0 && (
            <li>
              <span className={`${css.swatch} ${css.secondary}`} aria-hidden />
              <span>
                <span className={css.legendLabel}>{t('muscles.legendSecondary')}</span>
                {' — '}
                <span className={css.legendNames}>{names(secondary)}</span>
              </span>
            </li>
          )}
          {hasDeep && (
            <li>
              <span className={`${css.swatch} ${css.deep}`} aria-hidden />
              <span className={css.legendLabel}>{t('muscles.legendDeep')}</span>
            </li>
          )}
          <li>
            <span className={`${css.swatch} ${css.neutral}`} aria-hidden />
            <span className={css.legendLabel}>{t('muscles.legendOther')}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
