import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MW_PAGES } from "@/lib/content-pages";
import type { ServiceSlug } from "@/lib/content-pages";
import { ServicePageApp } from "@/components/service/ServicePageApp";

const SLUGS: ServiceSlug[] = ["uitvaart", "portret", "huwelijk"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = MW_PAGES.nl[slug as ServiceSlug];
  if (!page) return {};
  return {
    title: page.head.title.join(" ") + " — Milo Weiler",
    description: page.head.sub,
  };
}

export default async function DienstPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as ServiceSlug)) notFound();
  return <ServicePageApp slug={slug as ServiceSlug} />;
}
