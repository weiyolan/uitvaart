import type { Locale } from "./i18n";

export function homePath(lang: Locale): string {
  return `/${lang}`;
}

export function servicePath(lang: Locale, slug: string): string {
  return `/${lang}/diensten/${slug}`;
}
