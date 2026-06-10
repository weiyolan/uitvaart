"use client";

import type { Locale } from "@/lib/i18n";
import type { HomeData, HomeDoc, ServiceItem, SiteContent, SiteSettings } from "@/lib/site-types";
import { useActiveSection } from "@/lib/hooks";
import { useSiteChrome } from "@/lib/useSiteChrome";
import { TopBar } from "./TopBar";
import { RailNav } from "./RailNav";
import type { RailItem } from "./RailNav";
import { Hero } from "./Hero";
import { Showcase, StaticShowcase } from "./Showcase";
import { Philosophy } from "./Philosophy";
import { ServiceRow } from "./ServiceRow";
import { Process } from "./Process";
import { Closing } from "./Closing";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

const SECTION_IDS = ["top", "overzicht", "filosofie", "uitvaart", "portret", "huwelijk", "traject", "contact"];

export function LandingApp({
  lang,
  settings,
  home,
  services,
}: {
  lang: Locale;
  settings: SiteSettings;
  home: HomeDoc;
  services: HomeData["services"];
}) {
  const { theme, toggleTheme, reduce } = useSiteChrome();

  /* Compose the legacy SiteContent shape the section components consume. */
  const c: SiteContent = {
    nav: settings.nav,
    hero: home.hero,
    philosophy: {
      ...home.philosophy,
      name: settings.business.siteName,
      role: settings.business.jobTitle,
      services,
    },
    services,
    process: home.process,
    work: home.work,
    closing: home.closing,
    contact: settings.contact,
    foot: settings.foot,
  };
  const ui = settings.ui;

  const railItems: RailItem[] = [
    { id: "overzicht", label: ui.railWork },
    { id: "filosofie", label: c.nav.filosofie },
    { id: "uitvaart", label: ui.railServices },
    { id: "traject", label: ui.railProcess },
    { id: "contact", label: c.nav.contact },
  ];
  const active = useActiveSection(SECTION_IDS);
  const railActive = ["portret", "huwelijk"].includes(active)
    ? "uitvaart"
    : active === "top"
      ? "overzicht"
      : active;

  return (
    <>
      <TopBar lang={lang} themeLabel={ui.themeLabel} theme={theme} onToggleTheme={toggleTheme} />
      <RailNav items={railItems} active={railActive} />
      <main>
        <Hero c={c} />
        {reduce ? <StaticShowcase c={c} /> : <Showcase c={c} head={ui.showcaseHeading} />}
        <Philosophy c={c} />
        {c.services.map((s: ServiceItem, i: number) => (
          <ServiceRow key={s.key} data={s} idx={i} lang={lang} cta={ui.serviceCta} />
        ))}
        <Process c={c} />
        <Closing c={c} />
        <Contact c={c} />
      </main>
      <Footer lang={lang} c={c} business={settings.business} />
    </>
  );
}
