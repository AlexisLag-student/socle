import { expect, type Page } from '@playwright/test';

/** Ouvre l'app en français et accepte l'avertissement médical. */
export async function start(page: Page, path = '/') {
  await page.addInitScript(() => {
    if (!localStorage.getItem('socle.lang')) localStorage.setItem('socle.lang', 'fr');
  });
  await page.goto(path);
  const accept = page.getByRole('button', { name: 'J’ai compris, continuer' });
  if (await accept.isVisible().catch(() => false)) await accept.click();
}

/**
 * Parcours sportif complet : course, prévention + douleur, Achille portion moyenne en reconstruction, haltères,
 * 2 × 30 min par défaut (ou la disponibilité demandée, ex. `{ perWeek: 5, duration: '1 h' }`).
 */
export async function createAthleteProgram(page: Page, availability: { perWeek?: number; duration?: string } = {}) {
  await start(page, '/setup');
  await page.getByRole('radio', { name: 'Course à pied' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('checkbox', { name: /Prévention des blessures/ }).click();
  await page.getByRole('checkbox', { name: /Traiter une douleur actuelle/ }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('checkbox', { name: /Tendinopathie d’Achille \(portion moyenne\)/ }).first().click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Où en êtes-vous ?' })).toBeVisible();
  await page.getByRole('radio', { name: /^Reconstruction/ }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('checkbox', { name: /Haltères ou kettlebell/ }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  if (availability.perWeek)
    await page.getByRole('group', { name: 'Séances par semaine' }).getByRole('button', { name: String(availability.perWeek), exact: true }).click();
  if (availability.duration)
    await page.getByRole('group', { name: 'Durée d’une séance' }).getByRole('button', { name: availability.duration, exact: true }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('button', { name: 'Générer mon programme' }).click();
  await expect(page.getByRole('heading', { name: 'Mon programme', level: 1 })).toBeVisible();
}
