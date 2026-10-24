import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { createAthleteProgram, start } from './helpers';

const PAGES = ['/', '/library', '/library/squat', '/pathologies/patellofemoral-pain', '/bibliography', '/settings', '/pro'];

for (const path of PAGES) {
  test(`accessibilité ${path}`, async ({ page }) => {
    await start(page, path);
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.length} nœud(s) — ${v.nodes[0]?.target}`)).toEqual([]);
  });
}

test('accessibilité de la fiche programme', async ({ page }) => {
  await createAthleteProgram(page);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serious.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
});

test.describe('mode sombre', () => {
  for (const path of ['/', '/library', '/library/squat', '/settings', '/pro']) {
    test(`accessibilité ${path} (sombre)`, async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem('socle.prefs.v1', JSON.stringify({ disclaimerAccepted: true, theme: 'dark' })));
      await start(page, path);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.length} nœud(s) — ${v.nodes[0]?.target}`)).toEqual([]);
    });
  }
  test('accessibilité de la fiche programme (sombre)', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('socle.prefs.v1', JSON.stringify({ disclaimerAccepted: true, theme: 'dark' })));
    await createAthleteProgram(page);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
  });
});

for (const theme of ['light', 'dark'] as const) {
  test(`accessibilité de la séance guidée : quota et repos entre exercices (${theme})`, async ({ page }) => {
    await page.addInitScript((th) => localStorage.setItem('socle.prefs.v1', JSON.stringify({ disclaimerAccepted: true, theme: th })), theme);
    await createAthleteProgram(page);
    await page.getByRole('link', { name: 'Commencer' }).first().click();
    await page.getByRole('button', { name: 'Afficher le rythme' }).first().click();
    const check = async () => {
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.length} nœud(s) — ${v.nodes[0]?.target}`)).toEqual([]);
    };
    await check();
    await page.getByRole('button', { name: 'Terminer l’exercice' }).click();
    await page.getByRole('button', { name: 'Correct' }).click();
    await expect(page.getByText('Exercice suivant')).toBeVisible();
    await check();
    // Cibles tactiles d'au moins 44 px sur l'écran de repos.
    for (const name of ['Passer le repos', 'Ajouter 15 secondes de repos']) {
      const box = await page.getByRole('button', { name }).boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
      expect(box!.width).toBeGreaterThanOrEqual(44);
    }
  });
}
