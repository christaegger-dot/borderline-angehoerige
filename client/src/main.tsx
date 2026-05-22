import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Fonts werden via @font-face in index.html geladen (parallel zum JS-Download).
// Bewusst KEIN @fontsource-Import hier – wuerde Font-Download nach JS-Bundle serialisieren.

const root = document.getElementById("root");
if (!root) {
  document.body.textContent =
    "Anwendung konnte nicht gestartet werden. Bitte Seite neu laden.";
  throw new Error("#root element not found");
}
createRoot(root).render(<App />);

// data-app-ready, app-ready-Event und route-prerender-Removal werden aus
// <AppReady /> in Router.tsx getriggert - feuert erst NACH dem Commit der
// ersten echten Route, damit die Prerender-Shell nicht verschwindet, waehrend
// der Suspense-Fallback noch Inhalt nachlaedt.
