import { describe, expect, it } from 'vitest';
import { buildIcs, escapeText, firstOccurrence, foldLine } from './ics';

// Mercredi 21 octobre 2026, 10:00 (heure locale)
const now = new Date(2026, 9, 21, 10, 0, 0);

describe('export .ics', () => {
  it('échappe les caractères spéciaux', () => {
    expect(escapeText('a,b;c\\d\nE')).toBe('a\\,b\\;c\\\\d\\nE');
  });

  it('plie les lignes longues à 75 octets sans casser les accents', () => {
    const line = 'DESCRIPTION:' + 'é'.repeat(100);
    const folded = foldLine(line).split('\r\n ');
    const enc = new TextEncoder();
    expect(folded.length).toBeGreaterThan(1);
    folded.forEach((l, i) => expect(enc.encode(l).length).toBeLessThanOrEqual(i === 0 ? 75 : 74));
    expect(folded.join('')).toBe(line);
  });

  it('trouve la prochaine occurrence', () => {
    expect(firstOccurrence([3], '18:30', now)).toEqual(new Date(2026, 9, 21, 18, 30)); // aujourd'hui plus tard
    expect(firstOccurrence([3], '08:00', now)).toEqual(new Date(2026, 9, 28, 8, 0)); // semaine suivante
    expect(firstOccurrence([1, 5], '07:00', now)).toEqual(new Date(2026, 9, 23, 7, 0)); // vendredi
  });

  it('produit un événement récurrent valide', () => {
    const ics = buildIcs({
      days: [1, 3, 5],
      time: '18:30',
      durationMin: 30,
      summary: 'Séance Socle',
      description: 'Séances A, B, C en alternance',
      now,
      uid: 'test@socle',
      alarmMinutesBefore: 10,
    });
    const lines = ics.split('\r\n');
    expect(lines[0]).toBe('BEGIN:VCALENDAR');
    expect(lines).toContain('RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR');
    expect(lines).toContain('DTSTART:20261021T183000');
    expect(lines).toContain('DTEND:20261021T190000');
    expect(lines).toContain('TRIGGER:-PT10M');
    expect(lines).toContain('DESCRIPTION:Séances A\\, B\\, C en alternance');
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
  });

  it('5 jours par semaine et séance d’1 h', () => {
    const lines = buildIcs({ days: [6, 1, 2, 3, 5], time: '18:30', durationMin: 60, summary: 's', description: 'd', now, uid: 'u@socle' }).split('\r\n');
    expect(lines).toContain('RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,FR,SA');
    expect(lines).toContain('DTSTART:20261021T183000');
    expect(lines).toContain('DTEND:20261021T193000');
  });

  it('refuse une liste de jours vide', () => {
    expect(() => buildIcs({ days: [], time: '18:00', durationMin: 30, summary: 's', description: 'd' })).toThrow();
  });
});
