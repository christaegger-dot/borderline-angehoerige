import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
}

/**
 * Hook für animierte Zähler, die beim Sichtbarwerden hochzählen.
 * Verwendet IntersectionObserver und requestAnimationFrame.
 */
export function useCountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  separator = "",
  decimals = 0,
}: UseCountUpOptions) {
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animate();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animate = () => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutExpo für natürliches Abbremsen
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = easedProgress * end;
      const formatted = decimals > 0
        ? currentValue.toFixed(decimals)
        : Math.round(currentValue).toString();

      // Tausender-Separator einfügen falls gewünscht
      const withSeparator = separator
        ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        : formatted;

      setDisplayValue(`${prefix}${withSeparator}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return { ref, displayValue };
}
