import { Link, useLocation } from "wouter";

const tabs = [
  { href: "/unterstuetzen/uebersicht", label: "Übersicht" },
  { href: "/unterstuetzen/alltag", label: "Im Alltag" },
  { href: "/unterstuetzen/krise", label: "In der Krise" },
  { href: "/unterstuetzen/therapie", label: "Therapie" },
];

/**
 * Sub-Navigation für den Unterstützen-Hub. Visuell konsolidiert auf das
 * Phase-2-Filter-Tab-Pattern: Sage-Caps-Labels, 2 px Aubergine-Hairline am
 * aktiven Tab, kein Button-Background.
 *
 * A11y-Honesty-Note: Brief schlug `role="tablist"` + `role="tab"` vor. Das
 * ist für In-Page-State-Switching (z. B. Filter-Tabs auf /verstehen) korrekt.
 * Bei dieser Sub-Nav navigieren die Tabs aber zu verschiedenen URLs — das
 * sind Navigations-Links, keine Tab-States. Deshalb hier proper navigation
 * semantics: `<nav>` mit `aria-label`, `<a>`-Tags (via Link), und
 * `aria-current="page"` am aktiven Tab. Das ist ARIA-spec-konform für
 * Navigations-Tab-Bars (z. B. WAI-ARIA Authoring Practices Tab-Pattern für
 * URL-Navigation). Visuell identisch zum Filter-Tab-Pattern auf Tier-1-Pages.
 */
export default function UnterstuetzenSubNav() {
  const [location] = useLocation();

  return (
    <nav
      aria-label="Unterstützen – Unterseiten"
      className="border-b bg-background/94"
      style={{ borderColor: "var(--rule-color)" }}
    >
      <div className="container">
        <div className="scrollbar-none -mb-px flex flex-wrap items-baseline gap-x-1 overflow-x-auto pt-3 pb-3">
          {tabs.map(({ href, label }) => {
            const isActive = location === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="px-3 py-2 text-[13px] font-medium uppercase tracking-[0.14em] whitespace-nowrap border-b-2 border-transparent transition-colors first:pl-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  borderBottomStyle: "solid",
                  borderBottomColor: isActive
                    ? "var(--accent-primary)"
                    : "transparent",
                  color: isActive ? "var(--fg-primary)" : "var(--accent-label)",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
