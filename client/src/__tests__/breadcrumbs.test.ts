import { describe, expect, it } from "vitest";
import {
  getPageName,
  getParentInfo,
  shouldShowBreadcrumbs,
} from "@/components/layout/Breadcrumbs";

describe("Breadcrumb helpers", () => {
  it("keeps explicit labels for known standalone pages", () => {
    expect(getPageName("/barrierefreiheit")).toBe("Barrierefreiheit");
  });

  it("uses the handout title for text-version routes", () => {
    expect(getPageName("/materialien/text/leuchtturm")).toBe(
      "Der Leuchtturm – Orientierung für Angehörige"
    );
  });

  it("handles malformed URL-encoding in text-version routes without throwing", () => {
    expect(getPageName("/materialien/text/%E0%A4%A")).toBe("Textversion");
  });

  it("routes text-version pages back to the materials overview", () => {
    expect(getParentInfo("/materialien/text/leuchtturm")).toEqual({
      href: "/materialien",
      label: "Materialien",
    });
  });

  it("keeps the supporting pages grouped under Unterstützen", () => {
    expect(getParentInfo("/unterstuetzen/therapie")).toEqual({
      href: "/unterstuetzen/uebersicht",
      label: "Unterstützen",
    });
  });

  it("does not point the Unterstützen overview breadcrumb back to itself", () => {
    expect(getParentInfo("/unterstuetzen/uebersicht")).toBeNull();
  });

  it("shows breadcrumbs only for grouped deep routes", () => {
    expect(shouldShowBreadcrumbs("/")).toBe(false);
    expect(shouldShowBreadcrumbs("/grenzen")).toBe(false);
    expect(shouldShowBreadcrumbs("/materialien")).toBe(false);
    expect(shouldShowBreadcrumbs("/unterstuetzen/therapie")).toBe(true);
    expect(shouldShowBreadcrumbs("/verstehen/diagnostik#anbieter")).toBe(true);
    expect(shouldShowBreadcrumbs("/materialien/text/leuchtturm")).toBe(true);
  });
});
