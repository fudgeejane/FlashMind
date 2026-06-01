import { useTheme } from "./useTheme";

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const themeTokens = {
  common: {
    routeProgress: "pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left animate-route-progress bg-cyan-400",
    overlay: "fixed inset-0 z-40 bg-black/50 lg:hidden",
    iconButton: "grid h-10 w-10 place-items-center rounded-xl border transition hover:border-cyan-300",
    avatar: "grid h-8 w-8 place-items-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200",
    adminShell: "fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r text-white shadow-2xl transition duration-300 lg:translate-x-0 lg:shadow-none",
    userShell: "fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r pt-4 shadow-2xl transition-all duration-300 lg:top-[65px] lg:z-30 lg:translate-x-0 lg:shadow-none",
  },
  light: {
    page: "min-h-screen bg-[#F8FAFC] text-[#020617] transition-colors",
    header: "border-b border-[#E2E8F0] bg-[#FFFFFF]/90 text-[#020617] backdrop-blur-xl",
    surface: "border-[#E2E8F0] bg-[#FFFFFF] text-[#020617]",
    surfaceMuted: "bg-[#F1F5F9] text-[#020617]",
    sidebar: "border-[#E2E8F0] bg-[#FFFFFF] text-[#020617]",
    adminSidebar: "border-[#E2E8F0] bg-[#0F172A] text-white",
    border: "border-[#E2E8F0]",
    textPrimary: "text-[#020617]",
    textSecondary: "text-[#475569]",
    textMuted: "text-[#64748B]",
    brandText: "text-[#0891B2]",
    hover: "hover:bg-[#F1F5F9]",
    menuHover: "hover:bg-white/10 hover:text-white",
    errorText: "text-[#DC2626]",
  },
  dark: {
    page: "min-h-screen bg-[#020617] text-[#F8FAFC] transition-colors",
    header: "border-b border-white/10 bg-[#020617]/90 text-[#F8FAFC] backdrop-blur-xl",
    surface: "border-white/10 bg-[#0F172A] text-[#F8FAFC]",
    surfaceMuted: "bg-[#111827] text-[#F8FAFC]",
    sidebar: "border-white/10 bg-[#0F172A] text-[#F8FAFC]",
    adminSidebar: "border-white/10 bg-[#020617] text-white",
    border: "border-white/10",
    textPrimary: "text-[#F8FAFC]",
    textSecondary: "text-[#CBD5E1]",
    textMuted: "text-[#94A3B8]",
    brandText: "text-[#22D3EE]",
    hover: "hover:bg-white/10",
    menuHover: "hover:bg-white/10 hover:text-white",
    errorText: "text-[#F87171]",
  },
  buttons: {
    base: "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
    primary: "bg-cyan-400 text-slate-950 hover:-translate-y-0.5 hover:bg-cyan-300",
    secondary: "border bg-transparent hover:-translate-y-0.5 hover:border-cyan-300",
    ghost: "hover:bg-slate-100 dark:hover:bg-white/10",
    danger: "text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-400/10",
  },
  layout: {
    navbar: "sticky top-0 z-40",
    navInner: "flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8",
    container: "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
    adminContainer: "min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:px-8",
  },
};

export function useThemeTokens() {
  const { isDark } = useTheme();
  return {
    ...themeTokens.common,
    ...themeTokens[isDark ? "dark" : "light"],
    buttons: themeTokens.buttons,
    layout: themeTokens.layout,
    isDark,
  };
}
