
type Props = {
    data: any[]
}

const TRow = (props: Props) => {
    return (
        <tr>
            {props.data.map((item, index) => (
                <td
                    key={index}
                    style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        borderTop: "1px solid rgba(1, 75, 178, .5)",
                        color: "rgba(1, 75, 178, 1)",
                    }}
                >
                    {item}
                </td>
            ))}
        </tr>
    )
}

export default TRow