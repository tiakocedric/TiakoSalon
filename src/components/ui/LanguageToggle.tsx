import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from './Button';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('common.language')}
        title={t('common.language')}
      >
        <Languages className="h-5 w-5" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 animate-fade-in">
          <button
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              i18n.language === 'en' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
            }`}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              i18n.language === 'fr' ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
            }`}
            onClick={() => changeLanguage('fr')}
          >
            Français
          </button>
        </div>
      )}
    </div>
  );
}