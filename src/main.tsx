import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ColorThemeProvider } from "./contexts/ColorThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorThemeProvider>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </ColorThemeProvider>
  </StrictMode>
);
