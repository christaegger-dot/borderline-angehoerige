import { lazy } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppProviders from "@/app/AppProviders";
import Router from "@/app/Router";
import { routes } from "@/app/routes";
import AppLink from "@/components/AppLink";
import ContentSection from "@/components/ContentSection";
import { m } from "framer-motion";

// Keep the real Wouter Router and its Suspense boundary. Only its page
// inventory is replaced so we can control when a lazy route becomes ready.
vi.mock("@/app/routes", () => ({ routes: [] }));

const originalScrollIntoView = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "scrollIntoView"
);

function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} aria-label="Home main">
      <h1>Home</h1>
      <AppLink href="/slow">Open slow page</AppLink>
      <AppLink href="/slow#details">Open slow details</AppLink>
    </main>
  );
}

function SlowPage() {
  return (
    <main id="main-content" tabIndex={-1} aria-label="Slow main">
      <h1>Slow page</h1>
      <m.div
        data-testid="route-motion-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        Animated page content
      </m.div>
      <ContentSection id="details" title="Details">
        <p>Deep-linked details</p>
      </ContentSection>
    </main>
  );
}

function installDelayedRoute() {
  let release!: () => void;
  const pageModule = new Promise<{ default: typeof SlowPage }>(resolve => {
    release = () => resolve({ default: SlowPage });
  });
  routes.splice(
    0,
    routes.length,
    { path: "/", component: HomePage },
    { path: "/slow", component: lazy(() => pageModule), requiresMotion: true }
  );
  return release;
}

function renderApp() {
  return render(
    <AppProviders>
      <Router />
    </AppProviders>
  );
}

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  delete document.body.dataset.appReady;
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  if (originalScrollIntoView) {
    Object.defineProperty(
      HTMLElement.prototype,
      "scrollIntoView",
      originalScrollIntoView
    );
  } else {
    delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
  }
  window.history.replaceState(null, "", "/");
  routes.splice(0);
});

describe("focus after a committed lazy route", () => {
  it.each(["/slow", "/slow/"])(
    "activates motion for the actual Wouter match at %s",
    async pathname => {
      const release = installDelayedRoute();
      window.history.replaceState(null, "", pathname);
      renderApp();
      await act(async () => {
        release();
      });
      await waitFor(() => {
        expect(screen.getByTestId("route-motion-content")).toHaveStyle({
          opacity: "1",
        });
      });
    }
  );

  it("focuses a first route even when its page arrives after two seconds", async () => {
    const release = installDelayedRoute();
    window.history.replaceState(null, "", "/slow");
    vi.useFakeTimers();
    renderApp();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3100);
    });
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
    vi.useRealTimers();

    await act(async () => {
      release();
    });
    await waitFor(() => {
      expect(screen.getByRole("main", { name: "Slow main" })).toHaveFocus();
    });
  });

  it("focuses the destination after a cold Wouter navigation", async () => {
    const release = installDelayedRoute();
    renderApp();
    expect(screen.getByRole("main", { name: "Home main" })).toHaveFocus();

    const link = screen.getByRole("link", { name: "Open slow page" });
    link.focus();
    fireEvent.click(link);
    expect(window.location.pathname).toBe("/slow");

    await act(async () => {
      release();
    });
    await waitFor(() => {
      expect(screen.getByRole("main", { name: "Slow main" })).toHaveFocus();
    });
  });

  it("retains hash opening and navigation back and forward", async () => {
    const release = installDelayedRoute();
    renderApp();
    fireEvent.click(screen.getByRole("link", { name: "Open slow details" }));

    await act(async () => {
      release();
    });
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Abschnitt Details/ })
      ).toHaveAttribute("aria-expanded", "true");
    });
    expect(window.location.hash).toBe("#details");
    await waitFor(() => {
      expect(screen.getByText("Deep-linked details")).toBeVisible();
    });

    act(() => window.history.back());
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
      expect(screen.getByRole("main", { name: "Home main" })).toHaveFocus();
    });

    act(() => window.history.forward());
    await waitFor(() => {
      expect(window.location.pathname).toBe("/slow");
      expect(window.location.hash).toBe("#details");
      expect(
        screen.getByRole("button", { name: /Abschnitt Details/ })
      ).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Deep-linked details")).toBeVisible();
    });
    expect(screen.getByRole("main", { name: "Slow main" })).not.toHaveFocus();
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
