import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdLogIn } from "react-icons/io";

import {
    DropDownButtons,
    MuButton,
    MuButtonLight
} from "@/MuLearnComponents/MuButtons/MuButton";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";

import styles from "./SideNavBar.module.css";
import MuLogOut from "../assets/svg/MuLogOut";
import MuSettings from "../assets/svg/MuSettings";

type SideNavBarButton = {
    url: string;
    title: string;
    hasView: boolean;
    roles?: string[];
    dynamicType?: string[];
    icon?: JSX.Element;
    children?: SideNavBarButton[];
};

type SideNavBarBodyProps = {
    sidebarButtons: SideNavBarButton[];
    toggleSideNavBar: () => void;
};

const SideNavBarBody: React.FC<SideNavBarBodyProps> = ({ sidebarButtons, toggleSideNavBar }) => {
    const navigate = useNavigate();
    const [dropDownState, setDropDownState] = useState<Record<string, boolean>>({});
    const userInfo = fetchLocalStorage<{ roles?: string[]; dynamic_type?: string[]; exist_in_guild?: boolean }>("userInfo");

    const hasAccess = (button: SideNavBarButton) => {
        if (!button.hasView) return false;
        if (!button.roles && !button.dynamicType) return true;
        return (
            button.roles?.some(role => userInfo?.roles?.includes(role)) ||
            button.dynamicType?.some(type => userInfo?.dynamic_type?.includes(type))
        );
    };

    const filteredSidebarButtons = useMemo(
        () => sidebarButtons.filter(hasAccess),
        [sidebarButtons, userInfo, hasAccess]
    );

    const handleNavigation = (url: string) => {
        navigate(url);
        toggleSideNavBar();
    };

    const toggleDropdown = (key: string) => {
        setDropDownState(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const refreshToken = localStorage.getItem("refreshToken");

    return (
        <div className={styles.side_nav_bar_items}>
            <div className={styles.side_nav_bar_main_items}>
                {filteredSidebarButtons.map((button, i) => (
                    button.children ? (
                        <DropDownButtons
                            key={i}
                            text={button.title}
                            icon={button.icon}
                            onClick={() => toggleDropdown(i.toString())}
                            display={dropDownState[i.toString()] ? "max-content" : "0"}
                            listOfDropBtn={button.children.filter(hasAccess).map((child, j) => (
                                child.children ? (
                                    <DropDownButtons
                                        key={j}
                                        text={child.title}
                                        icon={child.icon}
                                        onClick={() => toggleDropdown(`${i}-${j}`)}
                                        display={dropDownState[`${i}-${j}`] ? "max-content" : "0"}
                                        listOfDropBtn={child.children.filter(hasAccess).map((subChild, k) => (
                                            <MuButton
                                                key={k}
                                                style={{ width: "100%" }}
                                                text={subChild.title}
                                                buttonUrl={subChild.url}
                                                onClick={() => handleNavigation(subChild.url)}
                                            />
                                        ))}
                                    />
                                ) : (
                                    <MuButton
                                        key={j}
                                        style={{ width: "100%" }}
                                        text={child.title}
                                        buttonUrl={child.url}
                                        onClick={() => handleNavigation(child.url)}
                                    />
                                )
                            ))}
                        />
                    ) : (
                        <MuButton
                            key={i}
                            style={{ width: "100%" }}
                            text={button.title}
                            icon={button.icon}
                            buttonUrl={button.url}
                            onClick={() => handleNavigation(button.url)}
                        />
                    )
                ))}
            </div>
            <div className={styles.bottomButtons}>
                <MuButton
                    text="Account Setting"
                    icon={<MuSettings />}
                    onClick={() => navigate("/dashboard/settings/account")}
                    style={{
                        color: "#9297AA",
                        backgroundColor: "#fff"
                        // marginBottom: "0px"
                    }}
                />
                {
                    refreshToken ? (
                        <MuButtonLight
                            text="Logout"
                            icon={<MuLogOut />}
                            style={{
                                backgroundColor: "#fff",
                                color: "#FF7676"
                            }}
                            onClick={() => {
                                localStorage.clear();
                                toast.error("Logged Out, Redirecting to login page.");
                                setTimeout(() => window.location.reload(), 900);
                            }}
                        />
                    ) : (
                        <MuButtonLight
                        text="LogIn"
                        style={{
                            backgroundColor: "#fff",
                            color: "gray"
                        }}
                        // iconstyle={{marginRight: '1.2rem'}}
                        icon={<IoMdLogIn style={{fontSize: '1.4rem'}}/>}
                        onClick={() => {
                            navigate("/login")
                        }}
                    />
                    )
                }
            </div>
        </div>
    );
};

export default SideNavBarBody;
