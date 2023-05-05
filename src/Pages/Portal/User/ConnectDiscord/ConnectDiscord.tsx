import React, { useEffect } from "react";
import styles from "../../../../Components/Dashboard/SideNavBar.module.css";
import SideNavBar from "../../../../Components/Dashboard/SideNavBar";
import { connectDiscord } from "./helpers/apis";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type Props = {};

const ConnectDiscord = (props: Props) => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    console.log("Connect Discord");

    connectDiscord(toast, navigate);
  });

  return (
    <div>
      <SideNavBar
        component={
          <div className={styles.main_content}>
            <h1>Connect to Discord</h1>
            <p>Connect your Discord account to your account on this website</p>
          </div>
        }
      />
    </div>
  );
};

export default ConnectDiscord;
