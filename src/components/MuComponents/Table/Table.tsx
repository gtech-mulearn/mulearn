import React, { FC, useEffect, useState } from "react";
import styles from "./Table.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import Modal from "../Modal/Modal";
import MuLoader from "../MuLoader/MuLoader";
import { PowerfulButton } from "../MuButtons/MuButton";

enum ModalType {
    Verify,
    Delete
}
export interface Data {
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
    isloading?: boolean;
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
    onCopyClick?: (column: string | number | boolean) => void;
    modalVerifyHeading?: string;
    modalVerifyContent?: string;
    modalDeleteHeading?: string;
    modalDeleteContent?: string;
    modalTypeContent?: string;
};

/* 
* IMPORTANT NOTE
! use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs at least 2 children
TODO: Move the Common Functions to a separate file
*/

const Table: FC<TableProps> = (props: TableProps) => {
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
        } else {
            setIsDeleteOpen(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        }
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

    //props.rows?.map((rowData, index)=>{console.log(rowData['title'])})
    return (
        <>
            {props?.rows?.map((rowData, index) => {
                // console.log(rowData["muid"]);
            })}
            <div className={styles.table}>
                <table className={styles.tableActual}>
                    {props.children?.[0]}
                    {props.isloading ? (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={props.columnOrder.length + 2}
                                    style={{ width: "100%" }}
                                >
                                    <MuLoader />
                                </td>
                            </tr>
                        </tbody>
                    ) : (
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
                                            <td
                                                className={styles.td}
                                                key={column}
                                            >
                                                <div className={styles.icons}>
                                                    {props.onCopyClick && (
                                                        <PowerfulButton
                                                            onClick={() =>
                                                                props.onCopyClick &&
                                                                props.onCopyClick(
                                                                    rowData[
                                                                    column
                                                                    ]
                                                                )
                                                            }
                                                        >
                                                            <i className="fi fi-rr-duplicate"></i>
                                                        </PowerfulButton>
                                                    )}
                                                    {props.onEditClick && (
                                                        <PowerfulButton
                                                            onClick={() =>
                                                                props.onEditClick &&
                                                                props.onEditClick(
                                                                    rowData[
                                                                    column
                                                                    ]
                                                                )
                                                            }
                                                        >
                                                            <HiOutlinePencil />
                                                        </PowerfulButton>
                                                    )}
                                                    {props.onVerifyClick && (
                                                        <PowerfulButton
                                                            className={
                                                                styles.btns
                                                            }
                                                            onClick={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[0]
                                                                )
                                                            }
                                                        >
                                                            Verify
                                                        </PowerfulButton>
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
                                                        <PowerfulButton
                                                            onClick={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[1]
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineDelete />
                                                        </PowerfulButton>
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
                                                            value={
                                                                rowData["title"]
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {(() => {
                if (props.isloading) {
                    return "";
                }
                if (props.rows.length)
                    return (
                        <div className={styles.page}>{props.children?.[1]}</div>
                    );
                else
                    return (
                        <h1
                            style={{
                                color: "red"
                            }}
                        >
                            No data to display
                        </h1>
                    );
            })()}
        </>
    );
};

export default Table;
