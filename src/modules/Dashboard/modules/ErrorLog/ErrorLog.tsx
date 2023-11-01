import { BsCloudDownload } from "react-icons/bs";
import styles from "./ErrorLog.module.css";
import Select from "react-select";
import { clearLog, getLog } from "./ErrorLogApi";
import { useState } from "react";
import toast from "react-hot-toast";

const ErrorLog = () => {
    const handleSubmit = async (type: string) => {
        getLog(type, setErrorData);
    };

    const handleClearLog = async (type: string) => {
        clearLog(type, toast);
    };

    const [errorData, setErrorData] = useState("");
    

    return (
        <>

            <div className={styles.ErrorLogButtonContainer}>
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
                    onClick={() => handleClearLog("error/")}
                >
                    <div className={styles.errorLogBox}>
                        <BsCloudDownload />
                    </div>
                    Clear Error
                </button>
            </div>


            <div className={styles.ErrorLogButtonContainer}>
                <button
                    className={styles.errorLogButton}
                    onClick={() => handleSubmit("root/")}
                >
                    <div className={styles.errorLogBox}>
                        <BsCloudDownload />
                    </div>
                    Download Root
                </button>

                <button
                    className={styles.errorLogButton}
                    onClick={() => handleClearLog("root/")}
                >
                    <div className={styles.errorLogBox}>
                        <BsCloudDownload />
                    </div>
                    Clear Root
                </button>
            </div>


            <div className={styles.ErrorLogButtonContainer}>
                <button
                    className={styles.errorLogButton}
                    onClick={() => handleSubmit("request/")}
                >
                    <div className={styles.errorLogBox}>
                        <BsCloudDownload />
                    </div>
                    Download Request
                </button>
                <button
                    className={styles.errorLogButton}
                    onClick={() => handleClearLog("request/")}
                >
                    <div className={styles.errorLogBox}>
                        <BsCloudDownload />
                    </div>
                    Clear Root
                </button>
            </div>

        </>
    );
};

export default ErrorLog;
