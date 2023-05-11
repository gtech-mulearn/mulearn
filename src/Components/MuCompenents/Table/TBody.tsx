type Props = {
    children: React.ReactNode
}

const TBody = (props: Props) => {
    return (
        <tbody style={{}}>
            {props.children}
        </tbody>
    )
}

export default TBody