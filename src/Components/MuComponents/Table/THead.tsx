
type Props = {
    columns: string[]
}

const THead = (props: Props) => {
    return (
        <thead>
            {props.columns.map((column, index) => (
                <th
                    key={index}
                    style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "rgba(1, 75, 178, 1)",
                    }}
                >
                    {column}
                </th>
            ))}
        </thead>
    )
}

export default THead