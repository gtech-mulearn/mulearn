import { FilterButton } from "./FilterButton"
import { SearchBar } from "./SearchBar"
import styles from "./tableTop.module.css";


type Props = {}

const TableTop = (props: Props) => {
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<SearchBar/>
				<FilterButton/>
			</div>
		</div>
	)
}

export default TableTop