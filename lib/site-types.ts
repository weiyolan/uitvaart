/* Component-facing content types, derived from the TypeGen query result
   types so the GROQ projections in sanity/lib/queries.ts are the single
   source of truth. Regenerate with `npm run typegen` after query changes. */

import type { HOME_QUERY_RESULT, SERVICE_QUERY_RESULT } from "@/sanity/types";
import type { Locale } from "./i18n";

export type { Locale };

/* ---- landing page ----------------------------------------------------- */

export type HomeData = NonNullable<HOME_QUERY_RESULT>;
export type SiteSettings = NonNullable<HomeData["settings"]>;
export type HomeDoc = NonNullable<HomeData["home"]>;
export type ServiceItem = HomeData["services"][number];
export type SiteUi = SiteSettings["ui"];
export type BusinessInfo = SiteSettings["business"];
export type SiteContact = SiteSettings["contact"];
export type SiteContactLine = SiteContact["lines"][number];
export type SiteFoot = SiteSettings["foot"];
export type SiteNav = SiteSettings["nav"];
export type Figure = ServiceItem["figures"][number];

/* The composed shape the landing components consume (assembled in
   LandingApp from the HOME_QUERY result). */
export type SiteContent = {
  nav: SiteNav;
  hero: HomeDoc["hero"];
  philosophy: HomeDoc["philosophy"] & {
    name: string;
    role: string;
    services: ServiceItem[];
  };
  services: ServiceItem[];
  process: HomeDoc["process"];
  work: HomeDoc["work"];
  closing: HomeDoc["closing"];
  contact: SiteContact;
  foot: SiteFoot;
};

/* ---- service pages ----------------------------------------------------- */

export type ServiceData = NonNullable<SERVICE_QUERY_RESULT>;
export type ServiceSettings = NonNullable<ServiceData["settings"]>;
export type ServicePageDoc = NonNullable<ServiceData["page"]>;
export type ServiceCrossLink = ServiceData["others"][number];
export type ServiceUi = ServiceSettings["ui"];

/* Composed in the service page route: document + shared UI labels. */
export type ServicePage = ServicePageDoc & {
  back: string;
  nav: {
    why: string;
    how: string;
    piece: string;
    packages: string;
    faq: string;
  };
};

export type SpGalleryLabels = {
  overline: string;
  title: string;
  note: string;
};
