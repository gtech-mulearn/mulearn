import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <ErrorBoundary>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </ErrorBoundary>
        </ChakraProvider>
    </React.StrictMode>
);
