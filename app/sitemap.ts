import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_SERVICE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { LOCALE_IDS } from "@/lib/i18n";
import { SITE_URL } from "@/lib/jsonld";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await client
    .withConfig({ useCdn: false, stega: false, perspective: "published" })
    .fetch(SITEMAP_SERVICE_SLUGS_QUERY)
    .catch(() => [] as { slug: string | null }[]);

  const paths = [
    "",
    ...slugs.filter((s): s is { slug: string } => !!s.slug).map((s) => `/diensten/${s.slug}`),
  ];

  /* Each path gets one entry per locale with the hreflang alternates. */
  return paths.map((path) => ({
    url: `${SITE_URL}/${LOCALE_IDS[0]}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(LOCALE_IDS.map((lang) => [lang, `${SITE_URL}/${lang}${path}`])),
    },
  }));
}
