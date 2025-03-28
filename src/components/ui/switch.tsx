import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import styles from "./styles.module.css";

const Switch = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(
  ({ className = "", ...props }, ref) => (
    <SwitchPrimitives.Root ref={ref} className={`${styles.switch} ${className}`} {...props}>
      <SwitchPrimitives.Thumb className={styles.switchThumb} />
    </SwitchPrimitives.Root>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };