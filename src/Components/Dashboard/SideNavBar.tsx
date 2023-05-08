import React, { useState, useEffect } from "react";
import styles from "./SideNavBar.module.css";
import MulearnBrand from "./assets/MulearnBrand";
import { getname } from "./helpers/apis";

// import companyLogo from "./assets/images/profile.png";
// import {
//   MdHome,
//   MdSupervisorAccount,
//   MdSpaceDashboard,
//   MdClass,
//   MdBackupTable,
//   MdArticle,
//   MdWorkHistory,
//   MdSettings,
//   MdNotifications,
// } from "react-icons/md";
import MuButton from "../MuCompenents/MuButton";
import MuButtonLight from "../MuCompenents/MuButtonLight";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SideNavBar = (props: { component?: any }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [marginTop, setMarginTop] = useState("0px");
  const [transform, setTransform] = useState("0deg");
  const [transform2, setTransform2] = useState("0deg");
  const [transform3, setTransform3] = useState("0deg");
  const [display, setDisplay] = useState("block");
  const [display2, setDisplay2] = useState("unset");
  const [name, setName] = useState("");
  // const [opacity, setOpacity] = useState(null);
  useEffect(() => {
    getname(setName);
  });
  return (
    <div className={styles.fullpage}>
      <div
        className={styles.menu_btn}
        onClick={() => {
          setMarginTop(marginTop === "0px" ? "-15px" : "0px");
          setTransform2(transform2 === "0deg" ? "45deg" : "0deg");
          setTransform3(transform3 === "0deg" ? "135deg" : "0deg");
          setDisplay(display === "block" ? "none" : "block");
          // setOpacity(opacity === 1 ? 0 : 1);
          setDisplay2(display2 === "none" ? "block" : "none");
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
            marginTop: `${marginTop}`,
          }}
          className={styles.lines}
        ></p>
        <p style={{ display: `${display}` }} className={styles.lines}></p>
      </div>
      <div
        className={styles.side_nav_bar_container}
        style={{ display: `${display2 === "none" ? "block" : ""}` }}
      >
        <div className={styles.side_nav_bar}>
          <div className={styles.mulearn_brand}>
            <MulearnBrand />
          </div>
          <div className={styles.side_nav_bar_items}>
            {/* <MuButton text="Home" icon={<i className="fi fi-sr-home"></i>} />
            <MuButton text="Team" icon={<i className="fi fi-sr-address-book"></i>} />
            <MuButton text="Management" icon={<i className="fi fi-sr-layout-fluid"></i>} />
            <MuButton text="Projects" icon={<i className="fi fi-sr-book-arrow-right"></i>} />
            <MuButton text="Tasks" icon={<i className="fi fi-sr-box"></i>} />
            <MuButton text="Activity" icon={<i className="fi fi-sr-copy-alt"></i>} />
            <MuButton text="History" icon={<i className="fi fi-sr-search-alt"></i>} /> */}
            <MuButton
              text="Profile"
              icon={<i className="fi fi-sr-clipboard-user"></i>}
              style={
                window.location.pathname === "/user/profile"
                  ? { background: "#014BB2", color: "#fff" }
                  : {}
              }
              onClick={() => {
                navigate("/user/profile");
              }}
            />
            <MuButton
              text="Connect Discord"
              icon={<i className="fi fi-sr-data-transfer"></i>}
              style={
                window.location.pathname === "/user/connect-discord"
                  ? { background: "#014BB2", color: "#fff" }
                  : {}
              }
              onClick={() => {
                navigate("/user/connect-discord");
              }}
            />
            <MuButtonLight
              text="Logout"
              icon={<i className="fi fi-sr-key"></i>}
              onClick={() => {
                localStorage.clear();
                toast({
                  title: "Loged out",
                  description: "Redirecting to login page.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
                setTimeout(() => {
                  window.location.reload();
                }, 900);
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.right_side}>
        <div className={styles.top_nav}>
          <div className={styles.nav}>
            <div className={styles.nav_items}>
              <div className={styles.greetings}>Hello, &nbsp; {name} 👋</div>

              <div className={styles.mulearn_brand2}>
                <MulearnBrand />
              </div>
              <div className={styles.menu}>
                {/* <MdSettings style={{ fontSize: "30px" }} />
                <MdNotifications style={{ fontSize: "30px" }} />
                <div className={styles.profile}>
                  <img src={companyLogo} alt="" />
                </div> */}
              </div>
            </div>
            <hr />
          </div>
        </div>
        {props.component}
      </div>
    </div>
  );
};

export default SideNavBar;
