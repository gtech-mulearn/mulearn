import styles from "./TableTop.module.css";

type Props = {
    onSort: (data: string) => void;
};

//TODO: Jenin:Change buttons to MuOutlineButton

export const SortButton = (props: Props) => {
    const handleButton1 = () => {
        props.onSort("1");
    };

    const handleButton2 = () => {
        props.onSort("2");
    };

    return (
        <>
            <div className={styles.dropdown}>
                <button className={styles.sortBtn}>Sort</button>
                <div className={styles.dropdownContent}>
                    <button onClick={handleButton1}>A -{">"} Z</button>
                    <button onClick={handleButton2}>Z -{">"} A</button>
                </div>
            </div>
        </>
    );
};
