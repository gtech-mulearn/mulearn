import styles from "./pagination.module.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

type Props = {
    handlePreviousClick?: () => void;
    handleNextClick?: () => void;
    currentPage: number;
    totalPages: number;
    margin?: string;
};

const Pagination = (props: Props) => {
    return (
        <>
            {props.totalPages > 0 && (
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
                                : () => {}
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
                                : () => {}
                        }
                        style={{
                            color: "var(--Dark)"
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Pagination;
