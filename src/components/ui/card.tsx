import * as React from "react";
import styles from "./styles.module.css";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`${styles.card} ${className}`} {...props} />
));
Card.displayName = "Card";

const CardHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.cardHeader} ${className}`} {...props} />
);

const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`${styles.cardTitle} ${className}`} {...props} />
);

const CardContent = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.cardContent} ${className}`} {...props} />
);

const CardFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`${styles.cardFooter} ${className}`} {...props} />
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };