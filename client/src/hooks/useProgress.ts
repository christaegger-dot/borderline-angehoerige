/**
 * useProgress – Shared hook for localStorage-based progress tracking.
 * Tracks which items in a set have been "revealed" / "completed".
 * Returns { revealed, total, percentage, isRevealed, markRevealed, reset }.
 */
import { useState, useCallback, useEffect } from "react";

const STORAGE_PREFIX = "eiertanz_progress_";

interface UseProgressReturn {
  /** Set of revealed item indices */
  revealedSet: Set<number>;
  /** Number of items revealed */
  revealed: number;
  /** Total items in the set */
  total: number;
  /** Percentage 0–100 */
  percentage: number;
  /** Check if a specific index has been revealed */
  isRevealed: (index: number) => boolean;
  /** Mark a specific index as revealed */
  markRevealed: (index: number) => void;
  /** Reset all progress for this key */
  reset: () => void;
}

export function useProgress(key: string, total: number): UseProgressReturn {
  const storageKey = STORAGE_PREFIX + key;

  const [revealedSet, setRevealedSet] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const arr = JSON.parse(stored) as number[];
        return new Set(arr.filter((n) => typeof n === "number" && n >= 0 && n < total));
      }
    } catch {
      // ignore
    }
    return new Set();
  });

  // Persist to localStorage whenever the set changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(revealedSet)));
    } catch {
      // quota exceeded – silently fail
    }
  }, [revealedSet, storageKey]);

  const isRevealed = useCallback(
    (index: number) => revealedSet.has(index),
    [revealedSet]
  );

  const markRevealed = useCallback(
    (index: number) => {
      setRevealedSet((prev) => {
        if (prev.has(index)) return prev;
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setRevealedSet(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  return {
    revealedSet,
    revealed: revealedSet.size,
    total,
    percentage: total > 0 ? Math.round((revealedSet.size / total) * 100) : 0,
    isRevealed,
    markRevealed,
    reset,
  };
}
