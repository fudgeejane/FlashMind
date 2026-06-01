import { classNames, useThemeTokens } from "../tokens";

const variants = {
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  danger: "danger",
};

export default function Button({ as: Component = "button", variant = "primary", className, children, ...props }) {
  const tokens = useThemeTokens();
  const variantClass = tokens.buttons[variants[variant] || variants.primary];
  const themedBorder = variant === "secondary" ? tokens.border : "";

  return (
    <Component className={classNames(tokens.buttons.base, variantClass, themedBorder, className)} {...props}>
      {children}
    </Component>
  );
}
