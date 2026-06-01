import { useTheme } from "./useTheme";

export default function ThemeStyles() {
  const { isDark } = useTheme();

  return {
    // Layout
    page: "min-h-screen bg-theme-bg text-theme-text-primary transition-colors",
    section: "bg-theme-bg text-theme-text-primary transition-colors",
    sectionAlt: "bg-theme-surface text-theme-text-primary transition-colors",
    surface: "bg-theme-surface text-theme-text-primary",
    surfaceMuted: "bg-theme-surface-muted text-theme-text-primary",
    header: "border-b border-theme-border bg-theme-surface/85 text-theme-text-primary backdrop-blur-xl",
    footer: "border-t border-theme-border bg-theme-secondary text-white",

    // Cards and containers
    card: "rounded-2xl border border-theme-border bg-theme-surface text-theme-text-primary shadow-sm transition-colors",
    cardHover: "hover:-translate-y-1 hover:border-theme-primary hover:shadow-xl",
    border: "border-theme-border",
    borderStrong: "border-theme-border-strong",
    divide: "divide-theme-border",
    shadow: isDark
      ? "shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      : "shadow-[0_2px_12px_rgba(15,23,42,0.08)]",

    // Text
    primaryText: "text-theme-text-primary",
    secondaryText: "text-theme-text-secondary",
    mutedText: "text-theme-text-muted",
    brandText: "text-theme-primary",
    successText: "text-theme-success",
    warningText: "text-theme-warning",
    errorText: "text-theme-error",

    // Backgrounds
    primaryBg: "bg-theme-primary",
    secondaryBg: "bg-theme-secondary",
    accentBg: "bg-theme-accent",
    successBg: "bg-theme-success",
    warningBg: "bg-theme-warning",
    errorBg: "bg-theme-error",
    primaryBgSoft: isDark ? "bg-cyan-400/10" : "bg-cyan-50",
    successBgSoft: isDark ? "bg-green-400/10" : "bg-green-50",
    warningBgSoft: isDark ? "bg-amber-400/10" : "bg-amber-50",
    errorBgSoft: isDark ? "bg-red-400/10" : "bg-red-50",

    // Forms
    input:
      "w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-theme-text-primary outline-none transition placeholder:text-theme-text-muted focus:border-theme-primary focus:ring-4 focus:ring-theme-primary/15",
    textarea:
      "w-full resize-none rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-theme-text-primary outline-none transition placeholder:text-theme-text-muted focus:border-theme-primary focus:ring-4 focus:ring-theme-primary/15",
    label: "text-sm font-bold text-theme-text-primary",

    // Buttons
    buttonBase:
      "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
    buttonPrimary:
      "bg-theme-secondary text-white hover:-translate-y-0.5 hover:bg-theme-primary dark:bg-theme-primary dark:text-slate-950 dark:hover:bg-cyan-300",
    buttonSecondary:
      "border border-theme-border bg-theme-surface text-theme-text-primary hover:-translate-y-0.5 hover:border-theme-primary",
    buttonGhost:
      "text-theme-text-secondary hover:bg-theme-surface-muted hover:text-theme-text-primary",
    buttonSuccess: "bg-theme-success text-white hover:brightness-110",
    buttonWarning: "bg-theme-warning text-white hover:brightness-110",
    buttonError: "bg-theme-error text-white hover:brightness-110",

    // Navigation and utility
    navLink: "text-sm font-semibold text-theme-text-secondary transition hover:text-theme-primary",
    badge:
      "inline-flex rounded-full border border-theme-primary/20 bg-theme-primary/10 px-4 py-2 text-sm font-bold text-theme-primary",
    focus: "focus:border-theme-primary focus:ring-4 focus:ring-theme-primary/15",
  };
}
