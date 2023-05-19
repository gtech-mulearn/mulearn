import { useState } from "react";
import { SearchBar } from "./SearchBar";
import ShowPerPage from "./ShowPerPage";
import { SortButton } from "./SortButton";
import styles from "./TableTop.module.css"

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
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const handleOptionChange = (value: number) => {
		setItemsPerPage(value);
        props.onPerPageNumber && props.onPerPageNumber(value);
	};
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.left}>
                    <SearchBar onSearch={handleData} />
                </div>
                <div className={styles.right}>
                    <ShowPerPage
                        options={[5, 10, 20, 50, 100]}
                        selectedOption={itemsPerPage}
                        onOptionChange={handleOptionChange}
                    />
                    {/* <SortButton onSort={handleSort} /> */}
                </div>
            </div>
        </div>
    );
};

export default TableTop;
