// @vitest-environment jsdom
import { expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';
import i18n from '@/i18n';

it('affiche l’avertissement médical au premier lancement, puis l’accueil', async () => {
  await i18n.changeLanguage('fr');
  render(<App />);
  expect(await screen.findByRole('heading', { name: 'Avertissement médical' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'J’ai compris, continuer' }));
  expect(await screen.findByRole('heading', { name: 'Renforcez votre socle' }, { timeout: 5000 })).toBeInTheDocument();
});
