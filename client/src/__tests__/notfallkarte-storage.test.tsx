import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { Router } from "wouter";
import {
  NOTFALLKARTE_PRINT_STORAGE_KEY,
  NOTFALLKARTE_STORAGE_KEY,
} from "@/domain/notfallkarte";
import Notfallkarte from "@/pages/Notfallkarte";

const MOTION_PROPS = new Set([
  "animate",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "onAnimationComplete",
  "onUpdate",
  "transition",
  "variants",
  "viewport",
  "whileHover",
  "whileInView",
  "whileTap",
]);

function stripMotionProps(props: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !MOTION_PROPS.has(key))
  );
}

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({
          children,
          ...props
        }: HTMLAttributes<HTMLElement> & {
          children?: ReactNode;
        }) => {
          const Tag = tag as ElementType;
          return (
            <Tag {...stripMotionProps(props as Record<string, unknown>)}>
              {children}
            </Tag>
          );
        },
    }
  ),
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

function createStorageMock(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear: vi.fn(() => {
      store.clear();
    }),
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    key: vi.fn((index: number) => Array.from(store.keys())[index] ?? null),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, String(value));
    }),
  } as Storage;
}

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

beforeEach(() => {
  const localStorageMock = createStorageMock();
  const sessionStorageMock = createStorageMock();

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: localStorageMock,
  });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: localStorageMock,
  });
  Object.defineProperty(window, "sessionStorage", {
    configurable: true,
    value: sessionStorageMock,
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    value: sessionStorageMock,
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.removeItem(NOTFALLKARTE_STORAGE_KEY);
  window.localStorage.removeItem(NOTFALLKARTE_PRINT_STORAGE_KEY);
  window.sessionStorage.removeItem(NOTFALLKARTE_PRINT_STORAGE_KEY);
});

function renderPage() {
  return render(
    <Router>
      <Notfallkarte />
    </Router>
  );
}

describe("Notfallkarte storage fallbacks", () => {
  it("shows a clear alert when browser storage is blocked", () => {
    vi.spyOn(window.localStorage, "getItem").mockReturnValue(null);
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "QuotaExceededError");
    });
    vi.spyOn(window.localStorage, "removeItem").mockImplementation(() => {});

    renderPage();

    expect(screen.getByRole("alert")).toHaveTextContent(
      /speichern nicht möglich/i
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      /eingaben bleiben dann möglicherweise nicht auf diesem gerät erhalten/i
    );
  });

  it("falls back to direct window messaging for printing when localStorage is unavailable", () => {
    vi.spyOn(window.localStorage, "getItem").mockReturnValue(null);
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "QuotaExceededError");
    });
    vi.spyOn(window.localStorage, "removeItem").mockImplementation(() => {});

    const postMessage = vi.fn();
    const openSpy = vi.spyOn(window, "open").mockReturnValue({
      postMessage,
      closed: true,
    } as unknown as Window);

    renderPage();

    fireEvent.click(screen.getByRole("button", { name: /jetzt drucken/i }));

    expect(openSpy).toHaveBeenCalledWith(
      "/notfallkarte-print.html?print=1",
      "_blank"
    );
    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({ type: "notfallkarte-print-data" }),
      window.location.origin
    );
  });

  it("limits personal contacts to the three slots available in the print view", () => {
    renderPage();

    const addButton = screen.getByRole("button", {
      name: /kontakt hinzufügen/i,
    });

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(
      screen.getAllByRole("textbox", { name: /name der kontaktperson/i })
    ).toHaveLength(3);
    expect(addButton).toBeDisabled();
    expect(addButton).toHaveAttribute(
      "title",
      "Maximal drei Kontaktpersonen für die Druckversion"
    );
  });

  it("tells people that entries are saved automatically in the browser", () => {
    renderPage();

    expect(
      screen.getByText(/Änderungen werden automatisch lokal gespeichert\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /werden nicht an einen Server dieser Website übertragen/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /lokale notfallkarten-daten löschen/i,
      })
    ).toBeInTheDocument();
  });

  it("clears stored data persistently across delete and reload", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);

    renderPage();

    fireEvent.change(screen.getByLabelText(/persönliche notizen/i), {
      target: { value: "Nur lokal speichern" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /kontakt hinzufügen/i })
    );
    fireEvent.change(screen.getByLabelText(/name der kontaktperson/i), {
      target: { value: "Testkontakt" },
    });

    await waitFor(() => {
      expect(window.localStorage.getItem(NOTFALLKARTE_STORAGE_KEY)).toContain(
        "Nur lokal speichern"
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /lokale notfallkarten-daten löschen/i,
      })
    );

    expect(window.localStorage.getItem(NOTFALLKARTE_STORAGE_KEY)).toBeNull();
    expect(screen.getByLabelText(/persönliche notizen/i)).toHaveValue("");
    expect(
      screen.queryByRole("textbox", { name: /name der kontaktperson/i })
    ).not.toBeInTheDocument();

    cleanup();
    renderPage();

    expect(screen.getByLabelText(/persönliche notizen/i)).toHaveValue("");
    expect(
      screen.queryByRole("textbox", { name: /name der kontaktperson/i })
    ).not.toBeInTheDocument();
  });
});
