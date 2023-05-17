import { FilterButton } from "./FilterButton"
import { SearchBar } from "./SearchBar"
import styles from "./tableTop.module.css";


type Props = {
	onSearchText: (data: string) => void;
}

const TableTop = (props: Props) => {
	const handleData = (search: string) => {
    props.onSearchText(search)
  };
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<SearchBar onSearch={handleData}/>
				<FilterButton/>
			</div>
		</div>
	)
}

export default TableTop