import { useState, useEffect, lazy, Suspense } from "react";
import AppLink from "@/components/AppLink";
const Search = lazy(() => import("@/components/Search"));
import { HeaderNav } from "@/components/layout/HeaderNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BrandMark } from "@/components/layout/BrandMark";
import { navItems, ressourcenItems } from "@/components/layout/navigationData";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
interface LayoutProps {
  children: React.ReactNode;
}

export function isSearchShortcut(
  event: Pick<KeyboardEvent, "metaKey" | "ctrlKey" | "key">
) {
  return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
}

export default function Layout({ children }: LayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const footerLegalItems = [
    { href: "/fachstelle", label: "Fachstelle" },
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/barrierefreiheit", label: "Barrierefreiheit" },
    { href: "/feedback", label: "Feedback" },
  ];

  // Keyboard shortcut for search (Ctrl/Cmd + K) + ESC closes dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSearchShortcut(e)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip-Navigation für Accessibility (WCAG 2.1 Level A) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sage-dark focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
      >
        Zum Inhalt springen
      </a>

      <HeaderNav onSearchOpen={() => setSearchOpen(true)} />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="mt-auto border-t bg-background"
        style={{ borderColor: "var(--rule-color)" }}
      >
        <div className="container py-10 md:py-14">
          <div
            className="grid gap-7 border-b pb-8 md:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] md:gap-10"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <div className="max-w-2xl">
              <AppLink href="/" className="inline-flex items-center gap-3">
                <BrandMark variant="light" className="h-10 w-10" />
                <span className="flex flex-col leading-tight">
                  <span className="font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                    Borderline · Hilfe für Angehörige
                  </span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.11em] text-[color:var(--accent-label)]">
                    Fachstelle Angehörigenarbeit · PUK Zürich
                  </span>
                </span>
              </AppLink>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Psychoedukative Orientierung für Angehörige: fachlich
                eingeordnet, entstigmatisierend und mit klarem Blick auf
                Selbstschutz.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                Herausgegeben von der Fachstelle Angehörigenarbeit der
                Psychiatrischen Universitätsklinik Zürich.
              </p>
            </div>

            <div className="rounded-2xl border bg-white/45 p-5 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[color:var(--accent-label)]">
                Hinweis
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Diese Website ersetzt keine professionelle Beratung oder
                Therapie. Bei akuten Krisen zählen die Notfallnummern und der
                schnellste erreichbare Weg.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Schweiz · Kanton Zürich. Für andere Regionen bitte lokale
                Notrufnummern nutzen.
              </p>
            </div>
          </div>

          <div className="grid gap-8 py-8 md:grid-cols-2 md:gap-12">
            <nav aria-label="Themen im Footer">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.11em] text-[color:var(--accent-label)]">
                Themen
              </p>
              <ul className="grid gap-x-6 sm:grid-cols-2">
                {navItems.map(item => (
                  <li key={item.href}>
                    <AppLink
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Ressourcen im Footer">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.11em] text-[color:var(--accent-label)]">
                Ressourcen
              </p>
              <ul className="grid gap-x-6 sm:grid-cols-2">
                {ressourcenItems.map(item => (
                  <li key={item.href}>
                    <AppLink
                      href={item.href}
                      className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div
            className="flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p className="text-sm text-muted-foreground">
              © 2026 Borderline · Hilfe für Angehörige. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {footerLegalItems.map(item => (
                <AppLink
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </AppLink>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Search Modal */}
      {searchOpen && (
        <Suspense fallback={null}>
          <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}

      {/* Zurück nach oben Button */}
      <ScrollToTopButton />
    </div>
  );
}
