// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import i18n, { initI18n } from '@/i18n';
import SettingsPage from './SettingsPage';

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8')) as { version: string };

beforeAll(async () => {
  initI18n('fr');
  await i18n.changeLanguage('fr');
});

it('affiche la version de package.json et le lien Nouveautés', () => {
  render(
    <MemoryRouter>
      <SettingsPage />
    </MemoryRouter>,
  );
  expect(screen.getByTestId('app-version')).toHaveTextContent(`Version ${pkg.version}`);
  expect(screen.getByRole('link', { name: 'Nouveautés' })).toHaveAttribute('href', '/changelog');
});
