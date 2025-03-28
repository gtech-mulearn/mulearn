import * as React from "react";
import styles from "./styles.module.css";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", type, ...props }, ref) => (
    <input type={type} className={`${styles.input} ${className}`} ref={ref} {...props} />
  )
);

Input.displayName = "Input";

export { Input };