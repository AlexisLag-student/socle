import { useEffect, useRef, useState, type DragEvent } from 'react';
import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, Empty, Field, Input, PageHeader, Segmented, Select, Textarea, ui } from '@/components/ui';
import { useProgram } from '@/app/hooks';
import { setPrefs } from '@/app/prefs';
import { exerciseById } from '@/content/index';
import type { ExerciseFilters } from '@/content/query';
import type { Dosage, Exercise } from '@/domain/schema';
import { SESSION_KEYS, type Program, type ProgramItem } from '@/domain/user';
import { saveProgram } from '@/db/repo';
import { LibraryList } from '@/features/library/LibraryList';
import { formatDosage } from '@/features/exercise/format';
import { useLocalized } from '@/i18n/useLocalized';
import { ShareDialog } from './ShareDialog';
import css from './pro.module.css';

type Key = Program['sessions'][number]['key'];

function num(v: string, min: number, max: number): number {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
}

/** Édition d'un exercice du programme : variante, niveau, dosage, note. */
function ItemEditor({ item, onChange }: { item: ProgramItem; onChange: (i: ProgramItem) => void }) {
  const { t } = useTranslation();
  const l = useLocalized();
  const ex = exerciseById.get(item.exerciseId)!;
  const d = item.dosage;
  const setD = (patch: Partial<Dosage>) => onChange({ ...item, dosage: { ...d, ...patch } });
  const levelDefault = ex.levels.find((x) => x.level === item.level)?.dosage;
  const customIntensity = levelDefault && (d.intensity.value.fr !== levelDefault.intensity.value.fr || d.intensity.kind !== levelDefault.intensity.kind);
  const uid = `${item.exerciseId}-${item.level}`;

  return (
    <div className={css.editor}>
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
        <Field label={t('pro.sets')} htmlFor={`${uid}-s`}>
          <Input id={`${uid}-s`} type="number" inputMode="numeric" min={1} max={10} value={d.sets} onChange={(e) => setD({ sets: num(e.target.value, 1, 10) })} />
        </Field>
        {d.holdSec ? (
          <Field label={t('pro.hold')} htmlFor={`${uid}-h`}>
            <Input id={`${uid}-h`} type="number" inputMode="numeric" min={5} max={600} value={d.holdSec} onChange={(e) => setD({ holdSec: num(e.target.value, 5, 600) })} />
          </Field>
        ) : (
          <Field label={t('pro.reps')} htmlFor={`${uid}-r`}>
            <div className={css.pair}>
              <Input id={`${uid}-r`} type="number" inputMode="numeric" min={1} max={200} value={d.reps?.[0] ?? 10} aria-label={t('pro.repsMin')}
                onChange={(e) => { const a = num(e.target.value, 1, 200); setD({ reps: [a, Math.max(a, d.reps?.[1] ?? a)] }); }} />
              <span>–</span>
              <Input type="number" inputMode="numeric" min={1} max={200} value={d.reps?.[1] ?? 10} aria-label={t('pro.repsMax')}
                onChange={(e) => { const b = num(e.target.value, 1, 200); setD({ reps: [Math.min(b, d.reps?.[0] ?? b), b] }); }} />
            </div>
          </Field>
        )}
        <Field label={t('pro.rest')} htmlFor={`${uid}-rest`}>
          <Input id={`${uid}-rest`} type="number" inputMode="numeric" min={0} max={600} step={15} value={d.restSec} onChange={(e) => setD({ restSec: num(e.target.value, 0, 600) })} />
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
    setOpen(null);
  };
  const addExercise = (ex: Exercise) => {
    const variant = [...ex.variants].sort((a, b) => a.rank - b.rank)[0]!;
    const level = ex.levels[0]!;
    setItems([...session.items, { exerciseId: ex.id, variantId: variant.id, level: level.level, dosage: level.dosage, reason: { kind: 'manual', ref: 'practitioner' } }]);
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
            options={[1, 2, 3, 4].map((n) => ({ value: n, label: String(n) }))}
          />
        </Field>
        <Field label={t('pro.notes')} hint={t('pro.notesHint')} htmlFor="p-notes">
          <Textarea id="p-notes" value={draft.notes ?? ''} maxLength={4000} onChange={(e) => update({ ...draft, notes: e.target.value || undefined })} />
        </Field>
      </div>

      <div className={css.tabs} role="tablist" aria-label={t('pro.sessions')}>
        {draft.sessions.map((s) => (
          <button key={s.key} role="tab" type="button" aria-selected={s.key === session.key} onClick={() => { setTab(s.key); setOpen(null); }}>
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
                  <button type="button" className={css.itemTitle} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                    <strong>
                      {i + 1}. {ex ? l(ex.name) : item.exerciseId}
                    </strong>
                    <span className={ui.muted}>{ex ? formatDosage(item.dosage, t, l).slice(0, 3).join(' · ') : ''}</span>
                  </button>
                  <div className={css.itemActions}>
                    <Button size="small" variant="ghost" iconOnly icon="up" label={t('pro.moveUp')} disabled={i === 0} onClick={() => move(i, i - 1)} />
                    <Button size="small" variant="ghost" iconOnly icon="down" label={t('pro.moveDown')} disabled={i === session.items.length - 1} onClick={() => move(i, i + 1)} />
                    <Button size="small" variant="ghost" iconOnly icon="trash" label={t('common.delete')} onClick={() => { setItems(session.items.filter((_, k) => k !== i)); setOpen(null); }} />
                  </div>
                </div>
                {open === i && ex && <ItemEditor item={item} onChange={(next) => setItems(session.items.map((x, k) => (k === i ? next : x)))} />}
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
