import styles from "./tableTop.module.css";

type Props = {}

export const FilterButton = (props: Props) => {
	return (
		<>
			<button className={styles.filter}>Filters</button>
		</>
	)
}
