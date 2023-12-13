import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import styles from "./LanguageSwitcher.module.css";
export function getFontSizeForLanguage(lang: string): string {
    const malayalamFontSize = "14px";

    const fontSize = lang === "mal" ? malayalamFontSize : "";

    return fontSize;
}
interface LanguageSwitcherProps {
    icon1: React.ReactElement;
    icon2: React.ReactElement; // Use React.ReactElement here
}
const buttonStyle = {
    backgroundColor: "#fff",
    color: "#FF7676",
    marginBottom: "0px",
    minWidth: "0px",
    padding: "0px"
};
function LanguageSwitcher({ icon1, icon2 }: LanguageSwitcherProps) {
    const { i18n } = useTranslation();

    const [change, setchange] = useState(true);

    const changelanguages = () => {
        setchange(!change);
        if (change) {
            i18n.changeLanguage("mal");
        } else {
            i18n.changeLanguage("en");
        }
    };

    return (
        <div className="LanguageSwitcher-wrapper">
            {change ? (
                <button
                    onClick={changelanguages}
                    className={styles.LanguageSwitch}
                    style={buttonStyle}
                >
                    {icon1}
                    <p>മലയാളം</p>
                </button>
            ) : (
                <button
                    onClick={changelanguages}
                    value={"en"}
                    className={styles.LanguageSwitch}
                    style={buttonStyle}
                >
                    {icon2}
                    <p>English</p>
                </button>
            )}
        </div>
    );
}

export default LanguageSwitcher;
