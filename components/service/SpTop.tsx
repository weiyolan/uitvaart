"use client";

import Link from "next/link";
import type { Lang } from "@/lib/content";
import { LANGS } from "@/lib/content";
import type { ServicePage } from "@/lib/content-pages";
import { LP_THEME_LABEL } from "@/lib/constants";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LangSwitch } from "@/components/shared/LangSwitch";

export function SpTop({
  page,
  lang,
  setLang,
  theme,
  onToggleTheme,
}: {
  page: ServicePage;
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  onToggleTheme: () => void;
}) {
  return (
    <div className="sp-top">
      <Link className="sp-back" href="/">
        <span className="ar" aria-hidden="true">
          ←
        </span>
        {page.back}
      </Link>
      <Link className="sp-top-mark" href="/">
        Milo Weiler
      </Link>
      <span className="nav-controls">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} label={LP_THEME_LABEL[lang] || LP_THEME_LABEL.nl} />
        <LangSwitch lang={lang} setLang={setLang} langs={LANGS} />
      </span>
    </div>
  );
}
