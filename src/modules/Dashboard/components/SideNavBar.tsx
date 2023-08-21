import React, { useState, useEffect, useRef } from "react";
import styles from "./SideNavBar.module.css";
import MulearnBrand from "../assets/MulearnBrand";

import { background, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import {
    DropDownButtons,
    MuButton,
    MuButtonLight
} from "@/MuLearnComponents/MuButtons/MuButton";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import MuLogOut from "../assets/svg/MuLogOut";
import MuSettings from "../assets/svg/MuSettings";

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

    const myElementRef = useRef<HTMLDivElement>(null);
    const elements = document.getElementById("right");
    const element = elements as HTMLElement;

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

    const hideOrShowSideNavBar = () => {
        animateHamburgerIcon();
        setSideNavDisplay(sideNavDisplay === "flex" ? "none" : "flex");

        // Right side content transition
        element.style.transition = ".3s ease-in-out";
        element.style.transform === "scale(1.1)"
            ? (element.style.transform = "scale(1)")
            : (element.style.transform = "scale(1.1)");
    };

    return (
        <>
            {/* Hamburger Menu */}
            <div className={styles.menu_btn} onClick={hideOrShowSideNavBar}>
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
                        toggleSideNavBar={hideOrShowSideNavBar}
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

type SideNavBarBodyProps = {
    sidebarButtons: {
        url: string;
        title: string;
        hasView: boolean;
        roles?: Role[];
        icon?: any;
        children?: SideNavBarBodyProps["sidebarButtons"];
    }[];
    toggleSideNavBar: () => void;
};

const SideNavBarBody = ({
    sidebarButtons,
    toggleSideNavBar
}: SideNavBarBodyProps) => {
    const toast = useToast();
    const navigate = useNavigate();

    const [dropDownBtnDisplay, setDropDownBtnDisplay] = useState("0");
    const [level2dropDownDisplay, setLevel2dropDownDisplay] = useState(""); // Title of the level 2 dropdown

    const [connected, setConnected] = useState(false);

    const userInfo = fetchLocalStorage<UserInfo>("userInfo");

    useEffect(() => {
        if (userInfo && userInfo.exist_in_guild) {
            setConnected(userInfo.exist_in_guild);
        }
    }, [userInfo]);

    return (
        <div className={styles.side_nav_bar_items}>
            <div className={styles.side_nav_bar_main_items}>
                {sidebarButtons
                    .filter(
                        button =>
                            button.hasView &&
                            (!button.roles ||
                                button.roles?.some(role =>
                                    userInfo?.roles?.includes(role)
                                ))
                    )
                    .map((button, i) =>
                        button.children ? (
                            <DropDownButtons
                                key={i}
                                text={button.title}
                                icon={button.icon}
                                onClick={() =>
                                    setDropDownBtnDisplay(
                                        dropDownBtnDisplay === "0"
                                            ? "max-content"
                                            : "0"
                                    )
                                }
                                listOfDropBtn={button.children
                                    .filter(
                                        button =>
                                            button.hasView &&
                                            (!button.roles ||
                                                button.roles?.some(role =>
                                                    userInfo?.roles?.includes(
                                                        role
                                                    )
                                                ))
                                    )
                                    .map((button, i) =>
                                        button.children ? (
                                            <DropDownButtons
                                                key={i}
                                                text={button.title}
                                                icon={button.icon}
                                                onClick={() =>
                                                    setLevel2dropDownDisplay(
                                                        level2dropDownDisplay ===
                                                            button.title
                                                            ? ""
                                                            : button.title
                                                    )
                                                }
                                                display={
                                                    level2dropDownDisplay ===
                                                    button.title
                                                        ? "max-content"
                                                        : "0"
                                                }
                                                listOfDropBtn={button.children
                                                    .filter(
                                                        button =>
                                                            button.hasView &&
                                                            (!button.roles ||
                                                                button.roles?.some(
                                                                    role =>
                                                                        userInfo?.roles?.includes(
                                                                            role
                                                                        )
                                                                ))
                                                    )
                                                    .map((button, i) => (
                                                        <MuButton
                                                            key={i}
                                                            text={button.title}
                                                            buttonUrl={
                                                                button.url
                                                            }
                                                            onClick={() => {
                                                                navigate(
                                                                    button.url
                                                                );
                                                                window.innerWidth <=
                                                                500
                                                                    ? toggleSideNavBar()
                                                                    : null;
                                                            }}
                                                        />
                                                    ))}
                                            />
                                        ) : (
                                            <MuButton
                                                key={i}
                                                text={button.title}
                                                buttonUrl={button.url}
                                                onClick={() => {
                                                    navigate(button.url);
                                                    window.innerWidth <= 500
                                                        ? toggleSideNavBar()
                                                        : null;
                                                }}
                                            />
                                        )
                                    )}
                                display={dropDownBtnDisplay}
                            />
                        ) : (
                            <MuButton
                                key={i}
                                text={button.title}
                                icon={button.icon}
                                buttonUrl={button.url}
                                onClick={() => {
                                    navigate(button.url);
                                    window.innerWidth <= 500
                                        ? toggleSideNavBar()
                                        : null;
                                }}
                            />
                        )
                    )}
            </div>
            <div className={styles.bottomButtons}>
                {/* <MuButton
            text="Settings"
            icon={<MuSettings />}
            onClick={() => navigate("/dashboard/settings")}
            style={{
                color: "#9297AA",
                backgroundColor: "#fff",
                // marginBottom: "0px"
            }}
        /> */}
                <MuButtonLight
                    text="Logout"
                    icon={<MuLogOut />}
                    style={{
                        backgroundColor: "#fff",
                        color: "#FF7676"
                    }}
                    onClick={() => {
                        localStorage.clear();
                        toast({
                            title: "Logged out",
                            description: "Redirecting to login page.",
                            status: "error",
                            duration: 9000,
                            isClosable: true
                        });
                        setTimeout(() => window.location.reload(), 900);
                    }}
                />
            </div>
        </div>
    );
};
