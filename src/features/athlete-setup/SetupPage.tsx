import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Field, Notice, Option, Segmented, ToggleChip, ui, Icon } from '@/components/ui';
import { BodyMapPicker } from '@/components/anatomy/BodyMapPicker';
import { content, CONTENT_VERSION } from '@/content/index';
import { pathologiesForArea } from '@/content/query';
import {
  EQUIPMENT,
  OBJECTIVES,
  PATHOLOGY_REGIONS,
  PERF_GOALS,
  type BodyAreaId,
  type EquipmentId,
  type Objective,
  type PerfGoal,
  type Phase,
  type Sport,
} from '@/domain/ids';
import type { Profile } from '@/domain/user';
import { useProfile } from '@/app/hooks';
import { regenerateProgram, saveProfile } from '@/db/repo';
import { useLocalized } from '@/i18n/useLocalized';
import css from './setup.module.css';

type Draft = Omit<Profile, 'id' | 'updatedAt'>;
const EMPTY: Draft = {
  sports: [],
  objectives: [],
  perfGoals: [],
  pathologies: [],
  equipment: [],
  sessionsPerWeek: 2,
  minutes: 30,
};

const STEPS = ['sport', 'objectives', 'pain', 'phase', 'equipment', 'availability', 'summary'] as const;
type Step = (typeof STEPS)[number];

