export const THEME_STORAGE_KEY = "flashmind-theme";
export const DEFAULT_THEME_MODE = "light";

export const theme = {
  defaultMode: DEFAULT_THEME_MODE,
  modes: {
    light: {
      name: "Light",
      colors: {
        primary: "#4F46E5",
        primaryHover: "#4338CA",
        secondary: "#06B6D4",
        secondaryHover: "#0E7490",
        accent: "#8B5CF6",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        background: "#F8FAFC",
        backgroundElevated: "#FFFFFF",
        surface: "#FFFFFF",
        surfaceMuted: "#F1F5F9",
        textPrimary: "#0F172A",
        textSecondary: "#475569",
        textMuted: "#64748B",
        border: "#E2E8F0",
        borderStrong: "#CBD5E1",
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
        primary: "#6366F1",
        primaryHover: "#818CF8",
        secondary: "#22D3EE",
        secondaryHover: "#7DD3FC",
        accent: "#A5B4FC",
        success: "#22C55E",
        warning: "#FBBF24",
        error: "#F87171",
        background: "#020617",
        backgroundElevated: "#0F172A",
        surface: "#0F172A",
        surfaceMuted: "#111827",
        textPrimary: "#F8FAFC",
        textSecondary: "#CBD5E1",
        textMuted: "#94A3B8",
        border: "rgba(255, 255, 255, 0.1)",
        borderStrong: "rgba(255, 255, 255, 0.2)",
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
