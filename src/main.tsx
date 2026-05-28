import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * Application entry point.
 * - Attaches React to the `#root` element
 * - Wraps the app in `StrictMode` to surface potential problems
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
