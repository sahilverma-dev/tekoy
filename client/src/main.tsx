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
import { NotificationsProvider } from "@mantine/notifications";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
    >
      <BrowserRouter>
        <MantineProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <NotificationsProvider position="bottom-left">
                <App />
              </NotificationsProvider>
            </AuthProvider>
            {/* <ReactQueryDevtools initialIsOpen /> */}
          </QueryClientProvider>
        </MantineProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
