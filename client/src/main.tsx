import { createRoot } from "react-dom/client";
import App from "./App";
import { initAnalytics } from "./bootstrap/analytics";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  document.body.textContent =
    "Anwendung konnte nicht gestartet werden. Bitte Seite neu laden.";
  throw new Error("#root element not found");
}
createRoot(root).render(<App />);
initAnalytics();

document.body.setAttribute("data-app-ready", "true");
window.dispatchEvent(new Event("app-ready"));

const routePrerender = document.getElementById("route-prerender");
if (routePrerender) {
  routePrerender.remove();
}
