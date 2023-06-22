import styles from "./Table.module.css";
import { RxCaretSort } from "react-icons/rx";

interface TableHeadProps {
    columnOrder: {
        column: string;
        Label: string;
        isSortable: boolean;
    }[];
    onIconClick: (column: string) => void;
	action?: true | false;
	verify?: true | false;
}

const THead: React.FC<TableHeadProps> = ({
    columnOrder,
    onIconClick,
	action = false,
	verify = false,
}) => {
    return (
        <thead>
            <tr>
				<th>S/N</th>
                {columnOrder.map((column, index) => (
                    <th className={styles.th} key={column.column}>
                        <div className={styles.thContainer}>
                            <span>{column.Label}</span>
                            {column.isSortable && <button className={styles.icon} onClick={() => onIconClick(column.column)}>
                                <RxCaretSort/>
                            </button>}
                        </div>
                    </th>
                ))}
				{verify && <th>Verify</th>}
				{action && <th>Action</th>}
            </tr>
        </thead>
    );
};

export default THead;