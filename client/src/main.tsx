import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const fallbackShell = document.getElementById("fallback-shell");
if (fallbackShell) {
  fallbackShell.remove();
}
document.body.setAttribute("data-app-ready", "true");
