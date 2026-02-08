import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";

// Home bleibt eager – wird immer als erstes geladen
import Home from "./pages/Home";

// Alle anderen Seiten werden lazy geladen für kleineres initiales Bundle
const Verstehen = lazy(() => import("./pages/Verstehen"));
const UnterstuetzenUebersicht = lazy(() => import("./pages/UnterstuetzenUebersicht"));
const UnterstuetzenAlltag = lazy(() => import("./pages/UnterstuetzenAlltag"));
const UnterstuetzenTherapie = lazy(() => import("./pages/UnterstuetzenTherapie"));
const UnterstuetzenKrise = lazy(() => import("./pages/UnterstuetzenKrise"));
const Kommunizieren = lazy(() => import("./pages/Kommunizieren"));
const Grenzen = lazy(() => import("./pages/Grenzen"));
const Selbstfuersorge = lazy(() => import("./pages/Selbstfuersorge"));
const Soforthilfe = lazy(() => import("./pages/Soforthilfe"));
const Materialien = lazy(() => import("./pages/Materialien"));
const SelbsttestPage = lazy(() => import("./pages/SelbsttestPage"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Genesung = lazy(() => import("./pages/Genesung"));
const Selbsthilfegruppen = lazy(() => import("./pages/Selbsthilfegruppen"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Glossar = lazy(() => import("./pages/Glossar"));
const Buchempfehlungen = lazy(() => import("./pages/Buchempfehlungen"));
const FAQ = lazy(() => import("./pages/FAQ"));
const UeberUns = lazy(() => import("./pages/UeberUns"));
const Fachstelle = lazy(() => import("./pages/Fachstelle"));

// Minimaler Lade-Spinner für Suspense-Fallback
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Seite wird geladen…</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/verstehen" component={Verstehen} />
        <Route path="/unterstuetzen">{() => <Redirect to="/unterstuetzen/uebersicht" />}</Route>
        <Route path="/unterstuetzen/uebersicht" component={UnterstuetzenUebersicht} />
        <Route path="/unterstuetzen/alltag" component={UnterstuetzenAlltag} />
        <Route path="/unterstuetzen/therapie" component={UnterstuetzenTherapie} />
        <Route path="/unterstuetzen/krise" component={UnterstuetzenKrise} />
        <Route path="/kommunizieren" component={Kommunizieren} />
        <Route path="/grenzen" component={Grenzen} />
        <Route path="/selbstfuersorge" component={Selbstfuersorge} />
        <Route path="/soforthilfe" component={Soforthilfe} />
        <Route path="/notfall">{() => <Redirect to="/soforthilfe" />}</Route>
        <Route path="/materialien" component={Materialien} />
        <Route path="/selbsttest" component={SelbsttestPage} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/genesung" component={Genesung} />
        <Route path="/beratung" component={Selbsthilfegruppen} />
        <Route path="/selbsthilfegruppen">{() => <Redirect to="/beratung" />}</Route>
        <Route path="/feedback" component={Feedback} />
        <Route path="/glossar" component={Glossar} />
        <Route path="/buchempfehlungen" component={Buchempfehlungen} />
        <Route path="/therapieangebote">{() => <Redirect to="/unterstuetzen/therapie#therapieangebote" />}</Route>
        <Route path="/faq" component={FAQ} />
        <Route path="/ueber-uns" component={UeberUns} />
        <Route path="/fachstelle" component={Fachstelle} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
