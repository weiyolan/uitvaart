"use client";

import type { Lang } from "@/lib/content";
import { LANGS } from "@/lib/content";
import { LP_THEME_LABEL } from "@/lib/constants";
import { lpScrollTo } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LangSwitch } from "@/components/shared/LangSwitch";

export function TopBar({
  lang,
  setLang,
  theme,
  onToggleTheme,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  onToggleTheme: () => void;
}) {
  return (
    <div className="lp-top">
      <a className="lp-mark" href="#top" onClick={lpScrollTo("top")}>
        Milo Weiler
      </a>
      <span className="nav-controls">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} label={LP_THEME_LABEL[lang] || LP_THEME_LABEL.nl} />
        <LangSwitch lang={lang} setLang={setLang} langs={LANGS} />
      </span>
    </div>
  );
}
