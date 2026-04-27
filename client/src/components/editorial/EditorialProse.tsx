import type { ReactNode } from "react";

interface EditorialProseProps {
  children: ReactNode;
  /** Drop-Cap auf erstem Buchstaben des ersten Absatzes (Magazin-Detail) */
  dropCap?: boolean;
}

export function EditorialProse({
  children,
  dropCap = false,
}: EditorialProseProps) {
  const className = dropCap
    ? "editorial-prose editorial-prose-dropcap"
    : "editorial-prose";
  return <div className={className}>{children}</div>;
}
