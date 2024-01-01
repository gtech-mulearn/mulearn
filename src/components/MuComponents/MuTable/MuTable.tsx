import { FaSort } from "react-icons/fa";
import styles from "./MuTable.module.css";

type Props = {
    tableHeader: TableHeader[];
    tableData: TableDataBackendResponse | undefined;
};

const MuTable = (props: Props) => {
    return (
        <div className={styles.table}>
            <table className={styles.tableActual}>
                <thead>
                    <tr>
                        <th>S/N</th>
                        {props.tableHeader.map(column => (
                            <th className={styles.th} key={column.column}>
                                <div className={styles.thContainer}>
                                    {column.label}{" "}
                                    {column.isSortable && (
                                        <FaSort style={{ cursor: "pointer" }} />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.tableData?.data?.map((rowData, index) => (
                        <tr key={index}>
                            <td className={styles.td}>{index + 1}</td>{" "}
                            {props.tableHeader.map(column => (
                                <td className={styles.td} key={column.column}>
                                    {rowData[column.column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MuTable;
