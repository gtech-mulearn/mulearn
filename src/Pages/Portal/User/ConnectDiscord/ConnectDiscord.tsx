import React, { useEffect, useState } from "react";
import styles from "./ConnectDiscord.module.css";
import SideNavBar from "../../../../Components/Dashboard/SideNavBar";
import { connectDiscord, getmuid } from "./helpers/apis";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import { BsDiscord } from "react-icons/bs";

type Props = {};

const ConnectDiscord = (props: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [muid, setMuid] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Connect Discord");
    getmuid(toast, navigate, setMuid);
  });

  return (
    <div>
      <SideNavBar
        component={
          <div className={styles.main_content}>
            <div className={styles.conect_dicord_conatianer}>
              <div className={styles.content}>
                <h1>Join Discord using your µid</h1>
                <div className={styles.muid_and_btn}>
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(muid);
                      toast({
                        title: "Copied to clipboard",
                        description:
                          "Please paste it in discord to connect your account",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                    }}
                  >
                    <MdContentCopy />
                    &nbsp; &nbsp;
                    {muid}
                  </p>
                  <button>
                    <BsDiscord />
                    &nbsp; &nbsp; Connect Discord
                  </button>
                </div>
              </div>
              <div className={styles.images}>
                <p className={styles.image}></p>
                <p className={styles.image}></p>
              </div>
            </div>

            <div className={styles.onboarding_flow_container}>
              <div className={styles.content}>
                <h1>Onboarding Flow</h1>
                <div className={styles.onboarding_flow}>
                  <p className={styles.lines}></p>
                  <div className={styles.box}>
                    <p>Copy your µid from above. </p>
                  </div>
                  <div className={styles.box2}>
                    <p>
                      Open Discord, and Join the GTech µLearn Discord server.
                    </p>
                  </div>
                  <div className={styles.box3}>
                    <p>Choose the #on-boarding channel and click Connect. </p>
                  </div>
                  <div className={styles.box4}>
                    <p>Paste the µid in the space provided. Click okay! </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ConnectDiscord;
