import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";
import { FaCaretDown } from "react-icons/fa";

const Dropdown = (props: {
    contents: string[];
    style?: React.CSSProperties;
    label?: string;
    default?: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    input: string;
}) => {
    const [selectedContent, setSelectedContent] = useState("Select");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        {
            props.default && setSelectedContent(props.default);
        }
    }, []);

    const handleContentSelect = (content: string) => {
        setSelectedContent(content);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <span>{props.label}</span>
            <div
                className={`${styles.select} ${
                    isDropdownOpen ? styles.open : ""
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {selectedContent}
                <FaCaretDown className={styles.icon} />
            </div>
            {isDropdownOpen && (
                <div className={styles.contents}>
                    {props.contents.map((content, index) => (
                        <div
                            key={index}
                            className={styles.content}
                            onClick={() => {handleContentSelect(content); props.setInput(content); console.log(props.input);}}
                        >
                            {content}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;