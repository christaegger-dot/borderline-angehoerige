import { lazy } from "react";
import type { RouteComponentProps } from "wouter";

export interface AppRoute {
  path: string;
  component?: React.ComponentType<RouteComponentProps>;
  redirectTo?: string;
  requiresMotion?: boolean;
}

// lazily load pages
const Home = lazy(() => import("@/pages/Home"));
const Verstehen = lazy(() => import("@/pages/Verstehen"));
const UnterstuetzenUebersicht = lazy(
  () => import("@/pages/UnterstuetzenUebersicht")
);
const UnterstuetzenAlltag = lazy(() => import("@/pages/UnterstuetzenAlltag"));
const UnterstuetzenTherapie = lazy(
  () => import("@/pages/UnterstuetzenTherapie")
);
const UnterstuetzenKrise = lazy(() => import("@/pages/UnterstuetzenKrise"));
const Kommunizieren = lazy(() => import("@/pages/Kommunizieren"));
const Grenzen = lazy(() => import("@/pages/Grenzen"));
const Selbstfuersorge = lazy(() => import("@/pages/Selbstfuersorge"));
const Soforthilfe = lazy(() => import("@/pages/Soforthilfe"));
const Materialien = lazy(() => import("@/pages/Materialien"));
const HandoutTextPage = lazy(() => import("@/pages/HandoutTextPage"));
const SelbsttestPage = lazy(() => import("@/pages/SelbsttestPage"));
const Impressum = lazy(() => import("@/pages/Impressum"));
const Datenschutz = lazy(() => import("@/pages/Datenschutz"));
const Genesung = lazy(() => import("@/pages/Genesung"));
const Selbsthilfegruppen = lazy(() => import("@/pages/Selbsthilfegruppen"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const Glossar = lazy(() => import("@/pages/Glossar"));
const Buchempfehlungen = lazy(() => import("@/pages/Buchempfehlungen"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const UeberUns = lazy(() => import("@/pages/UeberUns"));
const Fachstelle = lazy(() => import("@/pages/Fachstelle"));
const Notfallkarte = lazy(() => import("@/pages/Notfallkarte"));
const Wegweiser = lazy(() => import("@/pages/Wegweiser"));
const Uebungsszenarien = lazy(() => import("@/pages/Uebungsszenarien"));
const Quellen = lazy(() => import("@/pages/Quellen"));
const Barrierefreiheit = lazy(() => import("@/pages/Barrierefreiheit"));

export const routes: AppRoute[] = [
  { path: "/", component: Home },
  { path: "/verstehen", component: Verstehen, requiresMotion: true },
  { path: "/unterstuetzen", redirectTo: "/unterstuetzen/uebersicht" },
  {
    path: "/unterstuetzen/uebersicht",
    component: UnterstuetzenUebersicht,
    requiresMotion: true,
  },
  {
    path: "/unterstuetzen/alltag",
    component: UnterstuetzenAlltag,
    requiresMotion: true,
  },
  {
    path: "/unterstuetzen/therapie",
    component: UnterstuetzenTherapie,
    requiresMotion: true,
  },
  {
    path: "/unterstuetzen/krise",
    component: UnterstuetzenKrise,
    requiresMotion: true,
  },
  { path: "/kommunizieren", component: Kommunizieren, requiresMotion: true },
  { path: "/grenzen", component: Grenzen, requiresMotion: true },
  {
    path: "/selbstfuersorge",
    component: Selbstfuersorge,
    requiresMotion: true,
  },
  { path: "/soforthilfe", component: Soforthilfe, requiresMotion: true },
  { path: "/notfall", redirectTo: "/soforthilfe" },
  { path: "/materialien/text/:handoutId", component: HandoutTextPage },
  { path: "/materialien", component: Materialien, requiresMotion: true },
  { path: "/selbsttest", component: SelbsttestPage, requiresMotion: true },
  { path: "/impressum", component: Impressum, requiresMotion: true },
  { path: "/datenschutz", component: Datenschutz, requiresMotion: true },
  { path: "/genesung", component: Genesung, requiresMotion: true },
  { path: "/beratung", component: Selbsthilfegruppen, requiresMotion: true },
  { path: "/selbsthilfegruppen", redirectTo: "/beratung" },
  { path: "/feedback", component: Feedback, requiresMotion: true },
  { path: "/glossar", component: Glossar, requiresMotion: true },
  {
    path: "/buchempfehlungen",
    component: Buchempfehlungen,
    requiresMotion: true,
  },
  {
    path: "/therapieangebote",
    redirectTo: "/unterstuetzen/therapie#therapieangebote",
  },
  { path: "/faq", component: FAQ, requiresMotion: true },
  { path: "/ueber-uns", component: UeberUns, requiresMotion: true },
  { path: "/fachstelle", component: Fachstelle, requiresMotion: true },
  { path: "/notfallkarte", component: Notfallkarte },
  { path: "/wegweiser", component: Wegweiser, requiresMotion: true },
  { path: "/uebungen", component: Uebungsszenarien, requiresMotion: true },
  { path: "/quellen", component: Quellen, requiresMotion: true },
  {
    path: "/barrierefreiheit",
    component: Barrierefreiheit,
    requiresMotion: true,
  },
];
