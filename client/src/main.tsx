import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider
        // theme={{ colorScheme: "dark" }}
        >
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
          >
            <AuthProvider>
              <AnimatePresence>
                <App />
              </AnimatePresence>
              {/* <ReactQueryDevtools /> */}
            </AuthProvider>
          </GoogleOAuthProvider>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
