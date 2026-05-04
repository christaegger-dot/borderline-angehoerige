import type React from "react";
import { cn } from "@/lib/utils";

// Shared button primitive for Editorial pill/choice patterns.
// Encapsulates the onMouseEnter/onMouseLeave border-color hover logic and
// focus-visible classes that are duplicated across Wegweiser, Selbsttest,
// Materialien, and Notfallkarte.
//
// Variants:
//   primary  — filled accent (Notfallkarte Drucken-Button)
//   secondary — border + bg-elevated + hover (NavPillButton, SecondaryButton)
//   choice   — full-width block + border + hover (ChoiceButton, OptionButton)
//   filter   — Sage-Caps tab in tablist; aktiv = 2px Aubergine-Hairline unten
//              (Phase 2 typografische Veredelung). Container muss role="tablist"
//              haben — der Button selbst trägt role="tab" + aria-selected.

export type EditorialPillButtonVariant =
  | "primary"
  | "secondary"
  | "choice"
  | "filter";

interface EditorialPillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: EditorialPillButtonVariant;
  selected?: boolean;
}

const BASE =
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const VARIANT_CLASS: Record<EditorialPillButtonVariant, string> = {
  primary: "rounded-full border px-5 py-2 text-sm",
  secondary: "rounded-full border px-4 py-1.5 text-sm",
  choice:
    "block w-full rounded-md border px-5 py-4 text-left disabled:cursor-not-allowed",
  filter:
    "uppercase tracking-[0.14em] px-3 py-2 text-[13px] font-medium border-b-2 border-transparent first:pl-0",
};

function getStyle(
  variant: EditorialPillButtonVariant,
  selected: boolean
): React.CSSProperties {
  if (variant === "primary") {
    return {
      borderColor: "var(--accent-primary)",
      backgroundColor: "var(--accent-primary)",
      color: "var(--bg-primary)",
      fontWeight: 500,
    };
  }
  if (variant === "filter") {
    return {
      // Bottom-border via inline-style — Tailwind `border-b-2` ist gesetzt,
      // aber die Border-Color-Active-State braucht Token-Resolution.
      borderBottomColor: selected ? "var(--accent-primary)" : "transparent",
      color: selected ? "var(--fg-primary)" : "var(--accent-label)",
    };
  }
  if (variant === "choice") {
    return {
      borderColor: selected ? "var(--accent-primary)" : "var(--rule-color)",
      backgroundColor: "var(--bg-elevated)",
      color: "var(--fg-primary)",
      fontSize: "var(--text-md)",
      lineHeight: "var(--lh-snug)",
      fontWeight: selected ? 500 : 400,
    };
  }
  // secondary
  return {
    borderColor: selected ? "var(--accent-primary)" : "var(--rule-color)",
    backgroundColor: "var(--bg-elevated)",
    color: "var(--fg-secondary)",
  };
}

export function EditorialPillButton({
  variant = "secondary",
  selected = false,
  disabled,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}: EditorialPillButtonProps) {
  const needsHover = variant === "secondary" || variant === "choice";
  const restingStyle = getStyle(variant, selected);
  const restingBorder = restingStyle.borderColor as string;

  const handleMouseEnter = needsHover
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!selected && !disabled) {
          e.currentTarget.style.borderColor = "var(--accent-primary)";
        }
        onMouseEnter?.(e);
      }
    : variant === "filter"
      ? (e: React.MouseEvent<HTMLButtonElement>) => {
          if (!selected && !disabled) {
            // Hover: zarte Aubergine-Hairline unten andeuten
            e.currentTarget.style.borderBottomColor = "rgba(91, 58, 78, 0.4)";
          }
          onMouseEnter?.(e);
        }
      : onMouseEnter;

  const handleMouseLeave = needsHover
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!selected && !disabled) {
          e.currentTarget.style.borderColor = restingBorder;
        }
        onMouseLeave?.(e);
      }
    : variant === "filter"
      ? (e: React.MouseEvent<HTMLButtonElement>) => {
          if (!selected && !disabled) {
            e.currentTarget.style.borderBottomColor = "transparent";
          }
          onMouseLeave?.(e);
        }
      : onMouseLeave;

  // A11y: Filter-Variant impliziert role="tab" innerhalb eines tablists,
  // mit aria-selected. Konsumenten überschreiben role/aria-selected via
  // {...props} falls nötig.
  const filterA11y =
    variant === "filter" ? { role: "tab", "aria-selected": selected } : {};

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(BASE, VARIANT_CLASS[variant], className)}
      style={{ ...restingStyle, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...filterA11y}
      {...props}
    >
      {children}
    </button>
  );
}
