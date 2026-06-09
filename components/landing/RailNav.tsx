"use client";

import { lpScrollTo } from "@/lib/utils";

export interface RailItem {
  id: string;
  label: string;
}

export function RailNav({ items, active }: { items: RailItem[]; active: string }) {
  return (
    <nav className="lp-rail" aria-label="Secties">
      {items.map((it) => (
        <a key={it.id} href={"#" + it.id} onClick={lpScrollTo(it.id)} data-on={active === it.id ? "1" : "0"}>
          <span className="lp-rail-label">{it.label}</span>
          <span className="lp-rail-tick" />
        </a>
      ))}
    </nav>
  );
}
