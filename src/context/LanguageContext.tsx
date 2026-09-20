import React, { createContext, useContext, useState, useEffect } from 'react';
import { IndianLanguage } from '../types';
import { Translations, getTranslations, LANGUAGE_OPTIONS } from '../utils/translations';

interface LanguageContextType {
  language: IndianLanguage;
  setLanguage: (lang: IndianLanguage) => void;
  t: Translations;
  languages: typeof LANGUAGE_OPTIONS;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'gigcred_selected_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: IndianLanguage }> = ({
  children,
  initialLanguage = 'en',
}) => {
  const [language, setLanguageState] = useState<IndianLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'kn'].includes(saved)) {
        return saved as IndianLanguage;
      }
    }
    return initialLanguage;
  });

  const setLanguage = (newLang: IndianLanguage) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch (err) {
        console.warn('Could not persist language to localStorage', err);
      }
    }
  };

  const t = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGE_OPTIONS }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside LanguageProvider
    return {
      language: 'en',
      setLanguage: () => {},
      t: getTranslations('en'),
      languages: LANGUAGE_OPTIONS,
    };
  }
  return context;
};
