import styles from "./tableTop.module.css";

type Props = {

}

export const SearchBar = (props: Props) => {
	return (
		<>
				<input type="text" placeholder="Search" className={styles.searchBar} />
		</>
	)
}