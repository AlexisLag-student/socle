import { useEffect, useRef, useState, type DragEvent } from 'react';
import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, Empty, Field, Input, PageHeader, Segmented, Select, Textarea, ui } from '@/components/ui';
import { useProgram } from '@/app/hooks';
import { setPrefs } from '@/app/prefs';
import { exerciseById } from '@/content/index';
import type { ExerciseFilters } from '@/content/query';
import type { Dosage, Exercise } from '@/domain/schema';
import { DURATIONS, MAX_SESSIONS_PER_WEEK, SESSION_KEYS, type Program, type ProgramItem } from '@/domain/user';
import { saveProgram } from '@/db/repo';
import { LibraryList } from '@/features/library/LibraryList';
import { ExerciseAnimation } from '@/components/animation/ExerciseAnimation';
import { hasAnimation } from '@/animation/loaders';
import { formatDosage, formatMinutes, formatSessionLength } from '@/features/exercise/format';
import { sessionSeconds } from '@/engine/duration';
import { useLocalized } from '@/i18n/useLocalized';
import { ShareDialog } from './ShareDialog';
import { FIELD_BOUNDS, applyTexts, digitsOnly, fieldErrors, toTexts, visibleFields, type DosageField } from './dosageFields';
import css from './pro.module.css';

type Key = Program['sessions'][number]['key'];

/** Champ numérique libre : texte (`inputMode="numeric"`), jamais réécrit ni borné pendant la frappe. */
function NumberInput({ id, value, error, label, onText }: { id: string; value: string; error?: string; label?: string; onText: (v: string) => void }) {
  return (
    <Input
      id={id}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="off"
      maxLength={3}
      value={value}
      aria-label={label}
      aria-invalid={error ? true : undefined}
      aria-describedby={error}
      onChange={(e) => onText(digitsOnly(e.target.value))}
    />
  );
}

/**
 * Édition d'un exercice du programme : variante, niveau, dosage, note. Les valeurs valides sont reportées
 * au fil de la saisie ; « Valider » referme l'éditeur, sauf si un champ est vide, à 0 ou hors bornes.
 */
