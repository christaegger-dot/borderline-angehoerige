import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/components/layout/navigationData";
import { RessourcenMenu } from "@/components/layout/RessourcenMenu";
import { getRouteAccent } from "@/components/layout/routeAccent";
import { BrandMark } from "@/components/layout/BrandMark";
import { Menu, Phone, Search as SearchIcon, X } from "@/icons/root-icons";

interface HeaderNavProps {
  onSearchOpen: () => void;
}

export function HeaderNav({ onSearchOpen }: HeaderNavProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileRessourcenOpen, setMobileRessourcenOpen] = useState(false);
  const [ressourcenOpen, setRessourcenOpen] = useState(false);
  const currentAccent = getRouteAccent(location);

  useEffect(() => {
    setRessourcenOpen(false);
    setMobileRessourcenOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.setAttribute("data-mobile-menu", "open");
    } else {
      document.body.removeAttribute("data-mobile-menu");
    }

    return () => document.body.removeAttribute("data-mobile-menu");
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileRessourcenOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/88 backdrop-blur-xl shadow-[0_10px_34px_-28px_rgba(15,23,42,0.45)]">
      <div className="container">
        <div className="flex min-h-16 items-center justify-between gap-2 py-2 md:min-h-20 md:gap-4 md:py-3">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <BrandMark
              className="md:h-11 md:w-11"
              iconClassName="md:h-[22px] md:w-[22px]"
            />
            <span className="hidden xl:flex flex-col leading-tight">
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-sage-darker whitespace-nowrap">
                Borderline · Hilfe für Angehörige
              </span>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                Orientierung für belastete Beziehungssituationen
              </span>
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-0.5 rounded-full border border-border/70 bg-white/82 px-2 py-1 shadow-[0_18px_34px_-30px_rgba(15,23,42,0.55)] backdrop-blur-sm shrink-0"
            aria-label="Hauptnavigation"
          >
            {navItems.map(item => {
              const isActive =
                location === item.href || location.startsWith(item.href + "/");
              const accent = getRouteAccent(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 lg:px-3 xl:px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? accent.navActive
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <RessourcenMenu
              location={location}
              isOpen={ressourcenOpen}
              setIsOpen={setRessourcenOpen}
            />
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onSearchOpen}
              className="hidden sm:flex h-10 items-center gap-2 rounded-full border border-border/70 bg-white/82 px-4 text-sm text-muted-foreground shadow-sm shadow-black/5 transition-colors hover:border-border hover:text-foreground"
              aria-label="Suchen"
            >
              <SearchIcon className="w-4 h-4" />
              <span>Suchen</span>
            </button>

            <button
              type="button"
              onClick={onSearchOpen}
              className="sm:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/82 text-muted-foreground shadow-sm shadow-black/5 transition-all hover:text-foreground hover:bg-muted"
              aria-label="Suche öffnen"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden sm:flex h-10 rounded-full bg-alert px-4 text-white shadow-[0_18px_34px_-22px_rgba(197,95,61,0.75)] hover:bg-alert/85"
            >
              <Link
                href="/soforthilfe"
                aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
              >
                <Phone className="w-4 h-4 lg:mr-0 xl:mr-2" />
                <span className="hidden xl:inline">Soforthilfe</span>
              </Link>
            </Button>

            <Link
              href="/soforthilfe"
              aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
              className="sm:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-alert text-white shadow-[0_8px_16px_-8px_rgba(197,95,61,0.6)]"
            >
              <Phone className="w-5 h-5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/82 shadow-sm shadow-black/5 transition-colors ${
                mobileMenuOpen ? currentAccent.surfaceActive : "hover:bg-muted"
              }`}
              aria-label={mobileMenuOpen ? "Menü schliessen" : "Menü öffnen"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        location={location}
        mobileRessourcenOpen={mobileRessourcenOpen}
        setMobileRessourcenOpen={setMobileRessourcenOpen}
        closeMenu={() => setMobileMenuOpen(false)}
        onSearchOpen={onSearchOpen}
      />
    </header>
  );
}
