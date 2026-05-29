import type { ReactNode } from "react";
import { Info, AlertTriangle } from "lucide-react";

export type EditorialCalloutVariant = "hinweis" | "achtung";

interface EditorialCalloutProps {
  /**
   * Semantisches Register:
   * - `hinweis` (Default): ruhiger, neutraler Cream-Deep-Block mit Sage-Schiene.
   *   Für Einordnung/Kontext.
   * - `achtung`: warm abgesetzter Terrakotta-Block — gedämpfte Fortsetzung der
   *   Soforthilfe-Ampel, damit Dringlichkeit innerhalb einer Seite erkennbar
   *   wird, ohne die Ruhe zu brechen.
   */
  variant?: EditorialCalloutVariant;
  /** Sichtbares Label oben. Default je nach Variante («Hinweis» / «Achtung»). */
  title?: string;
  children: ReactNode;
  className?: string;
}

interface VariantStyle {
  label: string;
  surface: string;
  rule: string;
  labelColor: string;
  Icon: typeof Info;
}

// Kontraste auf der jeweiligen Surface mit axe verifiziert (WCAG AA):
// hinweis  – Label #3f5a4e auf #ebe2cf, Body --fg-primary auf #ebe2cf
// achtung  – Label #8a3f1d auf #f7e7dd, Body --fg-primary auf #f7e7dd
const VARIANTS: Record<EditorialCalloutVariant, VariantStyle> = {
  hinweis: {
    label: "Hinweis",
    surface: "var(--bg-cream-deep)",
    rule: "var(--accent-label)",
    labelColor: "#3f5a4e",
    Icon: Info,
  },
  achtung: {
    label: "Achtung",
    surface: "#f7e7dd",
    rule: "#c67a5c",
    labelColor: "#8a3f1d",
    Icon: AlertTriangle,
  },
};

/**
 * Zurückhaltende semantische Register-Ebene als Ergänzung zur ruhigen
 * Sand/Aubergine/Salbei-Palette. Bewusst sparsam einsetzen — keine flächige
 * Callout-Inflation. Keine Animation (reduced-motion unkritisch).
 */
export function EditorialCallout({
  variant = "hinweis",
  title,
  children,
  className,
}: EditorialCalloutProps) {
  const { label, surface, rule, labelColor, Icon } = VARIANTS[variant];
  const heading = title ?? label;

  return (
    <aside
      className={
        className
          ? `my-6 flex gap-3 rounded-sm border-l-[3px] p-4 ${className}`
          : "my-6 flex gap-3 rounded-sm border-l-[3px] p-4"
      }
      style={{ background: surface, borderColor: rule }}
      aria-label={heading}
    >
      <Icon
        aria-hidden="true"
        className="mt-0.5 h-5 w-5 flex-shrink-0"
        style={{ color: rule }}
      />
      <div className="min-w-0">
        <p
          className="text-xs font-medium uppercase"
          style={{
            color: labelColor,
            letterSpacing: "var(--tracking-caps)",
          }}
        >
          {heading}
        </p>
        <div
          className="mt-1"
          style={{
            color: "var(--fg-primary)",
            fontSize: "var(--text-sm)",
            lineHeight: "var(--lh-relaxed)",
          }}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
