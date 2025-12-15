import { createRoot } from "react-dom/client";

import { ColorThemeProvider } from "./contexts/ColorThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { PostsProvider } from "./contexts/PostsContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ColorThemeProvider>
    <AuthProvider>
      <UserProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </UserProvider>
    </AuthProvider>
  </ColorThemeProvider>
  // </StrictMode>
);
