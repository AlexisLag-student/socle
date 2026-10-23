import { expect, test } from '@playwright/test';
import { start } from './helpers';

test('changer de langue et de thème', async ({ page }) => {
  await start(page, '/settings');
  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'Dark' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Français' }).click();
  await expect(page.getByRole('heading', { name: 'Réglages' })).toBeVisible();
});

test('export calendrier .ics', async ({ page }) => {
  await start(page, '/settings');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Ajouter à mon calendrier (.ics)' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('socle-seances.ics');
});
