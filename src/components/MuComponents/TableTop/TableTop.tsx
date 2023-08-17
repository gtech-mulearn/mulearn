import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import ShowPerPage from "../Pagination/ShowPerPage";
import styles from "./TableTop.module.css";
import { MuButton, PowerfulButton } from "../MuButtons/MuButton";
import { HiDownload } from "react-icons/hi";
import { getCSV } from "./apis";
import { useToast } from "@chakra-ui/react";

type Props = {
    onSearchText?: (data: string) => void;
    onPerPageNumber?: (data: number) => void;
    CSV?: string;
};

const TableTop = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const toast = useToast();

    const handleData = (search: string) => {
        props.onSearchText && props.onSearchText(search);
    };

    const handleClick = async () => {
        try {
            await getCSV(props.CSV, setIsLoading, setHasError, toast);
            // Convert data to CSV format
            // await getCSV(props.CSV, setCsv);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.left}>
                    <SearchBar onSearch={handleData} />
                </div>
                <div className={styles.right}>
                    {props.CSV && (
                        // <MuButton
                        //     text={"CSV"}
                        //     onClick={e => {
                        //         handleClick();
                        //     }}
                        //     disabled={isLoading}
                        //     isLoading={isLoading}
                        //     icon={<HiDownload />}
                        //     style={{
                        //         background: "#456FF6",
                        //         padding: "0.35rem 1rem",
                        //         borderRadius: "10px",
                        //         color: "#fff"
                        //     }}
                        //     className={styles.csv}
                        // />
                        <PowerfulButton
                            text={"CSV"}
                            icon={<HiDownload />}
                            onButtonClick={() => {
                                handleClick();
                            }}
                            padding="0.3rem 0.7rem"
                            margin="0"
                            disabled={isLoading}
                            isLoading={isLoading}
                        />
                        // <button
                        //     className={styles.searchIcon}
                        //     onClick={() => {
                        //         handleClick();
                        //     }}
                        // >
                        //     <div className={styles.csv}>
                        //         <HiDownload />
                        //         CSV
                        //     </div>
                        // </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableTop;
