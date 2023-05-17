import { PerPage } from "./PerPage";
import { SearchBar } from "./SearchBar";
import { SortButton } from "./SortButton";
import styles from "./tableTop.module.css";

type Props = {
    onSearchText?: (data: string) => void;
    onSortText?: (data: string) => void;
    onPerPageNumber?: (data: number) => void;
};

const TableTop = (props: Props) => {
    const handleData = (search: string) => {
        props.onSearchText && props.onSearchText(search);
    };
    const handleSort = (sort: string) => {
        const sortVar = sort;
        props.onSortText && props.onSortText(sortVar);
    };
    const handlePerPage = (selectedValue: number) => {
        props.onPerPageNumber && props.onPerPageNumber(selectedValue);
    };
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <SearchBar onSearch={handleData} />
                <PerPage onPerPage={handlePerPage} />
                <SortButton onSort={handleSort} />
            </div>
        </div>
    );
};

export default TableTop;
