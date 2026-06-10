import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICE_QUERY, SERVICE_SEO_QUERY, SERVICE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { ServicePageApp } from "@/components/service/ServicePageApp";
import { JsonLd } from "@/components/shared/JsonLd";
import { isLocale } from "@/lib/i18n";
import { servicePath, homePath } from "@/lib/routes";
import { professionalService, serviceJsonLd, faqPage, breadcrumbs, SITE_URL } from "@/lib/jsonld";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false, stega: false, perspective: "published" })
    .fetch(SERVICE_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const { data } = await sanityFetch({
    query: SERVICE_SEO_QUERY,
    params: { lang, slug },
    stega: false,
  });
  if (!data) return {};
  const metadata: Metadata = {
    title: data.title,
    description: data.description || undefined,
    alternates: {
      canonical: servicePath(lang, slug),
      languages: {
        nl: servicePath("nl", slug),
        en: servicePath("en", slug),
        fr: servicePath("fr", slug),
        "x-default": servicePath("nl", slug),
      },
    },
  };
  if (data.ogImage?.url) {
    metadata.openGraph = {
      images: [{ url: `${data.ogImage.url}?w=1200&h=630&fit=crop`, width: 1200, height: 630, alt: data.ogImage.alt }],
    };
  }
  if (data.noIndex) {
    metadata.robots = "noindex";
  }
  return metadata;
}

export default async function DienstPage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const { data } = await sanityFetch({ query: SERVICE_QUERY, params: { lang, slug } });
  if (!data?.page || !data?.settings) notFound();

  const b = data.settings.business;
  const pageUrl = `${SITE_URL}${servicePath(lang, slug)}`;
  const serviceName = data.page.name || data.page.head.title.join(" ");
  const faqItems = data.page.faq.items.filter((it) => it.q && it.a);

  return (
    <>
      <JsonLd data={professionalService(b, b.jobTitle)} />
      <JsonLd
        data={serviceJsonLd({
          name: serviceName,
          description: data.page.head.sub,
          url: pageUrl,
          businessName: b.siteName,
        })}
      />
      {faqItems.length > 0 && <JsonLd data={faqPage(faqItems)} />}
      <JsonLd
        data={breadcrumbs([
          { name: b.siteName, url: `${SITE_URL}${homePath(lang)}` },
          { name: serviceName, url: pageUrl },
        ])}
      />
      <ServicePageApp lang={lang} settings={data.settings} page={data.page} others={data.others} />
    </>
  );
}
