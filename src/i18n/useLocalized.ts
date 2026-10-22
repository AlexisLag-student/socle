import { useTranslation } from 'react-i18next';
import type { L } from '@/domain/schema';
import type { Lang } from '.';

/** Renvoie une fonction qui choisit la bonne langue d'un texte bilingue du contenu. */
export function useLocalized() {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'fr';
  return Object.assign((text: L | undefined) => (text ? text[lang] : ''), { lang });
}
