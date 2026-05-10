import { useEffect, useRef, useState } from "react";
import AppLink from "@/components/AppLink";
import { useLocation } from "wouter";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMobileMenuOpen = useRef(false);

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
    if (wasMobileMenuOpen.current && !mobileMenuOpen) {
      menuButtonRef.current?.focus();
    }
    wasMobileMenuOpen.current = mobileMenuOpen;
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
    <header
      className="sticky top-0 z-50 border-b bg-background/98"
      style={{ borderColor: "var(--rule-color)" }}
    >
      <div className="container">
        <div className="flex min-h-14 items-center justify-between gap-3 py-1.5 md:min-h-20 md:gap-6 md:py-3">
          <AppLink
            href="/"
            aria-label="Borderline · Hilfe für Angehörige – Startseite"
            className="flex items-center gap-3.5 group shrink-0"
          >
            <BrandMark variant="primary" />
            <span className="hidden xl:flex flex-col leading-tight">
              <span className="font-display text-[19px] font-medium leading-[1.1] tracking-[-0.01em] text-foreground transition-colors group-hover:text-[color:var(--accent-primary)] whitespace-nowrap">
                Borderline · Angehörige
              </span>
              <span
                className="mt-1 text-[11px] font-medium uppercase tracking-[0.08em] whitespace-nowrap"
                style={{ color: "var(--accent-label)" }}
              >
                Fachstelle · PUK Zürich
              </span>
            </span>
          </AppLink>

          <span
            aria-hidden="true"
            className="hidden xl:block h-8 w-px shrink-0"
            style={{ background: "var(--rule-color-strong)" }}
          />

          <nav
            className="hidden md:flex items-center gap-3 lg:gap-6 shrink-0"
            aria-label="Hauptnavigation"
          >
            {navItems.map(item => {
              const isActive =
                location === item.href || location.startsWith(item.href + "/");
              return (
                <AppLink
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center min-h-[44px] text-sm whitespace-nowrap py-2 border-b-[1.5px] transition-colors duration-200 ${
                    isActive
                      ? "font-medium text-[color:var(--fg-primary)] border-[color:var(--accent-primary)]"
                      : "font-normal text-[color:var(--fg-secondary)] border-transparent hover:text-[color:var(--fg-primary)] hover:border-[color:var(--accent-primary)]"
                  }`}
                >
                  {item.label}
                </AppLink>
              );
            })}

            <RessourcenMenu
              location={location}
              isOpen={ressourcenOpen}
              setIsOpen={setRessourcenOpen}
            />
          </nav>

          <div className="flex items-center gap-2 shrink-0 md:ml-auto">
            <button
              type="button"
              onClick={onSearchOpen}
              className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border px-3 lg:px-4 text-[13px] transition-colors"
              style={{
                borderColor: "var(--rule-color-strong)",
                color: "var(--fg-secondary)",
              }}
              aria-label="Suchen"
            >
              <SearchIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Suchen</span>
            </button>

            <button
              type="button"
              onClick={onSearchOpen}
              className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white/74 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              aria-label="Suche öffnen"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>

            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden lg:inline-flex h-10 rounded-full bg-alert px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(185,28,28,0.18)] hover:bg-alert/90"
            >
              <AppLink
                href="/soforthilfe"
                aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
              >
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-2 w-2 rounded-full bg-white/85"
                />
                <span>Soforthilfe</span>
              </AppLink>
            </Button>

            <AppLink
              href="/soforthilfe"
              aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-alert text-white shadow-[0_8px_14px_-12px_rgba(197,95,61,0.52)]"
            >
              <Phone className="h-[18px] w-[18px]" />
            </AppLink>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white/74 transition-colors ${
                mobileMenuOpen ? currentAccent.surfaceActive : "hover:bg-muted"
              }`}
              aria-controls="mobile-navigation-dialog"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Menü schliessen" : "Menü öffnen"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
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
