/* One-time seed: populates the Sanity dataset with the website copy from
   lib/content.ts, lib/content-pages.ts and lib/constants.ts, verbatim.

   Run with: npm run seed        (tsx --env-file=.env.local scripts/seed.ts)

   ⚠ Re-running OVERWRITES the five documents (createOrReplace) — any edits
   made in the Studio since the last run are lost. */

import { createClient } from "@sanity/client";
import { MW } from "../lib/content";
import type { Lang } from "../lib/content";
import { MW_PAGES } from "../lib/content-pages";
import type { ServiceSlug } from "../lib/content-pages";
import {
  LP_RAIL,
  LP_SHOW_HEAD,
  LP_SVC_CTA,
  LP_THEME_LABEL,
  SP_LABELS,
} from "../lib/constants";
import { LOCALE_IDS } from "../lib/i18n";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN — aborting. (Run via `npm run seed` so .env.local is loaded.)");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "daxfkv44",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-01",
  token,
  useCdn: false,
});

/* ---- internationalized-array helpers -------------------------------- */
/* Storage shape required by sanity-plugin-internationalized-array:
   [{ _key: "<locale id>", _type: "internationalizedArray<Type>Value", value }] */

const i18nString = (pick: (l: Lang) => string | undefined) =>
  LOCALE_IDS.flatMap((l) => {
    const value = pick(l);
    return value === undefined
      ? []
      : [{ _key: l, _type: "internationalizedArrayStringValue", value }];
  });

const i18nText = (pick: (l: Lang) => string | undefined) =>
  LOCALE_IDS.flatMap((l) => {
    const value = pick(l);
    return value === undefined
      ? []
      : [{ _key: l, _type: "internationalizedArrayTextValue", value }];
  });

const localizedItems = (key: string, count: number, pick: (l: Lang, i: number) => string | undefined) =>
  Array.from({ length: count }, (_, i) => ({
    _type: "localizedItem",
    _key: `${key}-${i + 1}`,
    value: i18nString((l) => pick(l, i)),
  }));

const localizedParagraphs = (key: string, count: number, pick: (l: Lang, i: number) => string | undefined) =>
  Array.from({ length: count }, (_, i) => ({
    _type: "localizedParagraph",
    _key: `${key}-${i + 1}`,
    text: i18nText((l) => pick(l, i)),
  }));

