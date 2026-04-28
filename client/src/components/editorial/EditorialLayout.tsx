import type { ReactNode } from "react";

interface EditorialLayoutProps {
  children: ReactNode;
  /** "narrow" = 38rem Lese-Mass für Fliesstext; "wide" = 46rem für Hero und Listen */
  width?: "narrow" | "wide";
}

export function EditorialLayout({
  children,
  width = "narrow",
}: EditorialLayoutProps) {
  const maxWidth =
    width === "narrow" ? "var(--measure)" : "var(--measure-wide)";
  return (
    <div className="bg-[var(--bg-primary)] px-[var(--container-pad)] pt-[var(--space-4)] pb-[var(--space-7)] md:px-[var(--container-pad-md)] md:pt-[var(--space-5)] md:pb-[var(--space-8)]">
      <div className="mx-auto" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
