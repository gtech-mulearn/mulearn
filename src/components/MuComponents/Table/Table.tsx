import React, { FC } from "react";
import styles from "./Table.module.css";

interface Data {
    [key: string]: string | number | boolean;
}

interface HeaderProps {
    columns: string[];
}

type FooterProps = {
    handlePreviousClick?: () => void;
    handleNextClick?: () => void;
    currentPage: number;
    totalPages: number;
    margin?: string;
};

type TableProps = {
    rows: Data[];
    children?: [
        React.ReactElement<HeaderProps>?,
        React.ReactElement<FooterProps>?,
        React.ReactElement?
    ];
    page: number;
    perPage: number;
    columnOrder: string[];
    id?: string[];
    onEditClick?: (column: string | number | boolean) => void;
    onDeleteClick?: (column: string | number | boolean) => void;
};

{
    /* IMPORTANT NOTE
use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/
}

const Table: FC<TableProps> = (props: TableProps) => {
    function convertToNormalDate(dateString: any): string | null {
        const numberRegex = /^[0-9]+$/;
        if (String(dateString) == "true") {
            return "true";
        }
        if (String(dateString) == "false") {
            return "false";
        }

        if (String(dateString).match(numberRegex)) {
            return dateString;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

        if (!String(dateString).match(dateRegex)) {
            if (dateString == null) {
                return "-";
            }
            return dateString;
        }
        try {
            const dateObj = new Date(dateString);
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric"
            } as Intl.DateTimeFormatOptions;
            const normalDate = dateObj.toLocaleDateString("en-US", options);
            return normalDate;
        } catch (error) {
            return dateString;
        }
    }

    const startIndex = (props.page - 1) * props.perPage;

    return (
        <>
            <div className={styles.table}>
                <table className={styles.tableActual}>
                    {props.children?.[0]}
                    <tbody>
                        {props.rows?.map((rowData, index) => (
                            <tr key={index}>
                                <td className={styles.td}>
                                    {startIndex + index + 1}
                                </td>{" "}
                                {props.columnOrder.map(column => (
                                    <td className={styles.td} key={column}>
                                        {convertToNormalDate(rowData[column])}
                                    </td>
                                ))}
                                {props.id &&
                                    props.id.map(column => (
                                        <td className={styles.td} key={column}>
                                            <button
                                                onClick={() =>
                                                    props.onEditClick &&
                                                    props.onEditClick(
                                                        rowData[column]
                                                    )
                                                }
                                            >
                                                <i className="fi fi-sr-file-edit"></i>
                                            </button>
                                        </td>
                                    ))}
                                {props.id &&
                                    props.id.map(column => (
                                        <td className={styles.td} key={column}>
                                            <button
                                                onClick={() =>
                                                    props.onDeleteClick &&
                                                    props.onDeleteClick(
                                                        rowData[column]
                                                    )
                                                }
                                            >
                                                <i className="fi fi-sr-trash"></i>
                                            </button>
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.page}>{props.children?.[1]}</div>
        </>
    );
};

export default Table;
