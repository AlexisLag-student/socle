import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Badge, Field, Input, PageHeader, Select, ui } from '@/components/ui';
import { content } from '@/content/index';
import { citedBy, formatAuthors, normalize, referenceLinks, referencesForPathology } from '@/content/query';
import { useLocalized } from '@/i18n/useLocalized';
import css from './bibliography.module.css';

export default function BibliographyPage() {
  const { t } = useTranslation();
  const l = useLocalized();
  const [params, setParams] = useSearchParams();
  const pathology = params.get('pathology') ?? '';
  const q = params.get('q') ?? '';
  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v);
    else next.delete(k);
    setParams(next, { replace: true });
  };

  const refs = useMemo(() => {
    const base = pathology ? referencesForPathology(content, pathology) : content.references;
    const terms = normalize(q).split(' ').filter(Boolean);
    return base
      .filter((r) => !terms.length || terms.every((tm) => normalize(`${r.authors.join(' ')} ${r.title} ${r.journal} ${r.year}`).includes(tm)))
      .sort((a, b) => a.authors[0]!.localeCompare(b.authors[0]!) || a.year - b.year);
  }, [pathology, q]);

  return (
    <>
      <PageHeader title={t('nav.bibliography')} subtitle={t('bibliography.subtitle', { count: content.references.length })} />
      <div className={css.filters}>
        <Field label={t('library.f.pathology')} htmlFor="bib-p">
          <Select id="bib-p" value={pathology} onChange={(e) => set('pathology', e.target.value)}>
            <option value="">{t('library.all')}</option>
            {[...content.pathologies]
              .sort((a, b) => l(a.name).localeCompare(l(b.name)))
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {l(p.name)}
                </option>
              ))}
          </Select>
        </Field>
        <Field label={t('library.search')} htmlFor="bib-q">
          <Input id="bib-q" type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder={t('bibliography.searchPlaceholder')} />
        </Field>
      </div>
      <p className={ui.muted} aria-live="polite">
        {t('bibliography.count', { count: refs.length })} · {t('bibliography.verified')}
      </p>
      <ol className={css.list}>
        {refs.map((r) => {
          const links = referenceLinks(r);
          const used = citedBy(content, r.id);
          return (
            <li key={r.id} className={css.item} id={r.id}>
              <span className={css.citation}>
                {formatAuthors(r.authors, 6)} ({r.year}). <strong>{r.title}</strong>. <em>{r.journal}</em>.
              </span>
              <span className={css.row}>
                <Badge>{t(`refType.${r.type}`)}</Badge>
                {links.doi && (
                  <a href={links.doi} target="_blank" rel="noopener noreferrer">
                    DOI {r.doi}
                  </a>
                )}
                {links.pubmed && (
                  <a href={links.pubmed} target="_blank" rel="noopener noreferrer">
                    PubMed {r.pmid}
                  </a>
                )}
                {!links.doi && !links.pubmed && links.url && (
                  <a href={links.url} target="_blank" rel="noopener noreferrer">
                    {t('exercise.link')}
                  </a>
                )}
              </span>
              {(used.pathologies.length > 0 || used.exercises.length > 0) && (
                <span className={css.used}>
                  {t('bibliography.citedIn')}{' '}
                  {[
                    ...used.pathologies.map((p) => (
                      <Link key={p.id} to={`/pathologies/${p.id}`}>
                        {l(p.name)}
                      </Link>
                    )),
                    ...used.exercises.map((e) => (
                      <Link key={e.id} to={`/library/${e.id}`}>
                        {l(e.name)}
                      </Link>
                    )),
                  ].map((el, i) => (
                    <span key={i}>
                      {i > 0 && ', '}
                      {el}
                    </span>
                  ))}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
