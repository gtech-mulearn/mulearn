import styles from "./pagination.module.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useState } from 'react';
import ShowPerPage from "./ShowPerPage";

type Props = {
    handlePreviousClick?: () => void;
    handleNextClick?: () => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    margin?: string;
    onSearchText?: (data: string) => void;
    onPerPageNumber?: (data: number) => void;
};

const Pagination = (props: Props) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleOptionChange = (value: number) => {
        setItemsPerPage(value);
        props.onPerPageNumber && props.onPerPageNumber(value);
    };

    return (
        <>
            {props.totalPages > 0 && (
                <div className={styles.tableFooter}>
                    <div className={styles.pageNumbers}>
                        <strong>
                            {props.totalPages === 1
                                ? props.totalItems
                                : props.currentPage === props.totalPages
                                    ? props.totalItems - itemsPerPage + 1
                                    : props.currentPage * itemsPerPage - itemsPerPage + 1}{" "}
                            -{" "}
                            {props.currentPage === props.totalPages
                                ? props.totalItems
                                : props.currentPage * itemsPerPage}{" "}
                        </strong> of {props.totalItems}
                    </div>
                    <div className={styles.pagination}
                        style={{ margin: props.margin ? props.margin : "0" }}
                    >
                        <SlArrowLeft
                            onClick={
                                props.currentPage > 1
                                    ? props.handlePreviousClick
                                    : () => { }
                            }
                            style={{ color: "var(--Dark)" }}
                        />
                        <p className={styles.pagePara}>
                            <strong>{props.currentPage}</strong> / {props.totalPages}
                        </p>
                        <SlArrowRight
                            onClick={
                                props.currentPage < props.totalPages
                                    ? props.handleNextClick
                                    : () => { }
                            }
                            style={{ color: "var(--Dark)" }}
                        />
                    </div>            <ShowPerPage
                        options={[5, 10, 20, 50, 100]}
                        selectedOption={itemsPerPage}
                        onOptionChange={handleOptionChange}
                    />
                </div>
            )}
        </>
    );
};

export default Pagination;
