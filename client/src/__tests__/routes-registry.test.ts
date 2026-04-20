import { describe, expect, it } from "vitest";
import { routes } from "@/app/routes";

describe("route registry", () => {
  it("contains unique route paths", () => {
    const paths = routes.map(route => route.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("defines either a component or a redirect target for every route", () => {
    for (const route of routes) {
      expect(Boolean(route.component || route.redirectTo)).toBe(true);
    }
  });

  it("keeps the critical public routes available", () => {
    expect(routes.some(route => route.path === "/")).toBe(true);
    expect(routes.some(route => route.path === "/soforthilfe")).toBe(true);
    expect(routes.some(route => route.path === "/selbsttest")).toBe(true);
    expect(routes.some(route => route.path === "/faq")).toBe(true);
  });

  it("keeps known redirects configured", () => {
    const notfallRoute = routes.find(route => route.path === "/notfall");
    const unterstuetzenRoute = routes.find(
      route => route.path === "/unterstuetzen"
    );

    expect(notfallRoute?.redirectTo).toBe("/soforthilfe");
    expect(unterstuetzenRoute?.redirectTo).toBe("/unterstuetzen/uebersicht");
  });
});
