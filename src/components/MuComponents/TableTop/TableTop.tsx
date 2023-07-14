import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import ShowPerPage from "./ShowPerPage";
import styles from "./TableTop.module.css";
import { MuButton } from "../MuButtons/MuButton";
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
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const handleOptionChange = (value: number) => {
        setItemsPerPage(value);
        props.onPerPageNumber && props.onPerPageNumber(value);
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
                    <ShowPerPage
                        options={[5, 10, 20, 50, 100]}
                        selectedOption={itemsPerPage}
                        onOptionChange={handleOptionChange}
                    />
                    {props.CSV && (
                        // <MuButton
                        //     text={"CSV"}
                        //     onClick={e => {
                        //         handleClick();
                        //     }}
                        //     disabled={isLoading}
                        //     isLoading={isLoading}
                        //     icon={<HiDownload />}
                        //     className={styles.csv}
                        // />
                        <button className={styles.searchIcon}>
                            <div className={styles.csv}>
							<HiDownload />
                            CSV
							</div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableTop;
