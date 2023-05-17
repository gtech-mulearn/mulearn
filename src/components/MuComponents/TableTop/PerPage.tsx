import styles from "./tableTop.module.css";

type Props = {
	onPerPage: (data: number) => void;
}

export const PerPage = (props: Props) => {
	const handleBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
		const selectedValue:number = parseInt(event.currentTarget.value, 10)
		props.onPerPage(selectedValue)
	}
	return (
		<>
			<div className={styles.dropdownPerPage }>
			<button className={styles.perPageBtn}>Data per page</button>
				<div className={styles.dropdownContentPerPage }>
					<button onClick={handleBtn} value={5}>5</button>
					<button onClick={handleBtn} value={10}>10</button>
					<button onClick={handleBtn} value={20}>20</button>
					<button onClick={handleBtn} value={50}>50</button>
					<button onClick={handleBtn} value={100}>100</button>
				</div>
			</div>
		</>
	)
}