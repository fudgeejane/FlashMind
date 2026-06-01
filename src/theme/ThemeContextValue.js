import { createContext } from "react";
import { getTheme } from "./theme";

export const ThemeContext = createContext({
  mode: "light",
  activeTheme: getTheme("light"),
  setMode: () => {},
  toggleMode: () => {},
  isDark: false,
});
