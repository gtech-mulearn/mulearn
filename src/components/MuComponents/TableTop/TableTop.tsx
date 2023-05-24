import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import ShowPerPage from "./ShowPerPage";
import styles from "./TableTop.module.css";
import { MuButton } from "../MuButtons/MuButton";
import { HiDownload } from "react-icons/hi";
import { getCSV } from "./apis";

type Props = {
    onSearchText?: (data: string) => void;
    onPerPageNumber?: (data: number) => void;
    CSV: string;
};

const TableTop = (props: Props) => {
    const [csv, setCsv] = useState("");

    const handleData = (search: string) => {
        props.onSearchText && props.onSearchText(search);
    };
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const handleOptionChange = (value: number) => {
        setItemsPerPage(value);
        props.onPerPageNumber && props.onPerPageNumber(value);
    };
    useEffect(() => {
        getCSV(props.CSV, setCsv);
    }, []);
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
                    {csv && csv.length && (
                        <a
                            href={`data:text/csv;charset=utf-8,${encodeURI(
                                csv
                            )}`}
                            download="Table_data.csv"
                        >
                            <MuButton
                                text={"CSV"}
                                icon={<HiDownload />}
                                className={styles.csv}
                            />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableTop;
