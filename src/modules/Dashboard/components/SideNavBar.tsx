import React, { useState, useEffect, useRef } from "react";
import styles from "./SideNavBar.module.css";
import MulearnBrand from "../assets/MulearnBrand";

// import {
//   MdHome,
//   MdSupervisorAccount,
//   MdSpaceDashboard,
//   MdClass,
//   MdBackupTable,
//   MdArticle,
//   MdWorkHistory,
// } from "react-icons/md";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
    DropDownButtons,
    MuButton,
    MuButtonLight
} from "../../../components/MuComponents/MuButtons/MuButton";
// import MuButtonLight from "../../../components/MuComponents/MuButtons/MuButtonLight";

type Props = {
    sidebarButtons: {
        url: string;
        title: string;
        hasView: boolean;
        roles?: string[];
        icon: any;
    }[];
};

const SideNavBar = (props: Props) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [marginTop, setMarginTop] = useState("0px");
    // const [transform, setTransform] = useState("0deg");
    const [transform2, setTransform2] = useState("0deg");
    const [transform3, setTransform3] = useState("0deg");
    const [display, setDisplay] = useState("block");
    const [display2, setDisplay2] = useState("none");
    const [dropDownBtnDisplay, setDropDownBtnDisplay] = useState("0");
    const [connected, setConnected] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

    useEffect(() => {
        if (localStorage.getItem("userInfo") && userInfo.existInGuild) {
            setConnected(userInfo.existInGuild);
        }
    });
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
                                .map((button, i) => (
                                    <MuButton
                                        key={i}
                                        text={button.title}
                                        icon={button.icon}
                                        style={
                                            window.location.pathname ===
                                            `/${button.url}`
                                                ? {
                                                      background: "#456FF6",
                                                      color: "#fff"
                                                  }
                                                : {}
                                        }
                                        onClick={() => {
                                            navigate(button.url);
                                            window.innerWidth <= 500
                                                ? hideFunc()
                                                : null;
                                        }}
                                    />
                                ))}
                            {/* <DropDownButtons
                                text="Management"
                                icon={<i className="fi fi-sr-layout-fluid"></i>}
                                // style={
                                //     window.location.pathname ===
                                //         "/interest-groups"
                                //         ? {
                                //             background: "#456FF6",
                                //             color: "#fff"
                                //         }
                                //         : {}
                                // }
                                onClick={() => {
                                    // navigate("/interest-groups");
                                    setDropDownBtnDisplay(
                                        dropDownBtnDisplay === "0"
                                            ? "max-content"
                                            : "0"
                                    );
                                }}
                                listOfDropBtn={[
                                    { text: "Admin" },
                                    { text: "Company" },
                                    { text: "User" }
                                ]}
                                display={dropDownBtnDisplay}
                            /> */}
                        </div>

                        <MuButtonLight
                            text="Logout"
                            icon={<i className="fi fi-sr-key"></i>}
                            style={
                                window.innerWidth <= 820
                                    ? {
                                          border: "none",
                                          borderRadius: "10px",
                                          padding: "20px 20px"
                                      }
                                    : {}
                            }
                            onClick={() => {
                                localStorage.clear();
                                toast({
                                    title: "Logged out",
                                    description: "Redirecting to login page.",
                                    status: "error",
                                    duration: 9000,
                                    isClosable: true
                                });
                                setTimeout(() => {
                                    window.location.reload();
                                }, 900);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideNavBar;
