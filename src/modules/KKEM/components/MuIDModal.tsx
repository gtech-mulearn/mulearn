import { useEffect, useRef } from "react";
import styles from "./MuIDModal.module.css";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
    open: boolean;
    setOpen?: (open: boolean) => void;
}
export default function Modal({ open, setOpen, ...props }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const modal = modalRef.current;
        if (modal) {
            if (open) {
                modal.showModal();
                document.body.style.overflow = "hidden";
            } else {
                modal.close();
                document.body.style.overflow = "auto";
            }
        }
        return () => {
            if (modal) {
                modal.close();
            }
        };
    }, [modalRef, open]);

    useEffect(() => {
        const modal = modalRef.current;
        if (modal) {
            modal.addEventListener("close", () => {
                if (setOpen) setOpen(false);
            });
        }
        return () => {
            if (modal) {
                modal.removeEventListener("close", () => {
                    if (setOpen) setOpen(false);
                });
            }
        };
    }, [modalRef, setOpen]);
    return (
        <div className={[open && styles.modalOverlay].join(" ")}>
            <dialog className={styles.modal} ref={modalRef} {...props}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>What is Mu-ID?</h2>
                        <button
                            className={styles.modalClose}
                            onClick={() => {
                                if (setOpen) setOpen(false);
                            }}
                        >
                            <RiCloseLine />
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <p>
                            Mu-id is your gateway to a validated digital
                            identity at µLearn. With a Mu-id, you can unlock a
                            world of endless possibilities as your skills are
                            recognized and validated.
                        </p>
                    </div>
                </div>
                <div className={styles.flowContainer}>
                    <div className={styles.htgFlow}>
                        <h3 className={styles.htgFlowTitle}>How to get one?</h3>
                        <div className={styles.htgFlowItem}>
                            <span className={styles.htgFlowStep}>Step 1</span>
                            <span className={styles.htgFlowText}>
                                Visit the Registration page of µLearn.
                            </span>
                        </div>
                        <div className={styles.htgFlowItem}>
                            <span className={styles.htgFlowStep}>Step 2</span>
                            <span className={styles.htgFlowText}>
                                Fill the registration form and submit.
                            </span>
                        </div>
                        <div className={styles.htgFlowItem}>
                            <span className={styles.htgFlowStep}>Step 3</span>
                            <span className={styles.htgFlowText}>
                                Login and get your Mu-Id from the dashboard.
                            </span>
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.modalButton}>
                            Get Mu-Id
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
