import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";
import { LOCALE_IDS } from "../../lib/i18n";

/* Maps documents to the front-end URLs where they appear (one per locale), so
   the Presentation tool opens the right page and editors can click-to-edit. */
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      message: "Deze pagina verschijnt op alle talen.",
      locations: LOCALE_IDS.map((lang) => ({
        title: `Homepagina (${lang.toUpperCase()})`,
        href: `/${lang}`,
      })),
    }),
    siteSettings: defineLocations({
      message: "Site-instellingen verschijnen op elke pagina.",
      locations: LOCALE_IDS.map((lang) => ({
        title: `Homepagina (${lang.toUpperCase()})`,
        href: `/${lang}`,
      })),
    }),
    service: defineLocations({
      select: { slug: "slug.current" },
      resolve: (doc) => ({
        locations: LOCALE_IDS.map((lang) => ({
          title: `Dienstpagina (${lang.toUpperCase()})`,
          href: `/${lang}/diensten/${doc?.slug}`,
        })),
      }),
    }),
  },
};
