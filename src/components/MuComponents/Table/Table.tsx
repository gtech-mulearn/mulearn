import React, { FC, useState } from "react";
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
	page: number
	perPage: number
};

{
    /* IMPORTANT NOTE
use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/
}

const Table: FC<TableProps> = (props: TableProps) => {

	function convertToNormalDate(dateString: string): string | null {
		console.log(dateString);
        const numberRegex = /^[0-9]+$/;

        if (String(dateString).match(numberRegex)) {
            return dateString; // Return the original string as-is if it contains only numbers
        }
		const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

        if (!String(dateString).match(dateRegex)) {
            return dateString; // Return the original string as-is if it's not a valid date format
        }
		try {
            const dateObj = new Date(dateString);
			console.log(dateObj)
            const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
            const normalDate = dateObj.toLocaleDateString('en-US', options);
            return normalDate;
        } catch (error) {
            return dateString; // Return the original string as-is
        }
    }
	
	const startIndex = (props.page - 1) * props.perPage;

    return (
        <>
            <div className={styles.table}>
                <table className={styles.tableActual}>
                    {props.children?.[0]}
                    <tbody>
                        {props.rows?.map((row: any, index: number) => (
                            <tr key={index}>
                                <td className={styles.td}>{startIndex + index + 1}</td>
                                {Object.keys(row).map((key: string) => (
                                    <td
                                        className={styles.td}
                                        key={`${row.id}-${key}`}
                                    >
                                        {convertToNormalDate(row[key])}
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
