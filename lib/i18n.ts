/* Single source of truth for the site's locales — imported by sanity.config,
   proxy, layouts, sitemap and the seed script. */

export const LOCALES = [
  { id: "nl", title: "Nederlands" },
  { id: "en", title: "English" },
  { id: "fr", title: "Français" },
] as const;

export type Locale = (typeof LOCALES)[number]["id"];

export const LOCALE_IDS = LOCALES.map((l) => l.id) as Locale[];

export const DEFAULT_LOCALE: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return (LOCALE_IDS as string[]).includes(value);
}
