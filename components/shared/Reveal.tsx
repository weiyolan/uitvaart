"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/* Reveal — fades/slides/blurs its children up when scrolled into view
   (CSS: .reveal / .reveal.in). `as` chooses the rendered element; any extra
   props (href, data-*, etc.) are forwarded to it. */
export function Reveal({
  as = "div",
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Record<string, unknown>) {
  const [ref, inView] = useInView();
  const Tag: ElementType = as;
  return (
    <Tag ref={ref} className={`reveal ${className}${inView ? " in" : ""}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}
