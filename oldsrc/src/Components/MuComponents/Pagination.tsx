import CustomBtn from "../CustomBtn"
import PrimaryButton from "./PrimaryButton"

type Props = {
    handlePreviousClick?: () => void
    handleNextClick?: () => void
    currentPage: number
    totalPages: number
    margin?: string
}

const Pagination = (props: Props) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: props.margin ? props.margin : "0",
        }}>
            <PrimaryButton
                text="Previous"
                handleClick={props.currentPage > 1 ? props.handlePreviousClick : () => { }}
                bgColor={props.currentPage > 1 ? "rgba(1, 75, 178, .1)" : "white"} />
            <p style={{
                color: "rgba(1, 75, 178, 1)",
            }}>
                Page <strong>{props.currentPage}</strong> of <strong>{props.totalPages}</strong>
            </p>
            <PrimaryButton
                text="Next"
                handleClick={props.currentPage < props.totalPages ? props.handleNextClick : () => { }}
                bgColor={props.currentPage < props.totalPages ? "rgba(1, 75, 178, .1)" : "white"} />
        </div>
    )
}

export default Pagination