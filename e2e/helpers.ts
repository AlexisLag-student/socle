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

/** Parcours sportif complet : course, prévention + douleur, Achille portion moyenne en reconstruction, haltères, 2 × 30 min. */
export async function createAthleteProgram(page: Page) {
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
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('button', { name: 'Générer mon programme' }).click();
  await expect(page.getByRole('heading', { name: 'Mon programme', level: 1 })).toBeVisible();
}
