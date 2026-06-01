import ThemeStyles from "../../theme/ThemeStyles";
import { useTheme } from "../../theme/useTheme";
import { Moon, Sun } from "lucide-react";

const classNames = (...classes) => classes.flat?.().filter(Boolean).join(" ") || [];

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
        "group cursor-pointer relative inline-flex h-10 w-20 items-center rounded-full border p-1 shadow-sm transition hover:border-theme-primary",
        classes.surface,
        classes.border
      )}
    >
      <span
        className={classNames(
          "grid h-8 w-8 place-items-center rounded-full text-sm font-bold shadow-sm transition",
          isDark ? "translate-x-10 bg-theme-primary text-slate-950" : "translate-x-0 bg-theme-secondary text-white"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
};

export const ThemedPage = ({ as: Component = "div", className, children, ...props }) => {
  const styles = ThemeStyles();
  return (
    <Component className={classNames(styles.page, className)} {...props}>
      {children}
    </Component>
  );
};

export const ThemedSection = ({ as: Component = "section", tone = "default", fullHeight = false, className, children, ...props }) => {
  const styles = ThemeStyles();
  const toneClass = tone === "surface" ? styles.sectionAlt : styles.section;
  return (
    <Component className={classNames(toneClass, fullHeight && "min-h-[100svh]", className)} {...props}>
      {children}
    </Component>
  );
};

export const ThemedCard = ({ as: Component = "article", hover = false, className, children, ...props }) => {
  const styles = ThemeStyles();
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
  const styles = ThemeStyles();
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
  const styles = ThemeStyles();
  const variantClass = styles[buttonVariants[variant] || buttonVariants.primary];
  return <Component className={classNames(styles.buttonBase, variantClass, className)} {...props}>{children}</Component>;
};

export const ThemedInput = ({ label, textarea = false, className, inputClassName, ...props }) => {
  const styles = ThemeStyles();
  const Field = textarea ? "textarea" : "input";
  return (
    <label className={classNames("block", className)}>
      {label && <span className={styles.label}>{label}</span>}
      <Field className={classNames("mt-2", textarea ? styles.textarea : styles.input, inputClassName)} {...props} />
    </label>
  );
};
