import { describe, expect, it } from 'vitest';
import { reminderDue } from './reminders';

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
});
