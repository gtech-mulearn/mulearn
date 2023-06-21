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
    CSV?: string;
};

const TableTop = (props: Props) => {
    const [csv, setCsv] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleData = (search: string) => {
        props.onSearchText && props.onSearchText(search);
    };
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const handleOptionChange = (value: number) => {
        setItemsPerPage(value);
        props.onPerPageNumber && props.onPerPageNumber(value);
    };

    const handleClick = async() => {
        try {
            await getCSV(props.CSV, setCsv,setIsLoading);
            // Convert data to CSV format
            // await getCSV(props.CSV, setCsv);
            const csvContent = convertToCSV(csv);
            // Create a temporary HTML element to trigger the download
            const element = document.createElement('a');
            const file = new Blob([csvContent], { type: 'data:text/csv;charset=utf-8' });
            element.href = URL.createObjectURL(file);
            element.download = 'Table_data.csv';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const convertToCSV = (data: any) => {
        // Convert your data to CSV format here
        // You can use libraries like 'csv-writer' or 'papaparse' for complex data structures
        // For simplicity, let's assume you have a simple array of objects

        const headers = Object.keys(data[0]);
        const csvRows = [];
        csvRows.push(headers.join(','));

        for (const row of data) {
            const values = headers.map((header) => row[header]);
            csvRows.push(values.join(','));
        }

        return csvRows.join('');
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
                    <MuButton
                        text={'CSV'}
                        onClick={(e) => {
                            handleClick()
                        }}
                        isLoading={isLoading}
                        icon={<HiDownload />}
                        className={styles.csv}
                    />
                </div>
            </div>
        </div>
    );
};

export default TableTop;
