import * as React from "react";
import styles from "./styles.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = "", ...props }, ref) => (
  <textarea ref={ref} className={`${styles.textarea} ${className}`} {...props} />
));

Textarea.displayName = "Textarea";

export { Textarea };