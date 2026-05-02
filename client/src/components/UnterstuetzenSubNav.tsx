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
      className="border-b border-border/45 bg-background/94"
    >
      <div className="container">
        <div className="scrollbar-none -mb-px flex gap-0.5 overflow-x-auto">
          {tabs.map(({ href, label }) => {
            const isActive = location === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center border-b-2 px-3 py-2.5 text-[13px] font-medium whitespace-nowrap leading-none transition-colors sm:px-4 sm:py-3 sm:text-sm",
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
