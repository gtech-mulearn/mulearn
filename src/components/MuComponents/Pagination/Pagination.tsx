import PrimaryButton from "../MuButtons/MuOutlinedButton";
import styles from './pagination.module.css'
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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: props.margin ? props.margin : "0"
            }}
        >
            {/* <PrimaryButton
                text="Previous"
                handleClick={
                    props.currentPage > 1 ? props.handlePreviousClick : () => {}
                }
                bgColor={
                    props.currentPage > 1 ? "rgba(1, 75, 178, .1)" : "white"
                }
            /> */}
            <SlArrowLeft
                onClick={
                    props.currentPage > 1 ? props.handlePreviousClick : () => {}
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
            {/* <PrimaryButton
                text="Next"
                handleClick={
                    props.currentPage < props.totalPages
                        ? props.handleNextClick
                        : () => {}
                }
                bgColor={
                    props.currentPage < props.totalPages
                        ? "rgba(1, 75, 178, .1)"
                        : "white"
                }
            /> */}
        </div>
    );
};

export default Pagination;
