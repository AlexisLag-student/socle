import { describe, expect, it } from 'vitest';
import { defaultReminderDays, reminderDue } from './reminders';

const thursday18h = new Date(2026, 9, 22, 18, 30);
const r = { enabled: true, days: [4], time: '18:00' };

describe('rappels', () => {
  it('dû après l’heure choisie, le bon jour', () => expect(reminderDue(r, [], thursday18h)).toBe(true));
  it('pas avant l’heure', () => expect(reminderDue(r, [], new Date(2026, 9, 22, 17, 0))).toBe(false));
  it('pas un autre jour', () => expect(reminderDue({ ...r, days: [1] }, [], thursday18h)).toBe(false));
  it('pas désactivé', () => expect(reminderDue({ ...r, enabled: false }, [], thursday18h)).toBe(false));
  it('pas deux fois le même jour', () => expect(reminderDue({ ...r, lastNotifiedOn: '2026-10-22' }, [], thursday18h)).toBe(false));
  it('pas si la séance est déjà faite', () =>
    expect(
      reminderDue(r, [{ id: 'x', programId: 'p', sessionKey: 'A', startedAt: 0, finishedAt: new Date(2026, 9, 22, 7).getTime(), entries: [] }], thursday18h),
    ).toBe(false));

  it('gère 5 jours par semaine (lundi à samedi sauf jeudi)', () => {
    const five = { ...r, days: defaultReminderDays(5) };
    expect(five.days).toEqual([1, 2, 3, 5, 6]);
    expect(reminderDue(five, [], thursday18h)).toBe(false);
    expect(reminderDue(five, [], new Date(2026, 9, 23, 18, 30))).toBe(true); // vendredi
    expect(reminderDue(five, [], new Date(2026, 9, 24, 18, 30))).toBe(true); // samedi
  });
  it('jours par défaut selon la fréquence : dimanche libre, jamais trois jours de suite jusqu’à 4 séances', () => {
    for (const n of [1, 2, 3, 4, 5]) {
      const days = defaultReminderDays(n);
      expect(days).not.toContain(0);
      if (n <= 4) expect(days.some((d) => days.includes(d + 1) && days.includes(d + 2))).toBe(false);
    }
    expect(defaultReminderDays(5)).toHaveLength(5);
    expect(defaultReminderDays(4)).toHaveLength(4);
    expect(defaultReminderDays(undefined)).toEqual([1, 3, 5]);
  });
});
