import { useEffect, useRef, useState } from "react";
import AppLink from "@/components/AppLink";
import { useLocation } from "wouter";
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
    <header className="site-header">
      <div className="container">
        <div className="site-header__inner">
          <AppLink
            href="/"
            aria-label="Borderline · Hilfe für Angehörige – Startseite"
            className="site-header__brand group"
          >
            <BrandMark
              variant="primary"
              className="h-9 w-9 md:h-[38px] md:w-[38px]"
              iconClassName="h-[18px] w-[18px] md:h-[19px] md:w-[19px]"
            />
            <span className="site-header__brand-text">
              <span className="site-header__brand-title">
                Borderline · Angehörige
              </span>
              <span className="site-header__brand-subtitle">
                Fachstelle · PUK Zürich
              </span>
            </span>
          </AppLink>

          <nav
            className="hidden lg:flex items-center gap-4 shrink-0"
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
                  className={`site-header__link ${
                    isActive ? "site-header__link--active" : ""
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
              className="site-header__action site-header__action--search hidden sm:inline-flex"
              aria-label="Suchen"
            >
              <SearchIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Suchen</span>
            </button>

            <button
              type="button"
              onClick={onSearchOpen}
              className="site-header__icon-button sm:hidden"
              aria-label="Suche öffnen"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>

            <AppLink
              href="/soforthilfe"
              aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
              className="site-header__action site-header__action--crisis hidden lg:inline-flex"
            >
              <span aria-hidden="true" className="site-header__crisis-dot" />
              <span>Soforthilfe</span>
            </AppLink>

            <AppLink
              href="/soforthilfe"
              aria-label="Soforthilfe – Notfallnummern und Krisenberatung"
              className="site-header__mobile-crisis lg:hidden"
            >
              <Phone className="h-[18px] w-[18px]" />
            </AppLink>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`site-header__icon-button lg:hidden ${
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
