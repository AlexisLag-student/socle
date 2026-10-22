import { lazy, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Empty, Field, PageHeader, Section, Select, ButtonLink, ui } from '@/components/ui';
import { useLogs } from '@/app/hooks';
import { exerciseById } from '@/content/index';
import { useLocalized } from '@/i18n/useLocalized';
import { calendarGrid, dailyCounts, dayKey, practisedExercises, weekStreak, weeklyCounts } from './stats';
import css from './history.module.css';

const ExerciseChart = lazy(() => import('./ExerciseChart'));
const WEEKS = 16;

export default function HistoryPage() {
  const { t, i18n } = useTranslation();
  const l = useLocalized();
  const logs = useLogs();
  const now = useMemo(() => new Date(), []);
  const finished = useMemo(() => (logs ?? []).filter((x) => x.finishedAt), [logs]);
  const weekly = useMemo(() => weeklyCounts(finished, 12, now), [finished, now]);
  const daily = useMemo(() => dailyCounts(finished), [finished]);
  const grid = useMemo(() => calendarGrid(WEEKS, now), [now]);
  const practised = useMemo(() => practisedExercises(finished), [finished]);
  const [exerciseId, setExerciseId] = useState<string>('');
  const selected = exerciseId || practised[0]?.exerciseId || '';

  if (logs === undefined) return null;
  if (!finished.length)
    return (
      <>
        <PageHeader title={t('nav.history')} />
        <Empty>
          <p>{t('history.empty')}</p>
          <ButtonLink to="/program">{t('nav.program')}</ButtonLink>
        </Empty>
      </>
    );

  const maxWeek = Math.max(1, ...weekly.map((w) => w.count));
  const fmtDay = (d: Date) => d.toLocaleDateString(i18n.language, { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div>
      <PageHeader title={t('nav.history')} />
      <div className={css.stats}>
        <Card>
          <span className={css.value}>{finished.length}</span>
          <span className={css.label}>{t('home.totalSessions')}</span>
        </Card>
        <Card>
          <span className={css.value}>{weekly.at(-1)?.count ?? 0}</span>
          <span className={css.label}>{t('home.thisWeek')}</span>
        </Card>
        <Card>
          <span className={css.value}>{weekStreak(finished, now)}</span>
          <span className={css.label}>{t('history.streak')}</span>
        </Card>
      </div>

      <Section title={t('history.calendar')}>
        <div className={css.calendarWrap}>
          <svg
            viewBox={`0 0 ${WEEKS * 16 + 24} ${7 * 16}`}
            className={css.calendar}
            role="img"
            aria-label={t('history.calendarAlt', { count: finished.length, weeks: WEEKS })}
          >
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) =>
              i % 2 === 0 ? (
                <text key={i} x={0} y={i * 16 + 11} className={css.dayLabel}>
                  {i18n.language.startsWith('en') ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i] : d}
                </text>
              ) : null,
            )}
            {grid.map((week, w) =>
              week.map((day, d) => {
                const n = daily.get(dayKey(day)) ?? 0;
                const future = day > now;
                return (
                  <rect
                    key={`${w}-${d}`}
                    x={24 + w * 16}
                    y={d * 16}
                    width={13}
                    height={13}
                    rx={3}
                    className={future ? css.future : n === 0 ? css.c0 : n === 1 ? css.c1 : css.c2}
                  >
                    <title>{`${fmtDay(day)} : ${t('history.sessionsCount', { count: n })}`}</title>
                  </rect>
                );
              }),
            )}
          </svg>
        </div>
      </Section>

      <Section title={t('history.perWeek')}>
        <div className={css.bars} role="list">
          {weekly.map((w) => (
            <div key={w.weekStart.getTime()} className={css.bar} role="listitem" aria-label={`${fmtDay(w.weekStart)} : ${t('history.sessionsCount', { count: w.count })}`}>
              <span className={css.barValue}>{w.count || ''}</span>
              <span className={css.barFill} style={{ height: `${(w.count / maxWeek) * 100}%` }} />
              <span className={css.barLabel}>{w.weekStart.getDate()}/{w.weekStart.getMonth() + 1}</span>
            </div>
          ))}
        </div>
      </Section>

      {practised.length > 0 && (
        <Section title={t('history.progression')}>
          <Field label={t('history.exercise')} htmlFor="hist-ex">
            <Select id="hist-ex" value={selected} onChange={(e) => setExerciseId(e.target.value)}>
              {practised.map((p) => (
                <option key={p.exerciseId} value={p.exerciseId}>
                  {l(exerciseById.get(p.exerciseId)?.name) || p.exerciseId} ({p.count})
                </option>
              ))}
            </Select>
          </Field>
          <Suspense fallback={<p>{t('common.loading')}</p>}>
            {selected && <ExerciseChart logs={finished} exerciseId={selected} />}
          </Suspense>
        </Section>
      )}

      <Section title={t('history.sessions')}>
        <ul className={css.list}>
          {[...finished].reverse().slice(0, 30).map((log) => {
            const done = log.entries.filter((e) => !e.skipped && e.sets.some((s) => s.done));
            return (
              <li key={log.id}>
                <strong>{fmtDay(new Date(log.finishedAt!))}</strong> · {t('program.session', { key: log.sessionKey })}
                <span className={ui.muted}> · {t('history.exercisesDone', { count: done.length })}</span>
                <span className={css.fb}>
                  {done.map((e) => (e.feedback === 'easy' ? '🙂' : e.feedback === 'hard' ? '🥵' : e.feedback === 'ok' ? '💪' : '')).join('')}
                </span>
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
