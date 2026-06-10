import { stegaClean } from "@sanity/client/stega";
import type { WithContext, ProfessionalService, Service, FAQPage, BreadcrumbList } from "schema-dts";
import type { BusinessInfo } from "./site-types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const BUSINESS_ID = `${SITE_URL}/#business`;

/* LocalBusiness/ProfessionalService for the atelier — fed by siteSettings so
   address, geo and area served stay in sync with the footer/contact section.
   Inputs are stega-cleaned (this data comes from a Visual-Editing-enabled
   fetch in places). */
export function professionalService(b: BusinessInfo, jobTitle?: string): WithContext<ProfessionalService> {
  const clean = (v: string | null | undefined) => (v ? stegaClean(v) : undefined);
  const data: WithContext<ProfessionalService> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: clean(b.siteName) || "Milo Weiler",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: clean(b.streetAddress),
      postalCode: clean(b.postalCode),
      addressLocality: clean(b.city),
      addressCountry: clean(b.countryCode) || "BE",
    },
    areaServed: (b.areaServed ?? []).map((a) => ({ "@type": "City", name: stegaClean(a) })),
  };
  if (jobTitle) data.description = stegaClean(jobTitle);
  if (b.geo?.lat && b.geo?.lng) {
    data.geo = { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng };
  }
  if (b.phone) data.telephone = clean(b.phone);
  if (b.email) data.email = clean(b.email);
  if (b.vatNumber) data.vatID = clean(b.vatNumber);
  if (b.priceRange) data.priceRange = clean(b.priceRange);
  if (b.instagramUrl) data.sameAs = [stegaClean(b.instagramUrl)];
  return data;
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  businessName: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: stegaClean(opts.name),
    description: stegaClean(opts.description),
    url: opts.url,
    serviceType: stegaClean(opts.name),
    provider: { "@id": BUSINESS_ID, "@type": "ProfessionalService", name: stegaClean(opts.businessName) },
  };
}

export function faqPage(items: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: stegaClean(it.q),
      acceptedAnswer: { "@type": "Answer", text: stegaClean(it.a) },
    })),
  };
}

export function breadcrumbs(items: { name: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: stegaClean(it.name),
      item: it.url,
    })),
  };
}
