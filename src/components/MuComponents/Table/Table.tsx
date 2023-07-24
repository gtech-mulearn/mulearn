import React, { FC, useEffect, useState } from "react";
import styles from "./Table.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal/Modal";
import MuLoader from "../MuLoader/MuLoader";

enum ModalType {
    Verify,
    Delete
}
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
    columnOrder: {
        column: string;
        Label: string;
        isSortable: boolean;
    }[];
    id?: string[];
    onEditClick?: (column: string | number | boolean) => void;
    onDeleteClick?: (column: string | undefined) => void;
    onVerifyClick?: (column: string | number | boolean) => void;
    modalVerifyHeading?: string;
    modalVerifyContent?: string;
    modalDeleteHeading?: string;
    modalDeleteContent?: string;
    modalTypeContent?: string;
};

{
    /* IMPORTANT NOTE
use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/
}

/*
TODO: Move the Common Functions to a separate file
*/

const Table: FC<TableProps> = (props: TableProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean[]>(
        props.rows.map(() => false)
    );
    const [isVerifyOpen, setIsVerifyOpen] = useState<boolean[]>(
        props.rows.map(() => false)
    );

    // Function to toggle the modal for a specific row
    const toggleModal = (index: number, type: string) => {
        if (type == ModalType[0]) {
            setIsVerifyOpen(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        } else
            setIsDeleteOpen(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
    };

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
            return dateObj.toLocaleDateString("en-US", options);
        } catch (error) {
            return dateString;
        }
    }

    const startIndex = (props.page - 1) * props.perPage;

    // To change MuLoading Component
    useEffect(() => {
        setTimeout(() => {

            setIsLoading(false);
        }, 2000)
    }, [props.rows]);

    return (
        <>

            <div className={styles.table}>
                {isLoading ? <MuLoader /> :
                    <table className={styles.tableActual}>
                        {props.children?.[0]}
                        <tbody>
                            {props.rows?.map((rowData, index) => (
                                <tr key={index}>
                                    <td className={styles.td}>
                                        {startIndex + index + 1}
                                    </td>{" "}
                                    {props.columnOrder.map(column => (
                                        <td
                                            className={styles.td}
                                            key={column.column}
                                        >
                                            {convertToNormalDate(
                                                rowData[column.column]
                                            )}
                                        </td>
                                    ))}
                                    {props.id &&
                                        props.id.map((column, columnIndex) => (
                                            <td className={styles.td} key={column}>
                                                <div className={styles.icons}>
                                                    {props.onEditClick && (
                                                        <button
                                                            onClick={() =>
                                                                props.onEditClick &&
                                                                props.onEditClick(
                                                                    rowData[column]
                                                                )
                                                            }
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    )}
                                                    {props.onVerifyClick && (
                                                        <button
                                                            className={styles.btns}
                                                            onClick={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[0]
                                                                )
                                                            }
                                                        >
                                                            Verify
                                                        </button>
                                                    )}
                                                    {isVerifyOpen[index] && (
                                                        <Modal
                                                            setIsOpen={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[0]
                                                                )
                                                            }
                                                            id={rowData[column]}
                                                            heading={
                                                                props.modalVerifyHeading
                                                            }
                                                            content={
                                                                props.modalVerifyContent
                                                            }
                                                            click={
                                                                props.onVerifyClick
                                                            }
                                                        />
                                                    )}
                                                    {props.onDeleteClick && (
                                                        <button
                                                            onClick={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[1]
                                                                )
                                                            }
                                                        >
                                                            <MdDelete />
                                                        </button>
                                                    )}
                                                    {isDeleteOpen[index] && (
                                                        <Modal
                                                            setIsOpen={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[1]
                                                                )
                                                            }
                                                            id={rowData[column]}
                                                            heading={
                                                                props.modalDeleteHeading
                                                            }
                                                            content={
                                                                props.modalDeleteContent
                                                            }
                                                            click={
                                                                props.onDeleteClick
                                                            }
                                                            type={
                                                                props.modalTypeContent
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
            <div className={styles.page}>{props.children?.[1]}</div>
        </>
    );
};

export default Table;
