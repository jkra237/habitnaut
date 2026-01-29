import { useFlowNautStore } from '@/store/flownaut-store';
import { translations, type SupportedLanguage, type Translations } from '@/lib/i18n/translations';

export function useTranslations(): Translations {
  const language = useFlowNautStore((s) => s.preferences.language) as SupportedLanguage;
  return translations[language] || translations.en;
}

export function useLanguage(): SupportedLanguage {
  const language = useFlowNautStore((s) => s.preferences.language) as SupportedLanguage;
  return language || 'en';
}

export function useSetLanguage() {
  const updatePreferences = useFlowNautStore((s) => s.updatePreferences);
  return (language: SupportedLanguage) => updatePreferences({ language });
}
