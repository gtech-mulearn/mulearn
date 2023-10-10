import { BsCloudDownload } from "react-icons/bs";
import styles from "./ErrorLog.module.css";
import Select from "react-select";
import { getLog } from "./ErrorLogApi";
import { useState } from "react";

const ErrorLog = () => {
    const handleSubmit = async (type: string) => {
        getLog(type, setErrorData);
    };

    const [errorData, setErrorData] = useState("");

    return (
        <>
            <button
                className={styles.errorLogButton}
                onClick={() => handleSubmit("error/")}
            >
                <div className={styles.errorLogBox}>
                    <BsCloudDownload />
                </div>
                Download Error
            </button>

            <button
                className={styles.errorLogButton}
                onClick={() => handleSubmit("route/")}
            >
                <div className={styles.errorLogBox}>
                    <BsCloudDownload />
                </div>
                Download Route
            </button>

            <button
                className={styles.errorLogButton}
                onClick={() => handleSubmit("request/")}
            >
                <div className={styles.errorLogBox}>
                    <BsCloudDownload />
                </div>
                Download Request
            </button>

        </>
    );
};

export default ErrorLog;
