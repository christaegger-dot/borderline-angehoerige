import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  document.body.textContent =
    "Anwendung konnte nicht gestartet werden. Bitte Seite neu laden.";
  throw new Error("#root element not found");
}
createRoot(root).render(<App />);

document.body.setAttribute("data-app-ready", "true");
document.body.removeAttribute("data-startup-fallback-visible");
window.dispatchEvent(new Event("app-ready"));

const startupFallback = document.getElementById("startup-fallback");
if (startupFallback) {
  startupFallback.remove();
}

const routePrerender = document.getElementById("route-prerender");
if (routePrerender) {
  routePrerender.remove();
}
