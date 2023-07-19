import React, { useEffect, useRef, useState } from "react";
import styles from "./MuIDModal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import { HiCheck, HiOutlineArrowRight } from "react-icons/hi";
import { login, otpVerification, requestEmailOrMuidOtp } from "../../Common/Authentication/services/apis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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

    const [muid, setMuid] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    let ruri = window.location.href.split("=")[1];

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMuid(e.target.value);
    };

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess(false);
        setDisabled(true);
        const controller = new AbortController();
        if (!muid || muid.length <= 0 || muid.trim().length <= 0) {
            setSuccess(false);
            setDisabled(false);
            setError("Please enter a valid muid");
            return;
        }
        if (!password || password.length <= 0 || password.trim().length <= 0) {
            setSuccess(false);
            setDisabled(false);
            setError("Please enter a valid password");
            return;
        }
        // userAuth(muid, dwmsId, controller).then(res => {
        //     if (res.statusCode === 400) {
        //         setError(res.message?.general?.toString());
        //         setSuccess(false);
        //     }
        //     if (res.statusCode === 200) {
        //         setError(null);
        //         setSuccess(true);
        //     }
        //     setDisabled(false);
        // });
        return () => {
            controller.abort();
        };
    };

    return (
        <div className={[open && styles.modalOverlay].join(" ")}>
            <dialog className={styles.modal} ref={modalRef} {...props}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>
                            Are you part of µLearn?
                        </h2>

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
                        <p>If yes, please enter your Credentials:</p>
                    </div>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <>
                                <input
                                    type="text"
                                    name="muid"
                                    id="muid"
                                    placeholder="Enter µ-Id"
                                    value={muid}
                                    onChange={handleIdChange}
                                />
                                <div className={styles.pass}>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={handlePassChange}
                                    />

                                    <button
                                        type="submit"
                                        className={`${styles.submit} ${success ? styles.successBtn : ""
                                            }`}
                                        disabled={isLoading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!muid || muid.length <= 0 || muid.trim().length <= 0) {
                                                setError("Please enter a valid muid");
                                            } else if (!password || password.length <= 0 || password.trim().length <= 0) {
                                                setError("Please enter a valid password");
                                            } else {
                                                setError("")
                                                login(
                                                    muid,
                                                    password,
                                                    toast,
                                                    navigate,
                                                    setIsLoading,
                                                    ruri
                                                )
                                            }
                                        }}
                                    >
                                        {isLoading ? (
                                            <AiOutlineLoading className={styles.spin} />
                                        ) : success ? (
                                            <HiCheck />
                                        ) : (
                                            <HiOutlineArrowRight />
                                        )}
                                    </button>
                                </div>
                                <div className={styles.loginHelp}>
                                    <p className={styles.loginHelpers}>Forgot <span className={styles.loginHelperBold}>password?</span></p>
                    
                                </div>
                            </>
                        </form>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && (
                        <p className={styles.success}>
                            Success! please check your email for further
                            instructions.
                        </p>
                    )}
                </div>
                <div className={styles.flowContainer}>
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
