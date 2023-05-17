import React, { useState, useEffect } from "react";
import styles from "./SideNavBar.module.css";
import MulearnBrand from "./assets/MulearnBrand";
import { getname, getInfo } from "./helpers/apis";

// import {
//   MdHome,
//   MdSupervisorAccount,
//   MdSpaceDashboard,
//   MdClass,
//   MdBackupTable,
//   MdArticle,
//   MdWorkHistory,
// } from "react-icons/md";

import { MuButton, DropDownButtons } from "../../../components/MuComponents/MuButton";
import MuButtonLight from "../../../components/MuComponents/MuButtonLight";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
    sidebarButtons: {
        url: string;
        title: string;
        icon: any;
    }[];
}

const SideNavBar = (props: Props) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [marginTop, setMarginTop] = useState("0px");
    // const [transform, setTransform] = useState("0deg");
    const [transform2, setTransform2] = useState("0deg");
    const [transform3, setTransform3] = useState("0deg");
    const [display, setDisplay] = useState("block");
    const [display2, setDisplay2] = useState("");
    const [dropDownBtnDisplay, setDropDownBtnDisplay] = useState("0");
    const [connected, setConnected] = useState(false);
    // const [opacity, setOpacity] = useState(null);
    useEffect(() => {
        if (
            localStorage.getItem("userInfo") &&
            JSON.parse(localStorage.getItem("userInfo")!).exist_in_guild
        ) {
            setConnected(
                JSON.parse(localStorage.getItem("userInfo")!).exist_in_guild
            );
        }
    });

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
                className={styles.side_nav_bar_container}
                style={{
                    opacity: `${display2 === "none" ? 0 : 1}`,
                    display: `${display2}`
                }}
            >
                <div className={styles.side_nav_bar}>
                    <div className={styles.mulearn_brand}>
                        <MulearnBrand />
                    </div>
                    <div className={styles.side_nav_bar_items}>
                        {/* <MuButton text="Home" icon={<i className="fi fi-sr-home"></i>} /> */}
                        {/* <MuButton text="Team" icon={<i className="fi fi-sr-address-book"></i>} /> */}
                        {/* <MuButton text="Management" icon={<i className="fi fi-sr-layout-fluid"></i>} /> */}
                        {/* <MuButton text="Projects" icon={<i className="fi fi-sr-book-arrow-right"></i>} /> */}
                        {/* <MuButton text="Tasks" icon={<i className="fi fi-sr-box"></i>} /> */}
                        {/* <MuButton text="Activity" icon={<i className="fi fi-sr-copy-alt"></i>} /> */}
                        {/* <MuButton text="History" icon={<i className="fi fi-sr-search-alt"></i>} /> */}
                        <div className={styles.side_nav_bar_main_items}>
                            {
                                props.sidebarButtons.map((button) => (
                                    <MuButton
                                        text={button.title}
                                        icon={button.icon}
                                        style={
                                            window.location.pathname === `/${button.url}`
                                                ? { background: "#014BB2", color: "#fff" }
                                                : {}
                                        }
                                        onClick={() => {
                                            navigate(button.url);
                                        }}
                                    />
                                ))
                            }
                            {/* <DropDownButtons
                                text="Management"
                                icon={<i className="fi fi-sr-layout-fluid"></i>}
                                // style={
                                //     window.location.pathname ===
                                //         "/interest-groups"
                                //         ? {
                                //             background: "#014BB2",
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
