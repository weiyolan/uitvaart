import type { ReactNode } from "react";

export function Overline({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`overline ${className}`}>{children}</div>;
}
