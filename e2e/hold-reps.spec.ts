import { expect, test, type Locator, type Page } from '@playwright/test';
import { start } from './helpers';

/**
 * Exercice « répétitions × maintien » (pied court, niveau 1 : 3 × 10 × 5 s par côté, repos 30 s) :
 * chaque répétition est un maintien, suivi d'un court repos, jusqu'au quota ; puis côté 2, puis repos entre séries.
 * L'horloge de la page est avancée (page.clock) pour ne pas attendre les vraies durées.
 */
async function shortFootSession(page: Page) {
  await page.clock.install();
  await start(page, '/pro');
  await page.getByRole('button', { name: 'Nouveau programme' }).click();
  await page.getByLabel('Titre').fill('Pied court');
  await page.getByRole('button', { name: 'Ajouter un exercice' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('searchbox').fill('pied court');
  await dialog.getByRole('button', { name: 'Ajouter' }).first().click();
  await dialog.getByRole('button', { name: 'Fermer' }).click();
  await page.getByRole('button', { name: 'Générer le lien' }).click();
  const link = await page.getByRole('textbox', { name: 'Lien de partage' }).inputValue();
  await page.goto(link.replace(/^https?:\/\/[^/]+/, ''));
  await page.getByRole('button', { name: 'Enregistrer sur cet appareil' }).click();
  await page.getByRole('link', { name: 'Commencer' }).first().click();
  await expect(page.getByRole('heading', { name: 'Pied court (short foot)', level: 1 })).toBeVisible();
  // Horloge figée : elle n'avance plus que par `runFor`, indépendamment de la durée réelle des vérifications.
  await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 1000);
}

/** Fait avancer l'horloge de la page par pas d'une seconde (React rend entre deux pas) jusqu'à ce que `target` apparaisse. */
async function runUntil(page: Page, target: Locator, maxSec: number) {
  for (let s = 0; s < maxSec; s++) {
    if (await target.isVisible()) return;
    await page.clock.runFor(1000);
  }
  await expect(target).toBeVisible();
}

test('pied court : 10 maintiens de 5 s séparés d’un repos de 5 s, puis côté 2, puis repos entre séries', async ({ page }) => {
  test.setTimeout(120_000);
  await shortFootSession(page);
  await expect(page.getByText(/^Série 1 sur 3/)).toBeVisible();
  await page.getByRole('button', { name: 'Démarrer' }).click();

  // Fin du premier maintien : repos court entre répétitions, la série continue.
  await runUntil(page, page.getByRole('timer'), 7);
  await expect(page.getByText('Ensuite : répétition 2 sur 10')).toBeVisible();
  await expect(page.getByText('Ensuite : série 2 sur 3')).toHaveCount(0);
  await expect(page.getByRole('checkbox', { name: 'Série 1' })).not.toBeChecked();

  // Le maintien suivant démarre seul après le repos.
  await runUntil(page, page.getByText('Série 1 sur 3 · côté 1 · rép. 2 / 10'), 7);
  await expect(page.getByText('Tenez la position…')).toBeVisible();

  // Répétitions 2 à 10 (9 maintiens et 8 repos, ~85 s) : côté 1 terminé, le côté 2 attend son départ.
  await runUntil(page, page.getByText('Série 1 sur 3 · côté 2 · rép. 1 / 10'), 110);
  await expect(page.getByRole('button', { name: 'Démarrer' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'Série 1' })).not.toBeChecked();

  // Côté 2 complet (10 maintiens, 9 repos) : la série est validée, repos entre séries.
  await page.getByRole('button', { name: 'Démarrer' }).click();
  await runUntil(page, page.getByText('Ensuite : série 2 sur 3'), 120);
  await expect(page.getByRole('checkbox', { name: 'Série 1' })).toBeChecked();
  await page.getByText('Noter répétitions et charges').click();
  await expect(page.getByRole('spinbutton', { name: 'répétitions' }).first()).toHaveValue('10');
});
