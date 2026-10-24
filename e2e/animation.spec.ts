import { expect, test, type Locator, type Page } from '@playwright/test';
import { createAthleteProgram, start } from './helpers';

/** Empreinte de la pose affichée : transformations de tous les segments du personnage. */
const pose = (fig: Locator) => fig.evaluate((el) => Array.from(el.querySelectorAll('g[transform]'), (g) => g.getAttribute('transform')).join('|'));

async function expectMoving(fig: Locator) {
  const a = await pose(fig);
  await expect.poll(() => pose(fig), { timeout: 3000 }).not.toBe(a);
}

async function expectStill(page: Page, fig: Locator) {
  const a = await pose(fig);
  await page.waitForTimeout(500);
  expect(await pose(fig)).toBe(a);
}

test('fiche exercice : l’animation joue toute seule, la pause et la vitesse fonctionnent', async ({ page }) => {
  await start(page, '/library/squat');
  const fig = page.getByRole('img', { name: 'Animation du mouvement : Squat' });
  await expect(fig).toBeVisible();
  await expectMoving(fig);

  const pause = page.getByRole('button', { name: 'Mettre l’animation en pause' });
  const box = await pause.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await pause.click();
  await expectStill(page, fig);

  await page.getByRole('button', { name: 'Lire l’animation' }).click();
  await expectMoving(fig);
  await page.getByRole('button', { name: '0,5×' }).click();
  await expect(page.getByRole('button', { name: '0,5×' })).toHaveAttribute('aria-pressed', 'true');
  await expectMoving(fig);
  // Le schéma musculaire reste affiché sous l’animation.
  await expect(page.getByRole('heading', { name: 'Muscles travaillés' })).toBeAttached();
});

test('fiche : choix du niveau et du matériel de l’animation, sans changer la progression', async ({ page }) => {
  await start(page, '/library/squat');
  const fig = page.getByRole('img', { name: 'Animation du mouvement : Squat' });
  await expect(fig).toBeVisible();
  const levels = page.getByRole('group', { name: 'Niveau' });
  await expect(levels.getByRole('button', { name: '1' })).toHaveAttribute('aria-pressed', 'true');
  await levels.getByRole('button', { name: '4' }).click();
  await expect(page.getByText('Niveau 4 : Squat chargé, force')).toBeVisible();
  // Niveau lesté : seules les variantes avec charge sont proposées.
  const equipment = page.getByRole('group', { name: 'Matériel' });
  await expect(equipment.getByRole('button', { name: 'Poids du corps' })).toHaveCount(0);
  await equipment.getByRole('button', { name: 'Squat à la barre' }).click();
  await expect(equipment.getByRole('button', { name: 'Squat à la barre' })).toHaveAttribute('aria-pressed', 'true');
  await expectMoving(fig);
  // Bouton de la liste des niveaux : l'animation passe au niveau 2.
  await page.getByRole('button', { name: /Voir l’animation du niveau 2/ }).click();
  await expect(levels.getByRole('button', { name: '2' })).toHaveAttribute('aria-pressed', 'true');
  // Un niveau non dessiné garde le schéma seul, avec une mention.
  await page.goto('/library/front-plank');
  await page.getByRole('group', { name: 'Niveau' }).getByRole('button', { name: '5' }).click();
  await expect(page.getByText(/Pas d’animation pour ce niveau/)).toBeVisible();
  await expect(page.getByRole('img', { name: /Animation du mouvement/ })).toHaveCount(0);
});

test('bibliothèque : aperçu des niveaux et du matériel sans ouvrir la fiche', async ({ page }) => {
  await start(page, '/library?q=squat');
  await page.getByRole('button', { name: 'Voir les niveaux et le matériel : Squat', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Squat' });
  const fig = dialog.getByRole('img', { name: 'Animation du mouvement : Squat' });
  await expect(fig).toBeVisible();
  await expectMoving(fig);
  await dialog.getByRole('group', { name: 'Niveau' }).getByRole('button', { name: '3' }).click();
  await expect(dialog.getByText('Squat gobelet', { exact: true })).toBeVisible();
  await dialog.getByRole('link', { name: 'Ouvrir la fiche' }).click();
  await expect(page.getByRole('heading', { name: 'Squat', level: 1 })).toBeVisible();
});

test('exercice non dessinable : la fiche garde le schéma musculaire seul', async ({ page }) => {
  await start(page, '/library/short-foot');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: /Animation du mouvement/ })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Muscles travaillés' })).toBeAttached();
});

test('exercice unilatéral : bouton « Changer de côté » (figure en miroir)', async ({ page }) => {
  await start(page, '/library/split-squat');
  const fig = page.getByRole('img', { name: /Animation du mouvement/ });
  await expect(fig).toBeVisible();
  const before = await fig.getAttribute('viewBox');
  await page.getByRole('button', { name: 'Changer de côté' }).click();
  await expect(page.getByRole('img', { name: /Animation du mouvement/ })).not.toHaveAttribute('viewBox', before!);
});

