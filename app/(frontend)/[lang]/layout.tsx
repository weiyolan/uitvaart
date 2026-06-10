import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_SEO_QUERY } from "@/sanity/lib/queries";
import { LOCALE_IDS, isLocale } from "@/lib/i18n";
import "../../globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return LOCALE_IDS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { data } = await sanityFetch({
    query: SETTINGS_SEO_QUERY,
    params: { lang },
    stega: false,
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(siteUrl),
    title: data?.title ?? "Milo Weiler",
    description: data?.description || undefined,
  };
}

// Sets the stored theme before paint so dark mode never flashes.
const NO_FLASH_THEME = `try{if(localStorage.getItem('mw-theme')==='nacht')document.documentElement.setAttribute('data-theme','nacht');}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} data-motion="on" className={ebGaramond.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME }} />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
