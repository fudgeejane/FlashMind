import { useTheme } from "./useTheme";

export default function ThemeStyles() {
  const { isDark: darkMode } = useTheme();

  return {
    // Backgrounds
    page: `min-h-screen transition-colors ${
      darkMode ? "bg-[#020617] text-[#F8FAFC]" : "bg-[#F8FAFC] text-[#020617]"
    }`,
    section: `transition-colors ${
      darkMode ? "bg-[#020617] text-[#F8FAFC]" : "bg-[#F8FAFC] text-[#020617]"
    }`,
    sectionAlt: `transition-colors ${
      darkMode ? "bg-[#0F172A] text-[#F8FAFC]" : "bg-[#FFFFFF] text-[#020617]"
    }`,
    primaryBg: darkMode ? "bg-[#22D3EE]" : "bg-[#0891B2]",
    secondaryBg: darkMode ? "bg-[#0F172A]" : "bg-[#0F172A]",
    accentBg: darkMode ? "bg-[#4ADE80]" : "bg-[#22C55E]",
    successBg: darkMode ? "bg-[#22C55E]" : "bg-[#16A34A]",
    warningBg: darkMode ? "bg-[#F59E0B]" : "bg-[#D97706]",
    errorBg: darkMode ? "bg-[#F87171]" : "bg-[#DC2626]",
    surface: darkMode ? "bg-[#0F172A] text-[#F8FAFC]" : "bg-[#FFFFFF] text-[#020617]",
    surfaceMuted: darkMode ? "bg-[#111827] text-[#F8FAFC]" : "bg-[#F1F5F9] text-[#020617]",
    headerBg: darkMode ? "bg-[#020617]/85" : "bg-[#FFFFFF]/85",
    footerBg: darkMode ? "bg-[#020617]" : "bg-[#0F172A]",
    primaryBgSoft: darkMode ? "bg-cyan-400/10" : "bg-cyan-50",
    successBgSoft: darkMode ? "bg-green-400/10" : "bg-green-50",
    warningBgSoft: darkMode ? "bg-amber-400/10" : "bg-amber-50",
    errorBgSoft: darkMode ? "bg-red-400/10" : "bg-red-50",

    // Containers
    header: `border-b backdrop-blur-xl ${
      darkMode
        ? "border-white/10 bg-[#020617]/85 text-[#F8FAFC]"
        : "border-[#E2E8F0] bg-[#FFFFFF]/85 text-[#020617]"
    }`,
    footer: `border-t text-white ${
      darkMode ? "border-white/10 bg-[#020617]" : "border-[#E2E8F0] bg-[#0F172A]"
    }`,
    card: `rounded-2xl border shadow-sm transition-colors ${
      darkMode
        ? "border-white/10 bg-[#0F172A] text-[#F8FAFC]"
        : "border-[#E2E8F0] bg-[#FFFFFF] text-[#020617]"
    }`,
    cardHover: darkMode
      ? "hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl"
      : "hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl",
    border: darkMode ? "border-white/10" : "border-[#E2E8F0]",
    borderStrong: darkMode ? "border-white/20" : "border-[#CBD5E1]",
    divide: darkMode ? "divide-white/10" : "divide-[#E2E8F0]",
    shadow: darkMode
      ? "shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      : "shadow-[0_2px_12px_rgba(15,23,42,0.08)]",

    // Hovers
    primaryBgHover: darkMode ? "hover:bg-[#0F172A]" : "hover:bg-[#F1F5F9]",
    secondaryBgHover: darkMode ? "hover:bg-[#111827]" : "hover:bg-[#F8FAFC]",
    headerHover: darkMode ? "hover:bg-white/10" : "hover:bg-slate-100",

    // Text
    primaryText: darkMode ? "text-[#F8FAFC]" : "text-[#020617]",
    secondaryText: darkMode ? "text-[#CBD5E1]" : "text-[#475569]",
    mutedText: darkMode ? "text-[#94A3B8]" : "text-[#64748B]",
    tertiaryText: darkMode ? "text-[#94A3B8]" : "text-[#94A3B8]",
    brandText: darkMode ? "text-[#22D3EE]" : "text-[#0891B2]",
    successText: darkMode ? "text-[#22C55E]" : "text-[#16A34A]",
    warningText: darkMode ? "text-[#F59E0B]" : "text-[#D97706]",
    errorText: darkMode ? "text-[#F87171]" : "text-[#DC2626]",
    primaryTextHover: darkMode ? "hover:text-white" : "hover:text-slate-900",

    // Forms
    input: `w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 placeholder:text-slate-400 ${
      darkMode
        ? "border-white/10 bg-[#0F172A] text-[#F8FAFC] focus:border-[#22D3EE] focus:ring-cyan-400/15"
        : "border-[#E2E8F0] bg-[#FFFFFF] text-[#020617] focus:border-[#0891B2] focus:ring-cyan-600/15"
    }`,
    textarea: `w-full resize-none rounded-xl border px-4 py-3 outline-none transition focus:ring-4 placeholder:text-slate-400 ${
      darkMode
        ? "border-white/10 bg-[#0F172A] text-[#F8FAFC] focus:border-[#22D3EE] focus:ring-cyan-400/15"
        : "border-[#E2E8F0] bg-[#FFFFFF] text-[#020617] focus:border-[#0891B2] focus:ring-cyan-600/15"
    }`,
    label: darkMode ? "text-sm font-bold text-[#F8FAFC]" : "text-sm font-bold text-[#020617]",

    // Buttons
    buttonBase:
      "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
    buttonPrimary: `hover:-translate-y-0.5 ${
      darkMode
        ? "bg-[#22D3EE] text-[#020617] hover:bg-cyan-300"
        : "bg-[#0F172A] text-white hover:bg-[#0891B2]"
    }`,
    buttonSecondary: `border hover:-translate-y-0.5 ${
      darkMode
        ? "border-white/10 bg-[#0F172A] text-[#F8FAFC] hover:border-[#22D3EE]"
        : "border-[#E2E8F0] bg-[#FFFFFF] text-[#020617] hover:border-[#0891B2]"
    }`,
    buttonGhost: darkMode
      ? "text-[#CBD5E1] hover:bg-white/10 hover:text-white"
      : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#020617]",
    buttonSuccess: darkMode
      ? "bg-green-600 text-white hover:bg-green-500"
      : "bg-green-600 text-white hover:bg-green-500",
    buttonWarning: darkMode
      ? "bg-amber-500 text-white hover:bg-amber-400"
      : "bg-amber-600 text-white hover:bg-amber-500",
    buttonError: darkMode
      ? "bg-red-500 text-white hover:bg-red-400"
      : "bg-red-600 text-white hover:bg-red-500",
    closeButton: darkMode
      ? "cursor-pointer font-extrabold text-slate-400 hover:text-red-400"
      : "cursor-pointer font-extrabold text-slate-400 hover:text-red-500",

    // Navigation and utility
    navLink: darkMode
      ? "text-sm font-semibold text-[#CBD5E1] transition hover:text-[#22D3EE]"
      : "text-sm font-semibold text-[#475569] transition hover:text-[#0891B2]",
    navBg: darkMode
      ? "bg-slate-800 text-white hover:bg-slate-700"
      : "bg-slate-200 text-slate-600 hover:bg-slate-300",
    badge: `inline-flex rounded-full border px-4 py-2 text-sm font-bold ${
      darkMode
        ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
        : "border-cyan-200 bg-cyan-50 text-cyan-700"
    }`,
    focus: darkMode
      ? "focus:border-[#22D3EE] focus:ring-4 focus:ring-cyan-400/15"
      : "focus:border-[#0891B2] focus:ring-4 focus:ring-cyan-600/15",

    // Colored backgrounds
    yellowBg: darkMode ? "bg-yellow-700/30" : "bg-yellow-100",
    yellowBg2: darkMode ? "bg-yellow-500/20" : "bg-yellow-200/50",
    redBg: darkMode ? "bg-red-600 text-white" : "bg-red-400 text-white",
    redBg2: darkMode ? "bg-red-500/20" : "bg-red-200/50",
    blueBg: darkMode ? "bg-blue-500/20" : "bg-blue-500",
    blueBg2: darkMode ? "bg-blue-500/20" : "bg-blue-200/50",
    greenBg: "bg-green-600 text-white",
    greenBg2: darkMode ? "bg-green-500/20" : "bg-green-200/50",
    grayBg: darkMode ? "bg-[#111827]" : "bg-gray-100",
    grayBg2: darkMode ? "bg-gray-500/10" : "bg-gray-200/50",
    purpleBg2: darkMode ? "bg-purple-500/10" : "bg-purple-200/50",

    // Colored text
    yellowText: darkMode ? "text-yellow-100" : "text-yellow-700",
    redText: darkMode ? "text-red-500" : "text-red-700",
    blueText: darkMode ? "text-blue-400" : "text-blue-800",
    greenText: "text-green-500",
    grayText: darkMode ? "text-gray-500" : "text-gray-600",
    orangeText: "text-orange-400",
    purpleText: darkMode ? "text-purple-400" : "text-purple-600",

    // Colored borders
    yellowBorder: darkMode ? "border-yellow-900" : "border-yellow-400",
    redBorder: darkMode ? "border-red-900" : "border-red-400",
    blueBorder: darkMode ? "border-blue-700/30" : "border-blue-500",
    greenBorder: darkMode ? "border-green-700/30" : "border-green-300",
    grayBorder: darkMode ? "border-gray-500" : "border-gray-300",
    purpleBorder: darkMode ? "border-purple-900" : "border-purple-300",

    // Answer states
    correct: darkMode ? "bg-green-400/50 text-white" : "bg-green-200/50 text-gray-600",
    wrong: darkMode ? "bg-red-400/70 text-white" : "bg-red-200/50 text-gray-600",
    correctText: darkMode ? "text-green-200" : "text-green-700",
  };
}
