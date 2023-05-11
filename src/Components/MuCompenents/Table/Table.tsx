import { border } from "@chakra-ui/react"

type Props = {
    children: React.ReactNode
    margin?: string
}

const Table = (props: Props) => {
    return (
        <div style={{
            borderRadius: "10px",
            overflow: "clip",
            border: "1px solid rgba(1, 75, 178, .5)",
            width: "100%",
            margin: props.margin ? props.margin : "0",
        }}>
            <table width="100%" >{props.children}</table>
        </div>
    )
}

export default Table