import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ColorThemeProvider } from "./contexts/ColorThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ColorThemeProvider>
  </StrictMode>
);
