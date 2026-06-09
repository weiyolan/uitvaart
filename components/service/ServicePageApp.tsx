"use client";

import { useEffect } from "react";
import { MW } from "@/lib/content";
import { MW_PAGES } from "@/lib/content-pages";
import type { ServiceSlug } from "@/lib/content-pages";
import { SP_LABELS } from "@/lib/constants";
import { useSiteChrome } from "@/lib/useSiteChrome";
import { SpTop } from "./SpTop";
import { SpHero } from "./SpHero";
import { SpWhy } from "./SpWhy";
import { SpHow } from "./SpHow";
import { SpPiece } from "./SpPiece";
import { SpPackages } from "./SpPackages";
import { SpGallery } from "./SpGallery";
import { SpFaq } from "./SpFaq";
import { SpClosing } from "./SpClosing";
import { SpFooter } from "./SpFooter";

export function ServicePageApp({ slug }: { slug: ServiceSlug }) {
  const { lang, setLang, theme, toggleTheme } = useSiteChrome();
  const page = MW_PAGES[lang]?.[slug] ?? MW_PAGES.nl[slug];
  const c = MW[lang] || MW.nl;
  const labels = SP_LABELS[lang] || SP_LABELS.nl;

  // Mirror data-svc onto <html> so the [data-theme="nacht"][data-svc] dark
  // softening matches, and keep the tab title in sync with the language. The
  // wrapper <div data-svc> below already provides the SSR-correct (flash-free)
  // accent for the page subtree.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-svc", slug);
    document.title = page.head.title.join(" ") + " — Milo Weiler";
    return () => root.removeAttribute("data-svc");
  }, [slug, page]);

  return (
    <div data-svc={slug}>
      <SpTop page={page} lang={lang} setLang={setLang} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <SpHero page={page} />
        <SpWhy page={page} />
        <SpHow page={page} />
        <SpPiece page={page} />
        <SpPackages page={page} ctaLabel={{ popular: labels.popular, ask: labels.ask }} />
        <SpGallery page={page} labels={labels.gallery} />
        <SpFaq page={page} />
        <SpClosing page={page} c={c} crossLabel={labels.cross} />
      </main>
      <SpFooter c={c} />
    </div>
  );
}
