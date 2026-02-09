import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Menu, X, Phone, Heart, BookOpen, MessageCircle, Shield, Sparkles, Download, Search as SearchIcon, TrendingUp, Users, ChevronDown, FileText, HelpCircle, BookMarked, Building2, Stethoscope, FolderOpen } from "lucide-react";
const Search = lazy(() => import("@/components/Search"));
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ReadingProgress, ScrollToTop, Breadcrumbs, KeyboardShortcuts } from "@/components/UXEnhancements";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/verstehen", label: "Verstehen", icon: BookOpen },
  { href: "/unterstuetzen/uebersicht", label: "Unterstützen", icon: Heart },
  { href: "/kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { href: "/grenzen", label: "Grenzen", icon: Shield },
  { href: "/selbstfuersorge", label: "Selbstfürsorge", icon: Sparkles },
  { href: "/genesung", label: "Genesung", icon: TrendingUp },
  { href: "/beratung", label: "Beratung", icon: Users },
];

const ressourcenItems = [
  { href: "/soforthilfe", label: "Soforthilfe", icon: Phone },
  { href: "/materialien", label: "Materialien & Handouts", icon: Download },
  { href: "/beratung", label: "Beratung & Netzwerke", icon: Users },
  { href: "/fachstelle", label: "Fachstelle & Kontakt", icon: Building2 },
  { href: "/faq", label: "Häufige Fragen (FAQ)", icon: HelpCircle },
  { href: "/glossar", label: "Glossar", icon: BookMarked },
  { href: "/buchempfehlungen", label: "Buchempfehlungen", icon: BookOpen },
  { href: "/unterstuetzen/therapie#therapieangebote", label: "Therapieangebote Zürich", icon: Stethoscope },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ressourcenOpen, setRessourcenOpen] = useState(false);
  const [mobileRessourcenOpen, setMobileRessourcenOpen] = useState(false);
  const ressourcenRef = useRef<HTMLDivElement>(null);
  const ressourcenButtonRef = useRef<HTMLButtonElement>(null);
  const ressourcenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setRessourcenOpen(false);
        // Fokus zurück auf den Trigger-Button
        ressourcenButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ressourcenRef.current && !ressourcenRef.current.contains(e.target as Node)) {
        setRessourcenOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setRessourcenOpen(false);
    setMobileRessourcenOpen(false);
  }, [location]);

  const handleRessourcenEnter = () => {
    if (ressourcenTimeoutRef.current) {
      clearTimeout(ressourcenTimeoutRef.current);
      ressourcenTimeoutRef.current = null;
    }
    setRessourcenOpen(true);
  };

  const handleRessourcenLeave = () => {
    ressourcenTimeoutRef.current = setTimeout(() => {
      setRessourcenOpen(false);
    }, 200);
  };

  const isRessourcenActive = ressourcenItems.some(item => location.startsWith(item.href.split('#')[0]));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip-Navigation für Accessibility (WCAG 2.1 Level A) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
      >
        Zum Inhalt springen
      </a>

      {/* Lesefortschritt-Anzeige */}
      <ReadingProgress />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-2 lg:gap-4 h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NqViLFGTREhdSTsm.webp"
                alt="Startseite"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                width={40}
                height={40}
                loading="eager"
                decoding="async"
              />
              <span className="hidden 2xl:inline font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                Borderline · Hilfe für Angehörige
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
              {navItems.map((item) => {
                const isActive = location.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 lg:px-3 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                      isActive
                        ? "bg-terracotta-light text-terracotta-darker"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Ressourcen Dropdown */}
              <div 
                ref={ressourcenRef}
                className="relative"
                onMouseEnter={handleRessourcenEnter}
                onMouseLeave={handleRessourcenLeave}
              >
                <button
                  ref={ressourcenButtonRef}
                  onClick={() => setRessourcenOpen(!ressourcenOpen)}
                  className={`flex items-center gap-1 px-2.5 lg:px-3 xl:px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                    isRessourcenActive || ressourcenOpen
                      ? "bg-terracotta-light text-terracotta-darker"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  aria-expanded={ressourcenOpen}
                  aria-haspopup="true"
                  aria-controls="ressourcen-menu"
                >
                  Ressourcen
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${ressourcenOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {ressourcenOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      id="ressourcen-menu"
                      role="menu"
                      aria-label="Ressourcen-Navigation"
                      className="absolute right-0 top-full mt-1 w-64 bg-background border border-border/60 rounded-xl shadow-lg shadow-black/8 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        {ressourcenItems.map((item, index) => {
                          const Icon = item.icon;
                          const isActive = location === item.href.split('#')[0] || location.startsWith(item.href.split('#')[0] + '/');
                          const isSoforthilfe = item.href === "/soforthilfe";
                          return (
                            <div key={item.href}>
                              {/* Trennlinie nach Soforthilfe */}
                              {index === 1 && (
                                <div className="mx-3 my-1 border-t border-border/40" />
                              )}
                              <Link
                                href={item.href}
                                role="menuitem"
                                onClick={() => setRessourcenOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                                  isSoforthilfe
                                    ? "text-alert font-medium hover:bg-alert/8"
                                    : isActive
                                      ? "bg-terracotta-light/50 text-terracotta-darker font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                }`}
                              >
                                <Icon className={`w-4 h-4 shrink-0 ${isSoforthilfe ? "text-alert" : ""}`} />
                                {item.label}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Search, Emergency Button & Mobile Menu */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search Button – Desktop */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all text-sm"
                aria-label="Suchen"
              >
                <SearchIcon className="w-4 h-4" />
                <span className="hidden xl:inline">Suchen</span>
                <kbd aria-hidden="true" className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
              {/* Search Button – Mobile (nur Icon) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Suche öffnen"
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              <Link href="/soforthilfe" aria-label="Soforthilfe – Notfallnummern und Krisenberatung">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-alert hover:bg-alert text-white animate-breathe hidden sm:flex"
                  tabIndex={-1}
                >
                  <Phone className="w-4 h-4 lg:mr-0 xl:mr-2" />
                  <span className="hidden xl:inline">Soforthilfe</span>
                </Button>
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Menü öffnen"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:hidden border-t border-border/50 bg-background"
            >
              <nav className="container py-4 flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        isActive
                          ? "bg-terracotta-light text-terracotta-darker"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}

                {/* Mobile Ressourcen Accordion */}
                <div className="mt-1">
                  <button
                    onClick={() => setMobileRessourcenOpen(!mobileRessourcenOpen)}
                    aria-expanded={mobileRessourcenOpen}
                    aria-controls="mobile-ressourcen-menu"
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      isRessourcenActive
                        ? "bg-terracotta-light text-terracotta-darker"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5" />
                      Ressourcen
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileRessourcenOpen ? "rotate-180" : ""}`} />
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
                        <div id="mobile-ressourcen-menu" role="menu" aria-label="Ressourcen-Navigation" className="pl-4 mt-1 flex flex-col gap-1">
                          {ressourcenItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location === item.href.split('#')[0];
                            const isSoforthilfe = item.href === "/soforthilfe";
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                role="menuitem"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileRessourcenOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                  isSoforthilfe
                                    ? "text-alert font-semibold"
                                    : isActive
                                      ? "bg-terracotta-light/50 text-terracotta-darker"
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
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-alert text-white mt-2"
                >
                  <Phone className="w-5 h-5" />
                  Soforthilfe
                </Link>
                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
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
      </header>

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
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031008193/NqViLFGTREhdSTsm.webp"
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
                Evidenzbasierte Unterstützung für Angehörige von Menschen mit Borderline-Persönlichkeitsstörung.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-base">Themen</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-base">Ressourcen</h3>
              <ul className="space-y-2">
                {ressourcenItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hinweis */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-base">Hinweis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Diese Website ersetzt keine professionelle Beratung oder Therapie. Bei akuten Krisen wenden Sie sich bitte an die Notfallnummern.
              </p>
            </div>
          </div>

          {/* Absender-Einordnung */}
          <div className="border-t border-border/50 mt-8 pt-8">
            <p className="text-sm text-foreground leading-relaxed">
              Für Angehörige – Fachstelle Angehörigenarbeit, Psychiatrische Universitätsklinik Zürich (PUK) – Ch. Egger
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Unabhängiges Informationsangebot der Fachstelle Angehörigenarbeit. Nicht offizieller Kommunikationskanal der PUK Zürich.
            </p>
          </div>

          <div className="border-t border-border/50 mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 Borderline · Hilfe für Angehörige. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-4">
              <Link href="/fachstelle" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Fachstelle
              </Link>
              <Link href="/ueber-uns" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Über uns
              </Link>
              <Link href="/impressum" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Emergency Button (Mobile) – Pill mit Label */}
      <Link href="/soforthilfe" className="sm:hidden fixed bottom-4 right-4 z-50" aria-label="Soforthilfe – Notfallnummern und Krisenberatung">
        <Button
          variant="default"
          className="h-14 px-5 rounded-full bg-alert hover:bg-alert text-white shadow-lg animate-breathe gap-2 text-base font-semibold"
          tabIndex={-1}
        >
          <Phone className="w-5 h-5" />
          Hilfe
        </Button>
      </Link>

      {/* Search Modal */}
      {searchOpen && (
        <Suspense fallback={null}>
          <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </Suspense>
      )}
      
      {/* Zurück nach oben Button */}
      <ScrollToTop />
      
      {/* Tastaturkürzel-Hinweis */}
      <KeyboardShortcuts />
    </div>
  );
}
