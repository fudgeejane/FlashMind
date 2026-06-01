import { useTheme } from "../../theme/useTheme";
import { Moon, Sun } from "lucide-react";
import { classNames } from "./classNames";

export default function ThemeComponents() {
  const { isDark: darkMode } = useTheme();

  return {
    primaryBg: darkMode ? "bg-[#020617]" : "bg-[#F8FAFC]",
    secondaryBg: darkMode ? "bg-[#0F172A]" : "bg-[#FFFFFF]",
    headerBg: darkMode ? "bg-[#020617]/90" : "bg-[#FFFFFF]/90",
    footerBg: darkMode ? "bg-[#020617]" : "bg-[#0F172A]",

    border: darkMode ? "border-white/10" : "border-[#E2E8F0]",
    borderStrong: darkMode ? "border-white/20" : "border-[#CBD5E1]",
    divide: darkMode ? "divide-white/10" : "divide-[#E2E8F0]",

    // Layout
    page: `min-h-screen transition-colors ${
      darkMode ? "bg-[#020617] text-[#F8FAFC]" : "bg-[#F8FAFC] text-[#020617]"
    }`,
    section: `transition-colors ${
      darkMode ? "bg-[#020617] text-[#F8FAFC]" : "bg-[#F8FAFC] text-[#020617]"
    }`,
    sectionAlt: `transition-colors ${
      darkMode ? "bg-[#0F172A] text-[#F8FAFC]" : "bg-[#FFFFFF] text-[#020617]"
    }`,
    surface: darkMode ? "bg-[#0F172A] text-[#F8FAFC]" : "bg-[#FFFFFF] text-[#020617]",
    surfaceMuted: darkMode ? "bg-[#111827] text-[#F8FAFC]" : "bg-[#F1F5F9] text-[#020617]",
    header: `border-b backdrop-blur-xl ${
      darkMode
        ? "border-white/10 bg-[#020617]/90 text-[#F8FAFC]"
        : "border-[#E2E8F0] bg-[#FFFFFF]/90 text-[#020617]"
    }`,
    footer: `border-t text-white ${
      darkMode ? "border-white/10 bg-[#020617]" : "border-[#E2E8F0] bg-[#0F172A]"
    }`,

    // Hovers
    primaryBgHover: darkMode ? "hover:bg-[#0F172A]" : "hover:bg-[#F1F5F9]",
    secondaryBgHover: darkMode ? "hover:bg-[#111827]" : "hover:bg-[#F8FAFC]",
    headerHover: darkMode ? "hover:bg-white/10" : "hover:bg-slate-100",

    // Inputs
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

    // Paragraph Texts
    primaryText: darkMode ? "text-[#F8FAFC]" : "text-[#020617]",
    secondaryText: darkMode ? "text-[#CBD5E1]" : "text-[#475569]",
    mutedText: darkMode ? "text-[#94A3B8]" : "text-[#64748B]",
    tertiaryText: darkMode ? "text-[#94A3B8]" : "text-[#94A3B8]",
    brandText: darkMode ? "text-[#22D3EE]" : "text-[#0891B2]",
    successText: darkMode ? "text-[#22C55E]" : "text-[#16A34A]",
    warningText: darkMode ? "text-[#F59E0B]" : "text-[#D97706]",
    errorText: darkMode ? "text-[#F87171]" : "text-[#DC2626]",
    primaryTextHover: darkMode ? "hover:text-white" : "hover:text-slate-900",

    // Cards
    card: `rounded-2xl border shadow-sm transition-colors ${
      darkMode
        ? "border-white/10 bg-[#0F172A] text-[#F8FAFC]"
        : "border-[#E2E8F0] bg-[#FFFFFF] text-[#020617]"
    }`,
    cardHover: darkMode
      ? "hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl"
      : "hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl",
    shadow: darkMode
      ? "shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      : "shadow-[0_2px_12px_rgba(15,23,42,0.08)]",

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
    buttonBlue: `cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white ${
      darkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-500"
    }`,
    buttonGreen: `cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white ${
      darkMode ? "bg-green-700 hover:bg-green-800" : "bg-green-600 hover:bg-green-500"
    }`,
    buttonRed: `cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white ${
      darkMode ? "bg-red-700 hover:bg-red-800" : "bg-red-500 hover:bg-red-400"
    }`,
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

    // Colored Backgrounds
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

    // Text Colors
    yellowText: darkMode ? "text-yellow-100" : "text-yellow-700",
    redText: darkMode ? "text-red-500" : "text-red-700",
    blueText: darkMode ? "text-blue-400" : "text-blue-800",
    greenText: "text-green-500",
    grayText: darkMode ? "text-gray-500" : "text-gray-600",
    orangeText: "text-orange-400",
    purpleText: darkMode ? "text-purple-400" : "text-purple-600",

    // Border Colors
    yellowBorder: darkMode ? "border-yellow-900" : "border-yellow-400",
    redBorder: darkMode ? "border-red-900" : "border-red-400",
    blueBorder: darkMode ? "border-blue-700/30" : "border-blue-500",
    greenBorder: darkMode ? "border-green-700/30" : "border-green-300",
    grayBorder: darkMode ? "border-gray-500" : "border-gray-300",
    purpleBorder: darkMode ? "border-purple-900" : "border-purple-300",

    // Answers
    correct: darkMode ? "bg-green-400/50 text-white" : "bg-green-200/50 text-gray-600",
    wrong: darkMode ? "bg-red-400/70 text-white" : "bg-red-200/50 text-gray-600",
    correctText: darkMode ? "text-green-200" : "text-green-700",

    // Navigation
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

    // User layout
    routeProgress:
      "pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left animate-route-progress bg-theme-primary",
    overlay: "fixed inset-0 z-40 bg-black/50 lg:hidden",
    layoutNav: "flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8",
    layoutContainer: "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
    iconButton:
      "grid h-10 w-10 place-items-center rounded-xl border border-theme-border transition hover:border-theme-primary",
    iconButtonGhost: "rounded-xl p-2 transition hover:bg-theme-surface-muted",
    avatar:
      "grid h-8 w-8 place-items-center rounded-full bg-theme-primary/15 text-theme-primary",
    profileButton:
      "flex items-center gap-2 rounded-full border border-theme-border bg-theme-surface px-2 py-2 text-sm font-semibold transition hover:border-theme-primary",
    dropdown:
      "absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-theme-border bg-theme-surface shadow-xl",
    dropdownSection: "border-t border-theme-border p-2",
    dropdownItem:
      "inline-flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm font-semibold text-theme-text-secondary transition hover:bg-theme-surface-muted hover:text-theme-text-primary",
    sidebar: `fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r border-theme-border pt-4 shadow-2xl transition-all duration-300 lg:top-[65px] lg:z-30 lg:translate-x-0 lg:shadow-none ${
      darkMode ? "bg-[#020617]/90" : "bg-[#FFFFFF]/90"
    }`,
    sidebarItemBase:
      "flex items-center gap-3 rounded-lg py-3 text-sm font-bold transition",
    sidebarItem: "text-theme-text-secondary hover:bg-theme-surface-muted hover:text-theme-text-primary",
    sidebarItemActive: "bg-theme-primary/70 text-theme-text-primary",
  };
}

