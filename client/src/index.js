import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Adjusted the path to match the correct location of the App component

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = createRoot(rootElement);
root.render(React.createElement(App));