/* ---- siteSettings ----------------------------------------------------- */

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  business: {
    siteName: "Milo Weiler",
    jobTitle: i18nString((l) => MW[l].philosophy.role),
    streetAddress: "Hof Savelkoul 40",
    postalCode: "2640",
    city: "Mortsel",
    countryCode: "BE",
    phone: "+32476506209",
    phoneDisplay: "+32 476 50 62 09",
    email: "milo.weiler@gmail.com",
    instagramUrl: "https://instagram.com/miloweiler",
    instagramHandle: "@miloweiler",
    vatNumber: "BE 0791 549 197",
    bankName: "KBC",
    iban: "BE07 7370 6524 4566",
    areaServed: ["Antwerpen", "Brussel", "Mortsel"],
    geo: { _type: "geopoint", lat: 51.1671, lng: 4.4554 },
  },
  nav: {
    filosofie: i18nString((l) => MW[l].nav.filosofie),
    uitvaart: i18nString((l) => MW[l].nav.uitvaart),
    portret: i18nString((l) => MW[l].nav.portret),
    huwelijk: i18nString((l) => MW[l].nav.huwelijk),
    werk: i18nString((l) => MW[l].nav.werk),
    contact: i18nString((l) => MW[l].nav.contact),
  },
  contactSection: {
    overline: i18nString((l) => MW[l].contact.overline),
    title: i18nString((l) => MW[l].contact.title),
    body: i18nText((l) => MW[l].contact.body),
    callBtn: i18nString((l) => MW[l].contact.callBtn),
    mailBtn: i18nString((l) => MW[l].contact.mailBtn),
    phoneLabel: i18nString((l) => MW[l].contact.lines[0]?.k),
    emailLabel: i18nString((l) => MW[l].contact.lines[1]?.k),
    studioLabel: i18nString((l) => MW[l].contact.lines[2]?.k),
    instagramLabel: i18nString((l) => MW[l].contact.lines[3]?.k),
  },
  footer: {
    tagline: i18nString((l) => MW[l].foot.tagline),
    navTitle: i18nString((l) => MW[l].foot.navTitle),
    contactTitle: i18nString((l) => MW[l].foot.contactTitle),
    legalTitle: i18nString((l) => MW[l].foot.legalTitle),
    // "BTW BE 0791 549 197" -> "BTW" / "VAT" / "TVA"
    vatLabel: i18nString((l) => MW[l].foot.legal[0]?.split(" ")[0]),
    rights: i18nString((l) => MW[l].foot.rights),
    made: i18nString((l) => MW[l].foot.made),
  },
  ui: {
    railWork: i18nString((l) => LP_RAIL[l].work),
    railServices: i18nString((l) => LP_RAIL[l].services),
    railProcess: i18nString((l) => LP_RAIL[l].process),
    showcaseHeading: i18nString((l) => LP_SHOW_HEAD[l]),
    serviceCta: i18nString((l) => LP_SVC_CTA[l]),
    themeLabel: i18nString((l) => LP_THEME_LABEL[l]),
    spBack: i18nString((l) => MW_PAGES[l].uitvaart.back),
    navWhy: i18nString((l) => MW_PAGES[l].uitvaart.nav.why),
    navHow: i18nString((l) => MW_PAGES[l].uitvaart.nav.how),
    navPiece: i18nString((l) => MW_PAGES[l].uitvaart.nav.piece),
    navPackages: i18nString((l) => MW_PAGES[l].uitvaart.nav.packages),
    navFaq: i18nString((l) => MW_PAGES[l].uitvaart.nav.faq),
    spGalleryOverline: i18nString((l) => SP_LABELS[l].gallery.overline),
    spGalleryTitle: i18nString((l) => SP_LABELS[l].gallery.title),
    spGalleryNote: i18nText((l) => SP_LABELS[l].gallery.note),
    spCross: i18nString((l) => SP_LABELS[l].cross),
    spPopular: i18nString((l) => SP_LABELS[l].popular),
    spAsk: i18nString((l) => SP_LABELS[l].ask),
  },
  seo: {
    _type: "seo",
    metaTitle: i18nString(
      (l) =>
        ({
          nl: "Milo Weiler — Analoge Fotografie",
          en: "Milo Weiler — Analogue Photography",
          fr: "Milo Weiler — Photographie Analogique",
        })[l],
    ),
    metaDescription: i18nText(
      (l) =>
        ({
          nl: "Milo Weiler — analoog fotograaf te Brussel & Antwerpen. Uitvaartreportages, karakterportretten en analoge huwelijken op middenformaat film.",
          en: "Milo Weiler — analogue photographer in Brussels & Antwerp. Funerary reportage, character portraits and analogue weddings on medium-format film.",
          fr: "Milo Weiler — photographe analogique à Bruxelles & Anvers. Reportages funéraires, portraits de caractère et mariages analogiques sur film moyen format.",
        })[l],
    ),
    noIndex: false,
  },
};

/* ---- homePage --------------------------------------------------------- */

const figure = (key: string, pick: (l: Lang) => { tag: string; meta: string; corner: string }) => ({
  _type: "filmFigure",
  _key: key,
  tag: pick("nl").tag,
  meta: i18nString((l) => pick(l).meta),
  corner: pick("nl").corner,
});

