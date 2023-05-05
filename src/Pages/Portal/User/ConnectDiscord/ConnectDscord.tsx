import React from "react";
import styles from "../../../../Components/Dashboard/SideNavBar.module.css";
import SideNavBar from "../../../../Components/Dashboard/SideNavBar";

type Props = {};

const ConnectDscord = (props: Props) => {
  return (
    <div>
      <SideNavBar
        component={
          <div className={styles.main_content}>
            <h1>Connect to Discord</h1>
            <p>
              Connect your Discord account to your account on this website
            </p>
          </div>
        }
      />
    </div>
  );
};

export default ConnectDscord;
