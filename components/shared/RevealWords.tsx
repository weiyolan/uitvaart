"use client";

import { Fragment } from "react";
import type { CSSProperties, ElementType } from "react";
import { useInView } from "@/lib/hooks";

/* RevealWords — splits text into words that fade up one by one (slow stagger).
   `text` may contain "\n" for explicit line breaks. Real space text nodes sit
   between words so spacing survives every renderer (CSS: .rw / .rw-word). */
export function RevealWords({
  text,
  as = "span",
  className = "",
  wordClass = "",
  style,
  step = 75,
  start = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClass?: string;
  style?: CSSProperties;
  step?: number;
  start?: number;
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.95 });
  const lines = String(text)
    .split("\n")
    .map((line) => line.split(" "));
  // Cumulative word offset per line so each word's stagger delay is stable
  // across renders (global word index = lineStart[li] + k).
  const lineStart = lines.map((_, li) => lines.slice(0, li).reduce((n, l) => n + l.length, 0));
  const Tag: ElementType = as;
  return (
    <Tag ref={ref} className={`rw ${className}${inView ? " in" : ""}`} style={style}>
      {lines.map((words, li) => (
        <span className="rw-line" key={li}>
          {words.map((word, k) => {
            const delay = start + (lineStart[li] + k) * step;
            return (
              <Fragment key={k}>
                <span className={`rw-word ${wordClass}`} style={{ transitionDelay: `${delay}ms` }}>
                  {word}
                </span>
                {k < words.length - 1 ? " " : null}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
