
type Props = {
    children: React.ReactNode
}

const TFooter = (props: Props) => {
    return (
        <tr style={{
            borderTop: "1px solid rgba(1, 75, 178, .5)",
            // width: "100%",
            display: "flex",
            padding: "12px 16px",
        }}>

        </tr>
        // <tfoot style={{
        //     borderTop: "1px solid rgba(1, 75, 178, .5)",
        //     // width: "100%",
        //     display: "flex",
        //     padding: "12px 16px",
        // }}>
        //     <tr>
        //         <td style={{
        //             width: "100%",
        //             display: "block",
        //         }}>
        //             {props.children}
        //         </td>
        //     </tr>
        // </tfoot>
    )
}

export default TFooter