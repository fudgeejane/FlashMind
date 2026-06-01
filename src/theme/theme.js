export const THEME_STORAGE_KEY = "flashmind-theme";
export const DEFAULT_THEME_MODE = "light";

export const theme = {
  defaultMode: DEFAULT_THEME_MODE,
  modes: {
    light: {
      name: "Light",
      colors: {
        primary: "#0891b2",
        secondary: "#0f172a",
        accent: "#22c55e",
        success: "#16a34a",
        warning: "#d97706",
        error: "#dc2626",
        background: "#f8fafc",
        backgroundElevated: "#ffffff",
        surface: "#ffffff",
        surfaceMuted: "#f1f5f9",
        textPrimary: "#020617",
        textSecondary: "#475569",
        textMuted: "#64748b",
        border: "#e2e8f0",
        borderStrong: "#cbd5e1",
      },
      classes: {
        app: "bg-theme-bg text-theme-text-primary",
        surface: "bg-theme-surface text-theme-text-primary",
        surfaceMuted: "bg-theme-surface-muted text-theme-text-primary",
        textPrimary: "text-theme-text-primary",
        textSecondary: "text-theme-text-secondary",
        textMuted: "text-theme-text-muted",
        border: "border-theme-border",
        borderStrong: "border-theme-border-strong",
        primaryBg: "bg-theme-primary",
        primaryText: "text-theme-primary",
        primaryBorder: "border-theme-primary",
        secondaryBg: "bg-theme-secondary",
        accentBg: "bg-theme-accent",
        successBg: "bg-theme-success",
        warningBg: "bg-theme-warning",
        errorBg: "bg-theme-error",
        focusRing: "focus:ring-theme-primary/15 focus:border-theme-primary",
      },
    },
    dark: {
      name: "Dark",
      colors: {
        primary: "#22d3ee",
        secondary: "#e2e8f0",
        accent: "#4ade80",
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#f87171",
        background: "#020617",
        backgroundElevated: "#0f172a",
        surface: "#0f172a",
        surfaceMuted: "#111827",
        textPrimary: "#f8fafc",
        textSecondary: "#cbd5e1",
        textMuted: "#94a3b8",
        border: "rgba(255, 255, 255, 0.1)",
        borderStrong: "rgba(255, 255, 255, 0.18)",
      },
      classes: {
        app: "bg-theme-bg text-theme-text-primary",
        surface: "bg-theme-surface text-theme-text-primary",
        surfaceMuted: "bg-theme-surface-muted text-theme-text-primary",
        textPrimary: "text-theme-text-primary",
        textSecondary: "text-theme-text-secondary",
        textMuted: "text-theme-text-muted",
        border: "border-theme-border",
        borderStrong: "border-theme-border-strong",
        primaryBg: "bg-theme-primary",
        primaryText: "text-theme-primary",
        primaryBorder: "border-theme-primary",
        secondaryBg: "bg-theme-secondary",
        accentBg: "bg-theme-accent",
        successBg: "bg-theme-success",
        warningBg: "bg-theme-warning",
        errorBg: "bg-theme-error",
        focusRing: "focus:ring-theme-primary/15 focus:border-theme-primary",
      },
    },
  },
};

export function getThemeMode(mode) {
  return theme.modes[mode] ? mode : theme.defaultMode;
}

export function getTheme(mode = theme.defaultMode) {
  return theme.modes[getThemeMode(mode)];
}

export function getThemeValue(path, mode = theme.defaultMode) {
  return path.split(".").reduce((value, key) => value?.[key], getTheme(mode));
}
