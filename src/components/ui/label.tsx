import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import styles from "./styles.module.css";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className = "", ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={`${styles.label} ${className}`} {...props} />
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };