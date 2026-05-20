/**
 * App-Level Redirects - Single Source of Truth.
 *
 * Diese Liste MUSS in vier Quellen identisch gefuehrt werden, damit
 * jeder Deployment-Pfad (Netlify-CDN, Netlify-_redirects-Fallback,
 * Express-Server, SPA-Client) dieselben URLs redirected:
 *
 *   1. netlify.toml                 (Netlify-CDN-Layer)
 *   2. client/public/_redirects     (Netlify-Fallback / Form-Variante)
 *   3. shared/staticRouteShells.ts  (Express-Server / SSR)
 *   4. client/src/app/routes.ts     (SPA-Client-Navigation)
 *
 * Parity wird durch redirects-parity.test.ts gepruefte.
 *
 * NICHT hier: Netlify-Infrastruktur-Redirects wie /404, /*.pdf,
 * /soforthilfe → /soforthilfe/index.html. Die leben nur in
 * netlify.toml + _redirects, weil sie SPA-/Client-irrelevant sind.
 */

export interface AppRedirect {
  from: string;
  to: string;
  status: 301 | 302;
}

export const APP_REDIRECTS: readonly AppRedirect[] = [
  { from: "/notfallkarte.html", to: "/notfallkarte", status: 301 },
  { from: "/notfall", to: "/soforthilfe", status: 301 },
  { from: "/unterstuetzen", to: "/unterstuetzen/uebersicht", status: 301 },
  { from: "/diagnostik", to: "/verstehen/diagnostik", status: 301 },
  {
    from: "/begleiterkrankungen",
    to: "/verstehen/begleiterkrankungen",
    status: 301,
  },
  { from: "/selbsthilfegruppen", to: "/beratung", status: 301 },
  {
    from: "/therapieangebote",
    to: "/unterstuetzen/therapie#therapieangebote",
    status: 301,
  },
] as const;
