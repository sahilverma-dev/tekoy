import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={{ colorScheme: "dark" }}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
        </GoogleOAuthProvider>;
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
