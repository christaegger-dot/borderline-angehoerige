import { useState, useEffect, lazy, Suspense } from "react";
import AppLink from "@/components/AppLink";
import { useLocation } from "wouter";
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
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const isSoforthilfePage = location === "/soforthilfe";
  const showInlineSoforthilfeLink = !isSoforthilfePage;

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

      <aside
        aria-label="Notfallhinweis"
        className="border-b border-border/50 bg-background"
      >
        <div className="container flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-[13px] text-muted-foreground">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
            Notfallkontakte
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="text-foreground/90">Schweiz · Kanton Zürich</span>
          <span className="hidden md:inline">•</span>
          <span>Für andere Regionen bitte lokale Notrufnummern nutzen.</span>
          {showInlineSoforthilfeLink && (
            <AppLink
              href="/soforthilfe"
              className="sm:hidden inline-flex min-h-9 items-center rounded-full border border-border/70 bg-background px-3 py-1 text-sm font-medium text-[color:var(--accent-primary)] transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]/30 focus-visible:ring-offset-2"
            >
              Zur Soforthilfe
            </AppLink>
          )}
        </div>
      </aside>

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
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand + Absender */}
            <div className="lg:col-span-1">
              <AppLink href="/" className="flex items-center gap-2 mb-4">
                <BrandMark variant="light" />
                <span className="font-medium text-base text-foreground">
                  Borderline · Hilfe für Angehörige
                </span>
              </AppLink>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Psychoedukatives Informationsangebot für Angehörige von Menschen
                mit Borderline-Muster.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
                Themen
              </p>
              <ul className="space-y-1">
                {navItems.map(item => (
                  <li key={item.href}>
                    <AppLink
                      href={item.href}
                      className="inline-flex items-center py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
                Ressourcen
              </p>
              <ul className="space-y-1">
                {ressourcenItems.map(item => (
                  <li key={item.href}>
                    <AppLink
                      href={item.href}
                      className="inline-flex items-center py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hinweis */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-label)]">
                Hinweis
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Diese Website ersetzt keine professionelle Beratung oder
                Therapie. Bei akuten Krisen wenden Sie sich bitte an die
                Notfallnummern.
              </p>
            </div>
          </div>

          {/* Absender-Einordnung */}
          <div
            className="mt-8 border-t pt-8"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p className="text-sm leading-relaxed text-foreground">
              Herausgegeben von der Fachstelle Angehörigenarbeit der
              Psychiatrischen Universitätsklinik Zürich (PUK).
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Redaktionell eigenständiges Informationsangebot der Fachstelle
              Angehörigenarbeit innerhalb der PUK Zürich.
            </p>
          </div>

          <div
            className="mt-6 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center"
            style={{ borderColor: "var(--rule-color)" }}
          >
            <p className="text-sm text-muted-foreground">
              © 2026 Borderline · Hilfe für Angehörige. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <AppLink
                href="/fachstelle"
                className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Fachstelle
              </AppLink>
              <AppLink
                href="/ueber-uns"
                className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Über uns
              </AppLink>
              <AppLink
                href="/impressum"
                className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Impressum
              </AppLink>
              <AppLink
                href="/datenschutz"
                className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Datenschutz
              </AppLink>
              <AppLink
                href="/barrierefreiheit"
                className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Barrierefreiheit
              </AppLink>
              <AppLink
                href="/feedback"
                className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Feedback
              </AppLink>
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
