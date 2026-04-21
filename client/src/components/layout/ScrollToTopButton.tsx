import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useLocation } from "wouter";
import { getMobileFloatingMode } from "@/domain/floating-ui";

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
      className={`fixed right-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-navy hover:bg-navy-light text-white shadow-lg items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${hideOnMobile ? "hidden sm:flex" : "flex"}`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label="Nach oben scrollen"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}
