import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Fonts (Inter + Source Serif 4) sind self-hosted in client/public/fonts/.
// @font-face-Decls in /fonts/fonts.css, eingebunden via <link> in index.html
// mit <link rel="preload"> für die Critical-Path-Varianten (Hero-H1 + Body).
// Aus dem JS-Bundle entfernt, damit Fonts parallel zum JS-Download starten.

const root = document.getElementById("root");
if (!root) {
  document.body.textContent =
    "Anwendung konnte nicht gestartet werden. Bitte Seite neu laden.";
  throw new Error("#root element not found");
}
createRoot(root).render(<App />);

document.body.setAttribute("data-app-ready", "true");
window.dispatchEvent(new Event("app-ready"));

const routePrerender = document.getElementById("route-prerender");
if (routePrerender) {
  routePrerender.remove();
}
