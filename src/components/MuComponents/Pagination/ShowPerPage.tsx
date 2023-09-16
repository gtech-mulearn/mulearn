import styles from "./Pagination.module.css";

interface ShowPerPageProps {
    options: number[];
    selectedOption: number;
    onOptionChange: (value: number) => void;
}

const ShowPerPage: React.FC<ShowPerPageProps> = ({
    options,
    selectedOption,
    onOptionChange
}) => {
    const handleOptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = parseInt(event.target.value, 10);
        onOptionChange(value);
    };

    return (
        <div className={styles.showContainer}>
            <label htmlFor="showPerPage" className={styles.showLabel}>Rows per page:</label>
            <select
                id="showPerPage"
                value={selectedOption}
                onChange={handleOptionChange}
                className={styles.showSelect}
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ShowPerPage;
