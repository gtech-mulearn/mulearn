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

const Modal: FC<ModalProps> = ({ setIsOpen, id, heading, content, click }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>{heading}</h5>
                    </div>
                    <button
                        className={styles.closeBtn}
                        onClick={() => setIsOpen(false)}
                    >
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
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
