import React, { FC, ReactElement, useEffect, useState } from "react";
import styles from "./Table.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import Modal from "../Modal/Modal";
import MuLoader from "../MuLoader/MuLoader";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import MuModal from "../MuModal/MuModal";

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
        wrap?: (data: string) => ReactJSXElement;
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
    const closeAllModals = () => {
        setIsDeleteOpen(prevState => prevState.map(() => false));
        setIsVerifyOpen(prevState => prevState.map(() => false));
    };

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

    function convertToNormalDate(dateString: any): string {
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
                                            className={`${styles.td} ${
                                                column.column === "long_url"
                                                    ? styles["url_wrap"]
                                                    : ""
                                            }`}
                                            key={column.column}
                                        >
                                            {column.wrap
                                                ? column.wrap(
                                                      convertToNormalDate(
                                                          rowData[column.column]
                                                      )
                                                  )
                                                : convertToNormalDate(
                                                      rowData[column.column]
                                                  )}
                                            {}
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
                                                        <button
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
                                                        </button>
                                                    )}
                                                    {props.onEditClick && (
                                                        <button
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
                                                        </button>
                                                    )}
                                                    {props.onVerifyClick && (
                                                        <button
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
                                                        </button>
                                                    )}
                                                    <MuModal
                                                        isOpen={
                                                            isVerifyOpen[index]
                                                        }
                                                        onClose={closeAllModals}
                                                        title={String(
                                                            rowData["full_name"]
                                                        )}
                                                        type={"success"}
                                                        onDone={() => {
                                                            if (
                                                                props.onVerifyClick
                                                            ) {
                                                                props.onVerifyClick(
                                                                    String(
                                                                        rowData[
                                                                            column
                                                                        ]
                                                                    )
                                                                );
                                                                closeAllModals();
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                fontSize: "20px"
                                                            }}
                                                            className="modalContent"
                                                        >
                                                            <p>
                                                                {
                                                                    props.modalVerifyContent
                                                                }
                                                            </p>
                                                        </div>
                                                    </MuModal>
                                                    {/* {isVerifyOpen[index] && (
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
                                                    )} */}
                                                    {props.onDeleteClick && (
                                                        <button
                                                            onClick={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[1]
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineDelete />
                                                        </button>
                                                    )}
                                                    <MuModal
                                                        isOpen={
                                                            isDeleteOpen[index]
                                                        }
                                                        onClose={closeAllModals}
                                                        title={String(
                                                            rowData["title"]
                                                        )}
                                                        type={"error"}
                                                        onDone={() => {
                                                            if (
                                                                props.onDeleteClick
                                                            ) {
                                                                props.onDeleteClick(
                                                                    String(
                                                                        rowData[
                                                                            column
                                                                        ]
                                                                    )
                                                                );
                                                                closeAllModals();
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                fontSize: "20px"
                                                            }}
                                                            className="modalContent"
                                                        >
                                                            <p>
                                                                {
                                                                    props.modalDeleteContent
                                                                }
                                                            </p>
                                                        </div>
                                                    </MuModal>
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
