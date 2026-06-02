import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../theme/useTheme";
import { classNames } from "./classNames";

export function ThemeComponents() {
  return {
    primaryBg: "bg-theme-bg",
    secondaryBg: "bg-theme-surface",
    headerBg: "bg-theme-surface/95",
    footerBg: "bg-theme-bg",

    border: "border-theme-border",
    borderStrong: "border-theme-border-strong",
    divide: "divide-theme-border",

    page: "transition-colors bg-theme-bg text-theme-text-primary",
    section: "transition-colors bg-theme-bg text-theme-text-primary",
    sectionAlt: "transition-colors bg-theme-surface text-theme-text-primary",
    surface: "bg-theme-surface text-theme-text-primary",
    surfaceMuted: "bg-theme-surface-muted text-theme-text-primary",
    header: "border-b backdrop-blur-xl border-theme-border bg-theme-surface/95 text-theme-text-primary",
    footer: "border-t bg-theme-bg text-theme-text-primary",

    primaryBgHover: "hover:bg-theme-primary-hover",
    secondaryBgHover: "hover:bg-theme-secondary-hover",
    headerHover: "hover:bg-theme-surface-muted",

    input: "w-full rounded-lg border px-4 py-2 outline-none transition focus:ring-4 placeholder:text-theme-text-muted border-theme-border bg-theme-surface text-theme-text-primary focus:border-theme-primary focus:ring-theme-primary/15",
    textarea: "w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:ring-4 placeholder:text-theme-text-muted border-theme-border bg-theme-surface text-theme-text-primary focus:border-theme-primary focus:ring-theme-primary/15",
    label: "text-sm font-bold text-theme-text-primary",

    primaryText: "text-theme-text-primary",
    secondaryText: "text-theme-text-secondary",
    mutedText: "text-theme-text-muted",
    tertiaryText: "text-theme-text-muted",
    brandText: "text-theme-secondary",
    successText: "text-theme-success",
    warningText: "text-theme-warning",
    errorText: "text-theme-error",
    primaryTextHover: "hover:text-theme-text-primary",

    card: "rounded-lg border shadow-sm transition-colors border-theme-border bg-theme-surface text-theme-text-primary",
    cardHover: "hover:-translate-y-1 hover:border-theme-primary hover:shadow-xl",
    shadow: "shadow-[0_2px_12px_rgba(15,23,42,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]",

    buttonBase: "inline-flex cursor-pointer items-center justify-center rounded-lg px-5 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
    buttonPrimary: "hover:-translate-y-0.5 bg-theme-primary text-white hover:bg-theme-primary-hover",
    buttonSecondary: "border hover:-translate-y-0.5 border-theme-border bg-theme-surface text-theme-text-primary hover:border-theme-primary hover:bg-theme-surface-muted",
    buttonGhost: "text-theme-text-secondary hover:bg-theme-surface-muted hover:text-theme-text-primary",
    buttonBlue: "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white bg-theme-primary hover:bg-theme-primary-hover",
    buttonGreen: "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white bg-theme-success hover:bg-theme-success/90",
    buttonRed: "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white bg-theme-error hover:bg-theme-error/90",
    buttonSuccess: "bg-theme-success text-white hover:bg-theme-success/90",
    buttonWarning: "bg-theme-warning text-white hover:bg-theme-warning/90",
    buttonError: "bg-theme-error text-white hover:bg-theme-error/90",
    closeButton: "cursor-pointer font-extrabold text-theme-text-muted hover:text-theme-error",

    yellowBg: "bg-theme-warning/10",
    yellowBg2: "bg-theme-warning/20",
    redBg: "bg-theme-error text-white",
    redBg2: "bg-theme-error/10",
    blueBg: "bg-theme-secondary/10",
    blueBg2: "bg-theme-secondary/20",
    greenBg: "bg-theme-success text-white",
    greenBg2: "bg-theme-success/10",
    grayBg: "bg-theme-surface-muted",
    grayBg2: "bg-theme-border-strong",
    purpleBg2: "bg-theme-accent/10",

    yellowText: "text-theme-warning",
    redText: "text-theme-error",
    blueText: "text-theme-secondary",
    greenText: "text-theme-success",
    grayText: "text-theme-text-muted",
    orangeText: "text-theme-warning",
    purpleText: "text-theme-accent",

    yellowBorder: "border-theme-warning",
    redBorder: "border-theme-error",
    blueBorder: "border-theme-secondary",
    greenBorder: "border-theme-success",
    grayBorder: "border-theme-border",
    purpleBorder: "border-theme-accent",

    correct: "bg-theme-success/10 text-theme-success",
    wrong: "bg-theme-error/10 text-theme-error",
    correctText: "text-theme-success",

    navLink: "text-sm font-semibold text-theme-text-secondary transition hover:text-theme-text-primary",
    navBg: "bg-theme-surface text-theme-text-primary hover:bg-theme-surface-muted",
    badge: "inline-flex rounded-lg border px-4 py-2 text-sm font-bold border-theme-secondary/20 bg-theme-secondary/10 text-theme-secondary",
    focus: "focus:border-theme-primary focus:ring-4 focus:ring-theme-primary/15",

    routeProgress: "pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left animate-route-progress bg-theme-primary",
    overlay: "fixed inset-0 z-40 bg-black/50 lg:hidden",
    layoutNav: "flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8",
    layoutContainer: "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6",
    iconButton: "grid h-10 w-10 place-items-center rounded-lg border border-theme-border transition hover:border-theme-primary",
    iconButtonGhost: "rounded-lg p-2 transition hover:bg-theme-surface-muted",
    avatar: "grid h-8 w-8 place-items-center rounded-lg bg-theme-primary/15 text-theme-primary",
    profileButton: "flex items-center gap-2 rounded-lg border border-theme-border bg-theme-surface px-2 py-2 text-sm font-semibold transition hover:border-theme-primary",
    dropdown: "absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-theme-border bg-theme-surface shadow-xl",
    dropdownSection: "border-t border-theme-border p-2",
    dropdownItem: "inline-flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm font-semibold text-theme-text-secondary transition hover:bg-theme-surface-muted hover:text-theme-text-primary",
    sidebar: "fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r border-theme-border pt-4 shadow-2xl transition-all duration-300 lg:top-[65px] lg:z-30 lg:translate-x-0 lg:shadow-none bg-theme-surface/90",
    sidebarItemBase: "flex items-center gap-3 rounded-lg py-3 text-sm font-bold transition",
    sidebarItem: "text-theme-text-secondary hover:bg-theme-surface-muted hover:text-theme-text-primary",
    sidebarItemActive: "bg-theme-primary/70 text-theme-text-primary",
  };
}

