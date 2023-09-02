import React, { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = ({ children, className, style,...props }:
    {children: ReactNode, className?:string, style?: React.CSSProperties} & React.HTMLAttributes<HTMLDivElement>) => JSX.Element
 
const Card: CardProps = ({children, className="", style, ...props}) => {
    return ( 
        <div className={styles.card + " " + className} style={style} {...props}>
            {children}
        </div>
     );
}

const CardHeader: CardProps = ({children, className="", style, ...props}) => {
    return ( 
        <div className={styles.cardHeader + " " + className} style={style} {...props}>
            {children}
        </div>
     );
}
const CardFooter: CardProps = ({children, className="", style, ...props}) => {
    return ( 
        <div className={styles.cardFooter + " " + className} style={style} {...props}>
            {children}
        </div>
     );
}
const CardContent: CardProps = ({children, className="", style, ...props}) => {
    return ( 
        <div className={styles.cardContent + " " + className} style={style} {...props}>
            {children}
        </div>
     );
}

type CardText = ({ children, className, style,...props }:
    {children: ReactNode, className?:string, style?: React.CSSProperties} & React.HTMLAttributes<HTMLHeadingElement>) => JSX.Element

const CardTitle:CardText = ({children, className="", style, ...props}) => 
  <h3 className={styles.cardTitle + " " + className} style={style} {...props}>
        {children}
  </h3>

const CardDescription:CardText = ({children, className="", style, ...props}) => 
  <p className={styles.cardDescription + " " + className} style={style} {...props}>
        {children}
  </p>

export {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
    CardTitle,
    CardDescription
}
