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
    expect(routes.some(route => route.path === "/selbsttest")).toBe(true);
    expect(routes.some(route => route.path === "/faq")).toBe(true);
    expect(routes.some(route => route.path === "/materialien")).toBe(true);
    expect(routes.some(route => route.path === "/notfallkarte/erstellen")).toBe(
      true
    );
    expect(routes.some(route => route.path === "/notfallkarte")).toBe(false);
  });

  it("keeps known redirects configured", () => {
    const unterstuetzenRoute = routes.find(
      route => route.path === "/unterstuetzen"
    );
    const selbsthilfegruppenRoute = routes.find(
      route => route.path === "/selbsthilfegruppen"
    );
    const therapieangeboteRoute = routes.find(
      route => route.path === "/therapieangebote"
    );

    expect(unterstuetzenRoute?.redirectTo).toBe("/unterstuetzen/uebersicht");
    expect(selbsthilfegruppenRoute?.redirectTo).toBe("/beratung");
    expect(therapieangeboteRoute?.redirectTo).toBe(
      "/unterstuetzen/therapie#therapieangebote"
    );
  });
});
