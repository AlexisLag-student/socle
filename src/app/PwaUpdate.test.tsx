// @vitest-environment jsdom
import { afterEach, beforeAll, expect, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { __setNeedRefresh, __updateCalls } from '@/test/pwa-register-mock';
import i18n, { initI18n } from '@/i18n';
import { PwaUpdate } from './PwaUpdate';
import { setSessionRunning } from './sessionActivity';

beforeAll(async () => {
  initI18n('fr');
  await i18n.changeLanguage('fr');
});

afterEach(() => {
  cleanup();
  act(() => {
    __setNeedRefresh(false);
    setSessionRunning(false);
  });
  __updateCalls.length = 0;
});

it('affiche le bandeau quand une nouvelle version est prête, et recharge sur demande', () => {
  render(<PwaUpdate />);
  expect(screen.queryByText('Nouvelle version disponible')).toBeNull();
  act(() => __setNeedRefresh(true));
  expect(screen.getByRole('status')).toHaveTextContent('Nouvelle version disponible');
  fireEvent.click(screen.getByRole('button', { name: 'Recharger' }));
  expect(__updateCalls).toEqual([true]);
});

it('« Plus tard » masque le bandeau sans recharger', () => {
  render(<PwaUpdate />);
  act(() => __setNeedRefresh(true));
  fireEvent.click(screen.getByRole('button', { name: 'Plus tard' }));
  expect(screen.queryByText('Nouvelle version disponible')).toBeNull();
  expect(__updateCalls).toEqual([]);
});

it('attend la fin de la séance guidée pour afficher le bandeau', () => {
  render(<PwaUpdate />);
  act(() => {
    setSessionRunning(true);
    __setNeedRefresh(true);
  });
  expect(screen.queryByText('Nouvelle version disponible')).toBeNull();
  act(() => setSessionRunning(false));
  expect(screen.getByText('Nouvelle version disponible')).toBeInTheDocument();
});

it('existe en anglais', async () => {
  await act(() => i18n.changeLanguage('en'));
  render(<PwaUpdate />);
  act(() => __setNeedRefresh(true));
  expect(screen.getByText('New version available')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Later' })).toBeInTheDocument();
  await act(() => i18n.changeLanguage('fr'));
});
