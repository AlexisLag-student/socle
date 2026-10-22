// @vitest-environment jsdom
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

it('affiche le nom de l’app', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Socle' })).toBeInTheDocument();
});
