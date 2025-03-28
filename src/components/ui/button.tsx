import * as React from "react";
import styles from "./styles.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className = "", variant = "default", size = "default", ...props }, ref) => (
  <button ref={ref} className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`} {...props} />
));

Button.displayName = "Button";

export { Button };