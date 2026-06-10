import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_QUERY, HOME_SEO_QUERY } from "@/sanity/lib/queries";
import { LandingApp } from "@/components/landing/LandingApp";
import { JsonLd } from "@/components/shared/JsonLd";
import { isLocale } from "@/lib/i18n";
import { homePath } from "@/lib/routes";
import { professionalService } from "@/lib/jsonld";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { data } = await sanityFetch({
    query: HOME_SEO_QUERY,
    params: { lang },
    stega: false,
  });
  if (!data) return {};
  const metadata: Metadata = {
    title: data.title,
    description: data.description || undefined,
    alternates: {
      canonical: homePath(lang),
      languages: {
        nl: homePath("nl"),
        en: homePath("en"),
        fr: homePath("fr"),
        "x-default": homePath("nl"),
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

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { data } = await sanityFetch({ query: HOME_QUERY, params: { lang } });
  if (!data?.settings || !data?.home || data.services.length < 3) notFound();
  const b = data.settings.business;
  return (
    <>
      <JsonLd data={professionalService(b, b.jobTitle)} />
      <LandingApp lang={lang} settings={data.settings} home={data.home} services={data.services} />
    </>
  );
}
