import { Language, useLanguage, useLanguageContext, useUserContext } from '@dfx.swiss/react';
import i18n from 'i18next';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppParams } from '../hooks/app-params.hook';
import { useStore } from '../hooks/store.hook';

interface SettingsInterface {
  availableLanguages: Language[];
  language?: Language;
  changeLanguage: (language: Language) => void;
  translate: (key: string, defaultValue: string, interpolation?: Record<string, string | number>) => string;
}

const SettingsContext = createContext<SettingsInterface>(undefined as any);

export function useSettingsContext(): SettingsInterface {
  return useContext(SettingsContext);
}

export function SettingsContextProvider(props: PropsWithChildren): JSX.Element {
  const { languages } = useLanguageContext();
  const { getDefaultLanguage } = useLanguage();
  const { user, changeLanguage: changeUserLanguage } = useUserContext();
  const { language: storedLanguage } = useStore();
  const { lang } = useAppParams();

  const [language, setLanguage] = useState<Language>();
  const { t } = useTranslation();

  const availableLanguages = languages?.filter((l) => ['DE', 'EN'].includes(l.symbol)) ?? [];

  useEffect(() => {
    const customLanguage = user?.language.symbol ?? lang?.toUpperCase() ?? storedLanguage.get();
    const newAppLanguage =
      availableLanguages?.find((l) => l.symbol === customLanguage) ?? getDefaultLanguage(availableLanguages);

    newAppLanguage && newAppLanguage.id !== language?.id && changeAppLanguage(newAppLanguage);
  }, [user, lang, languages]);

  function changeAppLanguage(language: Language) {
    setLanguage(language);
    i18n.changeLanguage(language.symbol.toLowerCase());
    storedLanguage.set(language.symbol);
  }

  function changeLanguage(language: Language) {
    changeAppLanguage(language);
    changeUserLanguage(language);
  }

  const context = useMemo(
    () => ({
      availableLanguages,
      language,
      changeLanguage,
      translate: (key: string, defaultValue: string, interpolation?: Record<string, string | number>) =>
        t([key, defaultValue].join('.'), defaultValue, interpolation),
    }),
    [availableLanguages, language, changeLanguage],
  );

  return <SettingsContext.Provider value={context}>{props.children}</SettingsContext.Provider>;
}
