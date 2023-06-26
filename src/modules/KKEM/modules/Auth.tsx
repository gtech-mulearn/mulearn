import { useCallback, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./Auth.module.css";
import { userAuth } from "../services/auth";
/**
 * Page for KKEM auth when dwms_id is present in the URL
 */
export default function KKEMAuth({ dwmsId }: { dwmsId: string }) {
    const [muid, setMuid] = useState("");
    const [error, setError] = useState<string | null>(null);
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMuid(e.target.value);
    }, []);
    const handleSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!muid || muid.length <= 0 || muid.trim().length <= 0) {
                setError("Please enter a valid muid");
                return;
            }
            userAuth(muid, dwmsId).then(res => {
                if (res.statusCode === 400) {
                    setError(res.message?.general?.toString());
                }
            });
        },
        [muid]
    );
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>KKEM auth</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="muid"
                    id="muid"
                    placeholder="muid"
                    value={muid}
                    onChange={handleChange}
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.submit}>
                    Submit
                </button>
            </form>
        </div>
    );
}
