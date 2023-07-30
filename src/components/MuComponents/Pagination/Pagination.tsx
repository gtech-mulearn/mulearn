import styles from "./pagination.module.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useState } from 'react';
import ShowPerPage from "./ShowPerPage";

type Props = {
    handlePreviousClick?: () => void;
    handleNextClick?: () => void;
    currentPage: number;
    totalPages: number;
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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            margin: props.margin ? props.margin : "0"
                        }}
                    >
                        <SlArrowLeft
                            onClick={
                                props.currentPage > 1
                                    ? props.handlePreviousClick
                                    : () => { }
                            }
                            style={{
                                color: "var(--Dark)"
                            }}
                        />
                        <p className={styles.pagePara}>
                            <strong>{props.currentPage}</strong> of{" "}
                            <strong>{props.totalPages}</strong>
                        </p>
                        <SlArrowRight
                            onClick={
                                props.currentPage < props.totalPages
                                    ? props.handleNextClick
                                    : () => { }
                            }
                            style={{
                                color: "var(--Dark)"
                            }}
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
