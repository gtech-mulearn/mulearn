import { useParams } from "react-router-dom";
import { userAuthConfirm } from "../services/auth";
import { useEffect, useState } from "react";
import styles from "./KKEMAuth.module.css";
export default function KKEMAuth() {
    const { token } = useParams<{ token: string }>();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (!token) {
            return;
        }
        userAuthConfirm(token).then(res => {
            setSuccess(true);
        });
    }, [token]);
    return success ? (
        <p className={styles.content}>
            Success! Your DWMS ID is successfully connected to MuLearn!
        </p>
    ) : (
        <p className={styles.content}>Failure! Check console</p>
    );
}
