import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ressourcenItems } from "@/components/layout/navigationData";
import { useRessourcenMenuA11y } from "@/components/layout/useRessourcenMenuA11y";
import type { NavigationItem } from "@/domain/content-types";

interface RessourcenMenuProps {
  location: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/** Group ressourcen items by their `group` field, preserving insertion order. */
function groupItems(
  items: NavigationItem[]
): { name: string; items: NavigationItem[] }[] {
  const map = new Map<string, NavigationItem[]>();
  for (const item of items) {
    const key = item.group ?? "Weitere";
    const group = map.get(key);
    if (group) {
      group.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  return Array.from(map, ([name, groupItems]) => ({ name, items: groupItems }));
}

/** Return the flat index of an item across all groups. */
function flatIndex(
  groups: { items: NavigationItem[] }[],
  groupIdx: number,
  itemIdx: number
): number {
  let idx = 0;
  for (let g = 0; g < groupIdx; g++) {
    idx += groups[g].items.length;
  }
  return idx + itemIdx;
}

export function RessourcenMenu({
  location,
  isOpen,
  setIsOpen,
}: RessourcenMenuProps) {
  const isRessourcenActive = ressourcenItems.some(item =>
    location.startsWith(item.href.split("#")[0])
  );

  const groups = groupItems(ressourcenItems);

  const {
    menuContainerRef,
    triggerRef,
    handleMenuKeyDown,
    openAndFocusFirst,
    closeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    setMenuItemRef,
    onMenuItemFocus,
    triggerA11yProps,
    menuA11yProps,
  } = useRessourcenMenuA11y({
    isOpen,
    setIsOpen,
    itemCount: ressourcenItems.length,
  });

  return (
    <div
      ref={menuContainerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        ref={triggerRef}
        onClick={() => (isOpen ? setIsOpen(false) : openAndFocusFirst())}
        onKeyDown={e => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            openAndFocusFirst();
          }
        }}
        className={`flex items-center gap-1 px-2.5 lg:px-3 xl:px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
          isRessourcenActive || isOpen
            ? "bg-sage-dark text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
        }`}
        {...triggerA11yProps}
      >
        Ressourcen
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onKeyDown={handleMenuKeyDown}
            className="absolute right-0 top-full mt-1 bg-background border border-border/60 rounded-xl shadow-lg shadow-black/8 z-50"
            style={{ width: "min(680px, calc(100vw - 2rem))" }}
            {...menuA11yProps}
          >
            <div className="grid grid-cols-3 gap-0 p-2">
              {groups.map((group, groupIdx) => (
                <div
                  key={group.name}
                  className={
                    groupIdx > 0
                      ? "border-l border-border/40 pl-2"
                      : undefined
                  }
                >
                  {/* Group header inspired by Seconds' "—— LABEL" pattern */}
                  <div className="flex items-center gap-2.5 px-3 pt-2 pb-2">
                    <span className="w-5 h-px bg-sage-dark/30" />
                    <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-sage-dark/70 whitespace-nowrap">
                      {group.name}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    {group.items.map((item, itemIdx) => {
                      const Icon = item.icon;
                      const normalizedHref = item.href.split("#")[0];
                      const isActive =
                        location === normalizedHref ||
                        location.startsWith(`${normalizedHref}/`);
                      const idx = flatIndex(groups, groupIdx, itemIdx);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          tabIndex={-1}
                          ref={(el: HTMLAnchorElement | null) => {
                            setMenuItemRef(idx, el);
                          }}
                          onFocus={() => {
                            onMenuItemFocus(idx);
                          }}
                          onClick={closeDropdown}
                          className={`flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-inset ${
                            isActive
                              ? "bg-sage-wash/50 text-sage-darker font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60 focus:text-foreground focus:bg-muted/60"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="leading-tight">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