const homePage = {
  _id: "homePage",
  _type: "homePage",
  hero: {
    overline: i18nString((l) => MW[l].hero.overline),
    titleLine1: i18nString((l) => MW[l].hero.title[0]),
    titleLine2: i18nString((l) => MW[l].hero.title[1]),
    sub: i18nText((l) => MW[l].hero.sub),
    cue: i18nString((l) => MW[l].hero.cue),
    cta: i18nString((l) => MW[l].hero.cta),
  },
  philosophy: {
    overline: i18nString((l) => MW[l].philosophy.overline),
    pull: i18nText((l) => MW[l].philosophy.pull),
    lead: i18nText((l) => MW[l].philosophy.lead),
    body: i18nText((l) => MW[l].philosophy.body),
    indexOverline: i18nString((l) => MW[l].philosophy.indexOverline),
  },
  process: {
    overline: i18nString((l) => MW[l].process.overline),
    title: i18nString((l) => MW[l].process.title),
    note: i18nText((l) => MW[l].process.note),
    steps: MW.nl.process.steps.map((step, i) => ({
      _type: "processStep",
      _key: `step-${i + 1}`,
      no: step.no,
      name: i18nString((l) => MW[l].process.steps[i]?.name),
      text: i18nText((l) => MW[l].process.steps[i]?.text),
    })),
  },
  work: {
    overline: i18nString((l) => MW[l].work.overline),
    title: i18nString((l) => MW[l].work.title),
    note: i18nText((l) => MW[l].work.note),
    frames: MW.nl.work.frames.map((frame, i) => ({
      _type: "filmFigure",
      _key: `frame-${i + 1}`,
      tag: frame.stock,
      meta: i18nString((l) => MW[l].work.frames[i]?.meta),
      corner: frame.corner,
    })),
  },
  closing: {
    overline: i18nString((l) => MW[l].closing.overline),
    statement: i18nText((l) => MW[l].closing.statement),
    sub: i18nString((l) => MW[l].closing.sub),
  },
};

/* ---- services --------------------------------------------------------- */

const SLUGS: ServiceSlug[] = ["uitvaart", "portret", "huwelijk"];

