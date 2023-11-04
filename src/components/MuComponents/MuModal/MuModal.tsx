import { FC, ReactNode } from "react";
import styles from "./MuModal.module.css"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    type: "error" | "success";
    onDone: any;
    body?: string;
}

const MuModal: FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    type,
	onDone,
	body
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.iconContainer}>
                    {type !== "error" ? (
                        <div className={styles.icon}>
                            <BiCheckCircle />
                        </div>
                    ) : (
                        <div className={styles.iconError}>
                            <AiOutlineCloseCircle />
                        </div>
                    )}
                </div>
                {title && <h1 className={styles.modalTitle}>{title}</h1>}
                {body && <p className={styles.modalText}>{body}</p>}
                <div className={styles.modalBody}>{children}</div>
                <div className={styles.btn_container}>
                    <button
                        type="button"
                        className={styles.btn_cancel}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={onDone} // Use the onDone prop here
                        className={styles.btn_submit}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MuModal;
