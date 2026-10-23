import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { MuscleId, ZoomRegion } from '@/domain/ids';
import { muscleById } from '@/content/index';
import { useLocalized } from '@/i18n/useLocalized';
import { HatchPattern, MuscleFigure } from './MuscleFigure';
import { silhouetteFor, zooms } from './drawings/registry';
import { isDeep, isTendon } from './figure';
import css from './anatomy.module.css';

export interface MuscleMapProps {
  name: string;
  primary: readonly MuscleId[];
  secondary: readonly MuscleId[];
  zoom: ZoomRegion;
  /** Version compacte (séance guidée, fiche programme) : une silhouette + le zoom, sans légende. */
  compact?: boolean;
  showLegend?: boolean;
}

/** « Jambe, dos » → « jambe, dos » : légende écrite à la main, sans majuscule. */
const lower = (s: string) => s.charAt(0).toLocaleLowerCase() + s.slice(1);

type SwatchKind = 'primary' | 'secondary' | 'tendon' | 'deep';

/** Échantillon de légende dessiné avec le même motif que le schéma. */
function Swatch({ kind }: { kind: SwatchKind }) {
  const id = `${useId().replace(/:/g, '')}-sw`;
  const fill = kind === 'primary' ? 'var(--m-primary)' : kind === 'secondary' ? `url(#${id})` : kind === 'tendon' ? 'var(--m-tendon)' : 'transparent';
  return (
    <svg viewBox="0 0 14 14" className={css.swatch} aria-hidden>
      <defs>
        <HatchPattern id={id} size={4} background="var(--m-hatch-bg)" />
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width="12.5"
        height="12.5"
        style={{ fill, stroke: 'var(--m-outline)', strokeWidth: 1.5, strokeDasharray: kind === 'deep' ? '3 2' : undefined }}
      />
    </svg>
  );
}

/** Schéma musculaire d'un exercice : zoom + légende « Fig. 1 », puis silhouettes entières pour situer la zone. */
export function MuscleMap({ name, primary, secondary, zoom, compact, showLegend = true }: MuscleMapProps) {
  const { t } = useTranslation();
  const l = useLocalized();
  const label = (id: MuscleId) => `${l(muscleById.get(id)?.name)}${isDeep(id) ? ` ${t('muscles.deepSuffix')}` : ''}`;
  const names = (ids: readonly MuscleId[]) => ids.map((id) => l(muscleById.get(id)?.name)).join(', ');
  const { view, locator } = silhouetteFor(zoom);
  const zoomDef = zooms[zoom];
  const all = [...primary, ...secondary];
  const hasDeep = all.some(isDeep);

  const desc = [
    t('muscles.altPrimary', { list: names(primary) }),
    secondary.length ? t('muscles.altSecondary', { list: names(secondary) }) : '',
  ]
    .filter(Boolean)
    .join(' ');
  const title = t('muscles.altFigure', { name });

  const zoomFigure = (
    <MuscleFigure
      drawing={zoomDef.drawing}
      primary={primary}
      secondary={secondary}
      box={zoomDef.box}
      title={`${title} — ${t(`zooms.${zoom}`)}`}
      desc={desc}
    />
  );
  const silhouette = (v: 'front' | 'back') => (
    <MuscleFigure
      drawing={v}
      primary={primary}
      secondary={secondary}
      locator={v === view ? locator : undefined}
      title={`${title} — ${t(v === 'front' ? 'muscles.front' : 'muscles.back')}`}
      desc={desc}
    />
  );

  if (compact) {
    return (
      <div className={css.compact}>
        <figure className={css.compactPanel}>{silhouette(view)}</figure>
        <figure className={css.compactPanel}>{zoomFigure}</figure>
      </div>
    );
  }

  const entries: { kind: SwatchKind; role: string; ids: MuscleId[] }[] = [
    { kind: 'primary' as const, role: t('muscles.legendPrimary'), ids: primary.filter((m) => !isTendon(m)) },
    { kind: 'secondary' as const, role: t('muscles.legendSecondary'), ids: secondary.filter((m) => !isTendon(m)) },
    { kind: 'tendon' as const, role: t('muscles.legendTendon'), ids: all.filter(isTendon) },
  ].filter((e) => e.ids.length > 0);

  return (
    <div className={css.sheet}>
      <div className={css.sheetTop}>
        <figure className={css.zoomPanel}>{zoomFigure}</figure>
        {showLegend && (
          <div className={css.legendBox}>
            <p className={css.figCaption}>{t('muscles.fig', { n: 1, label: lower(t(`zooms.${zoom}`)) })}</p>
            <ul className={css.legend} aria-label={t('muscles.legend')}>
              {entries.map((e) => (
                <li key={e.kind}>
                  <Swatch kind={e.kind} />
                  <span>
                    <span className={css.legendLabel}>{e.role}</span>
                    <span className={css.legendNames}>{e.ids.map(label).join(', ')}</span>
                  </span>
                </li>
              ))}
              {hasDeep && (
                <li>
                  <Swatch kind="deep" />
                  <span className={css.legendLabel}>{t('muscles.legendDeep')}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className={css.sheetViews}>
        {(['front', 'back'] as const).map((v, i) => (
          <figure key={v} className={css.panel}>
            {silhouette(v)}
            <figcaption className={css.figCaption}>{t('muscles.fig', { n: i + 2, label: lower(t(v === 'front' ? 'muscles.front' : 'muscles.back')) })}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
