import {
    DropDownButtons,
    MuButton,
    MuButtonLight,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SideNavBar.module.css";
import MuLogOut from "../assets/svg/MuLogOut";

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

    const elements = document.getElementById("right");
    const element = elements as HTMLElement;

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
                                                        <PowerfulButton
                                                            style={{
                                                                width: "100%"
                                                            }}
                                                            key={i}
                                                            
                                                         buttonUrl={
                                                                button.url
                                                            }
                                                            onClick={() => {
                                                                navigate(
                                                                    button.url
                                                                );
                                                                window.innerWidth <=
                                                                830
                                                                    ? toggleSideNavBar()
                                                                    : null;
                                                            }}
                                                        >{button.title}</PowerfulButton>
                                                    ))}
                                            />
                                        ) : (
                                            <PowerfulButton
                                                style={{
                                                    width: "100%"
                                                }}
                                                key={i}                                           
                                                buttonUrl={button.url}
                                                onClick={() => {
                                                    navigate(button.url);
                                                    toggleSideNavBar();
                                                }}
                                            >{button.title}</PowerfulButton>
                                        )
                                    )}
                                display={dropDownBtnDisplay}
                            />
                        ) : (
                            <MuButton
                                style={{
                                    width: "100%"
                                }}
                                key={i}
                                text={button.title}
                                icon={button.icon}
                                buttonUrl={button.url}
                                onClick={() => {
                                    navigate(button.url);
                                    toggleSideNavBar();
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

export default SideNavBarBody;
