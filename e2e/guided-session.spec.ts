import { expect, test } from '@playwright/test';
import { createAthleteProgram } from './helpers';

test('séance guidée : séries, minuteur, retour de séance, historique', async ({ page }) => {
  await createAthleteProgram(page);
  await page.getByRole('link', { name: 'Commencer' }).first().click();
  await expect(page.getByText(/Série 1 sur \d/)).toBeVisible();

  for (let guard = 0; guard < 80; guard++) {
    if (await page.getByRole('heading', { name: 'Séance terminée !' }).isVisible().catch(() => false)) break;
    const facile = page.getByRole('button', { name: /Facile/ });
    if (await facile.isVisible().catch(() => false)) {
      await facile.click();
      continue;
    }
    const setDone = page.getByRole('button', { name: 'Série terminée' });
    if (await setDone.isVisible().catch(() => false)) {
      await setDone.click();
      const skipRest = page.getByRole('button', { name: 'Passer le repos' });
      if (await skipRest.isVisible().catch(() => false)) await skipRest.click();
      continue;
    }
    // Exercice en maintien : on démarre le minuteur puis on termine l'exercice
    const startHold = page.getByRole('button', { name: 'Démarrer' });
    if (await startHold.isVisible().catch(() => false)) {
      await startHold.click();
      await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
      await page.getByRole('button', { name: 'Terminer l’exercice' }).click();
    }
  }
  await expect(page.getByRole('heading', { name: 'Séance terminée !' })).toBeVisible();
  await page.getByRole('button', { name: 'Voir mon historique' }).click();
  await expect(page.getByText('séances au total')).toBeVisible();
  await expect(page.getByRole('img', { name: /Calendrier des 16 dernières semaines/ })).toBeVisible();
});
