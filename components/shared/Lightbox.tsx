"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { urlFor } from "@/sanity/lib/image";
import type { Figure } from "@/lib/site-types";

type LightboxImage = NonNullable<Figure["image"]>;

type LightboxContextValue = {
  /* Opens the enlarged view for a Sanity scan. No-op when no asset is set. */
  open: (image: LightboxImage, label?: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

/* Safe to call without a provider — returns a no-op opener so a FilmFrame
   rendered outside a LightboxProvider simply stays non-interactive. */
export function useLightbox(): LightboxContextValue {
  return useContext(LightboxContext) ?? NOOP;
}
const NOOP: LightboxContextValue = { open: () => {} };

/* Click-to-enlarge modal. Uses the native <dialog> element so focus trapping,
   Esc-to-close, focus restore and the top layer are handled by the platform;
   the image is portalled to <body> and the smooth-scroll engine is paused
   while it is open. */
export function LightboxProvider({
  children,
  closeLabel = "Sluiten",
}: {
  children: ReactNode;
  closeLabel?: string;
}) {
  const [current, setCurrent] = useState<{ image: LightboxImage; label: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  /* Portal target only exists after mount (SSR has no document). Deliberate
     mount-time flip, not a render-loop trigger. */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const open = useCallback((image: LightboxImage, label = "") => {
    if (!image?.asset) return;
    setCurrent({ image, label });
  }, []);
  const close = useCallback(() => setCurrent(null), []);
  const value = useMemo(() => ({ open }), [open]);

  /* Drive the native dialog + scroll lock from state. */
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (current && !dlg.open) dlg.showModal();
    if (!current && dlg.open) dlg.close();
    if (current) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [current, lenis]);

  const dims = current?.image.asset?.metadata?.dimensions;
  const caption = current ? current.image.alt || current.label : "";

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <dialog
            ref={dialogRef}
            className="lb"
            aria-label={caption || "Foto"}
            onClose={close}
            onCancel={close}
            onClick={(e) => {
              if (e.target === dialogRef.current) close();
            }}
          >
            {current ? (
              <figure className="lb-fig">
                <button type="button" className="lb-close" onClick={close} aria-label={closeLabel}>
                  <span aria-hidden="true">×</span>
                </button>
                <Image
                  className="lb-img"
                  src={urlFor(current.image).width(2200).fit("max").auto("format").url()}
                  alt={caption}
                  width={dims?.width ?? 1600}
                  height={dims?.height ?? 2000}
                  sizes="92vw"
                  priority
                />
                {caption ? <figcaption className="lb-cap">{caption}</figcaption> : null}
              </figure>
            ) : null}
          </dialog>,
          document.body,
        )}
    </LightboxContext.Provider>
  );
}
