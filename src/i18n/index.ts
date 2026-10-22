import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './locales/fr.json';
import en from './locales/en.json';

export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const LANG_STORAGE_KEY = 'socle.lang';

export const resources = { fr: { translation: fr }, en: { translation: en } } as const;

/** Toute langue de navigateur commençant par « fr » → français ; sinon anglais. */
function toSupported(lng: string | undefined): Lang {
  return lng?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function initI18n(lng?: Lang) {
  if (i18n.isInitialized) return i18n;
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'fr',
      supportedLngs: [...LANGS],
      nonExplicitSupportedLngs: true,
      load: 'languageOnly',
      interpolation: { escapeValue: false },
      returnNull: false,
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: LANG_STORAGE_KEY,
        caches: ['localStorage'],
        convertDetectedLanguage: (l: string) => toSupported(l),
      },
    });
  i18n.on('languageChanged', (l) => {
    document.documentElement.lang = toSupported(l);
  });
  return i18n;
}

export function currentLang(): Lang {
  return toSupported(i18n.resolvedLanguage ?? i18n.language);
}

export default i18n;
