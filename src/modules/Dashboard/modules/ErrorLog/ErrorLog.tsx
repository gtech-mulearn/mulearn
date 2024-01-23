import { BsCloudDownload } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import styles from "./ErrorLog.module.css";
import Select from "react-select";
import { clearLog, getDisplay, getLog, patchLog } from "./ErrorLogApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { displayData } from "./ErrorLogTypes";

const ErrorLog = () => {
    const columnOrder: ColOrder[] = [
        { column: "type", Label: "Type", isSortable: false },
        { column: "message", Label: "Message", isSortable: false },
        { column: "method", Label: "Method", isSortable: false },
        { column: "path", Label: "Path", isSortable: false },
        { column: "timestamp", Label: "TimeStamps", isSortable: false },
        { column: "muid", Label: "Muid", isSortable: false }
    ];

    const handleSubmit = async (type: string) => {
        getLog(type, setErrorData);
    };

    const handleClearLog = async (type: string) => {
        clearLog(type, toast);
    };
    const handlePatch = async (id: string | undefined) => {
        if (id) {
            patchLog(id, toast);
            getDisplay(setDisplayData);
        }
    };

    const [errorData, setErrorData] = useState("");
    const [displayData, setDisplayData] = useState<displayData[]>([]);
    useEffect(() => {
        getDisplay(setDisplayData);
        console.log("Data", displayData);
    }, []);
    const convertedRows: displayData[] = displayData.map(item => ({
        id: item.id,
        type: item.type,
        message: item.message,
        method: item.method,
        path: item.path,
        timestamp: item.timestamp,
        muid: item.muid
    }));
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
                        <TbRefresh />
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
                        <TbRefresh />
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
                        <TbRefresh />
                    </div>
                    Clear Root
                </button>
            </div>

            <Table
                rows={convertedRows}
                columnOrder={columnOrder}
                page={1}
                perPage={convertedRows.length}
                id={["id"]}
                onDeleteClick={handlePatch}
                modalDeleteHeading="Delete"
                modalTypeContent="error"
                modalDeleteContent="Are you sure you want to delete "
            >
                <THead
                    columnOrder={columnOrder}
                    onIconClick={() => {
                        console.log("Icon Clicked");
                    }}
                />
                <Blank />
            </Table>
        </>
    );
};

export default ErrorLog;
