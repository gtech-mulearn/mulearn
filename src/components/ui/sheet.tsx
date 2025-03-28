import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import styles from "./styles.module.css";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(
  ({ className = "", ...props }, ref) => (
    <SheetPrimitive.Overlay ref={ref} className={`${styles.sheetOverlay} ${className}`} {...props} />
  )
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>>(
  ({ className = "", children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={`${styles.sheetContent} ${className}`} {...props}>
        {children}
        <SheetPrimitive.Close className={styles.sheetClose}><X /></SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.sheetHeader} ${className}`} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>>(
  ({ className = "", ...props }, ref) => (
    <SheetPrimitive.Title ref={ref} className={`${styles.sheetTitle} ${className}`} {...props} />
  )
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>>(
  ({ className = "", ...props }, ref) => (
    <SheetPrimitive.Description ref={ref} className={`${styles.sheetDescription} ${className}`} {...props} />
  )
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription };