"use client";

import type { SiteContent } from "@/lib/content";
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
            <a className="btn" href="tel:+32476506209">
              {c.contact.callBtn}
            </a>
            <a className="btn btn--ghost" href="mailto:milo.weiler@gmail.com">
              {c.contact.mailBtn}
            </a>
          </Reveal>
        </div>
        <Reveal className="contact-card">
          {c.contact.lines.map((l, i) => (
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
