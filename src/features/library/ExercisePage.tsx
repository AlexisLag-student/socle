import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import {
  Button,
  Dialog,
  DosageBlock,
  Empty,
  EvidenceBadge,
  Field,
  FootnoteRefs,
  Footnotes,
  HandNote,
  Notice,
  PageHeader,
  Section,
  Select,
  ui,
} from '@/components/ui';
import { MuscleMap } from '@/components/anatomy/MuscleMap';
import { ExerciseAnimation } from '@/components/animation/ExerciseAnimation';
import { hasAnimation } from '@/animation/loaders';
import { content, exerciseById, referenceById } from '@/content/index';
import { formatAuthors, pathologiesForExercise, referenceLinks } from '@/content/query';
import { resolveExerciseId } from '@/content/aliases';
import { useActiveProgram, useExerciseStates, usePrograms, useProfile } from '@/app/hooks';
import { usePrefs } from '@/app/prefs';
import { addItemToProgram } from '@/db/repo';
import { equipmentSet, pickVariant } from '@/engine/availability';
import { formatDosage, formatDuration } from '@/features/exercise/format';
import { useLocalized } from '@/i18n/useLocalized';
import type { Dosage, Exercise, L } from '@/domain/schema';
import type { Program } from '@/domain/user';
import css from './library.module.css';

function AddDialog({ ex, open, onClose }: { ex: Exercise; open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const active = useActiveProgram();
  const programs = usePrograms();
  const profile = useProfile();
  const states = useExerciseStates();
  const { proDraftId } = usePrefs();
  const drafts = (programs ?? []).filter((p) => p.origin === 'pro-draft');
  const targets: Program[] = [...(active ? [active] : []), ...drafts];
  const [targetId, setTargetId] = useState<string>('');
  const target = targets.find((p) => p.id === (targetId || proDraftId || active?.id)) ?? targets[0];
  const [sessionKey, setSessionKey] = useState<Program['sessions'][number]['key']>('A');
  const [done, setDone] = useState(false);

  const add = async () => {
    if (!target) return;
    const variant = pickVariant(ex, equipmentSet(profile?.equipment ?? ['dumbbells', 'gym', 'band', 'step', 'barbell', 'swiss-ball', 'suspension']), states?.get(ex.id)?.variantId) ?? ex.variants[0]!;
    const level = ex.levels.find((x) => x.level === (states?.get(ex.id)?.level ?? 1)) ?? ex.levels[0]!;
    await addItemToProgram(target.id, sessionKey, {
      exerciseId: ex.id,
      variantId: variant.id,
      level: level.level,
      dosage: level.dosage,
      reason: { kind: 'manual', ref: 'library' },
    });
    setDone(true);
  };

  return (
    <Dialog open={open} onClose={() => { setDone(false); onClose(); }} title={t('library.addTitle')}>
      {!targets.length ? (
        <p>{t('library.noTarget')}</p>
      ) : done ? (
        <div className={ui.stack}>
          <Notice icon="check">{t('library.added', { title: target?.title })}</Notice>
          <Link to={target?.origin === 'pro-draft' ? `/pro/edit/${target.id}` : '/program'}>{t('library.openTarget')}</Link>
        </div>
      ) : (
        <div className={ui.stack}>
          <Field label={t('library.target')} htmlFor="add-target">
            <Select id="add-target" value={target?.id} onChange={(e) => setTargetId(e.target.value)}>
              {targets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.origin === 'pro-draft' ? `${t('library.draft')} — ${p.title}` : `${t('library.myProgram')} — ${p.title}`}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t('library.session')} htmlFor="add-session">
            <Select id="add-session" value={sessionKey} onChange={(e) => setSessionKey(e.target.value as typeof sessionKey)}>
              {(['A', 'B', 'C', 'D'] as const)
                .filter((k) => target?.sessions.some((s) => s.key === k) || k === 'A')
                .map((k) => (
                  <option key={k} value={k}>
                    {t('program.session', { key: k })}
                  </option>
                ))}
            </Select>
          </Field>
          <Button icon="plus" onClick={() => void add()}>
            {t('library.add')}
          </Button>
        </div>
      )}
    </Dialog>
  );
}

