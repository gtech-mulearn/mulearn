import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import styles from "./TableTop.module.css";
import { MuButton, PowerfulButton } from "../MuButtons/MuButton";
import { HiDownload } from "react-icons/hi";
import { getCSV } from "./apis";
import { ClipLoader } from "react-spinners";

type Props = {
    onSearchText?: (data: string) => void;
    onPerPageNumber?: (data: number) => void;
    CSV?: string;
};

const TableTop = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleData = (search: string) => {
        props.onSearchText && props.onSearchText(search);
    };

    const handleClick = async () => {
        try {
            await getCSV(props.CSV, setIsLoading, setHasError);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            {props.onSearchText && (
                <div className={styles.container}>
                    <div className={styles.body}>
                        <SearchBar onSearch={handleData} />
                        {props.CSV && (
                            <PowerfulButton
                                onClick={() => handleClick()}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ClipLoader size={20} color="#fff" />
                                ) : (
                                    <HiDownload />
                                )}
                                CSV
                            </PowerfulButton>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default TableTop;
