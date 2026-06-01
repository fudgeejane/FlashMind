import { classNames, useThemeTokens } from "../tokens";

export default function Container({ as: Component = "main", variant = "user", className, children, ...props }) {
  const tokens = useThemeTokens();
  const spacing = variant === "admin" ? tokens.layout.adminContainer : tokens.layout.container;

  return (
    <Component className={classNames(spacing, className)} {...props}>
      {children}
    </Component>
  );
}
