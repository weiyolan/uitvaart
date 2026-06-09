"use client";

import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { LP_SERVICE_FILES } from "@/lib/constants";

/* FOOTER — same as the landing footer; "werk" links back to the landing. */
export function SpFooter({ c }: { c: SiteContent }) {
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
              <a href={LP_SERVICE_FILES.uitvaart}>{c.nav.uitvaart}</a>
              <a href={LP_SERVICE_FILES.portret}>{c.nav.portret}</a>
              <a href={LP_SERVICE_FILES.huwelijk}>{c.nav.huwelijk}</a>
              <Link href="/">{c.nav.werk}</Link>
            </div>
            <div className="foot-col">
              <h4>{c.foot.contactTitle}</h4>
              <a href="tel:+32476506209">+32 476 50 62 09</a>
              <a href="mailto:milo.weiler@gmail.com">milo.weiler@gmail.com</a>
              <a href="https://instagram.com/miloweiler" target="_blank" rel="noreferrer">
                @miloweiler
              </a>
              <p>Hof Savelkoul 40, 2640 Mortsel</p>
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
