import React from "react";
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

type Props = {};

const SideNavBar = (props: Props) => {
  return (
    <div className={styles.fullpage}>
      <div className={styles.side_nav_bar_container}>
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
              <div className={styles.menu}>
                <MdSettings style={{fontSize:"20px"}}/>
                <MdNotifications style={{fontSize:"20px"}}/>
                <div className={styles.profile}>
                  <img src={companyLogo} alt="" />
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
