import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import type { SessionLog } from '@/domain/user';
import { exerciseSeries } from './stats';
import css from './history.module.css';

/** Courbes du niveau et de la charge d'un exercice (uPlot, chargé à la demande). */
export default function ExerciseChart({ logs, exerciseId }: { logs: SessionLog[]; exerciseId: string }) {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const series = useMemo(() => exerciseSeries(logs, exerciseId), [logs, exerciseId]);
  const hasLoad = series.some((p) => p.load !== undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || series.length === 0) return;
    const styles = getComputedStyle(document.documentElement);
    const color = (v: string) => styles.getPropertyValue(v).trim() || '#888';
    const data: uPlot.AlignedData = [
      series.map((p) => p.t / 1000),
      series.map((p) => p.level),
      series.map((p) => p.load ?? null),
    ];
    const opts: uPlot.Options = {
      width: el.clientWidth,
      height: 220,
      legend: { show: true },
      cursor: { drag: { x: false, y: false } },
      scales: { x: { time: true }, level: { range: [0.5, 5.5] }, kg: { auto: true } },
      axes: [
        {
          stroke: color('--text-muted'),
          grid: { stroke: color('--border'), width: 1 },
          values: (_u, ticks) => ticks.map((s) => new Date(s * 1000).toLocaleDateString(i18n.language, { day: 'numeric', month: 'short' })),
        },
        { scale: 'level', stroke: color('--text-muted'), grid: { stroke: color('--border'), width: 1 }, incrs: [1], label: t('history.level') },
        ...(hasLoad ? [{ scale: 'kg', side: 1 as const, stroke: color('--text-muted'), grid: { show: false }, label: 'kg' }] : []),
      ],
      series: [
        {},
        { label: t('history.level'), scale: 'level', stroke: color('--brand'), width: 2.5, points: { size: 7 }, paths: uPlot.paths.stepped!({ align: 1 }) },
        { label: t('history.loadKg'), scale: 'kg', stroke: color('--accent'), width: 2, points: { size: 6 }, show: hasLoad },
      ],
    };
    const plot = new uPlot(opts, data, el);
    const ro = new ResizeObserver(() => plot.setSize({ width: el.clientWidth, height: 220 }));
    ro.observe(el);
    return () => {
      ro.disconnect();
      plot.destroy();
    };
  }, [series, hasLoad, t, i18n.language]);

  if (series.length < 2) return <p className={css.hint}>{t('history.notEnough')}</p>;
  return (
    <figure className={css.chart}>
      <div ref={ref} role="img" aria-label={t('history.chartAlt', { count: series.length })} />
      <figcaption className={css.hint}>{hasLoad ? t('history.chartCaptionLoad') : t('history.chartCaption')}</figcaption>
    </figure>
  );
}
