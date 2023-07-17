import { FC } from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
    id: string | number | boolean;
    heading: string | undefined;
    content: string | undefined;
    click: any;
}

/*
TODO: Conditional rendering of icon.
*/

const Modal: FC<ModalProps> = ({ setIsOpen, id, heading, content, click }) => {
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
