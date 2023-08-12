import { FC } from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
    id: string | number | boolean;
    heading: string | undefined;
    content: string | undefined;
    click: any;
    type?:string;
}

/*
TODO: Conditional rendering of icon.
*/

const Modal: FC<ModalProps> = ({ setIsOpen, id, heading, content, click,type }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setIsOpen(false)}
                        >
                            <RiCloseLine style={{ marginBottom: "-3px" }} />
                        </button>

                        {type == "error" ? (
                            <div className={styles.checkbtndelete}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                   
                                >
                                    <path
                                        d="M45.3125 0H4.6875C2.09961 0 0 2.39955 0 5.35714V44.6429C0 47.6004 2.09961 50 4.6875 50H45.3125C47.9004 50 50 47.6004 50 44.6429V5.35714C50 2.39955 47.9004 0 45.3125 0ZM37.1484 32.4219C37.6172 32.9576 37.6172 33.8281 37.1484 34.3638L33.1934 38.8839C32.7246 39.4196 31.9629 39.4196 31.4941 38.8839L25 31.3951L18.5059 38.8839C18.0371 39.4196 17.2754 39.4196 16.8066 38.8839L12.8516 34.3638C12.3828 33.8281 12.3828 32.9576 12.8516 32.4219L19.4043 25L12.8516 17.5781C12.3828 17.0424 12.3828 16.1719 12.8516 15.6362L16.8066 11.1161C17.2754 10.5804 18.0371 10.5804 18.5059 11.1161L25 18.6049L31.4941 11.1161C31.9629 10.5804 32.7246 10.5804 33.1934 11.1161L37.1484 15.6362C37.6172 16.1719 37.6172 17.0424 37.1484 17.5781L30.5957 25L37.1484 32.4219Z"
                                        fill="#F84545"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div className={styles.checkbtn}>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                   
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                        stroke="#039855"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                        )}
                     

                        <h5 className={styles.heading}>{heading}</h5>
                    </div>

                    <div className={styles.modalContent}>{content}</div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button
                                className={styles.deleteBtn}
                                onClick={() => {
                                    click(id);
                                    setIsOpen(false);
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