export const ThemeToggle = () => {
  const { activeTheme, isDark, toggleMode } = useTheme();
  const classes = activeTheme.classes;

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={toggleMode}
      className={classNames(
        "group cursor-pointer relative inline-flex h-7.5 w-14 items-center rounded-full border p-1 shadow-sm transition hover:border-theme-primary",
        classes.surface,
        classes.border
      )}
    >
      <span
        className={classNames(
          "grid h-5 w-5 place-items-center rounded-full text-sm font-bold shadow-sm transition",
          isDark ? "translate-x-6 bg-theme-primary text-slate-950" : "translate-x-0 bg-theme-secondary text-white"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
};

export const ThemedPage = ({ as: Component = "div", className, children, ...props }) => {
  const styles = ThemeComponents();
  return (
    <Component className={classNames(styles.page, className)} {...props}>
      {children}
    </Component>
  );
};

export const ThemedSection = ({ as: Component = "section", tone = "default", fullHeight = false, className, children, ...props }) => {
  const styles = ThemeComponents();
  const toneClass = tone === "surface" ? styles.sectionAlt : styles.section;
  return (
    <Component className={classNames(toneClass, fullHeight && "min-h-[100svh]", className)} {...props}>
      {children}
    </Component>
  );
};

export const ThemedCard = ({ as: Component = "article", hover = false, className, children, ...props }) => {
  const styles = ThemeComponents();
  return <Component className={classNames(styles.card, hover && styles.cardHover, className)} {...props}>{children}</Component>;
};

const textVariants = {
  primary: "primaryText",
  secondary: "secondaryText",
  muted: "mutedText",
  brand: "brandText",
  success: "successText",
  warning: "warningText",
  error: "errorText",
};

export const ThemedText = ({ as: Component = "p", variant = "primary", className, children, ...props }) => {
  const styles = ThemeComponents();
  const variantClass = styles[textVariants[variant] || textVariants.primary];
  return <Component className={classNames(variantClass, className)} {...props}>{children}</Component>;
};

const buttonVariants = {
  primary: "buttonPrimary",
  secondary: "buttonSecondary",
  ghost: "buttonGhost",
  success: "buttonSuccess",
  warning: "buttonWarning",
  error: "buttonError",
};

export const ThemedButton = ({ as: Component = "button", variant = "primary", className, children, ...props }) => {
  const styles = ThemeComponents();
  const variantClass = styles[buttonVariants[variant] || buttonVariants.primary];
  return <Component className={classNames(styles.buttonBase, variantClass, className)} {...props}>{children}</Component>;
};

export const ThemedInput = ({ label, textarea = false, className, inputClassName, ...props }) => {
  const styles = ThemeComponents();
  const Field = textarea ? "textarea" : "input";
  return (
    <label className={classNames("block", className)}>
      {label && <span className={styles.label}>{label}</span>}
      <Field className={classNames("mt-2", textarea ? styles.textarea : styles.input, inputClassName)} {...props} />
    </label>
  );
};
