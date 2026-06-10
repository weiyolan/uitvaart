"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { homePath } from "@/lib/routes";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LangSwitch } from "@/components/shared/LangSwitch";

export function SpTop({
  lang,
  back,
  themeLabel,
  theme,
  onToggleTheme,
}: {
  lang: Locale;
  back: string;
  themeLabel: string;
  theme: string;
  onToggleTheme: () => void;
}) {
  return (
    <div className="sp-top">
      <Link className="sp-back" href={homePath(lang)}>
        <span className="ar" aria-hidden="true">
          ←
        </span>
        {back}
      </Link>
      <Link className="sp-top-mark" href={homePath(lang)}>
        Milo Weiler
      </Link>
      <span className="nav-controls">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} label={themeLabel} />
        <LangSwitch lang={lang} />
      </span>
    </div>
  );
}
