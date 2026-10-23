/**
 * Préférences légères (localStorage) : thème, avertissement accepté, son du tempo, brouillon praticien courant.
 * Toutes les lectures/écritures sont protégées : l'app fonctionne même si le stockage est indisponible.
 */
import { useSyncExternalStore } from 'react';

export type ThemePref = 'system' | 'light' | 'dark';

export interface Prefs {
  theme: ThemePref;
  disclaimerAccepted: boolean;
  tempoSound: boolean;
  vibration: boolean;
  /** Dernier mode choisi à l'accueil. */
  mode: 'athlete' | 'pro' | null;
  /** Nom du praticien (pré-rempli dans ses programmes). */
  proName: string;
  /** Brouillon praticien en cours d'édition (cible de « Ajouter au brouillon »). */
  proDraftId: string | null;
  /** Papier ligné Seyès (sinon papier uni). */
  paperLines: boolean;
}

const KEY = 'socle.prefs.v1';
const DEFAULTS: Prefs = { theme: 'system', disclaimerAccepted: false, tempoSound: false, vibration: true, mode: null, proName: '', proDraftId: null, paperLines: true };

function read(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

let current: Prefs = typeof window === 'undefined' ? DEFAULTS : read();
const listeners = new Set<() => void>();

export function getPrefs(): Prefs {
  return current;
}

export function setPrefs(patch: Partial<Prefs>): void {
  current = { ...current, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    /* stockage indisponible : la préférence reste en mémoire pour la session */
  }
  if (patch.theme) applyTheme(current.theme);
  if (patch.paperLines !== undefined) applyPaper(current.paperLines);
  listeners.forEach((l) => l());
}

export function usePrefs(): Prefs {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => DEFAULTS,
  );
}

/** Applique le thème : `data-theme` forcé, ou suit le système. */
export function applyTheme(theme: ThemePref): void {
  const root = document.documentElement;
  if (theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', dark ? '#161b2e' : '#fbfaf6'));
}

/** Papier ligné (Seyès) ou uni : `data-paper="plain"` sur la racine. */
export function applyPaper(lines: boolean): void {
  if (lines) document.documentElement.removeAttribute('data-paper');
  else document.documentElement.setAttribute('data-paper', 'plain');
}