export default ThemeComponents;

export function ThemeToggle() {
  const { activeTheme, isDark, toggleMode } = useTheme();
  const classes = activeTheme.classes;

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={toggleMode}
      className={classNames(
        "group relative inline-flex h-7.5 w-14 cursor-pointer items-center rounded-lg border p-1 shadow-sm transition hover:border-theme-primary",
        classes.surface,
        classes.border
      )}
    >
      <span
        className={classNames(
          "grid h-5 w-5 place-items-center rounded-lg text-sm font-bold shadow-sm transition",
          isDark ? "translate-x-6 bg-theme-primary text-slate-950" : "translate-x-0 bg-theme-secondary text-white"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
}

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

  return (
    <Component className={classNames(styles.card, hover && styles.cardHover, className)} {...props}>
      {children}
    </Component>
  );
};

export const ThemedCardHead = ({ as: Component = "h2", className, children, ...props }) => {
  const styles = ThemeComponents();

  return (
    <Component className={classNames("text-2xl font-bold leading-tight", styles.primaryText, className)} {...props}>
      {children}
    </Component>
  );
};

export const ThemedCardParagraph = ({ as: Component = "p", className, children, ...props }) => {
  const styles = ThemeComponents();

  return (
    <Component className={classNames("text-sm leading-6", styles.secondaryText, className)} {...props}>
      {children}
    </Component>
  );
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

  return (
    <Component className={classNames(variantClass, className)} {...props}>
      {children}
    </Component>
  );
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

  return (
    <Component className={classNames(styles.buttonBase, variantClass, className)} {...props}>
      {children}
    </Component>
  );
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
