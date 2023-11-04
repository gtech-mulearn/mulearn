import { useState } from "react";
import styles from "./TableTop.module.css";
import { HiOutlineX } from "react-icons/hi";
import { PowerfulButton } from "../MuButtons/MuButton";

type Props = {
    onSearch: (data: string) => void;
    placeholder?: string,
    onClear?: () => void
};

export const SearchBar = (props: Props) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (event: any) => {
        const inputValue = event.target.value;
        const sanitizedInput = inputValue.replace(/[<>/]/g, ''); // Remove < and > characters

        setSearch(sanitizedInput);
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        props.onSearch(search.trim());
    };

    const clearInput = () => {
        setSearch("");
        props.onClear ? props.onClear() : {}
    };

    return (
        <>
            <form className={styles.form_container} onSubmit={handleSubmit} style={{ margin: 0 }}>
                <input
                    type="text"
                    placeholder={props?.placeholder ? props?.placeholder : "Search"}
                    className={styles.searchBar}
                    onChange={onChangeSearch}
                    value={search}
                />
                {search && (
                    <HiOutlineX
                        style={{ margin: "auto" }}
                        className={styles.clearIcon}
                        onClick={clearInput}
                    />
                )}
                <PowerfulButton type="submit" >Search</PowerfulButton>
            </form>
        </>
    );
};
