import { useState } from "react";
import styles from "./TableTop.module.css";
import { HiOutlineX } from "react-icons/hi";

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
        props.onSearch(search.trim());
    };

    const clearInput = () => {
        setSearch("");
    };

    return (
        <>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    className={styles.searchBar}
                    onChange={onChangeSearch}
                    value={search}
                />
                {search && (
                    <HiOutlineX
                        className={styles.clearIcon}
                        onClick={clearInput}
                    />
                )}
                <div className={styles.searchIcon}>
                    <button>Search</button>
                </div>
            </form>
        </>
    );
};
