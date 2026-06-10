"use client";

import type { Locale } from "@/lib/i18n";
import type { BusinessInfo, SiteContent } from "@/lib/site-types";
import { servicePath } from "@/lib/routes";
import { lpScrollTo } from "@/lib/utils";

export function Footer({ lang, c, business }: { lang: Locale; c: SiteContent; business: BusinessInfo }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="foot-mark">
              Milo
              <br />
              Weiler
            </div>
            <p style={{ color: "var(--ink-faint)", margin: "18px 0 0", fontSize: 13, letterSpacing: "0.04em" }}>
              {c.foot.tagline}
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>{c.foot.navTitle}</h4>
              <a href={servicePath(lang, "uitvaart")}>{c.nav.uitvaart}</a>
              <a href={servicePath(lang, "portret")}>{c.nav.portret}</a>
              <a href={servicePath(lang, "huwelijk")}>{c.nav.huwelijk}</a>
              <a href="#traject" onClick={lpScrollTo("traject")}>
                {c.process.overline.replace(/^[0-9]+ — /, "")}
              </a>
            </div>
            <div className="foot-col">
              <h4>{c.foot.contactTitle}</h4>
              <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
              <a href={business.instagramUrl} target="_blank" rel="noreferrer">
                {business.instagramHandle}
              </a>
              <p>
                {business.streetAddress}, {business.postalCode} {business.city}
              </p>
            </div>
            <div className="foot-col">
              <h4>{c.foot.legalTitle}</h4>
              {c.foot.legal.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{c.foot.rights}</span>
          <span>{c.foot.made}</span>
        </div>
      </div>
    </footer>
  );
}
