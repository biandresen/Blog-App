import { createRoot } from "react-dom/client";

import { ColorThemeProvider } from "./contexts/ColorThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { PostsProvider } from "./contexts/PostsContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ColorThemeProvider>
    <AuthProvider>
      <UserProvider>
       <LanguageProvider>
        <PostsProvider>
          <App />
             <ToastContainer
                position="bottom-center"
                autoClose={3500}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
              />
        </PostsProvider>
       </LanguageProvider>
      </UserProvider>
    </AuthProvider>
  </ColorThemeProvider>
  // </StrictMode>
);
