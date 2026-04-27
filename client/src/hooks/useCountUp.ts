import { useState, useEffect, useRef, useCallback } from "react";

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
 *
 * Fix: Zeigt den Endwert sofort als Fallback an (kein "0%" sichtbar).
 * Die Animation läuft nur als visuelles Enhancement, wenn der Block
 * im Viewport sichtbar wird.
 *
 * hasAnimatedRef ist ein Ref, kein State: das Tracking braucht keinen
 * Re-Render, und useState in der Effect-Dep-Liste hatte eine Self-
 * Cancelling-RAF-Race ausgelöst (Cleanup der alten Effect-Instanz
 * canceled die soeben geschedulete RAF, displayValue blieb auf "0").
 *
 * WICHTIG: Hook-Reihenfolge ist fix (useState → useCallback → useRef → useEffect).
 */
export function useCountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  separator = "",
  decimals = 0,
}: UseCountUpOptions) {
  // 1. useState – Endwert als Initialwert (nie "0%" sichtbar)
  const [displayValue, setDisplayValue] = useState(() => {
    const formatted =
      decimals > 0 ? end.toFixed(decimals) : Math.round(end).toString();
    const withSeparator = separator
      ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      : formatted;
    return `${prefix}${withSeparator}${suffix}`;
  });

  // 2. useCallback
  const formatValue = useCallback(
    (value: number) => {
      const formatted =
        decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
      const withSeparator = separator
        ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        : formatted;
      return `${prefix}${withSeparator}${suffix}`;
    },
    [prefix, suffix, separator, decimals]
  );

  // 3. useRef
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // 4. useEffect – IntersectionObserver
  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            // Kurz den Startwert setzen, dann hochzählen
            setDisplayValue(formatValue(0));

            const startTime = performance.now();
            const step = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Easing: easeOutCubic für natürliches Abbremsen
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              const currentValue = easedProgress * end;
              setDisplayValue(formatValue(currentValue));
              if (progress < 1) {
                rafIdRef.current = requestAnimationFrame(step);
              }
            };

            rafIdRef.current = requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [formatValue, duration, end]);

  return { ref, displayValue };
}
