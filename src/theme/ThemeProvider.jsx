import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContextValue";
import { DEFAULT_THEME_MODE, THEME_STORAGE_KEY, getTheme, getThemeMode } from "./theme";

function getInitialMode() {
  const storedMode = localStorage.getItem(THEME_STORAGE_KEY);

  if (storedMode) {
    return getThemeMode(storedMode);
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : DEFAULT_THEME_MODE;
}

function applyThemeVariables(colors) {
  const root = document.documentElement;

  Object.entries(colors).forEach(([token, value]) => {
    const cssToken = token.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    root.style.setProperty(`--theme-${cssToken}`, value);
  });
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(getInitialMode);
  const activeTheme = getTheme(mode);
  const isDark = mode === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    applyThemeVariables(activeTheme.colors);
  }, [activeTheme.colors, isDark, mode]);

  const value = useMemo(
    () => ({
      mode,
      activeTheme,
      setMode: (nextMode) => setModeState(getThemeMode(nextMode)),
      toggleMode: () => setModeState((currentMode) => (currentMode === "dark" ? "light" : "dark")),
      isDark,
    }),
    [activeTheme, isDark, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
