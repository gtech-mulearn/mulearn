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
import {
    fetchLocalStorage
} from "@/MuLearnServices/common_functions";
import { roles } from "@/MuLearnServices/types";
import MuLogOut from "../assets/svg/MuLogOut";
import MuSettings from "../assets/svg/MuSettings";


//TODO: Change the style's casing to match the rest of the project
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

const SideNavBar = (props: Props) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [marginTop, setMarginTop] = useState("0px");
    const [transform2, setTransform2] = useState("0deg");
    const [transform3, setTransform3] = useState("0deg");
    const [display, setDisplay] = useState("block");
    const [display2, setDisplay2] = useState("none");
    const [dropDownBtnDisplay, setDropDownBtnDisplay] = useState("0");
    const [level2dropDownDisplay, setLevel2dropDownDisplay] = useState(""); // Title of the level 2 dropdown
    const [connected, setConnected] = useState(false);

    const userInfo = fetchLocalStorage<UserInfo>("userInfo");

    useEffect(() => {
        if (userInfo && userInfo.exist_in_guild) {
            setConnected(userInfo.exist_in_guild);
        }
    }, []);
    const myElementRef = useRef<HTMLDivElement>(null);
    const elements = document.getElementById("right");
    const element = elements as HTMLElement;
    const hideFunc = () => {
        setMarginTop(marginTop === "0px" ? "-15px" : "0px");
        setTransform2(transform2 === "0deg" ? "45deg" : "0deg");
        setTransform3(transform3 === "0deg" ? "135deg" : "0deg");
        setDisplay(display === "block" ? "none" : "block");
        // setOpacity(opacity === 1 ? 0 : 1);
        setDisplay2(display2 === "block" ? "none" : "block");
        element.style.transition = ".5s ease-in-out";
        element.style.transform === "scale(1.1)"
            ? (element.style.transform = "")
            : (element.style.transform = "scale(1.1)");
    };

    return (
        <>
            <div
                className={styles.menu_btn}
                onClick={() => {
                    setMarginTop(marginTop === "0px" ? "-15px" : "0px");
                    setTransform2(transform2 === "0deg" ? "45deg" : "0deg");
                    setTransform3(transform3 === "0deg" ? "135deg" : "0deg");
                    setDisplay(display === "block" ? "none" : "block");
                    // setOpacity(opacity === 1 ? 0 : 1);
                    setDisplay2(display2 === "block" ? "none" : "block");
                    // setTimeout(() => {
                    // }, 1000);
                    element.style.transition = ".5s ease-in-out";
                    element.style.transform === "scale(1.1)"
                        ? (element.style.transform = "")
                        : (element.style.transform = "scale(1.1)");
                }}
            >
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
                    style={{ display: `${display}` }}
                    className={styles.lines}
                ></p>
            </div>
            <div
                id="side_nav"
                className={styles.side_nav_bar_container}
                style={
                    window.innerWidth <= 830
                        ? {
                              opacity: `${display2 === "none" ? 0 : 1}`,
                              zIndex: `${display2 === "none" ? 0 : 100}`
                          }
                        : {}
                    // display: `${display2}`
                }
            >
                <div className={styles.side_nav_bar}>
                    <div className={styles.mulearn_brand}>
                        <MulearnBrand />
                    </div>
                    <div className={styles.side_nav_bar_items}>
                        <div className={styles.side_nav_bar_main_items}>
                            {props.sidebarButtons
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
                                                            button.roles?.some(
                                                                role =>
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
                                                                .map(
                                                                    (
                                                                        button,
                                                                        i
                                                                    ) => (
                                                                        <MuButton
                                                                            key={
                                                                                i
                                                                            }
                                                                            text={
                                                                                button.title
                                                                            }
                                                                            buttonUrl={
                                                                                button.url
                                                                            }
                                                                            onClick={() => {
                                                                                navigate(
                                                                                    button.url
                                                                                );
                                                                                window.innerWidth <=
                                                                                500
                                                                                    ? hideFunc()
                                                                                    : null;
                                                                            }}
                                                                        />
                                                                    )
                                                                )}
                                                        />
                                                    ) : (
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
                                                                    ? hideFunc()
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
                                                    ? hideFunc()
                                                    : null;
                                            }}
                                        />
                                    )
                                )}
                        </div>
                        <div className={styles.bottomButtons}>
                            <MuButton
                                text="Settings"
                                icon={<MuSettings />}
                                onClick={() => navigate("/dashboard/settings")}
                                style={{
                                    color: "#9297AA",
                                    backgroundColor: "#fff",
                                    // marginBottom: "0px"
                                }}
                            />
                            <MuButtonLight
                                text="Logout"
                                icon={<MuLogOut/>}
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#FF7676",
                                }}
                                onClick={() => {
                                    localStorage.clear();
                                    toast({
                                        title: "Logged out",
                                        description:
                                            "Redirecting to login page.",
                                        status: "error",
                                        duration: 9000,
                                        isClosable: true
                                    });
                                    setTimeout(
                                        () => window.location.reload(),
                                        900
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <p className={styles.copyrightText}>
                        All Rights Reserved © µLearn {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SideNavBar;