test('mouvements réduits : bande de poses clés, aucune lecture automatique, lecture à la demande', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await start(page, '/library/glute-bridge');
  const strip = page.getByRole('list', { name: /Poses clés du mouvement/ });
  await expect(strip).toBeVisible();
  expect(await strip.getByRole('img').count()).toBeGreaterThanOrEqual(2);
  await expect(page.getByRole('img', { name: /^Animation du mouvement/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Lire l’animation' }).click();
  const fig = page.getByRole('img', { name: /^Animation du mouvement/ });
  await expect(fig).toBeVisible();
  await expectMoving(fig);
});

test('bibliothèque : vignettes fixes, une seule animation à la fois, la fiche s’ouvre toujours', async ({ page }) => {
  await start(page, '/library');
  await page.getByRole('searchbox', { name: 'Rechercher' }).fill('squat');
  const thumbs = page.getByRole('button', { name: /^(Voir|Arrêter) le mouvement/ });
  await expect(thumbs.nth(1)).toBeVisible();
  const first = thumbs.nth(0);
  const second = thumbs.nth(1);
  const playing = page.locator('button[aria-pressed="true"][aria-label^="Arrêter le mouvement"]');
  await expect(playing).toHaveCount(0);

  await first.click();
  await expect(first).toHaveAttribute('aria-pressed', 'true');
  await expectMoving(first.getByRole('img'));
  await second.click();
  await expect(second).toHaveAttribute('aria-pressed', 'true');
  await expect(first).toHaveAttribute('aria-pressed', 'false');
  await expect(playing).toHaveCount(1);
  await expect(page).toHaveURL(/\/library(\?|$)/);

  await page.getByRole('link', { name: 'Squat', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Squat', level: 1 })).toBeVisible();
});

test('séance guidée : l’animation suit l’horloge du tempo (pause, reprise, repos)', async ({ page }) => {
  test.setTimeout(120_000);
  await createAthleteProgram(page);
  await page.getByRole('link', { name: 'Commencer' }).first().click();
  await expect(page.getByText(/Série 1 sur \d/)).toBeVisible();
  // Premier exercice animé, le schéma musculaire reste disponible.
  await expect(page.getByRole('img', { name: /Animation du mouvement/ })).toBeVisible();
  await expect(page.getByText('Schéma des muscles')).toBeVisible();
  await page.getByRole('button', { name: 'Passer l’exercice' }).click();

  const fig = page.getByRole('img', { name: 'Animation du mouvement : Montée sur pointes jambe tendue' });
  await expect(fig).toBeVisible();
  await expectMoving(fig);

  // L'indicateur de tempo et l'animation partagent la même horloge : la pause fige les deux.
  await page.getByRole('button', { name: 'Afficher le rythme' }).first().click();
  await page.getByRole('button', { name: 'Mettre l’animation en pause' }).click();
  await expectStill(page, fig);
  await page.getByRole('button', { name: 'Lire l’animation' }).click();
  await expectMoving(fig);

  // Repos : pose de départ, immobile.
  await page.getByRole('button', { name: /Série terminée/ }).click();
  await expect(page.getByText('Repos', { exact: true })).toBeVisible();
  await expectStill(page, fig);
  await page.getByRole('button', { name: 'Passer le repos' }).click();
  await expectMoving(fig);
});

test('lecture fluide : chaque image de l’animation reste très en dessous de 50 ms, processeur ralenti ×4', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Ralentissement du processeur via le protocole Chromium');
  type W = { __frames: number[]; __longTasks: number[] };
  // Durée de chaque image d'animation (rappels requestAnimationFrame : seul le lecteur en utilise sur cette page).
  await page.addInitScript(() => {
    const w = window as unknown as W;
    w.__frames = [];
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) =>
      raf((t) => {
        const s = performance.now();
        cb(t);
        w.__frames.push(performance.now() - s);
      });
  });
  await start(page, '/library/countermovement-jump');
  const fig = page.getByRole('img', { name: /Animation du mouvement/ });
  await expect(fig).toBeVisible();
  // On mesure la lecture seule : le chargement de la page (schémas musculaires, polices) est terminé.
  await page.waitForTimeout(2000);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.evaluate(() => {
    const w = window as unknown as W;
    w.__frames = [];
    w.__longTasks = [];
    new PerformanceObserver((list) => w.__longTasks.push(...list.getEntries().map((e) => e.duration))).observe({ type: 'longtask' });
  });
  await page.waitForTimeout(3000);
  const { frames, longTasks } = await page.evaluate(() => {
    const w = window as unknown as W;
    return { frames: w.__frames, longTasks: w.__longTasks };
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  const sorted = [...frames].sort((a, b) => a - b);
  const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
  const report = `${frames.length} images, p95 ${p95.toFixed(2)} ms, max ${(sorted.at(-1) ?? 0).toFixed(2)} ms, longues tâches de la page : ${JSON.stringify(longTasks.map(Math.round))}`;
  console.log(`Performance de l’animation (CPU ×4) : ${report}`);
  expect(frames.length, report).toBeGreaterThan(60);
  expect(sorted.at(-1) ?? 0, report).toBeLessThan(50);
});
