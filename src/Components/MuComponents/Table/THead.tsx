
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
                        
                    }}
                >
                    {column}
                </th>
            ))}
        </thead>
    )
}

export default THead