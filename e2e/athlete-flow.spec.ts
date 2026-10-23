import { expect, test } from '@playwright/test';
import { createAthleteProgram, start } from './helpers';

test('l’avertissement médical bloque l’accès tant qu’il n’est pas accepté', async ({ page }) => {
  await page.goto('/library');
  await expect(page.getByRole('heading', { name: /Avertissement médical|Medical disclaimer/ })).toBeVisible();
  await expect(page.getByRole('navigation')).toHaveCount(0);
});

test('parcours sportif complet → programme personnalisé', async ({ page }) => {
  await createAthleteProgram(page);
  const sessions = page.locator('section[aria-labelledby^="s-"]');
  await expect(sessions).toHaveCount(2);
  for (const s of await sessions.all()) {
    const n = await s.locator('article').count();
    expect(n).toBeGreaterThanOrEqual(4);
    expect(n).toBeLessThanOrEqual(8);
  }
  // Chaque ligne du programme se déplie sur la fiche détaillée (schéma, dosage, raison).
  await page.locator('section[aria-labelledby="s-A"] li button[aria-expanded]').first().click();
  await expect(page.getByText('Pour : Tendinopathie d’Achille (portion moyenne)').first()).toBeVisible();
  await expect(page.locator('article svg[role="img"] [data-role="primary"]').first()).toBeAttached();
  await expect(page.getByRole('button', { name: 'Imprimer / PDF' })).toBeVisible();
});

test('modifier le profil régénère le programme en conservant l’historique', async ({ page }) => {
  await createAthleteProgram(page);
  await page.getByRole('link', { name: 'Modifier mon profil' }).click();
  await expect(page.getByRole('radio', { name: 'Course à pied' })).toHaveAttribute('aria-checked', 'true');
  for (let i = 0; i < 5; i++) await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('button', { name: '45 min' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Votre historique et vos niveaux acquis sont conservés.')).toBeVisible();
  await page.getByRole('button', { name: 'Mettre à jour mon programme' }).click();
  await expect(page.getByRole('heading', { name: 'Mon programme', level: 1 })).toBeVisible();
});

test('bibliothèque : recherche, filtres et références cliquables', async ({ page }) => {
  await start(page, '/library');
  await page.getByRole('searchbox').fill('nordic');
  await expect(page.getByRole('link', { name: /Nordic/ }).first()).toBeVisible();
  await page.getByRole('searchbox').fill('');
  await page.getByText('Filtres').click();
  await page.getByLabel('Niveau de preuve').selectOption('strong');
  await page.getByRole('link', { name: /Copenhagen/ }).first().click();
  await expect(page.getByRole('heading', { name: 'Niveau de preuve et références' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'PubMed' }).first()).toHaveAttribute('href', /pubmed\.ncbi\.nlm\.nih\.gov/);
});
