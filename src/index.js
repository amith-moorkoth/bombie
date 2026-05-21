import React from "react";
import { createRoot } from "react-dom/client";
import { Container } from "@mui/material";
import App from "./App";
import "./index.scss";

// Last-resort logging hook. Replace with Sentry/Datadog/etc. integration
// when a real error reporting backend is wired up.
window.addEventListener("error", (event) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("Unhandled error:", event.error || event.message);
  }
});
window.addEventListener("unhandledrejection", (event) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("Unhandled rejection:", event.reason);
  }
});

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root element "#root" not found in document.');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Container maxWidth="xl">
      <App />
    </Container>
  </React.StrictMode>
);
