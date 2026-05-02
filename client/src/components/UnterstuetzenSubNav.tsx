import { Link, useLocation } from "wouter";

const tabs = [
  { href: "/unterstuetzen/uebersicht", label: "Übersicht" },
  { href: "/unterstuetzen/alltag", label: "Im Alltag" },
  { href: "/unterstuetzen/krise", label: "In der Krise" },
  { href: "/unterstuetzen/therapie", label: "Therapie" },
];

export default function UnterstuetzenSubNav() {
  const [location] = useLocation();

  return (
    <nav
      aria-label="Unterstützen – Unterseiten"
      className="border-b border-border/45 bg-background/92"
    >
      <div className="container">
        <div className="scrollbar-none flex overflow-x-auto -mb-px gap-1">
          {tabs.map(({ href, label }) => {
            const isActive = location === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  isActive
                    ? "border-[color:var(--accent-primary)] text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/70",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
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
