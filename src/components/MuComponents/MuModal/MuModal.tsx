import { FC, ReactNode } from "react";
import styles from "./MuModal.module.css"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const MuModal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.modalHeader}>
                    <button onClick={onClose} className={styles.modalClose}>
                        X
                    </button>
                </div>
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

export default MuModal;
