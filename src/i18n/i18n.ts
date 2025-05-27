import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';

// Bundle resources for initial load
const resources = {
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  }
};

i18n
  // Load translation using http (for production)
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    
    // Default namespace
    defaultNS: 'translation',
    
    // Allow keys to be phrases having `:`, `.`
    keySeparator: false,
    nsSeparator: false,
    
    // Debugging (disabled in production)
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: true,
    }
  });

export default i18n;