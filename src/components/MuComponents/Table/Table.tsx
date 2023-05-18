import React, { FC } from "react";
import styles from "./Table.module.css";

type Data = {
    id?: number;
    name?: string;
    description?: string;
};

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
};

{
    /* IMPORTANT NOTE
use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/
}

const Table: FC<TableProps> = (props: TableProps) => {
    return (
        <>
            <div className={styles.table}>
                <table className={styles.tableActual}>
                    {props.children?.[0]}
                    <tbody>
                        {props.rows?.map((row: any, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {Object.keys(row).map((key: string) => (
                                    <td
                                        className={styles.td}
                                        key={`${row.id}-${key}`}
                                    >
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.page}>{props.children?.[1]}</div>
            </div>
        </>
    );
};

export default Table;
