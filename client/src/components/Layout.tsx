import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Heart, BookOpen, MessageCircle, Shield, Sparkles, Download, Search as SearchIcon } from "lucide-react";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/verstehen", label: "Verstehen", icon: BookOpen },
  { href: "/unterstuetzen", label: "Unterstützen", icon: Heart },
  { href: "/kommunizieren", label: "Kommunizieren", icon: MessageCircle },
  { href: "/grenzen", label: "Grenzen", icon: Shield },
  { href: "/selbstfuersorge", label: "Selbstfürsorge", icon: Sparkles },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search (Ctrl/Cmd + K)
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[oklch(0.65_0.12_55)] to-[oklch(0.65_0.08_145)] flex items-center justify-center">
                <span className="text-white font-display font-semibold text-sm md:text-base">E</span>
              </div>
              <span className="font-display font-semibold text-lg md:text-xl text-foreground group-hover:text-[oklch(0.65_0.12_55)] transition-colors">
                Eiertanz
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[oklch(0.85_0.08_55)] text-[oklch(0.35_0.08_55)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search, Emergency Button & Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all text-sm"
                aria-label="Suche öffnen"
              >
                <SearchIcon className="w-4 h-4" />
                <span className="hidden md:inline">Suchen</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              <Link href="/notfall">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[oklch(0.55_0.20_25)] hover:bg-[oklch(0.50_0.22_25)] text-white animate-breathe hidden sm:flex"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Soforthilfe
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
              transition={{ duration: 0.3 }}
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
                          ? "bg-[oklch(0.85_0.08_55)] text-[oklch(0.35_0.08_55)]"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/notfall"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium bg-[oklch(0.55_0.20_25)] text-white mt-2"
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
                >
                  <SearchIcon className="w-5 h-5" />
                  Suchen
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[oklch(0.94_0.02_85)] border-t border-border/50 mt-auto">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.65_0.12_55)] to-[oklch(0.65_0.08_145)] flex items-center justify-center">
                  <span className="text-white font-display font-semibold">E</span>
                </div>
                <span className="font-display font-semibold text-xl text-foreground">
                  Eiertanz
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Evidenzbasierte Unterstützung für Angehörige von Menschen mit Borderline-Persönlichkeitsstörung.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Themen</h4>
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
              <h4 className="font-display font-semibold text-foreground mb-4">Ressourcen</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/notfall" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Krisenressourcen
                  </Link>
                </li>
                <li>
                  <Link href="/materialien" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Materialien & Handouts
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Selbsthilfegruppen
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Hinweis</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Diese Website ersetzt keine professionelle Beratung oder Therapie. Bei akuten Krisen wenden Sie sich bitte an die Notfallnummern.
              </p>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 Schluss mit dem Eiertanz. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-4">
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

      {/* Fixed Emergency Button (Mobile) */}
      <Link href="/notfall" className="sm:hidden fixed bottom-4 right-4 z-50">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full bg-[oklch(0.55_0.20_25)] hover:bg-[oklch(0.50_0.22_25)] text-white shadow-lg animate-breathe"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </Link>

      {/* Search Modal */}
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
