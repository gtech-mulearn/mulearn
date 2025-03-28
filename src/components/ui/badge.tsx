import * as React from "react";
import styles from "./styles.module.css";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className = "", variant = "default", ...props }, ref) => {
  return <span ref={ref} className={`${styles.badge} ${styles[variant]} ${className}`} {...props} />;
});

Badge.displayName = "Badge";

export { Badge };