const serviceDocs = SLUGS.map((slug, idx) => {
  const nlPage = MW_PAGES.nl[slug];
  const nlLanding = MW.nl.services[idx];
  return {
    _id: `service-${slug}`,
    _type: "service",
    name: i18nString((l) => MW[l].philosophy.services[idx]?.name),
    slug: { _type: "slug", current: slug },
    order: idx + 1,
    number: MW.nl.philosophy.services[idx].no,
    note: i18nString((l) => MW[l].philosophy.services[idx]?.note),
    indexFigLabel: i18nString((l) => MW[l].philosophy.services[idx]?.fig[0]),
    indexFigCorner: MW.nl.philosophy.services[idx].fig[1],
    landing: {
      overline: i18nString((l) => MW[l].services[idx]?.overline),
      kicker: i18nString((l) => MW[l].services[idx]?.kicker),
      title: i18nString((l) => MW[l].services[idx]?.title),
      why: i18nText((l) => MW[l].services[idx]?.why),
      bodyTitle: i18nString((l) => MW[l].services[idx]?.bodyTitle),
      paragraphs: localizedParagraphs("para", nlLanding.body.length, (l, i) => MW[l].services[idx]?.body[i]),
      specs: localizedItems("spec", nlLanding.specs.length, (l, i) => MW[l].services[idx]?.specs[i]),
      resultLabel: i18nString((l) => MW[l].services[idx]?.result[0]),
      resultValue: i18nString((l) => MW[l].services[idx]?.result[1]),
      figures: nlLanding.figures.map((_, i) =>
        figure(`fig-${i + 1}`, (l) => MW[l].services[idx].figures[i]),
      ),
    },
    page: {
      heroVariant: nlPage.hero,
      crumb: i18nString((l) => MW_PAGES[l][slug].crumb),
      head: {
        overline: i18nString((l) => MW_PAGES[l][slug].head.overline),
        titleLine1: i18nString((l) => MW_PAGES[l][slug].head.title[0]),
        titleLine2: i18nString((l) => MW_PAGES[l][slug].head.title[1]),
        sub: i18nText((l) => MW_PAGES[l][slug].head.sub),
        fig: figure("head-fig", (l) => MW_PAGES[l][slug].head.fig),
      },
      why: {
        overline: i18nString((l) => MW_PAGES[l][slug].why.overline),
        lead: i18nText((l) => MW_PAGES[l][slug].why.lead),
        paragraphs: localizedParagraphs("para", nlPage.why.body.length, (l, i) => MW_PAGES[l][slug].why.body[i]),
        pull: i18nText((l) => MW_PAGES[l][slug].why.pull),
        fig: figure("why-fig", (l) => MW_PAGES[l][slug].why.fig),
      },
      how: {
        overline: i18nString((l) => MW_PAGES[l][slug].how.overline),
        title: i18nString((l) => MW_PAGES[l][slug].how.title),
        note: i18nText((l) => MW_PAGES[l][slug].how.note),
        steps: nlPage.how.steps.map((step, i) => ({
          _type: "processStep",
          _key: `step-${i + 1}`,
          no: step.no,
          name: i18nString((l) => MW_PAGES[l][slug].how.steps[i]?.name),
          text: i18nText((l) => MW_PAGES[l][slug].how.steps[i]?.text),
        })),
      },
      piece: {
        overline: i18nString((l) => MW_PAGES[l][slug].piece.overline),
        title: i18nString((l) => MW_PAGES[l][slug].piece.title),
        body: i18nText((l) => MW_PAGES[l][slug].piece.body),
        specs: localizedItems("spec", nlPage.piece.specs.length, (l, i) => MW_PAGES[l][slug].piece.specs[i]),
        resultLabel: i18nString((l) => MW_PAGES[l][slug].piece.result[0]),
        resultValue: i18nString((l) => MW_PAGES[l][slug].piece.result[1]),
        fig: figure("piece-fig", (l) => MW_PAGES[l][slug].piece.fig),
      },
      packages: {
        overline: i18nString((l) => MW_PAGES[l][slug].packages.overline),
        title: i18nString((l) => MW_PAGES[l][slug].packages.title),
        note: i18nText((l) => MW_PAGES[l][slug].packages.note),
        priceNote: i18nString((l) => MW_PAGES[l][slug].packages.priceNote),
        items: nlPage.packages.items.map((item, i) => ({
          _type: "packageItem",
          _key: `pkg-${i + 1}`,
          name: i18nString((l) => MW_PAGES[l][slug].packages.items[i]?.name),
          tagline: i18nString((l) => MW_PAGES[l][slug].packages.items[i]?.tagline),
          includes: localizedItems(
            `pkg-${i + 1}-inc`,
            item.includes.length,
            (l, k) => MW_PAGES[l][slug].packages.items[i]?.includes[k],
          ),
          featured: !!item.featured,
        })),
      },
      faq: {
        overline: i18nString((l) => MW_PAGES[l][slug].faq.overline),
        title: i18nString((l) => MW_PAGES[l][slug].faq.title),
        items: nlPage.faq.items.map((_, i) => ({
          _type: "faqItem",
          _key: `faq-${i + 1}`,
          q: i18nString((l) => MW_PAGES[l][slug].faq.items[i]?.q),
          a: i18nText((l) => MW_PAGES[l][slug].faq.items[i]?.a),
        })),
      },
    },
  };
});

/* ---- commit ----------------------------------------------------------- */

async function run() {
  const docs = [siteSettings, homePage, ...serviceDocs];
  const tx = docs.reduce(
    (t, doc) => t.createOrReplace(doc as Parameters<typeof t.createOrReplace>[0]),
    client.transaction(),
  );
  const result = await tx.commit();
  console.log("Seeded documents:");
  for (const doc of result.documentIds) console.log(`  - ${doc}`);
}

run().catch((err) => {
  console.error("Seed failed:", err.message || err);
  process.exit(1);
});
