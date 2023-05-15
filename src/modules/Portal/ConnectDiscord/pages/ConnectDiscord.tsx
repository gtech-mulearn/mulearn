import React, { useEffect, useState } from "react";
import styles from "./ConnectDiscord.module.css";
import cdimage from "../assets/connectdiscordpng1.png";
import { getInfo } from "../services/apis";

import { useToast } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import { BsDiscord } from "react-icons/bs";
import { GridLoader } from "react-spinners";

const ConnectDiscord = () => {
    const [muid, setMuid] = useState("");
    const toast = useToast();

    useEffect(() => {
        if (
            localStorage.getItem("userInfo") &&
            JSON.parse(localStorage.getItem("userInfo")!).mu_id
        ) {
            setMuid(JSON.parse(localStorage.getItem("userInfo")!).mu_id);
        } else {
            getInfo(setMuid);
        }
    }, []);

    return (
        <>
            {muid && muid.length > 0 ? (
                <>
                    <div className={styles.connect_discord_container}>
                        <div className={styles.content}>
                            <h1>Join Discord using your µid</h1>
                            <p className={styles.content_tagline}>
                                To join our discord server you need to connect
                                your account with discord. To do so you need to
                                copy your µid and paste it in the discord
                                server.
                            </p>
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
                                            isClosable: true
                                        });
                                    }}
                                >
                                    <MdContentCopy />
                                    &nbsp; &nbsp;
                                    {muid}
                                </p>
                                <a
                                    href="http://discord.mulearn.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button>
                                        <BsDiscord />
                                        &nbsp; &nbsp; Connect Discord
                                    </button>
                                </a>
                            </div>
                        </div>

                        <img className={styles.fb_image} src={cdimage} alt="" />
                    </div>

                    <div className={styles.onboarding_flow_container}>
                        <div className={styles.content}>
                            <h1>Onboarding Flow</h1>
                            <div className={styles.onboarding_flow}>
                                <p className={styles.lines}>
                                    <div className={styles.box}>
                                        <p>
                                            Click the connect discord button to
                                            join our discord server and complete
                                            the registration progress
                                        </p>
                                        <p className={styles.p}>
                                            Onboard Discord Server Accept the
                                            invitation
                                        </p>
                                    </div>
                                    <div className={styles.box2}>
                                        <p>
                                            From the menu shown aside select the
                                            onboarding channel to continue.
                                        </p>
                                        <p className={styles.p}>
                                            Select the Onboarding Channel
                                        </p>
                                    </div>
                                    <div className={styles.box3}>
                                        <p>
                                            From the opened channel click the
                                            join now button.
                                        </p>
                                        <p className={styles.p}>Join Now!</p>
                                    </div>
                                    <div className={styles.box4}>
                                        <p>
                                            Inside the modal that is opened
                                            enter the muid you copied and click
                                            submit.
                                        </p>
                                        <p className={styles.p}>
                                            Enter Your muid
                                        </p>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.spinner_container}>
                    <div className={styles.spinner}>
                        <GridLoader
                            style={{ display: "block" }}
                            className={styles.loader}
                            color="#014bb2"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ConnectDiscord;
