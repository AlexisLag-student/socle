import { expect, test } from '@playwright/test';
import { start } from './helpers';

test('fonctionne hors ligne après la première visite', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'Service worker vérifié sur Chromium');
  await start(page, '/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 20_000 }).toBe(true);

  await context.setOffline(true);
  await page.goto('/library');
  await expect(page.getByRole('heading', { name: 'Exercices' })).toBeVisible();
  await page.getByRole('link', { name: /Copenhagen/ }).first().click();
  await expect(page.getByRole('heading', { name: 'Muscles travaillés' })).toBeVisible();
  await page.goto('/pathologies/achilles-midportion');
  await expect(page.getByRole('heading', { name: 'Quand consulter' })).toBeVisible();
  await context.setOffline(false);
});

test('manifeste installable', async ({ page }) => {
  const res = await page.request.get('/manifest.webmanifest');
  expect(res.ok()).toBe(true);
  const m = await res.json();
  expect(m.name).toContain('Socle');
  expect(m.display).toBe('standalone');
  expect(m.icons.some((i: { purpose?: string }) => i.purpose === 'maskable')).toBe(true);
});
