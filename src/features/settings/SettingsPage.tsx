import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, ButtonLink, Field, Input, Notice, PageHeader, Section, Segmented, ToggleChip, ui } from '@/components/ui';
import { useActiveProgram, useProfile, useReminders } from '@/app/hooks';
import { setPrefs, usePrefs, type ThemePref } from '@/app/prefs';
import { content, CONTENT_VERSION } from '@/content/index';
import { setReminders } from '@/db/db';
import { clearAll, exportBackup, importBackup } from '@/db/repo';
import { buildIcs, downloadIcs } from '@/lib/ics';
import { permission, requestPermission } from '@/lib/reminders';
import type { Reminders } from '@/domain/user';
import { LanguageSwitch } from './LanguageSwitch';

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const prefs = usePrefs();
  const stored = useReminders();
  const profile = useProfile();
  const program = useActiveProgram();
  const reminders: Reminders = stored ?? { enabled: false, days: [1, 3, 5], time: '18:00' };
  const [perm, setPerm] = useState(permission());
  const [message, setMessage] = useState<{ tone: 'info' | 'danger'; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const saveRem = (patch: Partial<Reminders>) => void setReminders({ ...reminders, ...patch });
  const dayName = (d: number) => new Date(2024, 0, 7 + d).toLocaleDateString(i18n.language, { weekday: 'short' });

  const exportIcs = () => {
    if (!reminders.days.length) return;
    const minutes = profile?.minutes ?? 30;
    downloadIcs(
      buildIcs({
        days: reminders.days,
        time: reminders.time,
        durationMin: minutes,
        summary: t('settings.icsSummary'),
        description: t('settings.icsDescription', { title: program?.title ?? t('app.name') }),
        url: window.location.origin,
        alarmMinutesBefore: 10,
      }),
    );
  };

  const exportData = async () => {
    const data = await exportBackup();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `socle-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const importData = async (file: File) => {
    try {
      await importBackup(JSON.parse(await file.text()));
      setMessage({ tone: 'info', text: t('settings.importOk') });
    } catch {
      setMessage({ tone: 'danger', text: t('settings.importError') });
    }
  };

  return (
    <>
      <PageHeader title={t('nav.settings')} />

      <Section title={t('settings.language')}>
        <LanguageSwitch />
      </Section>

      <Section title={t('settings.theme')}>
        <Segmented<ThemePref>
          label={t('settings.theme')}
          value={prefs.theme}
          onChange={(v) => setPrefs({ theme: v })}
          options={(['system', 'light', 'dark'] as const).map((v) => ({ value: v, label: t(`settings.themes.${v}`) }))}
        />
        <div className={ui.stack} style={{ marginTop: 'var(--space-3)' }}>
          <Segmented<'lines' | 'plain'>
            label={t('settings.paper')}
            value={prefs.paperLines ? 'lines' : 'plain'}
            onChange={(v) => setPrefs({ paperLines: v === 'lines' })}
            options={[
              { value: 'lines', label: t('settings.paperLines') },
              { value: 'plain', label: t('settings.paperPlain') },
            ]}
          />
          <p className={ui.muted}>{t('settings.paperHint')}</p>
        </div>
      </Section>

      <Section title={t('settings.reminders')} id="reminders">
        <div className={ui.stack}>
          <Notice>{t('settings.remindersLimits')}</Notice>
          <label className={ui.row}>
            <input type="checkbox" checked={reminders.enabled} onChange={(e) => saveRem({ enabled: e.target.checked })} style={{ width: 22, height: 22 }} />
            <span>{t('settings.remindersEnable')}</span>
          </label>
          <Field label={t('settings.days')}>
            <div className={ui.chips}>
              {DAY_ORDER.map((d) => (
                <ToggleChip
                  key={d}
                  pressed={reminders.days.includes(d)}
                  onToggle={() => saveRem({ days: reminders.days.includes(d) ? reminders.days.filter((x) => x !== d) : [...reminders.days, d] })}
                >
                  {dayName(d)}
                </ToggleChip>
              ))}
            </div>
          </Field>
          <Field label={t('settings.time')} htmlFor="rem-time">
            <Input id="rem-time" type="time" value={reminders.time} onChange={(e) => e.target.value && saveRem({ time: e.target.value })} style={{ maxWidth: 160 }} />
          </Field>
          <div className={ui.row}>
            {perm !== 'granted' && perm !== 'unsupported' && (
              <Button variant="secondary" icon="bell" onClick={() => void requestPermission().then(setPerm)}>
                {t('settings.allowNotifications')}
              </Button>
            )}
            <Button icon="calendar" disabled={!reminders.days.length} onClick={exportIcs}>
              {t('settings.exportIcs')}
            </Button>
          </div>
          <p className={ui.muted}>{t(`settings.permission.${perm}`)}</p>
        </div>
      </Section>

      <Section title={t('settings.session')}>
        <div className={ui.stack}>
          <label className={ui.row}>
            <input type="checkbox" checked={prefs.tempoSound} onChange={(e) => setPrefs({ tempoSound: e.target.checked })} style={{ width: 22, height: 22 }} />
            {t('settings.sound')}
          </label>
          <label className={ui.row}>
            <input type="checkbox" checked={prefs.vibration} onChange={(e) => setPrefs({ vibration: e.target.checked })} style={{ width: 22, height: 22 }} />
            {t('settings.vibration')}
          </label>
        </div>
      </Section>

      <Section title={t('settings.profile')}>
        <div className={ui.row}>
          <ButtonLink to="/setup" variant="secondary" icon="edit">
            {profile ? t('home.editProfile') : t('home.athleteCta')}
          </ButtonLink>
          <ButtonLink to="/pro" variant="ghost" icon="pro">
            {t('home.proMode')}
          </ButtonLink>
        </div>
      </Section>

      <Section title={t('settings.data')}>
        <div className={ui.stack}>
          <p className={ui.muted}>{t('settings.dataHelp')}</p>
          {message && <Notice tone={message.tone}>{message.text}</Notice>}
          <div className={ui.row}>
            <Button variant="secondary" icon="download" onClick={() => void exportData()}>
              {t('settings.export')}
            </Button>
            <Button variant="secondary" icon="upload" onClick={() => fileRef.current?.click()}>
              {t('settings.import')}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f && confirm(t('settings.importConfirm'))) void importData(f);
                e.target.value = '';
              }}
            />
            <Button
              variant="danger"
              icon="trash"
              onClick={() => {
                if (confirm(t('settings.resetConfirm'))) void clearAll().then(() => setMessage({ tone: 'info', text: t('settings.resetDone') }));
              }}
            >
              {t('settings.reset')}
            </Button>
          </div>
        </div>
      </Section>

      <Section title={t('settings.about')}>
        <p>
          <Link to="/disclaimer">{t('nav.disclaimer')}</Link> · <Link to="/bibliography">{t('nav.bibliography')}</Link>
        </p>
        <p className={ui.muted}>
          {t('settings.version', {
            app: __APP_VERSION__,
            content: CONTENT_VERSION,
            exercises: content.exercises.length,
            pathologies: content.pathologies.length,
            references: content.references.length,
          })}
        </p>
      </Section>
    </>
  );
}
