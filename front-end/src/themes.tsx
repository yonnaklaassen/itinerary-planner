import { useState, useContext, createContext, ReactNode } from "react";

export const themes = {
  light: { backgroundColor: "#f0f4f8", textColor: "#1f2937" },
  dark: { backgroundColor: "#282c34", textColor: "#ffffff" },
};

type ThemeKey = "light" | "dark";
type ThemeType = typeof themes.light;

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setThemeKey(prev => {
      const newKey: ThemeKey = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newKey);
      return newKey;
    });
  };

  const theme = themes[themeKey]; 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
