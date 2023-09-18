import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);