function ItemEditor({ item, onChange, onDone, focusFirst }: { item: ProgramItem; onChange: (i: ProgramItem) => void; onDone: () => void; focusFirst: boolean }) {
  const { t } = useTranslation();
  const l = useLocalized();
  const ex = exerciseById.get(item.exerciseId)!;
  const d = item.dosage;
  const setD = (patch: Partial<Dosage>) => onChange({ ...item, dosage: { ...d, ...patch } });
  const levelDefault = ex.levels.find((x) => x.level === item.level)?.dosage;
  const customIntensity = levelDefault && (d.intensity.value.fr !== levelDefault.intensity.value.fr || d.intensity.kind !== levelDefault.intensity.kind);
  const uid = `${item.exerciseId}-${item.level}`;
  const ids: Record<DosageField, string> = { sets: `${uid}-s`, repsMin: `${uid}-r`, repsMax: `${uid}-r2`, hold: `${uid}-h`, rest: `${uid}-rest` };
  // Texte tapé dans les champs numériques ; seules les valeurs valides passent dans le dosage.
  const [texts, setTexts] = useState(() => toTexts(d));
  // Messages affichés à partir du premier « Valider », puis mis à jour à chaque frappe.
  const [checked, setChecked] = useState(false);
  const fields = visibleFields(d);
  const errors = checked ? fieldErrors(texts, fields) : {};
  const setText = (field: DosageField, value: string) => {
    const next = { ...texts, [field]: value };
    setTexts(next);
    onChange({ ...item, dosage: applyTexts(d, next, fields) });
  };
  const message = (field: DosageField) => {
    const e = errors[field];
    if (!e) return undefined;
    const [min, max] = FIELD_BOUNDS[field];
    return e === 'range' ? t('pro.errorRange', { min, max }) : t(`pro.error.${e}`);
  };
  const errorId = (field: DosageField) => (errors[field] ? `${ids[field]}-error` : undefined);
  const validate = () => {
    const found = fieldErrors(texts, fields);
    setChecked(true);
    const first = fields.find((f) => found[f]);
    if (first) document.getElementById(ids[first])?.focus();
    else onDone();
  };

  // Ouvert juste après un ajout : curseur dans « Séries », une fois le sélecteur d'exercices refermé
  // (sa fermeture rend le focus au bouton « Ajouter un exercice »).
  const setsId = ids.sets;
  useEffect(() => {
    if (!focusFirst) return;
    const raf = requestAnimationFrame(() => document.getElementById(setsId)?.focus());
    return () => cancelAnimationFrame(raf);
  }, [focusFirst, setsId]);
  const repsMessage = message('repsMin') ?? message('repsMax');
  const repsErrorId = repsMessage ? `${ids.repsMin}-error` : undefined;

  return (
    <div className={css.editor}>
      {/* Aperçu animé au niveau, à la variante et au tempo choisis. */}
      {hasAnimation(ex.id, item.level) && <ExerciseAnimation exerciseId={ex.id} level={item.level} variant={item.variantId} tempo={d.tempo} className={css.preview} />}
      <div className={css.editorGrid}>
        <Field label={t('pro.variant')} htmlFor={`${uid}-v`}>
          <Select id={`${uid}-v`} value={item.variantId} onChange={(e) => onChange({ ...item, variantId: e.target.value })}>
            {ex.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {l(v.name)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t('pro.level')} htmlFor={`${uid}-l`}>
          <Select
            id={`${uid}-l`}
            value={item.level}
            onChange={(e) => {
              const lv = ex.levels.find((x) => x.level === Number(e.target.value))!;
              setTexts(toTexts(lv.dosage));
              setChecked(false);
              onChange({ ...item, level: lv.level, dosage: lv.dosage });
            }}
          >
            {ex.levels.map((lv) => (
              <option key={lv.level} value={lv.level}>
                {lv.level}. {l(lv.name)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label={t('pro.sets')} htmlFor={ids.sets} error={message('sets')}>
          <NumberInput id={ids.sets} value={texts.sets} error={errorId('sets')} onText={(v) => setText('sets', v)} />
        </Field>
        {fields.includes('repsMin') && (
          <Field label={t('pro.reps')} htmlFor={ids.repsMin} error={repsMessage}>
            <div className={css.pair}>
              <NumberInput id={ids.repsMin} value={texts.repsMin} error={errors.repsMin && repsErrorId} label={t('pro.repsMin')} onText={(v) => setText('repsMin', v)} />
              <span aria-hidden>–</span>
              <NumberInput id={ids.repsMax} value={texts.repsMax} error={errors.repsMax && repsErrorId} label={t('pro.repsMax')} onText={(v) => setText('repsMax', v)} />
            </div>
          </Field>
        )}
        {fields.includes('hold') && (
          <Field label={t('pro.hold')} htmlFor={ids.hold} error={message('hold')}>
            <NumberInput id={ids.hold} value={texts.hold} error={errorId('hold')} onText={(v) => setText('hold', v)} />
          </Field>
        )}
        <Field label={t('pro.rest')} htmlFor={ids.rest} error={message('rest')}>
          <NumberInput id={ids.rest} value={texts.rest} error={errorId('rest')} onText={(v) => setText('rest', v)} />
        </Field>
        <Field label={t('pro.tempo')} hint={t('pro.tempoHint')} htmlFor={`${uid}-t`}>
          <Input
            id={`${uid}-t`}
            value={d.tempo ?? ''}
            placeholder="3-0-3"
            pattern="^([0-9]|X)(-([0-9]|X)){2,3}$"
            onChange={(e) => {
              const v = e.target.value.toUpperCase().replace(/[^0-9X-]/g, '');
              const next = { ...d };
              if (/^([0-9]|X)(-([0-9]|X)){2,3}$/.test(v)) next.tempo = v;
              else if (!v) delete next.tempo;
              onChange({ ...item, dosage: next });
            }}
          />
        </Field>
        <Field label={t('pro.perSide')} htmlFor={`${uid}-ps`}>
          <Select id={`${uid}-ps`} value={d.perSide ? '1' : '0'} onChange={(e) => setD({ perSide: e.target.value === '1' })}>
            <option value="0">{t('common.no')}</option>
            <option value="1">{t('common.yes')}</option>
          </Select>
        </Field>
      </div>
      <Field label={t('pro.intensity')} hint={customIntensity ? undefined : t('pro.intensityHint')} htmlFor={`${uid}-i`}>
        <Input
          id={`${uid}-i`}
          value={customIntensity ? d.intensity.value.fr : ''}
          placeholder={levelDefault ? l(levelDefault.intensity.value) : ''}
          maxLength={200}
          onChange={(e) =>
            setD({
              intensity: e.target.value
                ? { kind: 'load', value: { fr: e.target.value, en: e.target.value } }
                : (levelDefault?.intensity ?? d.intensity),
            })
          }
        />
      </Field>
      <Field label={t('pro.note')} htmlFor={`${uid}-n`}>
        <Textarea id={`${uid}-n`} value={item.note ?? ''} maxLength={1000} rows={2} onChange={(e) => onChange({ ...item, note: e.target.value || undefined })} />
      </Field>
      <div className={css.editorActions}>
        <Button variant="secondary" icon="check" onClick={validate}>
          {t('pro.validate')}
        </Button>
      </div>
    </div>
  );
}

export default function ProEditorPage() {
  const { t } = useTranslation();
  const l = useLocalized();
  const { id } = useParams();
  const stored = useProgram(id);
  const [draft, setDraft] = useState<Program | null>(null);
  const [tab, setTab] = useState<Key>('A');
  const [open, setOpen] = useState<number | null>(null);
  // Éditeur ouvert par un ajout (curseur placé dans « Séries ») plutôt que par un appui sur l'exercice.
  const [justAdded, setJustAdded] = useState(false);
  const toggle = (i: number | null) => {
    setOpen(i);
    setJustAdded(false);
  };
  const [picking, setPicking] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [filters, setFilters] = useState<ExerciseFilters>({});
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (stored && !draft) {
      setDraft(stored);
      setPrefs({ proDraftId: stored.id });
    }
  }, [stored, draft]);

  // Synchronise les ajouts faits depuis la bibliothèque (autre écran) quand le brouillon n'est pas en cours d'édition.
  useEffect(() => {
    if (stored && draft && stored.updatedAt > draft.updatedAt + 500) setDraft(stored);
  }, [stored, draft]);

  const update = (next: Program) => {
    const withTime = { ...next, updatedAt: Date.now() };
    setDraft(withTime);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => void saveProgram(withTime), 300);
  };
  useEffect(() => () => clearTimeout(saveTimer.current), []);

  if (stored === undefined) return null;
  if (!stored || !draft)
    return (
      <Empty>
        <p>{t('pro.notFound')}</p>
        <Link to="/pro">{t('pro.title')}</Link>
      </Empty>
    );

  const session = draft.sessions.find((s) => s.key === tab) ?? draft.sessions[0]!;
  const setItems = (items: ProgramItem[]) =>
    update({ ...draft, sessions: draft.sessions.map((s) => (s.key === session.key ? { ...s, items } : s)) });
  const move = (from: number, to: number) => {
    if (to < 0 || to >= session.items.length) return;
    const items = [...session.items];
    const [it] = items.splice(from, 1);
    items.splice(to, 0, it!);
    setItems(items);
    toggle(null);
  };
  const addExercise = (ex: Exercise) => {
    const variant = [...ex.variants].sort((a, b) => a.rank - b.rank)[0]!;
    const level = ex.levels[0]!;
    setItems([...session.items, { exerciseId: ex.id, variantId: variant.id, level: level.level, dosage: level.dosage, reason: { kind: 'manual', ref: 'practitioner' } }]);
    // Ses paramètres s'ouvrent aussitôt ; refermés sans valider, il garde le dosage de son niveau 1.
    setPicking(false);
    setOpen(session.items.length);
    setJustAdded(true);
  };
  const addSession = () => {
    const next = SESSION_KEYS.find((k) => !draft.sessions.some((s) => s.key === k));
    if (!next) return;
    update({ ...draft, sessions: [...draft.sessions, { key: next, items: [] }] });
    setTab(next);
  };
  const removeSession = () => {
    if (draft.sessions.length <= 1) return;
    if (session.items.length && !confirm(t('pro.confirmRemoveSession', { key: session.key }))) return;
    const sessions = draft.sessions.filter((s) => s.key !== session.key).map((s, i) => ({ ...s, key: SESSION_KEYS[i]! }));
    update({ ...draft, sessions });
    setTab('A');
  };
  const onDrop = (e: DragEvent, to: number) => {
    e.preventDefault();
    if (dragFrom !== null) move(dragFrom, to);
    setDragFrom(null);
  };
  const total = draft.sessions.reduce((n, s) => n + s.items.length, 0);
  // Durée estimée de la séance affichée, repos entre séries et entre exercices compris.
  const estimate = sessionSeconds(session.items);
  const over = !!draft.minutes && estimate > draft.minutes * 60 * 1.1;

  return (
    <div className={css.editorPage}>
      <PageHeader
        title={t('pro.editTitle')}
        back={{ to: '/pro', label: t('pro.title') }}
        actions={
          <div className={ui.row}>
            <Link to={`/program/${draft.id}`} className={css.previewLink}>
              {t('pro.preview')}
            </Link>
            <Button icon="share" disabled={total === 0} onClick={() => setSharing(true)}>
              {t('pro.generateLink')}
            </Button>
          </div>
        }
      />

      <div className={css.meta}>
        <Field label={t('pro.programTitle')} htmlFor="p-title">
          <Input id="p-title" value={draft.title} maxLength={120} onChange={(e) => update({ ...draft, title: e.target.value })} />
        </Field>
        <Field label={t('pro.author')} htmlFor="p-author">
          <Input id="p-author" value={draft.author ?? ''} maxLength={120} onChange={(e) => update({ ...draft, author: e.target.value || undefined })} />
        </Field>
        <Field label={t('pro.perWeek')}>
          <Segmented
            label={t('pro.perWeek')}
            value={draft.sessionsPerWeek ?? 2}
            onChange={(v) => update({ ...draft, sessionsPerWeek: v })}
            options={Array.from({ length: MAX_SESSIONS_PER_WEEK }, (_, i) => i + 1).map((n) => ({ value: n, label: String(n) }))}
          />
        </Field>
        <Field label={t('pro.targetDuration')}>
          <Segmented<number>
            label={t('pro.targetDuration')}
            value={draft.minutes ?? 0}
            onChange={(v) => {
              const { minutes: _m, ...rest } = draft;
              update(v ? { ...rest, minutes: v as Program['minutes'] } : rest);
            }}
            options={[{ value: 0, label: t('pro.targetNone') }, ...DURATIONS.map((n) => ({ value: n, label: formatSessionLength(n, t) }))]}
          />
        </Field>
        <Field label={t('pro.notes')} hint={t('pro.notesHint')} htmlFor="p-notes">
          <Textarea id="p-notes" value={draft.notes ?? ''} maxLength={4000} onChange={(e) => update({ ...draft, notes: e.target.value || undefined })} />
        </Field>
      </div>

      <div className={css.tabs} role="tablist" aria-label={t('pro.sessions')}>
        {draft.sessions.map((s) => (
          <button key={s.key} role="tab" type="button" aria-selected={s.key === session.key} onClick={() => { setTab(s.key); toggle(null); }}>
            {t('program.session', { key: s.key })} <span className={css.tabCount}>{s.items.length}</span>
          </button>
        ))}
        {draft.sessions.length < SESSION_KEYS.length && (
          <button type="button" onClick={addSession} aria-label={t('pro.addSession')}>
            +
          </button>
        )}
      </div>

      <div role="tabpanel" className={css.panel}>
        <Field label={t('pro.sessionTitle')} htmlFor="s-title">
          <Input
            id="s-title"
            value={session.title ?? ''}
            maxLength={80}
            placeholder={t('pro.sessionTitlePlaceholder')}
            onChange={(e) => update({ ...draft, sessions: draft.sessions.map((s) => (s.key === session.key ? { ...s, title: e.target.value || undefined } : s)) })}
          />
        </Field>

        {session.items.length === 0 && <Empty>{t('pro.emptySession')}</Empty>}
        {session.items.length > 0 && (
          <p className={ui.muted} aria-live="polite">
            {t('pro.estimate', { key: session.key, minutes: formatMinutes(estimate) })}
            {over && (
              <>
                {' '}
                <strong className={css.over}>{t('pro.estimateOver', { target: formatSessionLength(draft.minutes!, t) })}</strong>
              </>
            )}
          </p>
        )}
        <ol className={css.items}>
          {session.items.map((item, i) => {
            const ex = exerciseById.get(item.exerciseId);
            return (
              <li
                key={`${item.exerciseId}-${i}`}
                className={`${css.item} ${dragFrom === i ? css.dragging : ''}`}
                draggable
                onDragStart={() => setDragFrom(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, i)}
                onDragEnd={() => setDragFrom(null)}
              >
                <div className={css.itemHead}>
                  <span className={css.grip} aria-hidden>
                    ⋮⋮
                  </span>
                  <button type="button" className={css.itemTitle} aria-expanded={open === i} onClick={() => toggle(open === i ? null : i)}>
                    <strong>
                      {i + 1}. {ex ? l(ex.name) : item.exerciseId}
                    </strong>
                    <span className={ui.muted}>{ex ? formatDosage(item.dosage, t, l).slice(0, 3).join(' · ') : ''}</span>
                  </button>
                  <div className={css.itemActions}>
                    <Button size="small" variant="ghost" iconOnly icon="up" label={t('pro.moveUp')} disabled={i === 0} onClick={() => move(i, i - 1)} />
                    <Button size="small" variant="ghost" iconOnly icon="down" label={t('pro.moveDown')} disabled={i === session.items.length - 1} onClick={() => move(i, i + 1)} />
                    <Button size="small" variant="ghost" iconOnly icon="trash" label={t('common.delete')} onClick={() => { setItems(session.items.filter((_, k) => k !== i)); toggle(null); }} />
                  </div>
                </div>
                {open === i && ex && (
                  <ItemEditor
                    item={item}
                    focusFirst={justAdded}
                    onChange={(next) => setItems(session.items.map((x, k) => (k === i ? next : x)))}
                    onDone={() => toggle(null)}
                  />
                )}
              </li>
            );
          })}
        </ol>
        <div className={ui.row}>
          <Button icon="plus" onClick={() => setPicking(true)} disabled={session.items.length >= 20}>
            {t('pro.addExercise')}
          </Button>
          {draft.sessions.length > 1 && (
            <Button variant="ghost" icon="trash" onClick={removeSession}>
              {t('pro.removeSession')}
            </Button>
          )}
        </div>
      </div>

      <Dialog open={picking} onClose={() => setPicking(false)} title={t('pro.pickTitle', { key: session.key })}>
        <LibraryList
          filters={filters}
          onChange={setFilters}
          linkToDetail={false}
          renderAction={(ex) => (
            <Button size="small" icon="plus" variant="secondary" onClick={() => addExercise(ex)}>
              {t('library.add')}
            </Button>
          )}
        />
      </Dialog>
      <ShareDialog program={draft} open={sharing} onClose={() => setSharing(false)} />
    </div>
  );
}
