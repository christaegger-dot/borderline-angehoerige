import { describe, expect, it } from "vitest";
import { getPageName, getParentInfo } from "@/components/layout/Breadcrumbs";

describe("Breadcrumb helpers", () => {
  it("keeps explicit labels for known standalone pages", () => {
    expect(getPageName("/barrierefreiheit")).toBe("Barrierefreiheit");
  });

  it("uses the handout title for text-version routes", () => {
    expect(getPageName("/materialien/text/leuchtturm")).toBe(
      "Der Leuchtturm – Orientierung für Angehörige"
    );
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
});
