import { expect, test, type Page } from '@playwright/test';
import { start } from './helpers';

/**
 * Mode praticien, paramètres d'un exercice : ouverture à l'ajout, saisie libre au clavier,
 * validation au moment de « Valider », valeurs relues à l'identique par le patient.
 */
async function newProgramWith(page: Page, search: string) {
  await start(page, '/pro');
  await page.getByRole('button', { name: 'Nouveau programme' }).click();
  await page.getByLabel('Titre').fill('Paramètres');
  await page.getByRole('button', { name: 'Ajouter un exercice' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('searchbox').fill(search);
  await dialog.getByRole('button', { name: 'Ajouter' }).first().click();
}

test('l’exercice ajouté ouvre ses paramètres, curseur dans « Séries »', async ({ page }) => {
  await newProgramWith(page, 'squat espagnol');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('ol li button[aria-expanded]').last()).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByLabel('Séries')).toBeFocused();
});

test('chaque champ s’efface et se retape librement', async ({ page }) => {
  // Pied court, niveau 1 : 3 × 10 × 5 s par côté, repos 30 s (répétitions et maintien).
  await newProgramWith(page, 'pied court');
  const fields: [string, string][] = [
    ['Séries', '4'],
    ['Répétitions (minimum)', '12'],
    ['Répétitions (maximum)', '15'],
    ['Maintien (s)', '30'],
    ['Repos (s)', '45'],
  ];
  for (const [label, value] of fields) {
    const input = page.getByLabel(label, { exact: true });
    await input.fill('');
    await expect(input, `${label} vidé`).toHaveValue('');
    await input.pressSequentially(value);
    await expect(input, `${label} retapé`).toHaveValue(value);
  }
});

test('un champ vide ou à 0 bloque « Valider » avec un message sous le champ', async ({ page }) => {
  await newProgramWith(page, 'pied court');
  await page.getByLabel('Séries').fill('');
  await page.getByLabel('Répétitions (minimum)').fill('0');
  await page.getByRole('button', { name: 'Valider' }).click();

  const editorOpen = page.locator('ol li button[aria-expanded="true"]');
  await expect(editorOpen).toHaveCount(1);
  await expect(page.getByText('Indiquez une valeur supérieure à 0')).toHaveCount(2);
  await expect(page.getByLabel('Séries')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Séries')).toBeFocused();

  await page.getByLabel('Séries').fill('5');
  await page.getByLabel('Répétitions (minimum)').fill('6');
  await page.getByLabel('Répétitions (maximum)').fill('8');
  await page.getByRole('button', { name: 'Valider' }).click();
  await expect(editorOpen).toHaveCount(0);
  await expect(page.getByText('Indiquez une valeur supérieure à 0')).toHaveCount(0);
  await expect(page.locator('ol li').first()).toContainText('5 × 6–8 × 5 s');
});

test('les valeurs saisies passent dans le lien et dans la séance du patient', async ({ page, browser, baseURL }) => {
  await newProgramWith(page, 'pied court');
  await page.getByLabel('Séries').fill('4');
  await page.getByLabel('Répétitions (minimum)').fill('12');
  await page.getByLabel('Répétitions (maximum)').fill('12');
  await page.getByLabel('Maintien (s)').fill('8');
  await page.getByLabel('Repos (s)').fill('0');
  await page.getByRole('button', { name: 'Valider' }).click();

  await page.getByRole('button', { name: 'Générer le lien' }).click();
  const link = await page.getByRole('textbox', { name: 'Lien de partage' }).inputValue();
  expect(link).toMatch(/#share=1\./);

  const other = await browser.newContext({ baseURL });
  const patient = await other.newPage();
  await start(patient, link.replace(/^https?:\/\/[^/]+/, ''));
  await patient.getByRole('button', { name: 'Enregistrer sur cet appareil' }).click();
  await expect(patient.getByRole('heading', { name: 'Paramètres', level: 1 })).toBeVisible();
  await expect(patient.getByText(/^4 × 12 × 8 s/).first()).toBeVisible();
  await patient.getByRole('link', { name: 'Commencer' }).first().click();
  await expect(patient.getByRole('heading', { name: 'Pied court (short foot)', level: 1 })).toBeVisible();
  await expect(patient.getByText(/^Série 1 sur 4/)).toBeVisible();
  await expect(patient.getByText(/rép\. 1 \/ 12/)).toBeVisible();
  await other.close();
});
