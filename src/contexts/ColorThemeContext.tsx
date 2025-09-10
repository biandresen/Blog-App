import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { type ColorTheme, type ColorThemeContextType } from "../types/context.types";

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("color-theme") as ColorTheme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", colorTheme === "dark");
    localStorage.setItem("color-theme", colorTheme);
  }, [colorTheme]);

  const toggleTheme = () => {
    setColorTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme, toggleTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useColorTheme = (): ColorThemeContextType => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
