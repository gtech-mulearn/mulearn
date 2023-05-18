import React, { useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = (props:{
    contents: string[];
    style?:React.CSSProperties;
    
}) => {
    const [selectedContent, setSelectedContent] = useState("Select");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleContentSelect = (content: string) => {
        setSelectedContent(content);
        setIsDropdownOpen(false);
      };

    return (
        <div className={styles.dropdown}>
            <div
                className={`${styles.select} ${
                    isDropdownOpen ? styles.open : ""
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {selectedContent}
                <i className={`fa fa-angle-down ${styles.icon}`} />
            </div>
            {isDropdownOpen && (
                <div className={styles.contents}>
                   {props.contents.map((content, index) => (
                        <div
                            key={index}
                            className={styles.content}
                            onClick={() => handleContentSelect(content)}
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
