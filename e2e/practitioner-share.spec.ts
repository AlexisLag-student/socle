import { expect, test } from '@playwright/test';
import { start } from './helpers';

test('le lien d’un praticien s’ouvre sur un autre appareil (contexte vierge)', async ({ page, browser, baseURL }) => {
  await start(page, '/pro');
  await page.getByLabel('Nom affiché sur vos programmes').fill('Cabinet Test');
  await page.getByRole('button', { name: 'Nouveau programme' }).click();
  await page.getByLabel('Titre').fill('Genou de Mme L.');
  await page.getByLabel('Notes pour le patient').fill('Arrêtez si la douleur augmente.');

  await page.getByRole('button', { name: 'Ajouter un exercice' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('searchbox').fill('squat espagnol');
  await dialog.getByRole('button', { name: 'Ajouter' }).first().click();
  await dialog.getByRole('searchbox').fill('step');
  await dialog.getByRole('button', { name: 'Ajouter' }).first().click();
  await dialog.getByRole('button', { name: 'Fermer' }).click();
  await expect(page.locator('ol li')).toHaveCount(2);

  // Ajuster le dosage du premier exercice
  await page.locator('ol li button[aria-expanded]').first().click();
  await page.getByLabel('Séries').first().fill('4');
  await page.getByLabel('Note pour cet exercice').first().fill('Le matin');

  await page.getByRole('button', { name: 'Générer le lien' }).click();
  const link = await page.getByRole('textbox', { name: 'Lien de partage' }).inputValue();
  expect(link).toMatch(/#share=1\./);
  await expect(page.getByRole('img', { name: 'QR code du lien de partage' })).toBeVisible();

  // Autre appareil : nouveau contexte, sans aucune donnée locale
  const other = await browser.newContext({ baseURL });
  const patient = await other.newPage();
  await patient.addInitScript(() => localStorage.setItem('socle.lang', 'fr'));
  await patient.goto(link.replace(/^https?:\/\/[^/]+/, ''));
  await patient.getByRole('button', { name: 'J’ai compris, continuer' }).click();
  await expect(patient.getByRole('heading', { name: 'Genou de Mme L.' })).toBeVisible();
  await expect(patient.getByText('Envoyé par Cabinet Test')).toBeVisible();
  await expect(patient.getByText('Arrêtez si la douleur augmente.')).toBeVisible();
  await expect(patient.getByText('Le matin')).toBeVisible();
  await patient.getByRole('button', { name: 'Enregistrer sur cet appareil' }).click();
  await expect(patient.getByRole('heading', { name: 'Genou de Mme L.', level: 1 })).toBeVisible();
  await expect(patient.getByText(/^4 × /).first()).toBeVisible();
  await other.close();
});

test('un lien praticien 5 séances / 1 h s’ouvre et garde la fréquence et la durée visée', async ({ page, browser, baseURL }) => {
  await start(page, '/pro');
  await page.getByRole('button', { name: 'Nouveau programme' }).click();
  await page.getByLabel('Titre').fill('Cinq séances');
  await page.getByRole('group', { name: 'Séances par semaine' }).getByRole('button', { name: '5', exact: true }).click();
  await page.getByRole('group', { name: 'Durée visée d’une séance' }).getByRole('button', { name: '1 h', exact: true }).click();

  const addExercise = async (search: string) => {
    await page.getByRole('button', { name: 'Ajouter un exercice' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('searchbox').fill(search);
    await dialog.getByRole('button', { name: 'Ajouter' }).first().click();
    await dialog.getByRole('button', { name: 'Fermer' }).click();
  };
  await addExercise('squat espagnol');
  // Récapitulatif de durée, repos compris.
  await expect(page.getByText(/Durée estimée de la séance A : ~\d+ min, repos compris/)).toBeVisible();
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Ajouter une séance' }).click();
  await expect(page.getByRole('tab', { name: /Séance E/ })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('button', { name: 'Ajouter une séance' })).toHaveCount(0);
  await addExercise('step');

  await page.getByRole('button', { name: 'Générer le lien' }).click();
  const link = await page.getByRole('textbox', { name: 'Lien de partage' }).inputValue();
  expect(link).toMatch(/#share=2\./);

  const other = await browser.newContext({ baseURL });
  const patient = await other.newPage();
  await patient.addInitScript(() => localStorage.setItem('socle.lang', 'fr'));
  await patient.goto(link.replace(/^https?:\/\/[^/]+/, ''));
  await patient.getByRole('button', { name: 'J’ai compris, continuer' }).click();
  await expect(patient.getByRole('heading', { name: 'Cinq séances' })).toBeVisible();
  await expect(patient.getByRole('heading', { name: /^Séance E/ })).toBeVisible();
  await patient.getByRole('button', { name: 'Enregistrer sur cet appareil' }).click();
  await expect(patient.getByRole('heading', { name: 'Cinq séances', level: 1 })).toBeVisible();
  await expect(patient.getByText(/5 séances par semaine · 1 h/)).toBeVisible();
  await other.close();
});

test('un lien abîmé affiche une erreur claire', async ({ page }) => {
  await start(page, '/#share=1.abime');
  await expect(page.getByText(/incomplet ou abîmé|n’est pas valide/)).toBeVisible();
});
