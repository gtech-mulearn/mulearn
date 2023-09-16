import { ReactNode } from "react";
import { PowerfulButton } from "../MuButtons/MuButton";

type BadgeVarient = "small" | "large"
const Badge = ({ children, style, variant = "large" }: { children: ReactNode, style?: React.CSSProperties, variant?: BadgeVarient }) => {
    const badgeStyle: React.CSSProperties = variant === "large" ? {
        padding: "3px 10px", borderWidth: "1px", borderRadius: "6px", fontSize: "10px"
    } : {
        padding: "1px 7px", borderWidth: ".5px", borderRadius: "6px", backgroundColor: "transparent", fontSize: "8px", borderColor: "grey", color: "grey"
    }
    return (
        <PowerfulButton variant="outline" style={{ ...badgeStyle, ...style }}>
            {children}
        </PowerfulButton>
    );
}

export { Badge };