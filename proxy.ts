import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "./lib/i18n";

/* Locale routing: paths without a locale prefix redirect permanently to the
   default locale (/ → /nl, /diensten/x → /nl/diensten/x). The matcher keeps
   /studio, /api, Next internals and files out of the proxy. */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!studio|api|_next|_vercel|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)"],
};
