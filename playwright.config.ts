import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
// E2E_BASE_URL=https://… : lance les tests sur un site déjà déployé (pas de serveur local).
const remote = process.env.E2E_BASE_URL;
// `npm run screens` : captures de contrôle visuel sur le serveur de développement (données préparées via les modules sources).
const screens = process.env.SOCLE_SCREENS === '1' || process.argv.some((a) => a === '--project=visual');
if (screens) process.env.SOCLE_SCREENS = '1'; // relu par les workers

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: remote ?? (screens ? 'http://localhost:5173' : `http://localhost:${PORT}`),
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] }, testIgnore: /visual\.spec/ },
    { name: 'mobile-webkit', use: { ...devices['iPhone 14'] }, testIgnore: /visual\.spec/ },
    { name: 'visual', use: { ...devices['Desktop Chrome'] }, testMatch: /visual\.spec/ },
  ],
  webServer: remote
    ? undefined
    : screens
      ? { command: 'npm run dev -- --port 5173 --strictPort', port: 5173, reuseExistingServer: true, timeout: 120_000 }
      : {
        command: `npm run preview`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
