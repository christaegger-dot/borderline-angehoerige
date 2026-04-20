import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root-Element "#root" wurde nicht gefunden.');
}

createRoot(rootElement).render(<App />);

const fallbackShell = document.getElementById("fallback-shell");
if (fallbackShell) {
  fallbackShell.remove();
}
document.body.setAttribute("data-app-ready", "true");
