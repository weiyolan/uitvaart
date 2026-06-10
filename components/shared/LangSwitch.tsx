"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_IDS, type Locale } from "@/lib/i18n";

/* Language switch — locale-prefixed links to the same page in the other
   languages (URL is the language state; better for SEO than client toggles). */
export function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.split("/").slice(2).join("/");
  const pathFor = (l: Locale) => `/${l}${rest ? `/${rest}` : ""}`;
  return (
    <span className="lang" role="group" aria-label="Taal / Language">
      {LOCALE_IDS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 ? <span className="sep">/</span> : null}
          <Link
            data-on={lang === l ? "1" : "0"}
            href={pathFor(l)}
            hrefLang={l}
            aria-current={lang === l ? "page" : undefined}
          >
            {l.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}
