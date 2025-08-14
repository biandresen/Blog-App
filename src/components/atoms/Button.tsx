import { type ReactNode, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "shade" | "primary" | "secondary" | "tertiary" | "success" | "error";
type ButtonSize = "zero" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  shade: "bg-[var(--primary-shade)] text-[var(--text2)] hover:brightness-90",
  primary: "bg-[var(--button1)] text-[var(--text2)] hover:brightness-120",
  secondary: "bg-[var(--button2)] text-[var(--text2)] hover:brightness-120",
  tertiary: "bg-[var(--button3)] text-[var(--text2)] hover:brightness-120",
  success: "bg-[var(--success)] text-[var(--text2)] hover:brightness-120",
  error: "bg-[var(--error)] text-[var(--text2)] hover:brightness-120",
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
