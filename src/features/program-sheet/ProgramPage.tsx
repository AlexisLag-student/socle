import { useParams, Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, ButtonLink, Empty, Notice, PageHeader, Badge, ui } from '@/components/ui';
import { useActiveProgram, useExerciseStates, useProfile, useProgram } from '@/app/hooks';
import { exerciseById, pathologyById } from '@/content/index';
import { activateProgram, decideAndApply } from '@/db/repo';
import { exerciseSeconds } from '@/engine/duration';
import { ExerciseCard } from '@/features/exercise/ExerciseCard';
import { formatMinutes } from '@/features/exercise/format';
import { useLocalized } from '@/i18n/useLocalized';
import type { Program } from '@/domain/user';
import css from './program.module.css';

function Suggestions({ program }: { program: Program }) {
  const { t } = useTranslation();
  const l = useLocalized();
  const states = useExerciseStates();
  const ids = new Set(program.sessions.flatMap((s) => s.items.map((i) => i.exerciseId)));
  const pending = [...(states?.values() ?? [])].filter((s) => s.pending && ids.has(s.exerciseId));
  if (!pending.length) return null;
  return (
    <section className={css.suggestions} aria-labelledby="sugg-h">
      <h2 id="sugg-h">{t('program.suggestionsTitle')}</h2>
      {pending.map((s) => {
        const ex = exerciseById.get(s.exerciseId);
        const p = s.pending!;
        const target = ex?.levels.find((x) => x.level === p.toLevel);
        return (
          <div key={s.exerciseId} className={css.suggestion}>
            <p>
              <strong>{l(ex?.name)}</strong> — {t(`progression.${p.kind}`, { level: target ? l(target.name) : p.toLevel, pct: Math.abs(p.loadChangePct ?? 0) })}
            </p>
            <div className={ui.row}>
              <Button size="small" icon="check" onClick={() => void decideAndApply(s.exerciseId, true, (id) => exerciseById.get(id))}>
                {t('progression.accept')}
              </Button>
              <Button size="small" variant="secondary" onClick={() => void decideAndApply(s.exerciseId, false, (id) => exerciseById.get(id))}>
                {t('progression.decline')}
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default function ProgramPage() {
  const { t, i18n } = useTranslation();
  const l = useLocalized();
  const { id } = useParams();
  const location = useLocation();
  const active = useActiveProgram();
  const byId = useProgram(id);
  const profile = useProfile();
  const program = id ? byId : active;

  if (program === undefined) return null;
  if (!program)
    return (
      <Empty>
        <p>{t('program.none')}</p>
        <div className={ui.row} style={{ justifyContent: 'center' }}>
          <ButtonLink to="/setup" icon="run">
            {t('home.athleteCta')}
          </ButtonLink>
          <ButtonLink to="/pro" variant="secondary" icon="pro">
            {t('home.proCta')}
          </ButtonLink>
        </div>
      </Empty>
    );

  const isActive = program.active;
  const coveredPathologies = new Set(program.sessions.flatMap((s) => s.items.filter((i) => i.reason.kind === 'pathology').map((i) => i.reason.ref)));
  const missing = program.origin === 'auto' ? (profile?.pathologies ?? []).filter((p) => !coveredPathologies.has(p.id)) : [];
  const clearance = program.origin === 'auto' ? (profile?.pathologies ?? []).filter((p) => pathologyById.get(p.id)?.medicalClearanceRequired) : [];
  const date = new Date(program.createdAt).toLocaleDateString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className={css.page}>
      <PageHeader
        title={program.title}
        subtitle={
          <>
            {program.author ? t('program.by', { author: program.author }) + ' · ' : ''}
            {t('program.createdOn', { date })}
            {program.sessionsPerWeek ? ` · ${t('program.perWeek', { count: program.sessionsPerWeek })}` : ''}
          </>
        }
        actions={
          <div className={`${ui.row} ${css.noPrint}`}>
            <Button variant="secondary" icon="print" onClick={() => window.print()}>
              {t('program.print')}
            </Button>
          </div>
        }
      />

      {(location.state as { generated?: boolean } | null)?.generated && (
        <Notice icon="check">{t('program.generated')}</Notice>
      )}
      {!isActive && (
        <Notice tone="warning">
          {t('program.notActive')}{' '}
          <Button size="small" variant="secondary" onClick={() => void activateProgram(program.id)}>
            {t('program.activate')}
          </Button>
        </Notice>
      )}
      {clearance.map((p) => (
        <Notice key={p.id} tone="warning">
          {t('program.clearance', { name: l(pathologyById.get(p.id)?.name) })}
        </Notice>
      ))}
      {missing.map((p) => (
        <Notice key={p.id} tone="warning">
          {t('program.missingPathology', { name: l(pathologyById.get(p.id)?.name) || p.id })}
        </Notice>
      ))}
      {program.notes && (
        <div className={css.notes}>
          <h2>{t('program.notes')}</h2>
          <p>{program.notes}</p>
        </div>
      )}
      {isActive && <Suggestions program={program} />}

      {program.origin === 'auto' && (
        <p className={`${css.noPrint} ${css.links}`}>
          <Link to="/setup">{t('home.editProfile')}</Link>
          {profile?.pathologies.map((p) => (
            <Link key={p.id} to={`/pathologies/${p.id}`}>
              {t('program.pathologySheet', { name: l(pathologyById.get(p.id)?.name) })}
            </Link>
          ))}
        </p>
      )}

      {program.sessions.map((s) => {
        const minutes = formatMinutes(s.items.reduce((acc, i) => acc + exerciseSeconds(i.dosage), 0));
        return (
          <section key={s.key} className={css.session} aria-labelledby={`s-${s.key}`}>
            <div className={css.sessionHead}>
              <div>
                <h2 id={`s-${s.key}`}>
                  {t('program.session', { key: s.key })}
                  {s.title ? ` — ${s.title}` : ''}
                </h2>
                <Badge>{t('home.sessionMeta', { count: s.items.length, minutes })}</Badge>
              </div>
              {isActive && s.items.length > 0 && (
                <ButtonLink to={`/session/${s.key}`} icon="play" className={css.noPrint}>
                  {t('home.start')}
                </ButtonLink>
              )}
            </div>
            <div className={css.items}>
              {s.items.map((item, i) => (
                <ExerciseCard key={`${item.exerciseId}-${i}`} item={item} index={i} />
              ))}
            </div>
          </section>
        );
      })}
      <p className={css.printFooter}>{t('disclaimer.body')} {t('disclaimer.stop')}</p>
    </div>
  );
}
