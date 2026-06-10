"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { ServiceSettings } from "@/lib/site-types";
import { homePath, servicePath } from "@/lib/routes";

/* FOOTER — same as the landing footer; "werk" links back to the landing. */
export function SpFooter({
  lang,
  nav,
  foot,
  business,
}: {
  lang: Locale;
  nav: ServiceSettings["nav"];
  foot: ServiceSettings["foot"];
  business: ServiceSettings["business"];
}) {
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
              {foot.tagline}
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>{foot.navTitle}</h4>
              <a href={servicePath(lang, "uitvaart")}>{nav.uitvaart}</a>
              <a href={servicePath(lang, "portret")}>{nav.portret}</a>
              <a href={servicePath(lang, "huwelijk")}>{nav.huwelijk}</a>
              <Link href={homePath(lang)}>{nav.werk}</Link>
            </div>
            <div className="foot-col">
              <h4>{foot.contactTitle}</h4>
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
              <h4>{foot.legalTitle}</h4>
              {foot.legal.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{foot.rights}</span>
          <span>{foot.made}</span>
        </div>
      </div>
    </footer>
  );
}
