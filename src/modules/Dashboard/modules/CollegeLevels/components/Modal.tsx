import React, { CSSProperties, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

type props = {
    icon?: React.ReactNode;
    header?: string;
    paragraph?: string;
    children: React.ReactNode;
    onClose: any;
    size?: "small" | "large";
    style?: CSSProperties;
};

const Modal = (props: props) => {
    //wheel event is passive event listener
    //thus cant directly put preventDefault
    // const modalRef = useRef<HTMLDivElement>(null)
    // useEffect(()=>{
    //   modalRef.current!.addEventListener("wheel", (event) => {
    //     event.preventDefault()
    //   },{passive:false});
    // },[])

    return (
        <div
            className={
                styles.modal +
                " " +
                (props.size === "small" ? styles.smallSize : "")
            }
            onClick={() => {
                props.onClose(null);
            }}
            // ref={modalRef}
        >
            <div
                className={styles.container}
                onClick={e => e.stopPropagation()}
                style={props.style}
            >
                {props.icon}
                <h2>{props.header}</h2>
                {props.paragraph && <p>{props.paragraph}</p>}
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
