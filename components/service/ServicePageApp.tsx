"use client";

import { useEffect } from "react";
import { stegaClean } from "@sanity/client/stega";
import type { Locale } from "@/lib/i18n";
import type { ServiceData, ServicePage, ServicePageDoc, ServiceSettings } from "@/lib/site-types";
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

export function ServicePageApp({
  lang,
  settings,
  page: pageDoc,
  others,
}: {
  lang: Locale;
  settings: ServiceSettings;
  page: ServicePageDoc;
  others: ServiceData["others"];
}) {
  const { theme, toggleTheme } = useSiteChrome();
  const ui = settings.ui;

  /* Compose the shape the section components consume: document + the shared
     section labels that live on siteSettings. */
  const page: ServicePage = {
    ...pageDoc,
    back: ui.spBack,
    nav: {
      why: ui.navWhy,
      how: ui.navHow,
      piece: ui.navPiece,
      packages: ui.navPackages,
      faq: ui.navFaq,
    },
  };

  /* Logic-bearing value from Sanity: strip stega characters before it lands
     in attributes/comparisons (Visual Editing injects invisible chars). */
  const svc = stegaClean(page.svc);

  // Mirror data-svc onto <html> so the [data-theme="nacht"][data-svc] dark
  // softening matches. The wrapper <div data-svc> below already provides the
  // SSR-correct (flash-free) accent for the page subtree.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-svc", svc);
    return () => root.removeAttribute("data-svc");
  }, [svc]);

  return (
    <div data-svc={svc}>
      <SpTop lang={lang} back={page.back} themeLabel={ui.themeLabel} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <SpHero page={page} />
        <SpWhy page={page} />
        <SpHow page={page} />
        <SpPiece page={page} />
        <SpPackages page={page} ctaLabel={{ popular: ui.popular, ask: ui.ask }} />
        <SpGallery
          page={page}
          labels={{ overline: ui.galleryOverline, title: ui.galleryTitle, note: ui.galleryNote }}
        />
        <SpFaq page={page} />
        <SpClosing lang={lang} contact={settings.contact} others={others} crossLabel={ui.cross} />
      </main>
      <SpFooter lang={lang} nav={settings.nav} foot={settings.foot} business={settings.business} />
    </div>
  );
}
