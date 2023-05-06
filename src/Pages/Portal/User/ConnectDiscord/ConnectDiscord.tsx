import React, { useEffect, useState } from "react";
import styles from "../../../../Components/Dashboard/SideNavBar.module.css";
import SideNavBar from "../../../../Components/Dashboard/SideNavBar";
import { connectDiscord, getmuid } from "./helpers/apis";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type Props = {};

const ConnectDiscord = (props: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [muid, setMuid] = useState("");

  useEffect(() => {
    console.log("Connect Discord");
    getmuid(toast, navigate, setMuid);
  });

  return (
    <div>
      <SideNavBar
        component={
          <div className={styles.main_content}>
            <h1>Connect to Discord</h1>
            <p>Connect your Discord account to your account on this website</p>
            <p>Here is your muid: {muid}</p>
          </div>
        }
      />
    </div>
  );
};

export default ConnectDiscord;
