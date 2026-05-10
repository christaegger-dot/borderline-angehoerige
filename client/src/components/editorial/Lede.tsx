import type { ReactNode } from "react";

interface LedeProps {
  /**
   * Lead-Variante:
   * - `default`: `var(--text-lg)`, ohne max-width
   * - `hero`: `1.375rem` mit `max-w-[30em]` für Hero-Bereiche
   */
  size?: "default" | "hero";
  /** Zusätzliche Klassen, z.B. `mt-6`. */
  className?: string;
  children: ReactNode;
}

export function Lede({ size = "default", className, children }: LedeProps) {
  const sizeClass = size === "hero" ? "max-w-[30em]" : "";
  const combinedClass = [sizeClass, className].filter(Boolean).join(" ");

  return (
    <p
      className={combinedClass || undefined}
      style={{
        fontSize: size === "hero" ? "1.375rem" : "var(--text-lg)",
        lineHeight: "var(--lh-snug)",
        color: "var(--fg-secondary)",
      }}
    >
      {children}
    </p>
  );
}
