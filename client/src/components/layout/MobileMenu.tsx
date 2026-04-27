import { useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ChevronDown,
  FolderOpen,
  Phone,
  Search as SearchIcon,
} from "@/icons/root-icons";
import { navItems, ressourcenItems } from "@/components/layout/navigationData";
import { getRouteAccent } from "@/components/layout/routeAccent";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface MobileMenuProps {
  isOpen: boolean;
  location: string;
  mobileRessourcenOpen: boolean;
  setMobileRessourcenOpen: (isOpen: boolean) => void;
  closeMenu: () => void;
  onSearchOpen: () => void;
}

// Ressourcen-Items nach Gruppe sortieren
function groupRessourcenItems(items: typeof ressourcenItems) {
  const groups: Record<string, typeof ressourcenItems> = {};
  for (const item of items) {
    const key = item.group ?? "Weitere";
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return groups;
}

export function MobileMenu({
  isOpen,
  location,
  mobileRessourcenOpen,
  setMobileRessourcenOpen,
  closeMenu,
  onSearchOpen,
}: MobileMenuProps) {
  const isRessourcenActive = ressourcenItems.some(item =>
    location.startsWith(item.href.split("#")[0])
  );
  const currentAccent = getRouteAccent(location);

  const groupedRessourcen = groupRessourcenItems(ressourcenItems);
  const dialogRef = useFocusTrap(isOpen);
  const descriptionId = useRef(
    `mobile-navigation-description-${Math.random().toString(36).slice(2, 10)}`
  );

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }
  }, [dialogRef, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      id="mobile-navigation-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-navigation-title"
      aria-describedby={descriptionId.current}
      className="lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-border/50 bg-[linear-gradient(180deg,rgba(250,250,247,0.96),rgba(247,249,248,1))] [-webkit-overflow-scrolling:touch]"
      onKeyDown={e => {
        if (e.key === "Escape") {
          closeMenu();
        }
      }}
    >
      <nav
        className="container flex flex-col gap-2 py-4 pb-[calc(16px+env(safe-area-inset-bottom,0px)+88px)]"
        aria-label="Hauptnavigation"
      >
        <div className="sr-only">
          <h2 id="mobile-navigation-title">Mobile Navigation</h2>
          <p id={descriptionId.current}>
            Hauptnavigation, Ressourcen und Soforthilfe.
          </p>
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.startsWith(item.href);
          const accent = getRouteAccent(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-base font-medium transition-all ${
                isActive
                  ? accent.surfaceActive
                  : "border-transparent bg-white/70 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-1">
          <button
            type="button"
            onClick={() => setMobileRessourcenOpen(!mobileRessourcenOpen)}
            aria-expanded={mobileRessourcenOpen}
            aria-controls="mobile-ressourcen-menu"
            className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl border text-base font-medium transition-all ${
              isRessourcenActive
                ? currentAccent.surfaceActive
                : "border-transparent bg-white/70 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <FolderOpen className="w-5 h-5" />
              Ressourcen
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${mobileRessourcenOpen ? "rotate-180" : ""}`}
            />
          </button>

          {mobileRessourcenOpen && (
            <div className="overflow-hidden">
              <div
                id="mobile-ressourcen-menu"
                aria-label="Ressourcen-Navigation"
                className="pl-4 mt-1 flex flex-col gap-0"
              >
                {Object.entries(groupedRessourcen).map(
                  ([groupName, items], groupIndex) => (
                    <div
                      key={groupName}
                      className={groupIndex > 0 ? "mt-2" : ""}
                    >
                      <p className="px-4 pt-2 pb-1 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
                        {groupName}
                      </p>
                      {items.map(item => {
                        const Icon = item.icon;
                        const normalizedHref = item.href.split("#")[0];
                        const isActive = location === normalizedHref;
                        const accent = getRouteAccent(item.href);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              closeMenu();
                              setMobileRessourcenOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 rounded-xl border font-medium transition-all ${
                              item.secondary
                                ? "py-1.5 text-xs"
                                : "py-2.5 text-sm"
                            } ${
                              isActive
                                ? accent.surfaceActive
                                : item.secondary
                                  ? "border-transparent text-muted-foreground/70 hover:text-foreground hover:bg-muted/60"
                                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            <Icon
                              className={
                                item.secondary ? "w-3.5 h-3.5" : "w-4 h-4"
                              }
                            />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <Link
          href="/soforthilfe"
          onClick={closeMenu}
          className="mt-2 flex items-center gap-3 rounded-2xl bg-alert px-4 py-3 text-base font-medium text-white shadow-[0_18px_32px_-22px_rgba(197,95,61,0.8)]"
        >
          <Phone className="w-5 h-5" />
          Soforthilfe
        </Link>

        <button
          type="button"
          onClick={() => {
            closeMenu();
            onSearchOpen();
          }}
          className="mt-2 flex items-center gap-3 rounded-2xl border border-border/60 bg-white/70 px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
          aria-label="Suche öffnen"
        >
          <SearchIcon className="w-5 h-5" />
          Suchen
        </button>
      </nav>
    </div>
  );
}
