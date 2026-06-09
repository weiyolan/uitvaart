"use client";

import { MW } from "@/lib/content";
import { LP_RAIL } from "@/lib/constants";
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

export function LandingApp() {
  const { lang, setLang, theme, toggleTheme, reduce } = useSiteChrome();

  const c = MW[lang] || MW.nl;
  const rail = LP_RAIL[lang] || LP_RAIL.nl;

  const railItems: RailItem[] = [
    { id: "overzicht", label: rail.work },
    { id: "filosofie", label: c.nav.filosofie },
    { id: "uitvaart", label: rail.services },
    { id: "traject", label: rail.process },
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
      <TopBar lang={lang} setLang={setLang} theme={theme} onToggleTheme={toggleTheme} />
      <RailNav items={railItems} active={railActive} />
      <main>
        <Hero c={c} />
        {reduce ? <StaticShowcase c={c} /> : <Showcase c={c} lang={lang} />}
        <Philosophy c={c} />
        {c.services.map((s, i) => (
          <ServiceRow key={s.id} data={s} idx={i} lang={lang} />
        ))}
        <Process c={c} />
        <Closing c={c} />
        <Contact c={c} />
      </main>
      <Footer c={c} />
    </>
  );
}
