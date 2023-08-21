import { useState, useEffect } from "react";

import styles from "./SideNavBar.module.css";

import MulearnBrand from "../assets/MulearnBrand";
import SideNavBarBody from "./SideNavBarBody";

type Props = {
    sidebarButtons: {
        url: string;
        title: string;
        hasView: boolean;
        roles?: Role[];
        icon?: any;
        children?: Props["sidebarButtons"];
    }[];
};

const SideNavBar = ({ sidebarButtons }: Props) => {
    // for the hamburger icon
    const [marginTop, setMarginTop] = useState("0px");
    const [transform2, setTransform2] = useState("0deg");
    const [transform3, setTransform3] = useState("0deg");
    const [hamburgerIconDisplay, setHamburgerIconDisplay] = useState("block");

    const [sideNavDisplay, setSideNavDisplay] = useState(
        window.innerWidth > 830 ? "flex" : "none"
    );

    // const myElementRef = useRef<HTMLDivElement>(null);
    // const elements = document.getElementById("right");
    // const element = elements as HTMLElement;

    useEffect(() => {
        const handleResize = () =>
            setSideNavDisplay(window.innerWidth > 830 ? "flex" : "none");

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const animateHamburgerIcon = () => {
        setMarginTop(sideNavDisplay === "none" ? "-15px" : "0px");
        setTransform2(sideNavDisplay === "none" ? "45deg" : "0deg");
        setTransform3(sideNavDisplay === "none" ? "135deg" : "0deg");
        setHamburgerIconDisplay(sideNavDisplay === "none" ? "none" : "block");
    };

    const toggleSideNavBar = () => {
        if (window.innerWidth <= 830) {
            animateHamburgerIcon();
            setSideNavDisplay(sideNavDisplay === "flex" ? "none" : "flex");
        }

        // Right side content transition
        // element.style.transition = ".3s ease-in-out";
        // element.style.transform === "scale(1.1)"
        //     ? (element.style.transform = "scale(1)")
        //     : (element.style.transform = "scale(1.1)");
    };

    return (
        <>
            {/* Hamburger Menu */}
            <div className={styles.menu_btn} onClick={toggleSideNavBar}>
                <p
                    style={{ transform: `rotate(${transform2})` }}
                    className={styles.lines}
                ></p>
                <p
                    style={{
                        transform: `rotate(${transform3})`,
                        marginTop: `${marginTop}`
                    }}
                    className={styles.lines}
                ></p>
                <p
                    style={{ display: `${hamburgerIconDisplay}` }}
                    className={styles.lines}
                ></p>
            </div>

            {/* Side Nav Bar */}
            <div
                id="side_nav"
                className={styles.side_nav_bar_container}
                style={{ display: `${sideNavDisplay}` }}
            >
                <div className={styles.side_nav_bar}>
                    <div className={styles.mulearn_brand}>
                        <MulearnBrand />
                    </div>
                    <SideNavBarBody
                        sidebarButtons={sidebarButtons}
                        toggleSideNavBar={toggleSideNavBar}
                    />
                    <p className={styles.copyrightText}>
                        All Rights Reserved © µLearn Foundation{" "}
                        {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SideNavBar;
