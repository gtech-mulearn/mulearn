import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./styles.module.css";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(
  ({ className = "", children, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={`${styles.selectTrigger} ${className}`} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className={styles.selectChevron} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(
  ({ className = "", children, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={`${styles.selectContent} ${className}`}
        sideOffset={5}  // Ensures dropdown doesn't overlap trigger
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className = "", children, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={`${styles.selectItem} ${className}`} {...props}>
      <span className={styles.selectCheck}><Check /></span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem };