import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FolderOpen, Phone, Search as SearchIcon } from "lucide-react";
import { navItems, ressourcenItems } from "@/components/layout/navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  location: string;
  mobileRessourcenOpen: boolean;
  setMobileRessourcenOpen: (isOpen: boolean) => void;
  closeMenu: () => void;
  onSearchOpen: () => void;
}

export function MobileMenu({
  isOpen,
  location,
  mobileRessourcenOpen,
  setMobileRessourcenOpen,
  closeMenu,
  onSearchOpen,
}: MobileMenuProps) {
  const isRessourcenActive = ressourcenItems.some((item) =>
    location.startsWith(item.href.split("#")[0]),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:hidden border-t border-border/50 bg-background overflow-y-auto overscroll-contain"
          style={{
            maxHeight: "calc(100dvh - 5rem)",
            WebkitOverflowScrolling: "touch",
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeMenu();
            }
          }}
        >
          <nav
            className="container py-4 flex flex-col gap-2"
            style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px) + 88px)" }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "bg-sage-wash text-sage-darker"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isRessourcenActive
                    ? "bg-sage-wash text-sage-darker"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
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

              <AnimatePresence>
                {mobileRessourcenOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      id="mobile-ressourcen-menu"
                      role="menu"
                      aria-label="Ressourcen-Navigation"
                      className="pl-4 mt-1 flex flex-col gap-1"
                    >
                      {ressourcenItems.map((item) => {
                        const Icon = item.icon;
                        const normalizedHref = item.href.split("#")[0];
                        const isActive = location === normalizedHref;
                        const isSoforthilfe = item.href === "/soforthilfe";

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            onClick={() => {
                              closeMenu();
                              setMobileRessourcenOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              isSoforthilfe
                                ? "text-alert font-semibold"
                                : isActive
                                  ? "bg-sage-wash/50 text-sage-darker"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSoforthilfe ? "text-alert" : ""}`} />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/soforthilfe"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-alert text-white mt-2"
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted mt-2 border border-border/50"
              aria-label="Suche öffnen"
            >
              <SearchIcon className="w-5 h-5" />
              Suchen
            </button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
