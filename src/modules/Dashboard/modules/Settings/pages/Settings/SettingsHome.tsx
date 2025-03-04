import { useNavigate } from "react-router-dom";
import styles from "./SettingsHome.module.css";

export default function SettingsHome(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <button
                    onClick={() => navigate("account")}
                    className={styles.button}
                >
                    Reset Password
                </button>
            </div>

            <div className={styles.column}>
                <button
                    onClick={() => navigate("organization")}
                    className={styles.button}
                >
                    Select College
                </button>
            </div>
        </div>
    );
}

