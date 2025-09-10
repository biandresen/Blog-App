import clsx from "clsx";

import { type ButtonProps, type ButtonVariant, type ButtonSize } from "../../types/components.types";

const variantStyles: Record<ButtonVariant, string> = {
  shade: "bg-[var(--primary-shade)] text-[var(--text2)] hover:brightness-90",
  primary: "bg-[var(--button1)] button-style",
  secondary: "bg-[var(--button2)] button-style",
  tertiary: "bg-[var(--button3)] button-style",
  success: "bg-[var(--success)] button-style",
  error: "bg-[var(--error)] button-style",
};

const sizeStyles: Record<ButtonSize, string> = {
  zero: "",
  sm: "px-3 py-1 text-sm md:text-lg",
  md: "px-4 py-2 text-md md:text-xl",
  lg: "px-6 py-3 text-xl md:text-3xl",
};

const Button = ({ children, label, variant = "primary", size = "md", className, ...props }: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      aria-label={label}
      className={clsx(
        "rounded-full font-semibold transition-colors duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
