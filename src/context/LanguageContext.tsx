import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TRANSLATIONS, type Translations } from "../translations";

export type Lang = "en" | "ar";

export interface LanguageContextType {
  lang: Lang;
  isAr: boolean;
  dir: "ltr" | "rtl";
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang");
      return saved === "ar" || saved === "en" ? saved : "en";
    } catch {
      return "en";
    }
  });

  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("portfolio_lang", newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (isAr) {
      document.body.classList.add("lang-ar");
      document.body.classList.remove("lang-en");
    } else {
      document.body.classList.add("lang-en");
      document.body.classList.remove("lang-ar");
    }
  }, [lang, dir, isAr]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        isAr,
        dir,
        toggleLang,
        setLang,
        t: (TRANSLATIONS[lang] ?? TRANSLATIONS.en) as unknown as Translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
