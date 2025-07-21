import { type ReactNode, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "zero" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string; // allow both React nodes and strings
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string; // allow further customization
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/80",
  secondary: "bg-secondary text-black hover:bg-secondary/80",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  zero: "",
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({ children, label, variant = "primary", size = "md", className, ...props }: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      aria-label={label}
      className={clsx(
        "rounded font-medium transition-colors duration-200",
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
