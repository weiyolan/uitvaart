"use client";

import type { Locale } from "@/lib/i18n";
import { lpScrollTo } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LangSwitch } from "@/components/shared/LangSwitch";

export function TopBar({
  lang,
  themeLabel,
  theme,
  onToggleTheme,
}: {
  lang: Locale;
  themeLabel: string;
  theme: string;
  onToggleTheme: () => void;
}) {
  return (
    <div className="lp-top">
      <a className="lp-mark" href="#top" onClick={lpScrollTo("top")}>
        Milo Weiler
      </a>
      <span className="nav-controls">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} label={themeLabel} />
        <LangSwitch lang={lang} />
      </span>
    </div>
  );
}
