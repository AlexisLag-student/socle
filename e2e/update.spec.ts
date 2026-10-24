import { expect, test as base, type Page } from '@playwright/test';
import { serveDist, type DistServer } from './dist-server';
import { createAthleteProgram } from './helpers';

/** Chaque test a son propre serveur du build `dist/` (origine distincte, nouvelle version à la demande). */
const test = base.extend<{ dist: DistServer }>({
  // eslint-disable-next-line no-empty-pattern -- Playwright exige un motif déstructuré, même vide.
  dist: async ({}, provide) => {
    const server = await serveDist();
    await provide(server);
    await server.close();
  },
  baseURL: async ({ dist }, provide) => provide(dist.url),
});

/** Attend que le service worker contrôle la page (première visite : un rechargement suffit). */
async function waitForController(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  if (!(await page.evaluate(() => !!navigator.serviceWorker.controller))) await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 20_000 }).toBe(true);
}

/**
 * Simule la publication d'une nouvelle version : le service worker servi change d'octets,
 * puis l'app passe en arrière-plan et revient au premier plan (ce qui déclenche la vérification).
 */
async function publishNewVersion(page: Page, dist: DistServer) {
  dist.publishNewVersion();
  await page.evaluate(() => {
    const setVisibility = (state: DocumentVisibilityState) => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => state });
      document.dispatchEvent(new Event('visibilitychange'));
    };
    setVisibility('hidden');
    setVisibility('visible');
  });
  // La nouvelle version est installée et attend d'être activée.
  await expect.poll(() => page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration())?.waiting), { timeout: 20_000 }).toBe(true);
}

/** Nombre d'enregistrements dans les tables locales (IndexedDB). */
function countLocalData(page: Page) {
  return page.evaluate(
    () =>
      new Promise<Record<string, number>>((resolve, reject) => {
        const open = indexedDB.open('socle');
        open.onerror = () => reject(open.error);
        open.onsuccess = () => {
          const db = open.result;
          const names = ['profile', 'programs', 'logs', 'exerciseStates', 'kv'].filter((n) => db.objectStoreNames.contains(n));
          const tx = db.transaction(names, 'readonly');
          const out: Record<string, number> = {};
          for (const n of names) {
            const req = tx.objectStore(n).count();
            req.onsuccess = () => (out[n] = req.result);
          }
          tx.oncomplete = () => {
            db.close();
            resolve(out);
          };
        };
      }),
  );
}

const banner = (page: Page) => page.getByRole('status').filter({ hasText: 'Nouvelle version disponible' });

test.describe('mise à jour de l’app', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Service worker vérifié sur Chromium');
  test.skip(!!process.env.E2E_BASE_URL, 'Simule une nouvelle version à partir du build local (dist/)');

  test('bandeau « Nouvelle version disponible », rechargement sans perte de données', async ({ page, dist }) => {
    test.setTimeout(120_000);
    await createAthleteProgram(page);
    await waitForController(page);
    const before = await countLocalData(page);
    expect(before.profile).toBe(1);
    expect(before.programs).toBeGreaterThan(0);
    const prefs = await page.evaluate(() => ({ ...localStorage }));

    await publishNewVersion(page, dist);
    await expect(banner(page)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Plus tard' })).toBeVisible();

    const reloaded = page.waitForEvent('load');
    await page.getByRole('button', { name: 'Recharger' }).click();
    await reloaded;

    await expect(banner(page)).toHaveCount(0);
    await expect.poll(() => page.evaluate(async () => !(await navigator.serviceWorker.getRegistration())?.waiting)).toBe(true);
    expect(await countLocalData(page)).toEqual(before);
    expect(await page.evaluate(() => ({ ...localStorage }))).toEqual(prefs);
    await page.goto('/program');
    await expect(page.getByRole('heading', { name: 'Mon programme', level: 1 })).toBeVisible();
  });

  test('pendant une séance guidée, le bandeau attend la fin de la séance', async ({ page, dist }) => {
    test.setTimeout(120_000);
    await createAthleteProgram(page);
    await waitForController(page);
    await page.getByRole('link', { name: 'Commencer' }).first().click();
    await expect(page.getByText(/Série 1 sur \d/)).toBeVisible();
    // Deuxième exercice de la séance A : animé (montée sur pointes jambe tendue).
    await page.getByRole('button', { name: 'Passer l’exercice' }).click();
    const fig = page.getByRole('img', { name: /Animation du mouvement/ });
    await expect(fig).toBeVisible();
    // Repère posé dans la page : il disparaîtrait si l'app se rechargeait.
    await page.evaluate(() => ((window as unknown as { __sameSession: boolean }).__sameSession = true));

    await publishNewVersion(page, dist);
    // Laisse le temps au bandeau d'apparaître s'il le devait.
    await page.waitForTimeout(1500);
    await expect(banner(page)).toHaveCount(0);
    expect(await page.evaluate(() => (window as unknown as { __sameSession?: boolean }).__sameSession)).toBe(true);
    // La séance et son animation continuent avec l'ancienne version.
    const pose = () => fig.evaluate((el) => Array.from(el.querySelectorAll('g[transform]'), (g) => g.getAttribute('transform')).join('|'));
    const before = await pose();
    await expect.poll(pose, { timeout: 3000 }).not.toBe(before);
    await page.getByRole('button', { name: /Série terminée/ }).click();
    await expect(page.getByText(/Série 2 sur \d|Repos/).first()).toBeVisible();
    // Repos entre deux exercices : toujours ni bandeau ni rechargement.
    await page.getByRole('button', { name: 'Terminer l’exercice' }).click();
    await page.getByRole('button', { name: 'Correct' }).click();
    await expect(page.getByText('Exercice suivant')).toBeVisible();
    await page.waitForTimeout(500);
    await expect(banner(page)).toHaveCount(0);
    expect(await page.evaluate(() => (window as unknown as { __sameSession?: boolean }).__sameSession)).toBe(true);

    await page.getByRole('button', { name: 'Quitter la séance' }).click();
    await expect(page.getByRole('heading', { name: 'Séance terminée !' })).toBeVisible();
    await expect(banner(page)).toBeVisible();

    const logs = (await countLocalData(page)).logs;
    const reloaded = page.waitForEvent('load');
    await page.getByRole('button', { name: 'Recharger' }).click();
    await reloaded;
    expect((await countLocalData(page)).logs).toBe(logs);
    await page.goto('/history');
    await expect(page.getByText('Au total')).toBeVisible();
  });
});
