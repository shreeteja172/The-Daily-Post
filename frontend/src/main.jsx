import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextProvider from "./lib/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
