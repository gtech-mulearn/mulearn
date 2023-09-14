import React, { useEffect, useRef, useState } from "react";
import styles from "./MuIDModal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import { HiCheck, HiOutlineArrowRight } from "react-icons/hi";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { KKEMLogin } from "../services/apis";

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
    open: boolean;
    setOpen?: UseStateFunc<boolean>;
    muId?: string;
    param?: string;
}
export default function Modal({
    open,
    setOpen,
    muId,
    param,
    ...props
}: ModalProps) {
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
    // console.log(muId);

    const [muid, setMuid] = useState(muId);
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [integration, setIntegration] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    let ruri = window.location.href.split("=")[1];

    useEffect(() => {
        setMuid(muId);
        setIntegration("KKEM");
        setDisabled(true);
    }, []);

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
                                placeholder="Enter µ-Id"
                                value={muid}
                                onChange={(e) => setMuid(e.target.value)}
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
                                    onClick={e => {
                                        e.preventDefault();
                                        if (
                                            !muid ||
                                            muid.length <= 0 ||
                                            muid.trim().length <= 0
                                        ) {
                                            setError(
                                                "Please enter a valid muid"
                                            );
                                        } else if (
                                            !password ||
                                            password.length <= 0 ||
                                            password.trim().length <= 0
                                        ) {
                                            setError(
                                                "Please enter a valid password"
                                            );
                                        } else {
                                            setError("");
                                            KKEMLogin(
                                                muid,
                                                password,
                                                toast,
                                                navigate,
                                                setIsLoading,
                                                ruri,
                                                integration
                                            );
                                        }
                                    }}
                                >
                                    {isLoading ? (
                                        <AiOutlineLoading
                                            className={styles.spin}
                                        />
                                    ) : success ? (
                                        <HiCheck />
                                    ) : (
                                        <HiOutlineArrowRight />
                                    )}
                                </button>
                            </div>
                            <div className={styles.loginHelp}>
                                <p
                                    className={styles.loginHelpers}
                                    onClick={() => {
                                        navigate("/forgot-password");
                                    }}
                                >
                                    Forgot{" "}
                                    <span className={styles.loginHelperBold}>
                                        password?
                                    </span>
                                </p>
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
                        <button
                            type="button"
                            className={styles.modalButton}
                            onClick={() => {
                                navigate("/register?param=" + param);
                            }}
                        >
                            Get Mu-Id
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
