import { expect, test } from '@playwright/test';
import { createAthleteProgram } from './helpers';

/**
 * 5 séances / 1 h : quota de répétitions au rythme, repos entre séries et entre exercices.
 * L'horloge de la page est avancée (page.clock) pour ne pas attendre les vraies durées.
 * Séance A du profil : montée sur pointes genou fléchi, 3 × 12–15 par côté, tempo 2-0-2 (4 s par répétition).
 */
test('5 séances d’1 h : quota atteint, repos guidé entre les exercices, séance menée au bout', async ({ page }) => {
  test.setTimeout(180_000);
  await page.clock.install();
  await createAthleteProgram(page, { perWeek: 5, duration: '1 h' });
  for (const key of ['A', 'B', 'C', 'D', 'E']) await expect(page.getByRole('heading', { name: new RegExp(`^Séance ${key}`) })).toBeVisible();
  await expect(page.getByText(/5 séances par semaine/)).toBeVisible();

  await page.getByRole('link', { name: 'Commencer' }).first().click();
  await expect(page.getByRole('heading', { name: 'Montée sur pointes genou fléchi', level: 1 })).toBeVisible();

  // Rythme affiché : le compteur monte jusqu'au quota (15) et jamais au-delà.
  await page.getByRole('button', { name: 'Afficher le rythme' }).first().click();
  await page.clock.fastForward(58_500);
  await expect(page.getByText(/répétition 15 \/ 15 · côté 1/)).toBeVisible();
  await page.clock.fastForward(2_000);
  await expect(page.getByRole('button', { name: 'Côté 2 · Démarrer' })).toBeVisible();
  await expect(page.getByText('Côté 1 terminé : changez de côté.')).toBeVisible();
  await expect(page.getByText(/répétition 15 \/ 15/)).toBeVisible();
  await expect(page.getByText(/répétition 16/)).toHaveCount(0);

  // Côté 2 au quota : la série est validée seule, le repos entre séries démarre.
  await page.getByRole('button', { name: 'Côté 2 · Démarrer' }).click();
  await page.clock.fastForward(61_000);
  await expect(page.getByText('Ensuite : série 2 sur 3')).toBeVisible();
  await expect(page.getByRole('timer')).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'Série 1' })).toBeChecked();

  // Répétitions notées : plafonnées au quota.
  await page.getByText('Noter répétitions et charges').click();
  const reps = page.getByRole('spinbutton', { name: 'répétitions' }).first();
  await expect(reps).toHaveValue('15');
  await expect(reps).toHaveAttribute('max', '15');
  await reps.fill('99');
  await expect(reps).toHaveValue('15');

  // Fin de l'exercice (série incomplète permise) → retour → repos entre exercices avec l'aperçu du suivant.
  await page.getByRole('button', { name: 'Passer le repos' }).click();
  await page.getByRole('button', { name: 'Terminer l’exercice' }).click();
  await page.getByRole('button', { name: 'Correct' }).click();
  await expect(page.getByText('Exercice suivant')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Montée sur pointes jambe tendue', level: 2 })).toBeVisible();
  await expect(page.getByText('Ensuite : Montée sur pointes jambe tendue')).toBeVisible();
  await expect(page.getByRole('timer')).toHaveText('1:15');
  await page.getByRole('button', { name: 'Ajouter 15 secondes de repos' }).click();
  await expect(page.getByRole('timer')).toHaveText(/1:(29|30)/);

  // Le repos se termine seul et enchaîne sur l'exercice suivant.
  await page.clock.fastForward(91_000);
  await expect(page.getByRole('heading', { name: 'Montée sur pointes jambe tendue', level: 1 })).toBeVisible();

  // Jusqu'au bout : exercices passés (sans repos), repos passés.
  for (let guard = 0; guard < 40; guard++) {
    if (await page.getByRole('heading', { name: 'Séance terminée !' }).isVisible().catch(() => false)) break;
    const skipRest = page.getByRole('button', { name: 'Passer le repos' });
    if (await skipRest.isVisible().catch(() => false)) {
      await skipRest.click({ timeout: 3000 }).catch(() => {});
      continue;
    }
    await page.getByRole('button', { name: 'Passer l’exercice' }).click({ timeout: 3000 }).catch(() => {});
  }
  await expect(page.getByRole('heading', { name: 'Séance terminée !' })).toBeVisible();
});
