import React, { useState } from "react";
import styles from "./SideNavBar.module.css";
import MulearnBrand from "./assets/MulearnBrand";
import companyLogo from "./assets/images/profile.png";
import {
  MdHome,
  MdSupervisorAccount,
  MdSpaceDashboard,
  MdClass,
  MdBackupTable,
  MdArticle,
  MdWorkHistory,
  MdSettings,
  MdNotifications,
} from "react-icons/md";
import MuButton from "../MuCompenents/MuButton";

const SideNavBar = (props: { component: any }) => {
  const [marginTop, setMarginTop] = useState("0px");
  const [transform, setTransform] = useState("0deg");
  const [transform2, setTransform2] = useState("0deg");
  const [transform3, setTransform3] = useState("0deg");
  const [display, setDisplay] = useState("block");
  const [display2, setDisplay2] = useState("unset");
  return (
    <div className={styles.fullpage}>
      <div
        className={styles.side_nav_bar_container}
        style={{ display: `${display2 === "none" ? "block" : ""}` }}
      >
        <div className={styles.side_nav_bar}>
          <div className={styles.mulearn_brand}>
            <MulearnBrand />
          </div>
          <div className={styles.side_nav_bar_items}>
            <MuButton text="Home" icon={<MdHome />} />
            <MuButton text="Team" icon={<MdSupervisorAccount />} />
            <MuButton text="Management" icon={<MdSpaceDashboard />} />
            <MuButton text="Projects" icon={<MdClass />} />
            <MuButton text="Tasks" icon={<MdArticle />} />
            <MuButton text="Activity" icon={<MdBackupTable />} />
            <MuButton text="History" icon={<MdWorkHistory />} />
          </div>
        </div>
      </div>
      <div className={styles.right_side}>
        <div className={styles.top_nav}>
          <div className={styles.nav}>
            <div className={styles.nav_items}>
              <div className={styles.greetings}>Hello, &nbsp; Jenny 👋</div>

              <div
                className={styles.menu_btn}
                onClick={() => {
                  setMarginTop(marginTop === "0px" ? "-15px" : "0px");
                  setTransform2(transform2 === "0deg" ? "45deg" : "0deg");
                  setTransform3(transform3 === "0deg" ? "135deg" : "0deg");
                  setDisplay(display === "block" ? "none" : "block");
                  setDisplay2(display2 === "none" ? "block" : "none");
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
                <p
                  style={{ display: `${display}` }}
                  className={styles.lines}
                ></p>
              </div>

              <div className={styles.mulearn_brand2}>
                <MulearnBrand />
              </div>
              <div className={styles.menu}>
                <MdSettings style={{ fontSize: "20px" }} />
                <MdNotifications style={{ fontSize: "20px" }} />
                <div className={styles.profile}>
                  <img src={companyLogo} alt="" />
                </div>
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
