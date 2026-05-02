import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getMobileFloatingMode } from "@/domain/floating-ui";
import { ChevronUp } from "@/icons/root-icons";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();
  const floatingMode = getMobileFloatingMode(location);
  const hideOnMobile = floatingMode !== "default";

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={`fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/95 text-[color:var(--accent-primary)] shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)] backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]/30 focus-visible:ring-offset-2 sm:h-12 sm:w-12 ${hideOnMobile ? "hidden sm:flex" : "flex"}`}
      aria-label="Nach oben scrollen"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}
