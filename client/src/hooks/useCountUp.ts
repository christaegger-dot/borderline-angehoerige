import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
}

function formatCountValue(
  value: number,
  prefix: string,
  suffix: string,
  separator: string,
  decimals: number
): string {
  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  const withSeparator = separator
    ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : formatted;
  return `${prefix}${withSeparator}${suffix}`;
}

/**
 * Hook für animierte Zähler, die beim Sichtbarwerden hochzählen.
 * Verwendet IntersectionObserver und requestAnimationFrame.
 *
 * Initial-State ist der Endwert (kein "0%"-Flicker, falls der Observer
 * nie feuert). Beim ersten Intersect wird auf 0 zurückgesetzt und hochgezählt.
 *
 * `end` wird als nach dem ersten Animations-Lauf fixiert behandelt — ändert
 * sich `end` mid-Animation, friert displayValue ein, da hasAnimatedRef
 * den Restart blockiert. Aktuell unkritisch, da AnimatedStat-Konsumer
 * statische Literale übergeben.
 */
export function useCountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  separator = "",
  decimals = 0,
}: UseCountUpOptions) {
  const [displayValue, setDisplayValue] = useState(() =>
    formatCountValue(end, prefix, suffix, separator, decimals)
  );

  // hasAnimatedRef als Ref, nicht State: kein Re-Render-Trigger nötig.
  // Vorher als useState in Effect-Deps löste Re-Run aus, dessen Cleanup
  // die soeben geschedulete RAF cancelte (Self-Cancelling-Race).
  const hasAnimatedRef = useRef(false);
  const lastFormattedRef = useRef(displayValue);
  const ref = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            const initial = formatCountValue(
              0,
              prefix,
              suffix,
              separator,
              decimals
            );
            lastFormattedRef.current = initial;
            setDisplayValue(initial);

            const startTime = performance.now();
            const step = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutCubic
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              const next = formatCountValue(
                easedProgress * end,
                prefix,
                suffix,
                separator,
                decimals
              );
              // Skip Render wenn formatierter Wert unverändert
              // (bei kleinen end-Werten produzieren viele Frames identische Integers)
              if (next !== lastFormattedRef.current) {
                lastFormattedRef.current = next;
                setDisplayValue(next);
              }
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
  }, [duration, end, prefix, suffix, separator, decimals]);

  return { ref, displayValue };
}
