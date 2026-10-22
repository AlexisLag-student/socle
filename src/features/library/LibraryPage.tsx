import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/ui';
import type { ExerciseFilters } from '@/content/query';
import { LibraryList } from './LibraryList';

const KEYS: (keyof ExerciseFilters)[] = ['q', 'sport', 'zone', 'muscle', 'pathology', 'objective', 'equipment', 'evidence'];

export default function LibraryPage() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const filters = Object.fromEntries(KEYS.map((k) => [k, params.get(k) ?? undefined]).filter(([, v]) => v)) as ExerciseFilters;
  const onChange = (f: ExerciseFilters) =>
    setParams(Object.fromEntries(Object.entries(f).filter(([, v]) => v)) as Record<string, string>, { replace: true });
  return (
    <>
      <PageHeader title={t('nav.library')} subtitle={t('library.subtitle')} />
      <LibraryList filters={filters} onChange={onChange} />
    </>
  );
}
