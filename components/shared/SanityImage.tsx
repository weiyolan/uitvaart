import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Figure } from "@/lib/site-types";

type SanityImageValue = NonNullable<Figure["image"]>;

/* Renders a real Sanity scan via next/image with the localized alt text and
   LQIP blur. Returns null when no asset is set (caller falls back to the
   FilmFrame placeholder). Alt is required at the type level for SEO/a11y. */
export function SanityImage({
  value,
  alt,
  className,
  sizes,
  priority,
}: {
  value: SanityImageValue;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!value?.asset) return null;
  const dims = value.asset.metadata?.dimensions;
  const width = dims?.width ?? 1200;
  const height = dims?.height ?? 1500;
  const lqip = value.asset.metadata?.lqip ?? undefined;
  return (
    <Image
      className={className}
      src={urlFor(value).width(width).height(height).fit("crop").auto("format").url()}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
    />
  );
}
