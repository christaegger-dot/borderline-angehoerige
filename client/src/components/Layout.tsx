import { Link, useLocation } from "wouter";
import { useState, useEffect, lazy, Suspense } from "react";
const Search = lazy(() => import("@/components/Search"));
import { Button } from "@/components/ui/button";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BrandMark } from "@/components/layout/BrandMark";
import { navItems, ressourcenItems } from "@/components/layout/navigationData";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { getMobileFloatingMode as _getMobileFloatingMode } from "@/domain/floating-ui";
import { Phone } from "@/icons/root-icons";
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
  const floatingMode = _getMobileFloatingMode(location);
  const isSoforthilfePage = location === "/soforthilfe";
  const hasMobileSoforthilfeFab =
    !isSoforthilfePage && floatingMode === "default";
  const showInlineSoforthilfeLink =
    !isSoforthilfePage && !hasMobileSoforthilfeFab;

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
        className="border-b border-border/40 bg-sage-wash/40"
      >
        <div className="container py-1.5 text-sm md:text-xs text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-medium text-foreground">
            Notfallkontakte: Schweiz (Kanton Zürich)
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Für andere Regionen bitte lokale Notrufnummern nutzen.</span>
          {showInlineSoforthilfeLink && (
            <Link
              href="/soforthilfe"
              className="sm:hidden inline-flex min-h-9 items-center rounded-full border border-alert/25 bg-alert/10 px-3 py-1 text-sm font-medium text-alert transition-colors hover:bg-alert/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alert/40 focus-visible:ring-offset-2"
            >
              Zur Soforthilfe
            </Link>
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
      <footer className="bg-navy text-white border-t border-navy-light/20 mt-auto">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand + Absender */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <BrandMark variant="dark" />
                <span className="font-medium text-base text-white">
                  Borderline · Hilfe für Angehörige
                </span>
              </Link>
              <p className="text-white/90 text-sm leading-relaxed">
                Psychoedukatives Informationsangebot für Angehörige von Menschen
                mit Borderline-Muster.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-base">
                Themen
              </h3>
              <ul className="space-y-1">
                {navItems.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center py-1.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-base">
                Ressourcen
              </h3>
              <ul className="space-y-1">
                {ressourcenItems.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center py-1.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hinweis */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-base">
                Hinweis
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Diese Website ersetzt keine professionelle Beratung oder
                Therapie. Bei akuten Krisen wenden Sie sich bitte an die
                Notfallnummern.
              </p>
            </div>
          </div>

          {/* Absender-Einordnung */}
          <div className="border-t border-white/10 mt-8 pt-8">
            <p className="text-sm text-white leading-relaxed">
              Herausgegeben von der Fachstelle Angehörigenarbeit der
              Psychiatrischen Universitätsklinik Zürich (PUK).
            </p>
            <p className="text-xs text-white/90 mt-1 leading-relaxed">
              Redaktionell eigenständiges Informationsangebot der Fachstelle
              Angehörigenarbeit innerhalb der PUK Zürich.
            </p>
          </div>

          <div
            className={`border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 ${
              hasMobileSoforthilfeFab ? "pb-24 sm:pb-0" : ""
            }`}
          >
            <p className="text-white/90 text-sm">
              © 2026 Borderline · Hilfe für Angehörige. Alle Rechte vorbehalten.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link
                href="/fachstelle"
                className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Fachstelle
              </Link>
              <Link
                href="/ueber-uns"
                className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Über uns
              </Link>
              <Link
                href="/impressum"
                className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Datenschutz
              </Link>
              <Link
                href="/barrierefreiheit"
                className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Barrierefreiheit
              </Link>
              <Link
                href="/feedback"
                className="text-white/90 hover:text-white text-sm transition-colors inline-flex items-center min-h-[44px]"
              >
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Soforthilfe-FAB: nur auf kurzen Standardseiten, damit lange Inhalte frei bedienbar bleiben */}
      {hasMobileSoforthilfeFab && (
        <Button
          asChild
          variant="default"
          className="sm:hidden fixed right-4 z-50 h-12 px-4 rounded-full bg-alert hover:bg-alert/85 text-white shadow-lg gap-2 text-sm font-semibold bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))]"
        >
          <Link
            href="/soforthilfe"
            aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
          >
            <Phone className="w-4 h-4" />
            Soforthilfe
          </Link>
        </Button>
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