const toggle = <T,>(list: readonly T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export default function SetupPage() {
  const { t } = useTranslation();
  const l = useLocalized();
  const navigate = useNavigate();
  const existing = useProfile();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [stepIndex, setStepIndex] = useState(0);
  const [areas, setAreas] = useState<BodyAreaId[]>([]);
  const [clearance, setClearance] = useState(false);
  const [busy, setBusy] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (existing && !loaded.current) {
      loaded.current = true;
      const { id: _id, updatedAt: _u, ...rest } = existing;
      setDraft(rest);
      setClearance(true);
    }
  }, [existing]);

  const hasPathologies = draft.pathologies.length > 0;
  const steps = STEPS.filter((s) => s !== 'phase' || hasPathologies);
  const step: Step = steps[Math.min(stepIndex, steps.length - 1)]!;
  const pathById = useMemo(() => new Map(content.pathologies.map((p) => [p.id, p])), []);
  const needsClearance = draft.pathologies.some((p) => pathById.get(p.id)?.medicalClearanceRequired);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const canNext =
    (step === 'sport' && draft.sports.length > 0) ||
    (step === 'objectives' && draft.objectives.length > 0) ||
    (step === 'phase' && (!needsClearance || clearance)) ||
    ['pain', 'equipment', 'availability'].includes(step);

  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));
  const sportChoice: 'run' | 'bike' | 'both' | null =
    draft.sports.length === 2 ? 'both' : draft.sports[0] ?? null;

  const togglePathology = (id: string) => {
    const p = pathById.get(id)!;
    const exists = draft.pathologies.some((x) => x.id === id);
    const defaultPhase: Phase = p.medicalClearanceRequired
      ? 'return-to-sport'
      : draft.objectives.includes('pain')
        ? p.phases[0]!.phase
        : (p.phases.find((ph) => ph.phase === 'rebuild') ?? p.phases[0]!).phase;
    set({
      pathologies: exists ? draft.pathologies.filter((x) => x.id !== id) : [...draft.pathologies, { id, phase: defaultPhase }],
    });
  };

  async function generate() {
    setBusy(true);
    const profile = await saveProfile(draft);
    await regenerateProgram(profile, content, { title: t('program.autoTitle'), contentVersion: CONTENT_VERSION });
    navigate('/program', { state: { generated: true } });
  }

  const areaMatches = useMemo(
    () => [...new Set(areas.flatMap((a) => pathologiesForArea(content, a)))].filter((p) => p.sports.some((s) => draft.sports.includes(s))),
    [areas, draft.sports],
  );

  const pathologyOption = (id: string) => {
    const p = pathById.get(id)!;
    const checked = draft.pathologies.some((x) => x.id === id);
    return (
      <div key={id} className={css.pathology}>
        <Option role="checkbox" pressed={checked} onToggle={() => togglePathology(id)} title={l(p.name)} hint={l(p.recognize)} />
        {p.caveat && checked && (
          <p className={css.caveat}>
            <Icon name="info" size={16} /> {l(p.caveat)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={css.wrap}>
      <div className={css.progress} aria-hidden>
        {steps.map((s, i) => (
          <span key={s} className={i <= stepIndex ? css.done : undefined} />
        ))}
      </div>
      <p className={css.stepCount}>{t('setup.stepOf', { n: stepIndex + 1, total: steps.length })}</p>

      <h1 ref={headingRef} tabIndex={-1} className={css.title}>
        {t(`setup.${step}.title`)}
      </h1>
      <p className={css.subtitle}>{t(`setup.${step}.subtitle`)}</p>

      <div className={css.body}>
        {step === 'sport' && (
          <div className={ui.stack} role="radiogroup" aria-label={t('setup.sport.title')}>
            {(['run', 'bike', 'both'] as const).map((s) => (
              <Option
                key={s}
                role="radio"
                pressed={sportChoice === s}
                icon={s === 'bike' ? 'bike' : 'run'}
                title={t(`sports.${s}`)}
                onToggle={() => set({ sports: s === 'both' ? ['run', 'bike'] : [s as Sport] })}
              />
            ))}
          </div>
        )}

        {step === 'objectives' && (
          <div className={ui.stack}>
            {OBJECTIVES.map((o: Objective) => (
              <Option
                key={o}
                role="checkbox"
                pressed={draft.objectives.includes(o)}
                title={t(`objectives.${o}`)}
                hint={t(`setup.objectives.hint.${o}`)}
                onToggle={() => set({ objectives: toggle(draft.objectives, o) })}
              />
            ))}
            {draft.objectives.includes('performance') && (
              <Field label={t('setup.objectives.perfLabel')}>
                <div className={ui.chips}>
                  {PERF_GOALS.map((g: PerfGoal) => (
                    <ToggleChip key={g} pressed={draft.perfGoals.includes(g)} onToggle={() => set({ perfGoals: toggle(draft.perfGoals, g) })}>
                      {t(`perfGoals.${g}`)}
                    </ToggleChip>
                  ))}
                </div>
              </Field>
            )}
          </div>
        )}

        {step === 'pain' && (
          <div className={ui.stack}>
            <Notice>{t('setup.pain.noDiagnosis')}</Notice>
            <BodyMapPicker selected={areas} onToggle={(a) => setAreas((s) => toggle(s, a))} />
            {areas.length > 0 && (
              <section aria-live="polite" className={ui.stack}>
                <h2 className={css.h2}>{t('setup.pain.matches')}</h2>
                {areaMatches.length ? areaMatches.map((p) => pathologyOption(p.id)) : <p className={ui.muted}>{t('setup.pain.noMatch')}</p>}
              </section>
            )}
            <details className={css.allList} open={areas.length === 0}>
              <summary>{t('setup.pain.fullList')}</summary>
              {PATHOLOGY_REGIONS.map((r) => {
                const list = content.pathologies.filter((p) => p.region === r && p.sports.some((s) => draft.sports.includes(s)));
                if (!list.length) return null;
                return (
                  <div key={r} className={ui.stack}>
                    <h3 className={css.region}>{t(`regions.${r}`)}</h3>
                    {list.map((p) => pathologyOption(p.id))}
                  </div>
                );
              })}
            </details>
            {draft.pathologies.length > 0 && (
              <p className={ui.muted}>{t('setup.pain.selected', { count: draft.pathologies.length })}</p>
            )}
          </div>
        )}

        {step === 'phase' && (
          <div className={ui.stack}>
            {draft.pathologies.map((sel) => {
              const p = pathById.get(sel.id);
              if (!p) return null;
              return (
                <fieldset key={sel.id} className={css.phaseSet}>
                  <legend>{l(p.name)}</legend>
                  {p.medicalClearanceRequired && <Notice tone="warning">{t('setup.phase.clearanceNotice')}</Notice>}
                  <div className={ui.stack} role="radiogroup" aria-label={l(p.name)}>
                    {p.phases.map((ph) => (
                      <Option
                        key={ph.phase}
                        role="radio"
                        pressed={sel.phase === ph.phase}
                        title={t(`phases.${ph.phase}`)}
                        hint={`${t(`phaseHelp.${ph.phase}`)} ${l(ph.summary)}`}
                        onToggle={() =>
                          set({ pathologies: draft.pathologies.map((x) => (x.id === sel.id ? { ...x, phase: ph.phase } : x)) })
                        }
                      />
                    ))}
                  </div>
                </fieldset>
              );
            })}
            {needsClearance && (
              <label className={css.confirm}>
                <input type="checkbox" checked={clearance} onChange={(e) => setClearance(e.target.checked)} />
                <span>{t('setup.phase.clearanceConfirm')}</span>
              </label>
            )}
          </div>
        )}

        {step === 'equipment' && (
          <div className={ui.stack}>
            {EQUIPMENT.map((e: EquipmentId) => {
              const eq = content.equipment.find((x) => x.id === e)!;
              const always = e === 'bodyweight';
              return (
                <Option
                  key={e}
                  role="checkbox"
                  pressed={always || draft.equipment.includes(e)}
                  title={l(eq.name)}
                  hint={always ? t('setup.equipment.always') : l(eq.hint)}
                  onToggle={() => !always && set({ equipment: toggle(draft.equipment, e) })}
                />
              );
            })}
          </div>
        )}

        {step === 'availability' && (
          <div className={ui.stack}>
            <Field label={t('setup.availability.perWeek')}>
              <Segmented
                label={t('setup.availability.perWeek')}
                value={draft.sessionsPerWeek}
                onChange={(v) => set({ sessionsPerWeek: v })}
                options={[1, 2, 3, 4].map((n) => ({ value: n, label: String(n) }))}
              />
            </Field>
            <Field label={t('setup.availability.duration')}>
              <Segmented
                label={t('setup.availability.duration')}
                value={draft.minutes}
                onChange={(v) => set({ minutes: v })}
                options={([15, 30, 45] as const).map((n) => ({ value: n, label: t('common.minutes', { count: n }) }))}
              />
            </Field>
            <p className={ui.muted}>{t('setup.availability.hint')}</p>
          </div>
        )}

        {step === 'summary' && (
          <dl className={css.summary}>
            <dt>{t('setup.sport.title')}</dt>
            <dd>{t(`sports.${sportChoice ?? 'run'}`)}</dd>
            <dt>{t('setup.objectives.title')}</dt>
            <dd>
              {draft.objectives.map((o) => t(`objectives.${o}`)).join(', ')}
              {draft.perfGoals.length > 0 && ` (${draft.perfGoals.map((g) => t(`perfGoals.${g}`)).join(', ')})`}
            </dd>
            <dt>{t('setup.pain.title')}</dt>
            <dd>
              {draft.pathologies.length
                ? draft.pathologies.map((p) => `${l(pathById.get(p.id)?.name)} — ${t(`phases.${p.phase}`)}`).join(' ; ')
                : t('setup.summary.noPain')}
            </dd>
            <dt>{t('setup.equipment.title')}</dt>
            <dd>
              {['bodyweight', ...draft.equipment]
                .map((e) => l(content.equipment.find((x) => x.id === e)?.name))
                .join(', ')}
            </dd>
            <dt>{t('setup.availability.title')}</dt>
            <dd>{t('setup.summary.availability', { count: draft.sessionsPerWeek, minutes: draft.minutes })}</dd>
          </dl>
        )}
      </div>

      <div className={css.nav}>
        {stepIndex > 0 && (
          <Button variant="secondary" size="large" icon="left" onClick={() => setStepIndex((i) => i - 1)}>
            {t('common.previous')}
          </Button>
        )}
        {step !== 'summary' ? (
          <Button size="large" disabled={!canNext} onClick={() => setStepIndex((i) => Math.min(i + 1, steps.length - 1))}>
            {step === 'pain' && draft.pathologies.length === 0 ? t('setup.pain.none') : t('common.next')}
          </Button>
        ) : (
          <Button size="large" icon="check" disabled={busy} onClick={() => void generate()}>
            {existing ? t('setup.summary.regenerate') : t('setup.summary.generate')}
          </Button>
        )}
      </div>
      {step === 'summary' && existing && <p className={`${ui.muted} ${css.keep}`}>{t('setup.summary.historyKept')}</p>}
    </div>
  );
}
