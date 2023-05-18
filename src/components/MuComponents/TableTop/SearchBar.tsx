import { useState } from "react";
import styles from "./TableTop.module.css";

type Props = {
    onSearch: (data: string) => void;
};

export const SearchBar = (props: Props) => {
    const [search, setSearch] = useState("");

    const onChangeSearch = (event: any) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        props.onSearch(search);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    className={styles.searchBar}
                    onChange={onChangeSearch}
                    value={search}
                />
            </form>
        </>
    );
};
