import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { X } from "lucide-react";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(
  ({ className = "", ...props }, ref) => (
    <DialogPrimitive.Overlay ref={ref} className={`${styles.dialogOverlay} ${className}`} {...props} />
  )
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(
  ({ className = "", children, ...props }, ref) => (
    <DialogPrimitive.Content ref={ref} className={`${styles.dialogContent} ${className}`} {...props}>
      {children}
      <DialogPrimitive.Close className={styles.dialogClose}>
        <X className={styles.dialogCloseIcon} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.dialogHeader} ${className}`} {...props} />
);

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className = "", ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={`${styles.dialogTitle} ${className}`} {...props} />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(
  ({ className = "", ...props }, ref) => (
    <DialogPrimitive.Description ref={ref} className={`${styles.dialogDescription} ${className}`} {...props} />
  )
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.dialogFooter} ${className}`} {...props} />
);

export {
  Dialog,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};