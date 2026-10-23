/**
 * Captures d'écran de contrôle visuel (refonte « cahier »), comparées à design/captures/.
 * Hors de la suite normale : `npm run screens` (serveur de développement, données préparées dans la page).
 * Résultats dans design/rendus/.
 */
import { test, type Page } from '@playwright/test';

type Theme = 'light' | 'dark';
const OUT = 'design/rendus';

/** Prépare un profil, un programme « semaine 3 », deux séances faites cette semaine et la séance du jour entamée. */
async function seed(page: Page, { lang = 'fr', theme = 'light' as Theme } = {}) {
  await page.addInitScript(
    ([l, th]) => {
      localStorage.setItem('socle.lang', l);
      localStorage.setItem('socle.prefs.v1', JSON.stringify({ disclaimerAccepted: true, theme: th, mode: 'athlete' }));
    },
    [lang, theme] as const,
  );
  await page.goto('/');
  await page.evaluate(async (title) => {
    // Modules sources servis par Vite (serveur de développement) : non typés ici.
    const load = (path: string) => import(/* @vite-ignore */ path);
    const repo = await load('/src/db/repo.ts');
    const { db } = await load('/src/db/db.ts');
    const { content, CONTENT_VERSION } = await load('/src/content/index.ts');
    type Item = { exerciseId: string; variantId: string; level: number; dosage: { sets: number; reps?: [number, number] } };
    type Session = { key: string; items: Item[] };
    await repo.clearAll();
    const profile = await repo.saveProfile({
      sports: ['run'],
      objectives: ['prevention', 'pain'],
      perfGoals: [],
      pathologies: [{ id: 'medial-tibial-stress-syndrome', phase: 'rebuild' }],
      equipment: ['bodyweight', 'band', 'dumbbells', 'step'],
      sessionsPerWeek: 2,
      minutes: 30,
    });
    const { program }: { program: { id: string; sessions: Session[] } } = await repo.regenerateProgram(profile, content, { title, contentVersion: CONTENT_VERSION });
    const day = 864e5;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const monday = today - ((now.getDay() + 6) % 7) * day;
    await db.programs.put({ ...program, createdAt: monday - 14 * day });

    const entry = (it: Item, feedback: 'easy' | 'ok', loadKg?: number) => ({
      exerciseId: it.exerciseId,
      variantId: it.variantId,
      level: it.level,
      feedback,
      sets: Array.from({ length: it.dosage.sets }, () => ({ done: true, reps: it.dosage.reps?.[1], ...(loadKg ? { loadKg } : {}) })),
    });
    const [A, B] = program.sessions;
    const at = (t: number, h: number) => t + h * 3600e3;
    if (monday < today) {
      await repo.saveLog({ id: 'l1', programId: program.id, sessionKey: 'A', startedAt: at(monday, 18), finishedAt: at(monday, 18.5), entries: A!.items.map((i) => entry(i, 'ok')) });
    }
    if (B && monday + 2 * day < today) {
      await repo.saveLog({ id: 'l2', programId: program.id, sessionKey: 'B', startedAt: at(monday + 2 * day, 18), finishedAt: at(monday + 2 * day, 18.5), entries: B.items.map((i) => entry(i, 'ok')) });
    }
    // Séance du jour entamée : deux exercices faits.
    await repo.saveLog({ id: 'l3', programId: program.id, sessionKey: 'A', startedAt: Date.now() - 600e3, entries: [entry(A!.items[0]!, 'easy'), entry(A!.items[1]!, 'ok', 12)] });
    const first = A!.items[0]!;
    await db.exerciseStates.put({
      exerciseId: first.exerciseId,
      level: first.level,
      variantId: first.variantId,
      feedback: ['easy', 'easy'],
      pending: { kind: 'level-up', fromLevel: first.level, toLevel: first.level + 1, createdAt: Date.now() },
      updatedAt: Date.now(),
    });
    await db.exerciseStates.put({ exerciseId: A!.items[1]!.exerciseId, level: A!.items[1]!.level, variantId: A!.items[1]!.variantId, loadKg: 12, feedback: ['ok'], updatedAt: Date.now() });
  }, lang === 'fr' ? 'Prévention périostite' : 'Shin splints prevention');
}

async function shot(page: Page, path: string, name: string, opts: { full?: boolean } = {}) {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
  await page.locator('main h1, main h2').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: opts.full ?? false });
}

const SCREENS: [string, string][] = [
  ['/', '1-accueil'],
  ['/program', '2-programme'],
  ['/library/eccentric-heel-drop', '3-fiche-exercice'],
  ['/session/A', '4-seance-guidee'],
  ['/library', '5-exercices'],
  ['/history', '6-carnet'],
  ['/settings', '7-reglages'],
  ['/pathologies/medial-tibial-stress-syndrome', '8-pathologie'],
  ['/pro', '9-praticien'],
  ['/bibliography', '10-bibliographie'],
];

test.describe('mobile 390 × 844', () => {
  test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  test('clair FR', async ({ page }) => {
    await seed(page);
    for (const [p, n] of SCREENS) await shot(page, p, `mobile-${n}`);
    for (const [p, n] of SCREENS.slice(0, 3)) await shot(page, p, `mobile-${n}-complet`, { full: true });
    // Suite de la fiche exercice, écran par écran (lisible sans redimensionner la capture pleine page).
    await page.goto('/library/eccentric-heel-drop');
    await page.getByRole('heading', { level: 1 }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    for (let i = 1; i <= 4; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * 700);
      await page.screenshot({ path: `${OUT}/mobile-3-fiche-exercice-p${i + 1}.png` });
    }
  });
  test('sombre FR', async ({ page }) => {
    await seed(page, { theme: 'dark' });
    for (const [p, n] of SCREENS.slice(0, 7)) await shot(page, p, `sombre-${n}`);
  });
  test('clair EN', async ({ page }) => {
    await seed(page, { lang: 'en' });
    for (const [p, n] of SCREENS.slice(0, 7)) await shot(page, p, `en-${n}`);
  });
  test('parcours et avertissement', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('socle.lang', 'fr'));
    await shot(page, '/', 'mobile-0-avertissement');
    await page.evaluate(() => localStorage.setItem('socle.prefs.v1', JSON.stringify({ disclaimerAccepted: true })));
    await shot(page, '/setup', 'mobile-11-parcours');
  });
});

test.describe('tablette et ordinateur', () => {
  test('tablette 768', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await seed(page);
    for (const [p, n] of SCREENS.slice(0, 4)) await shot(page, p, `tablette-${n}`);
  });
  test('ordinateur 1280', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 860 });
    await seed(page);
    for (const [p, n] of SCREENS.slice(0, 5)) await shot(page, p, `bureau-${n}`);
  });
  test('impression de la fiche', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium');
    await seed(page);
    await page.goto('/program');
    await page.waitForLoadState('networkidle');
    await page.emulateMedia({ media: 'print' });
    await page.screenshot({ path: `${OUT}/impression-programme.png`, fullPage: true });
    await page.pdf({ path: `${OUT}/impression-programme.pdf`, format: 'A4' });
  });
});
