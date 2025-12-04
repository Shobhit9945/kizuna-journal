import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs px-3"
      >
        EN
      </Button>
      <Button
        variant={language === 'ja' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('ja')}
        className="text-xs px-3"
      >
        日本語
      </Button>
    </div>
  );
};
