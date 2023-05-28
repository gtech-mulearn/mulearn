import styles from "./Table.module.css";
import { RxCaretSort } from "react-icons/rx";

interface TableHeadProps {
    columnOrder: any[];
    editableColumnNames: string[];
    onIconClick: (column: string) => void;
}

const THead: React.FC<TableHeadProps> = ({
    columnOrder,
    editableColumnNames,
    onIconClick
}) => {
    return (
        <thead>
            <tr>
				<th>S/N</th>
                {columnOrder.map((column, index) => (
                    <th className={styles.th} key={column}>
                        <div className={styles.thContainer}>
                            <span>{editableColumnNames[index]}</span>
                            {/* <button className={styles.icon} onClick={() => onIconClick(column)}>
                                <RxCaretSort/>
                            </button> */}
                        </div>
                    </th>
                ))}
				<th>Action</th>
            </tr>
        </thead>
    );
};

export default THead;