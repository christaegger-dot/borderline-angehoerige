import { Link, useLocation } from "wouter";
import { useState, useEffect, lazy, Suspense } from "react";
import { Phone } from "lucide-react";
const Search = lazy(() => import("@/components/Search"));
import { Button } from "@/components/ui/button";
import { ScrollToTopButton, Breadcrumbs } from "@/components/UXEnhancements";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { navItems, ressourcenItems } from "@/components/layout/navigationData";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search (Ctrl/Cmd + K) + ESC closes dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
      >
        Zum Inhalt springen
      </a>

      <HeaderNav onSearchOpen={() => setSearchOpen(true)} />

      <div className="border-b border-border/40 bg-sage-wash/40">
        <div className="container py-1.5 text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-medium text-foreground">
            Notfallkontakte: Schweiz (Kanton Zürich)
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Für andere Regionen bitte lokale Notrufnummern nutzen.</span>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <Breadcrumbs />

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-sand-muted border-t border-border/50 mt-auto">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand + Absender */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img
                  src="/favicon-192.png"
                  alt="Startseite"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-medium text-base text-foreground">
                  Borderline · Hilfe für Angehörige
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Psychoedukatives Informationsangebot für Angehörige von Menschen
                mit Borderline-Muster.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-base">
                Themen
              </h3>
              <ul className="space-y-1">
                {navItems.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center py-1.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-base">
                Ressourcen
              </h3>
              <ul className="space-y-1">
                {ressourcenItems.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center py-1.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hinweis */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-base">
                Hinweis
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Diese Website ersetzt keine professionelle Beratung oder
                Therapie. Bei akuten Krisen wenden Sie sich bitte an die
                Notfallnummern.
              </p>
            </div>
          </div>

          {/* Absender-Einordnung */}
          <div className="border-t border-border/50 mt-8 pt-8">
            <p className="text-sm text-foreground leading-relaxed">
              Herausgegeben von der Fachstelle Angehörigenarbeit der
              Psychiatrischen Universitätsklinik Zürich (PUK).
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Redaktionell eigenständiges Informationsangebot der Fachstelle
              Angehörigenarbeit innerhalb der PUK Zürich.
            </p>
          </div>

          <div className="border-t border-border/50 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 Borderline · Hilfe für Angehörige. Alle Rechte
              vorbehalten.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link
                href="/fachstelle"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Fachstelle
              </Link>
              <Link
                href="/ueber-uns"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Über uns
              </Link>
              <Link
                href="/impressum"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Datenschutz
              </Link>
              <Link
                href="/feedback"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Emergency Button (Mobile) – Pill mit Label */}
      {/* Position: bottom-20 damit der ScrollToTop-Button (bottom-4) nicht überlappt */}
      {/* Auf /soforthilfe selbst wird der Button ausgeblendet */}
      {location !== "/soforthilfe" && (
        <Link
          href="/soforthilfe"
          className="sm:hidden fixed z-50"
          style={{
            bottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))",
            right: "1rem",
          }}
          aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
        >
          <Button
            variant="default"
            className="h-12 px-4 rounded-full bg-alert hover:bg-alert/85 text-white shadow-lg gap-2 text-sm font-semibold"
            tabIndex={-1}
          >
            <Phone className="w-4 h-4" />
            Soforthilfe
          </Button>
        </Link>
      )}

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
