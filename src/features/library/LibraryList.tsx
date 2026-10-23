import { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { EvidenceBadge, Field, Icon, Input, Select, ui } from '@/components/ui';
import { AnimationThumb } from '@/components/animation/ExerciseAnimation';
import { content } from '@/content/index';
import { filterExercises, type ExerciseFilters } from '@/content/query';
import { BODY_ZONES, EQUIPMENT, EVIDENCE_LEVELS, OBJECTIVES, SPORTS } from '@/domain/ids';
import type { Exercise } from '@/domain/schema';
import { useLocalized } from '@/i18n/useLocalized';
import css from './library.module.css';

/** Liste filtrable de la bibliothèque, réutilisée par la page Bibliothèque et le sélecteur du mode praticien. */
export function LibraryList({
  filters,
  onChange,
  renderAction,
  linkToDetail = true,
}: {
  filters: ExerciseFilters;
  onChange: (f: ExerciseFilters) => void;
  renderAction?: (ex: Exercise) => ReactNode;
  linkToDetail?: boolean;
}) {
  const { t } = useTranslation();
  const l = useLocalized();
  const results = useMemo(() => filterExercises(content, filters), [filters]);
  const sortedMuscles = useMemo(() => [...content.muscles].sort((a, b) => l(a.name).localeCompare(l(b.name))), [l]);
  const sortedPathologies = useMemo(() => [...content.pathologies].sort((a, b) => l(a.name).localeCompare(l(b.name))), [l]);
  const active = Object.entries(filters).filter(([k, v]) => k !== 'q' && v).length;
  const set = (patch: Partial<ExerciseFilters>) => onChange({ ...filters, ...patch });

  const select = <K extends keyof ExerciseFilters>(key: K, label: string, options: { value: string; label: string }[]) => (
    <Field label={label} htmlFor={`f-${key}`}>
      <Select id={`f-${key}`} value={(filters[key] as string | undefined) ?? ''} onChange={(e) => set({ [key]: e.target.value || undefined } as Partial<ExerciseFilters>)}>
        <option value="">{t('library.all')}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </Field>
  );

  return (
    <div className={css.layout}>
      <div className={css.search}>
        <Icon name="search" className={css.searchIcon} />
        <Input
          type="search"
          value={filters.q ?? ''}
          placeholder={t('library.searchPlaceholder')}
          aria-label={t('library.search')}
          onChange={(e) => set({ q: e.target.value || undefined })}
        />
      </div>
      <details className={css.filters} open={active > 0}>
        <summary>
          <Icon name="filter" size={18} /> {t('library.filters')}
          {active > 0 && <span className={css.count}>{active}</span>}
        </summary>
        <div className={css.filterGrid}>
          {select('sport', t('library.f.sport'), SPORTS.map((s) => ({ value: s, label: t(`sports.${s}`) })))}
          {select('zone', t('library.f.zone'), BODY_ZONES.map((z) => ({ value: z, label: t(`zones.${z}`) })))}
          {select('muscle', t('library.f.muscle'), sortedMuscles.map((m) => ({ value: m.id, label: l(m.name) })))}
          {select('pathology', t('library.f.pathology'), sortedPathologies.map((p) => ({ value: p.id, label: l(p.name) })))}
          {select('objective', t('library.f.objective'), OBJECTIVES.map((o) => ({ value: o, label: t(`objectives.${o}`) })))}
          {select('equipment', t('library.f.equipment'), EQUIPMENT.map((e) => ({ value: e, label: l(content.equipment.find((x) => x.id === e)?.name) })))}
          {select('evidence', t('library.f.evidence'), EVIDENCE_LEVELS.map((e) => ({ value: e, label: t(`evidence.${e}`) })))}
        </div>
        {active > 0 && (
          <button type="button" className={css.reset} onClick={() => onChange({ q: filters.q })}>
            {t('library.reset')}
          </button>
        )}
      </details>
      <p className={ui.muted} aria-live="polite">
        {t('library.results', { count: results.length })}
      </p>
      <ul className={css.list}>
        {results.map((ex) => {
          const primary = ex.muscles.primary.map((m) => l(content.muscles.find((x) => x.id === m)?.name)).join(', ');
          return (
            <li key={ex.id} className={css.item}>
              <AnimationThumb exerciseId={ex.id} />
              <div className={css.itemText}>
                {linkToDetail ? (
                  <Link to={`/library/${ex.id}`} className={css.itemTitle}>
                    {l(ex.name)}
                  </Link>
                ) : (
                  <span className={css.itemTitle}>{l(ex.name)}</span>
                )}
                <span className={css.itemMeta}>{primary}</span>
                <span className={css.tags}>
                  <EvidenceBadge level={ex.evidence.level} compact seed={ex.id} />
                  {ex.sports.map((s) => (
                    <Icon key={s} name={s === 'bike' ? 'bike' : 'run'} size={16} title={t(`sports.${s}`)} />
                  ))}
                </span>
              </div>
              {renderAction?.(ex)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { EVIDENCE_LEVELS };
