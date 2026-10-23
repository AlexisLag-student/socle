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
