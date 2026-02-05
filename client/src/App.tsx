import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Verstehen from "./pages/Verstehen";
import Unterstuetzen from "./pages/Unterstuetzen";
import UnterstuetzenUebersicht from "./pages/UnterstuetzenUebersicht";
import UnterstuetzenAlltag from "./pages/UnterstuetzenAlltag";
import UnterstuetzenTherapie from "./pages/UnterstuetzenTherapie";
import UnterstuetzenKrise from "./pages/UnterstuetzenKrise";
import Kommunizieren from "./pages/Kommunizieren";
import Grenzen from "./pages/Grenzen";
import Selbstfuersorge from "./pages/Selbstfuersorge";
import Notfall from "./pages/Notfall";
import Materialien from "./pages/Materialien";
import SelbsttestPage from "./pages/SelbsttestPage";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Genesung from "./pages/Genesung";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verstehen" component={Verstehen} />
      <Route path="/unterstuetzen" component={Unterstuetzen} />
      <Route path="/unterstuetzen/uebersicht" component={UnterstuetzenUebersicht} />
      <Route path="/unterstuetzen/alltag" component={UnterstuetzenAlltag} />
      <Route path="/unterstuetzen/therapie" component={UnterstuetzenTherapie} />
      <Route path="/unterstuetzen/krise" component={UnterstuetzenKrise} />
      <Route path="/kommunizieren" component={Kommunizieren} />
      <Route path="/grenzen" component={Grenzen} />
      <Route path="/selbstfuersorge" component={Selbstfuersorge} />
      <Route path="/notfall" component={Notfall} />
      <Route path="/materialien" component={Materialien} />
      <Route path="/selbsttest" component={SelbsttestPage} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/genesung" component={Genesung} />
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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
