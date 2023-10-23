import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

type CounterProps = {
    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    children: string;
};

export const Counter: FC<CounterProps> = ({ type, children, className }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const to = parseInt(children);

    const Comp = type;

    useEffect(() => {
        const node = nodeRef.current;

        const controls = animate(0, to, {
            duration: 2,
            onUpdate(value) {
                if (node)
                    node.textContent =
                        value > 1000
                            ? value.toFixed(0) + "K"
                            : value < 10
                            ? "0" + value.toFixed(0)
                            : value.toFixed(0);
            }
        });

        return () => controls.stop();
    }, [to]);

    return <Comp className={className} ref={nodeRef} />;
};
