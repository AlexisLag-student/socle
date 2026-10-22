import type { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { BodyAreaId } from '@/domain/ids';
import { content } from '@/content/index';
import { useLocalized } from '@/i18n/useLocalized';
import { MuscleFigure } from './MuscleFigure';
import { backAreas, frontAreas } from './drawings/areas';
import { drawings, expandShapes } from './drawings/registry';
import type { AreaShape } from './drawings/types';
import css from './anatomy.module.css';

export interface BodyMapPickerProps {
  selected: readonly BodyAreaId[];
  onToggle: (area: BodyAreaId) => void;
}

const areaName = new Map(content.bodyAreas.map((a) => [a.id, a.name]));

/**
 * Carte du corps cliquable (face et dos). Chaque zone est une case à cocher accessible au clavier ;
 * la même sélection est toujours proposée sous forme de liste à côté.
 */
export function BodyMapPicker({ selected, onToggle }: BodyMapPickerProps) {
  const { t } = useTranslation();
  const l = useLocalized();

  const renderAreas = (view: 'front' | 'back', areas: AreaShape[]) =>
    areas.map((a) => {
      const checked = selected.includes(a.id);
      const label = l(areaName.get(a.id));
      const onKey = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle(a.id);
        }
      };
      return (
        <g
          key={`${view}-${a.id}`}
          className={css.area}
          role="checkbox"
          aria-checked={checked}
          aria-label={label}
          tabIndex={0}
          onClick={() => onToggle(a.id)}
          onKeyDown={onKey}
          data-area={a.id}
        >
          <title>{label}</title>
          {expandShapes(drawings[view], a.shapes).map((d, i) => (
            <path key={i} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      );
    });

  return (
    <div className={css.picker}>
      <div className={css.pickerViews} role="group" aria-label={t('bodyMap.label')}>
        <figure>
          <MuscleFigure drawing="front" title={t('bodyMap.front')} className={css.pickerFigure}>
            {renderAreas('front', frontAreas)}
          </MuscleFigure>
          <figcaption>{t('muscles.front')}</figcaption>
        </figure>
        <figure>
          <MuscleFigure drawing="back" title={t('bodyMap.back')} className={css.pickerFigure}>
            {renderAreas('back', backAreas)}
          </MuscleFigure>
          <figcaption>{t('muscles.back')}</figcaption>
        </figure>
      </div>
    </div>
  );
}
