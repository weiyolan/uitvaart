"use client";

import { Fragment } from "react";
import type { Lang } from "@/lib/content";

/* Language switch — supports any number of language codes (from components.jsx). */
export function LangSwitch({
  lang,
  setLang,
  langs = ["nl", "en"],
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  langs?: Lang[];
}) {
  return (
    <span className="lang" role="group" aria-label="Taal / Language">
      {langs.map((l, i) => (
        <Fragment key={l}>
          {i > 0 ? <span className="sep">/</span> : null}
          <button data-on={lang === l ? "1" : "0"} onClick={() => setLang(l)}>
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </span>
  );
}
