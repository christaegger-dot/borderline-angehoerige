import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Verstehen from "./pages/Verstehen";
// Unterstuetzen Hub entfernt - Redirect zu Übersicht
import UnterstuetzenUebersicht from "./pages/UnterstuetzenUebersicht";
import UnterstuetzenAlltag from "./pages/UnterstuetzenAlltag";
import UnterstuetzenTherapie from "./pages/UnterstuetzenTherapie";
import UnterstuetzenKrise from "./pages/UnterstuetzenKrise";
import Kommunizieren from "./pages/Kommunizieren";
import Grenzen from "./pages/Grenzen";
import Selbstfuersorge from "./pages/Selbstfuersorge";
import Soforthilfe from "./pages/Soforthilfe";
import { Redirect } from "wouter";
import Materialien from "./pages/Materialien";
import SelbsttestPage from "./pages/SelbsttestPage";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Genesung from "./pages/Genesung";
import Selbsthilfegruppen from "./pages/Selbsthilfegruppen";
import Feedback from "./pages/Feedback";
import Glossar from "./pages/Glossar";
import Buchempfehlungen from "./pages/Buchempfehlungen";
// Therapieangebote wurde in Unterstützen/Therapie integriert
import FAQ from "./pages/FAQ";
import UeberUns from "./pages/UeberUns";

function Router() {
  return (
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
      <Route path="/selbsthilfegruppen" component={Selbsthilfegruppen} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/glossar" component={Glossar} />
      <Route path="/buchempfehlungen" component={Buchempfehlungen} />
      <Route path="/therapieangebote">{() => <Redirect to="/unterstuetzen/therapie#therapieangebote" />}</Route>
      <Route path="/faq" component={FAQ} />
      <Route path="/ueber-uns" component={UeberUns} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
