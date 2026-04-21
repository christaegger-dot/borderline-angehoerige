import { Suspense, lazy, startTransition, useEffect, useState } from "react";

const Toaster = lazy(() =>
  import("@/components/ui/sonner").then(module => ({
    default: module.Toaster,
  }))
);

export default function DeferredToaster() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const enable = () => {
      if (cancelled) return;
      startTransition(() => setShouldRender(true));
    };

    const timeoutId = window.setTimeout(enable, 1200);
    if (document.readyState === "complete") {
      enable();
    } else {
      window.addEventListener("load", enable, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", enable);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
    </Suspense>
  );
}
