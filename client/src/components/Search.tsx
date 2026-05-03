import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AppLink from "@/components/AppLink";
import "./search.css";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  loadNormalizedSearchIndex,
  type NormalizedSearchEntry,
} from "@/content/searchIndexLoader";
import type { SearchEntry } from "@/content/searchIndex";

// Suchbare Inhalte der Website
interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getSearchTerms(query: string) {
  const normalizedQuery = normalizeSearchQuery(query);
  return normalizedQuery
    ? normalizedQuery.split(" ").filter(term => term.length > 1)
    : [];
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchIndex, setSearchIndex] = useState<
    NormalizedSearchEntry[] | null
  >(null);
  const [searchIndexState, setSearchIndexState] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dialogRef = useFocusTrap(isOpen);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = useMemo(
    () => normalizeSearchQuery(deferredQuery),
    [deferredQuery]
  );
  const searchTerms = useMemo(
    () => getSearchTerms(deferredQuery),
    [deferredQuery]
  );
  const hasSearchTerms = searchTerms.length > 0;

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setSearchIndexState(current => (current === "ready" ? current : "loading"));

    void loadNormalizedSearchIndex()
      .then(loadedIndex => {
        if (cancelled) return;

        setSearchIndex(loadedIndex);
        setSearchIndexState("ready");
      })
      .catch(() => {
        if (cancelled) return;

        setSearchIndexState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      focusTimeoutRef.current = setTimeout(
        () => inputRef.current?.focus(),
        100
      );
    }
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
        focusTimeoutRef.current = null;
      }
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Body-Scroll-Lock: Verhindert Hintergrund-Scrollen auf iOS/Safari
  useScrollLock(isOpen);

  // Search logic
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    if (!hasSearchTerms || !searchIndex) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    debounceTimeoutRef.current = setTimeout(() => {
      const matches = searchIndex
        .filter(({ searchText }) =>
          searchTerms.every(term => searchText.includes(term))
        )
        .map(({ item }) => item);

      // Sort by relevance (title matches first)
      matches.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        if (
          aTitle.includes(normalizedQuery) &&
          !bTitle.includes(normalizedQuery)
        )
          return -1;
        if (
          !aTitle.includes(normalizedQuery) &&
          bTitle.includes(normalizedQuery)
        )
          return 1;
        return 0;
      });

      startTransition(() => {
        setResults(matches.slice(0, 8));
        setActiveIndex(-1);
      });
    }, 150);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = null;
      }
    };
  }, [hasSearchTerms, normalizedQuery, searchIndex, searchTerms]);

  const handleResultClick = () => {
    setQuery("");
    onClose();
  };

  // Arrow key navigation in results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = prev < results.length - 1 ? prev + 1 : 0;
        resultsRef.current
          ?.querySelectorAll("a")
          [next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => {
        const next = prev > 0 ? prev - 1 : results.length - 1;
        resultsRef.current
          ?.querySelectorAll("a")
          [next]?.scrollIntoView({ block: "nearest" });
        return next;
      });
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const link = resultsRef.current?.querySelectorAll("a")[activeIndex] as
        | HTMLAnchorElement
        | undefined;
      link?.click();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/24 z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Suche"
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="rounded-2xl border border-border/70 bg-[color:var(--bg-elevated)] shadow-[0_22px_48px_-34px_rgba(15,23,42,0.28)] overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                <SearchIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Suchen Sie nach Themen, z.B. 'Validierung', 'Grenzen setzen', 'Notfall'..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                  role="combobox"
                  aria-label="Website durchsuchen"
                  aria-autocomplete="list"
                  aria-expanded={results.length > 0}
                  aria-controls="search-results"
                  aria-activedescendant={
                    results.length > 0 && activeIndex >= 0
                      ? `search-result-${activeIndex}`
                      : undefined
                  }
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                    aria-label="Sucheingabe löschen"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 hover:bg-muted rounded-md transition-colors ml-1 flex-shrink-0"
                  aria-label="Suche schliessen"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto" aria-live="polite">
                {!hasSearchTerms ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Geben Sie mindestens einen Suchbegriff mit 2 Zeichen ein,
                      um zu suchen
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {[
                        "Validierung",
                        "Grenzen",
                        "Krise",
                        "Selbstfürsorge",
                        "DBT",
                      ].map(term => (
                        <button
                          type="button"
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 rounded-full border border-border/60 bg-background text-sm text-muted-foreground transition-colors hover:bg-muted/35 hover:text-foreground"
                          aria-label={`Nach ${term} suchen`}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchIndexState === "loading" ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">
                      Suchindex wird geladen…
                    </p>
                  </div>
                ) : searchIndexState === "error" ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">
                      Die Suche konnte gerade nicht geladen werden.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Bitte versuchen Sie es in einem Moment erneut.
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-muted-foreground">
                      Keine Ergebnisse für \"{query}\"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Versuchen Sie andere Suchbegriffe oder schauen Sie in der
                      Navigation
                    </p>
                  </div>
                ) : (
                  <div
                    className="py-2"
                    ref={resultsRef}
                    role="listbox"
                    id="search-results"
                  >
                    {results.map((result, index) => (
                      <AppLink
                        key={`${result.href}-${index}`}
                        href={result.href}
                        onClick={handleResultClick}
                        id={`search-result-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`flex items-start gap-4 px-4 py-3 transition-colors group ${index === activeIndex ? "bg-muted/70" : "hover:bg-muted/50"}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="rounded-sm border border-border/70 bg-white px-2 py-0.5 text-xs font-medium text-[color:var(--accent-label)]">
                              {result.section}
                            </span>
                          </div>
                          <h4 className="mt-1 font-medium text-foreground transition-colors group-hover:text-[color:var(--accent-primary)]">
                            {result.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-6" />
                      </AppLink>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-background/70 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                      ↑↓
                    </kbd>{" "}
                    navigieren
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-[10px]">
                      ESC
                    </kbd>{" "}
                    schliessen
                  </span>
                </span>
                {results.length > 0 && (
                  <span>
                    {results.length} Ergebnis{results.length !== 1 ? "se" : ""}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
