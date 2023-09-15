import React, { useCallback, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./Auth.module.css";
import { userAuth } from "../services/auth";
import { HiOutlineArrowRight, HiCheck } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai";
/**
 * Page for KKEM auth when dwms_id is present in the URL
 */
export default function KKEMAuth({ param, jsid }: { param: string, jsid: string }) {
    const [muid, setMuid] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMuid(e.target.value);
    }, []);
    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSuccess(false);
            setDisabled(true);
            setError(null);
            const controller = new AbortController();
            if (!muid || muid.length <= 0 || muid.trim().length <= 0) {
                setError("Please enter a valid muid");
                setDisabled(false);
                return;
            }
            userAuth(muid, param, jsid, controller).then(res => {
                if (res.statusCode === 400) {
                    setError(res.message?.general?.toString());
                    setSuccess(false);
                    console.log(res.message)
                }
                if (res.statusCode === 200) {
                    setError(null);
                    setSuccess(true);
                }
                setDisabled(false);
            });
            return () => {
                controller.abort();
            };
        },
        [muid]
    );
    return (
        <div className={styles.container}>
            {/* <h2 className={styles.heading}>Embark on the Skill Express</h2> */}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="muid"
                    id="muid"
                    placeholder="Enter muid"
                    value={muid}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className={`${styles.submit} ${success ? styles.successBtn : ""
                        }`}
                    disabled={disabled}
                >
                    {disabled ? (
                        <AiOutlineLoading className={styles.spin} />
                    ) : success ? (
                        <HiCheck />
                    ) : (
                        <HiOutlineArrowRight />
                    )}
                </button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {success && (
                <p className={styles.success}>
                    Success! please check your email for further instructions.
                </p>
            )}
        </div>
    );
}
