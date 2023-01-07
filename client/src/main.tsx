import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
