import ThemeStyles from "../../theme/ThemeStyles";
import { useTheme } from "../../theme/useTheme";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ThemeToggle() {
  const { activeTheme, isDark, toggleMode } = useTheme();
  const classes = activeTheme.classes;

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={toggleMode}
      className={`group relative inline-flex h-10 w-20 items-center rounded-full border p-1 shadow-sm transition hover:border-theme-primary ${classes.surface} ${classes.border}`}
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold shadow-sm transition ${
          isDark
            ? "translate-x-10 bg-theme-primary text-slate-950"
            : "translate-x-0 bg-theme-secondary text-white"
        }`}
      >
        {isDark ? "D" : "L"}
      </span>
    </button>
  );
}

export function ThemedPage({
  as: Component = "div",
  className = "",
  children,
  ...props
}) {
  const styles = ThemeStyles();

  return (
    <Component className={cn(styles.page, className)} {...props}>
      {children}
    </Component>
  );
}

export function ThemedSection({
  as: Component = "section",
  tone = "default",
  fullHeight = false,
  className = "",
  children,
  ...props
}) {
  const styles = ThemeStyles();
  const toneClass = tone === "surface" ? styles.sectionAlt : styles.section;

  return (
    <Component
      className={cn(toneClass, fullHeight && "min-h-[100svh]", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ThemedCard({
  as: Component = "article",
  hover = false,
  className = "",
  children,
  ...props
}) {
  const styles = ThemeStyles();

  return (
    <Component className={cn(styles.card, hover && styles.cardHover, className)} {...props}>
      {children}
    </Component>
  );
}

const textVariants = {
  primary: "primaryText",
  secondary: "secondaryText",
  muted: "mutedText",
  brand: "brandText",
  success: "successText",
  warning: "warningText",
  error: "errorText",
};

export function ThemedText({
  as: Component = "p",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const styles = ThemeStyles();
  const variantClass = styles[textVariants[variant] ?? textVariants.primary];

  return (
    <Component className={cn(variantClass, className)} {...props}>
      {children}
    </Component>
  );
}

const buttonVariants = {
  primary: "buttonPrimary",
  secondary: "buttonSecondary",
  ghost: "buttonGhost",
  success: "buttonSuccess",
  warning: "buttonWarning",
  error: "buttonError",
};

export function ThemedButton({
  as: Component = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const styles = ThemeStyles();
  const variantClass = styles[buttonVariants[variant] ?? buttonVariants.primary];

  return (
    <Component className={cn(styles.buttonBase, variantClass, className)} {...props}>
      {children}
    </Component>
  );
}

export function ThemedInput({
  label,
  textarea = false,
  className = "",
  inputClassName = "",
  ...props
}) {
  const styles = ThemeStyles();
  const Field = textarea ? "textarea" : "input";

  return (
    <label className={cn("block", className)}>
      {label && <span className={styles.label}>{label}</span>}
      <Field
        className={cn("mt-2", textarea ? styles.textarea : styles.input, inputClassName)}
        {...props}
      />
    </label>
  );
}
