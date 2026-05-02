import AppLink from "@/components/AppLink";
import { ressourcenItems } from "@/components/layout/navigationData";
import { getRouteAccent } from "@/components/layout/routeAccent";
import { useRessourcenMenuA11y } from "@/components/layout/useRessourcenMenuA11y";
import type { NavigationItem } from "@/domain/content-types";
import { ChevronDown } from "@/icons/root-icons";

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
  const currentAccent = getRouteAccent(location);

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
            ? currentAccent.navActive
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
        }`}
        {...triggerA11yProps}
      >
        Ressourcen
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full z-50 mt-2 w-[min(680px,calc(100vw-2rem))] rounded-[1.25rem] border border-border/65 bg-white/96 shadow-[0_24px_48px_-36px_rgba(15,23,42,0.38)]"
          {...menuA11yProps}
        >
          <div className="grid grid-cols-3 gap-0 p-3">
            {groups.map((group, groupIdx) => (
              <div
                key={group.name}
                className={
                  groupIdx > 0 ? "border-l border-border/40 pl-3" : undefined
                }
              >
                <div className="px-3 pt-2 pb-2.5">
                  <span
                    className={`text-[11px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap ${currentAccent.groupLabel}`}
                  >
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
                    const accent = getRouteAccent(item.href);
                    const idx = flatIndex(groups, groupIdx, itemIdx);

                    return (
                      <AppLink
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
                        className={`flex items-center gap-2.5 rounded-xl border px-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-sage-dark/40 focus-visible:ring-inset ${
                          item.secondary
                            ? "py-1.5 text-[12px]"
                            : "py-2.5 text-[13px]"
                        } ${
                          isActive
                            ? `${accent.surfaceActive} font-medium`
                            : item.secondary
                              ? "border-transparent text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 focus:text-foreground focus:bg-muted/50"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60 focus:text-foreground focus:bg-muted/60"
                        }`}
                      >
                        <Icon
                          className={`shrink-0 ${item.secondary ? "w-3.5 h-3.5" : "w-4 h-4"}`}
                        />
                        <span className="leading-tight">{item.label}</span>
                      </AppLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
