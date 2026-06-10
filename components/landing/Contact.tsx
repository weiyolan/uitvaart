"use client";

import type { SiteContent, SiteContactLine } from "@/lib/site-types";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";

/* CONTACT (reuses styles.css .contact). */
export function Contact({ c }: { c: SiteContent }) {
  return (
    <section className="section-pad contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <Reveal>
            <Overline>{c.contact.overline}</Overline>
          </Reveal>
          <h2 className="contact-title display" style={{ margin: "18px 0 0" }}>
            <RevealWords text={c.contact.title} />
          </h2>
          <Reveal className="contact-body" as="p">
            {c.contact.body}
          </Reveal>
          <Reveal className="contact-actions">
            <a className="btn" href={c.contact.callHref}>
              {c.contact.callBtn}
            </a>
            <a className="btn btn--ghost" href={c.contact.mailHref}>
              {c.contact.mailBtn}
            </a>
          </Reveal>
        </div>
        <Reveal className="contact-card">
          {c.contact.lines.map((l: SiteContactLine, i: number) => (
            <div className="cline" key={i}>
              <span className="k">{l.k}</span>
              {l.href ? (
                <a className="v" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {l.v}
                </a>
              ) : (
                <span className="v">{l.v}</span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
