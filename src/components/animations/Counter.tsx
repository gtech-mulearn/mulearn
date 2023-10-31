import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    children: string;
};
function getCorrectText(value: number) {
    if (value >= 1000) {
        const formattedNumber = new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3
        }).format(value / 1000);
        return formattedNumber + "K";
    } else
        return new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0
        }).format(value);
}

export const Counter: FC<CounterProps> = ({ type, children, className }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const to = parseInt(children);

    const Comp = type;

    useEffect(() => {
        const node = nodeRef.current;

        const controls = animate(0, to, {
            duration: to > 1000 ? 4 : 2,
            ease: "circOut",
            onUpdate(value) {
                if (node) node.textContent = getCorrectText(value);
            }
        });

        return () => controls.stop();
    }, [to]);

    return <Comp className={className} ref={nodeRef} />;
};