/** Valeurs du bloc de dosage (séries, tempo ou repos, fréquence) pour un niveau donné. */
function dosageItems(d: Dosage, t: TFunction, l: (x: L | undefined) => string) {
  const work = d.holdSec ? formatDuration(d.holdSec, t) : d.reps ? (d.reps[0] === d.reps[1] ? `${d.reps[0]}` : `${d.reps[0]}–${d.reps[1]}`) : '';
  const rest = { label: t('exercise.dose.rest'), value: formatDuration(d.restSec, t) };
  return [
    { label: t('exercise.dose.sets'), value: `${d.sets} × ${work}` },
    d.tempo ? { label: t('exercise.dose.tempo'), value: d.tempo } : rest,
    d.frequency ? { label: t('exercise.dose.frequency'), value: l(d.frequency) } : d.tempo ? rest : undefined,
  ].filter((x): x is { label: string; value: string } => !!x);
}

export default function ExercisePage() {
  const { t } = useTranslation();
  const l = useLocalized();
  const { id = '' } = useParams();
  const ex = exerciseById.get(resolveExerciseId(id));
  const states = useExerciseStates();
  const profile = useProfile();
  const [adding, setAdding] = useState(false);

  if (!ex)
    return (
      <Empty>
        <p>{t('library.notFound')}</p>
        <Link to="/library">{t('nav.library')}</Link>
      </Empty>
    );

  const current = states?.get(ex.id)?.level;
  const shown = ex.levels.find((x) => x.level === (current ?? 1)) ?? ex.levels[0]!;
  // Variante montrée par l'animation : celle de l'utilisateur ; sinon, pour un niveau sans charge, la version au poids
  // du corps (celle que décrivent ces niveaux) ; sinon la mieux adaptée à son matériel.
  const storedVariant = ex.variants.find((v) => v.id === states?.get(ex.id)?.variantId);
  const animVariant =
    storedVariant ??
    (!shown.loaded ? ex.variants.find((v) => v.equipment.length === 0) : undefined) ??
    pickVariant(ex, equipmentSet(profile?.equipment ?? [])) ??
    ex.variants[0]!;
  const pathologies = pathologiesForExercise(content, ex.id);
  const eqName = (e: string) => l(content.equipment.find((x) => x.id === e)?.name);
  const fn = (n: number) => `fn-${ex.id}-${n}`;

  return (
    <article className={css.detail}>
      <PageHeader
        title={l(ex.name)}
        back={{ to: '/library', label: t('nav.library') }}
        aside={<EvidenceBadge level={ex.evidence.level} seed={ex.id} twoLines />}
        subtitle={[l({ fr: ex.name.en, en: ex.name.fr }), ...ex.sports.map((s) => t(`sports.${s}`)), ...ex.qualities.map((q) => t(`qualities.${q}`))].join(' · ')}
      />

      {hasAnimation(ex.id) && (
        <section aria-labelledby="anim-h">
          <h2 id="anim-h" className="visually-hidden">
            {t('exercise.movementAnim')}
          </h2>
          <ExerciseAnimation exerciseId={ex.id} level={shown.level} variant={animVariant.id} tempo={shown.dosage.tempo} />
        </section>
      )}

      <section aria-labelledby="muscles-h">
        <h2 id="muscles-h" className="visually-hidden">
          {t('exercise.muscles')}
        </h2>
        <MuscleMap name={l(ex.name)} primary={ex.muscles.primary} secondary={ex.muscles.secondary} zoom={ex.zoom} />
      </section>

      <div className={css.dose}>
        <DosageBlock items={dosageItems(shown.dosage, t, l)} />
        <p className={css.doseNote}>
          {t(current ? 'exercise.doseYours' : 'exercise.doseStart', { level: l(shown.name) })} · {l(shown.dosage.intensity.value)}
        </p>
      </div>

      <Section title={t('exercise.why')}>
        <p>
          {l(ex.why)}
          <FootnoteRefs notes={ex.evidence.citations.map((_, i) => ({ n: i + 1, target: fn(i + 1) }))} />
        </p>
      </Section>

      <Section title={t('exercise.how')}>
        <div className={css.prose}>
          <p>
            <strong>{t('exercise.setup')} :</strong> {l(ex.how.setup)}
          </p>
          <p>
            <strong>{t('exercise.movement')} :</strong> {l(ex.how.movement)}
          </p>
          <h3>{t('exercise.cues')}</h3>
          <ul className={css.cues}>
            {ex.how.cues.map((c, i) => (
              <li key={i}>{l(c)}</li>
            ))}
          </ul>
          {ex.how.breathing && (
            <p>
              <strong>{t('exercise.breathing')} :</strong> {l(ex.how.breathing)}
            </p>
          )}
        </div>
      </Section>

      <Section title={t('exercise.mistakes')}>
        <ul className={`${css.prose} ${css.cues}`}>
          {ex.mistakes.map((m, i) => (
            <li key={i}>{l(m)}</li>
          ))}
        </ul>
      </Section>

      <Section title={t('exercise.levels')}>
        <ol className={css.levels}>
          {ex.levels.map((lv) => (
            <li key={lv.level} className={`${css.level} ${current === lv.level ? css.levelCurrent : ''}`}>
              <span className={css.levelNum}>{lv.level}</span>
              <div>
                <p className={css.levelName}>
                  <strong>{l(lv.name)}</strong>
                  {current === lv.level && (
                    <HandNote as="span" red className={css.yourLevel}>
                      {t('exercise.yourLevel')}
                    </HandNote>
                  )}
                </p>
                <p>{l(lv.description)}</p>
                <p className={ui.muted}>{formatDosage(lv.dosage, t, l).join(' · ')}</p>
                {(lv.requires?.length || lv.loaded) && (
                  <p className={css.mastery}>
                    {t('exercise.requires')} {[...(lv.requires ?? []).map(eqName), ...(lv.loaded ? [t('exercise.load')] : [])].join(', ')}
                  </p>
                )}
                <p className={css.mastery}>
                  {t('exercise.mastery')} {l(lv.mastery)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t('exercise.variants')}>
        <ul className={css.variants}>
          {ex.variants.map((v) => (
            <li key={v.id} className={css.variant}>
              <strong>{l(v.name)}</strong>
              <span className={ui.muted}>{v.equipment.length ? v.equipment.map(eqName).join(' + ') : eqName('bodyweight')}</span>
              <p>{l(v.instructions)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t('exercise.precautions')}>
        <ul className={css.prose}>
          {ex.precautions.map((p, i) => (
            <li key={i}>{l(p)}</li>
          ))}
        </ul>
        {ex.contraindications && (
          <Notice tone="danger">
            <strong>{t('exercise.contraindications')}</strong>
            <ul className={css.prose}>
              {ex.contraindications.map((c, i) => (
                <li key={i}>{l(c)}</li>
              ))}
            </ul>
          </Notice>
        )}
      </Section>

      {pathologies.length > 0 && (
        <Section title={t('exercise.usedFor')}>
          <ul className={css.prose}>
            {pathologies.map((p) => (
              <li key={p.id}>
                <Link to={`/pathologies/${p.id}`}>{l(p.name)}</Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title={t('exercise.evidence')} id="refs">
        <p className={css.evidenceLine}>
          <EvidenceBadge level={ex.evidence.level} seed={ex.id} /> <span className={ui.muted}>{t(`evidence.help.${ex.evidence.level}`)}</span>
        </p>
        {ex.evidence.citations.length === 0 ? (
          <p className={ui.muted}>{t('exercise.noRefs')}</p>
        ) : (
          <ReferenceList citations={ex.evidence.citations} idPrefix={`fn-${ex.id}`} />
        )}
      </Section>

      <div className={css.addBar}>
        <Button icon="plus" block size="large" onClick={() => setAdding(true)}>
          {t('library.addTo')}
        </Button>
      </div>

      <AddDialog ex={ex} open={adding} onClose={() => setAdding(false)} />
    </article>
  );
}

/** Références en notes de bas de page numérotées (appels rouges dans le texte). */
export function ReferenceList({ citations, idPrefix }: { citations: { refId: string; finding: { fr: string; en: string } }[]; idPrefix?: string }) {
  const { t } = useTranslation();
  const l = useLocalized();
  return (
    <Footnotes label={t('exercise.evidence')}>
      {citations.map((c, i) => {
        const r = referenceById.get(c.refId);
        if (!r) return null;
        const links = referenceLinks(r);
        return (
          <li key={c.refId} id={idPrefix ? `${idPrefix}-${i + 1}` : undefined} className={css.ref}>
            <sup>{i + 1}</sup>
            <span className={css.refFinding}>{l(c.finding)}</span>{' '}
            <span className={css.refCitation}>
              {formatAuthors(r.authors)} ({r.year}). <em>{r.title}</em>. {r.journal}. {t(`refType.${r.type}`)}.
            </span>{' '}
            <span className={css.refLinks}>
              {links.doi && (
                <a href={links.doi} target="_blank" rel="noopener noreferrer">
                  DOI
                </a>
              )}
              {links.pubmed && (
                <a href={links.pubmed} target="_blank" rel="noopener noreferrer">
                  PubMed
                </a>
              )}
              {!links.doi && !links.pubmed && links.url && (
                <a href={links.url} target="_blank" rel="noopener noreferrer">
                  {t('exercise.link')}
                </a>
              )}
            </span>
          </li>
        );
      })}
    </Footnotes>
  );
}
