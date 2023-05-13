
type Props = {
    text: string
    handleClick?: () => void
    bgColor?: string
}

const PrimaryButton = (props: Props) => {
    return (
        <button
            onClick={props.handleClick}
            style={{
                padding: "6px 16px",
                border: "1px solid rgba(1, 75, 178, .5)",
                borderRadius: "8px",
                color: "rgba(1, 75, 178, 1)",
                backgroundColor: props.bgColor ?? "white",
            }}>
            <span>{props.text}</span>
        </button>
    )
}

export default PrimaryButton