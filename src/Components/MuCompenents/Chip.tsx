
type Props = {
    label: string
    isSelected?: boolean
    handleClick?: () => void
}

const Chip = (props: Props) => {
    return (
        <div
            style={{
                padding: "6px 16px",
                border: "1px solid rgba(1, 75, 178, .5)",
                borderRadius: "10px",
                width: "fit-content",
                fontWeight: 600,
                color: "rgba(1, 75, 178, 1)",
                backgroundColor: props.isSelected ? "rgba(1, 75, 178, 0.15)" : "white",
            }}
        >
            {props.label || "Chip"}
        </div>
    )
}

export default Chip