import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Milo Weiler — Analoge Fotografie",
  description:
    "Milo Weiler — analoog fotograaf te Brussel & Antwerpen. Uitvaartreportages, karakterportretten en analoge huwelijken op middenformaat film.",
};

// Sets the stored theme before paint so dark mode never flashes.
const NO_FLASH_THEME = `try{if(localStorage.getItem('mw-theme')==='nacht')document.documentElement.setAttribute('data-theme','nacht');}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" data-motion="on" className={ebGaramond.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME }} />
        {children}
      </body>
    </html>
  );
}
