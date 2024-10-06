import { useEffect, useRef, useState } from "react";
import styles from "./ConnectDiscord.module.css";
import cdimage from "../assets/images/connectdiscordpng1.webp";
import { connectDiscord, getInfo } from "../services/apis";
import { MdContentCopy } from "react-icons/md";
import { BsDiscord } from "react-icons/bs";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { FaInstagram } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const ConnectDiscord = () => {
    const [muid, setMuid] = useState("");
    const firstFetch = useRef(true);
    const [searchParams, _] = useSearchParams();
    const token = searchParams.get("code");
    const [discordStatus, setDiscordStatus] = useState("connecting");
    const navigate = useNavigate();
    useEffect(() => {
        if (firstFetch.current) {
            if (
                localStorage.getItem("userInfo") &&
                JSON.parse(localStorage.getItem("userInfo")!).mu_id
            ) {
                setMuid(JSON.parse(localStorage.getItem("userInfo")!).mu_id);
            } else {
                getInfo(setMuid);
            }
        }
        firstFetch.current = false;
    }, []);

    useEffect(() => {
        if (token) {
            connectDiscord(token).then(res => {
                if (res) {
                    setDiscordStatus("connected");
                    navigate("/dashboard/profile");
                    toast.success(
                        "You will be added to our discord server shortly"
                    );
                    setTimeout(() => {
                        var a = document.createElement("a");
                        a.href =
                            "https://discord.gg/gtech-mulearn-771670169691881483";
                        a.target = "_blank";
                        a.click();
                    }, 5000);
                } else {
                    setDiscordStatus("failed");
                }
            });
        }
    }, []);

    return (
        <>
            {token == null ? (
                <>
                    {muid && muid.length > 0 ? (
                        <div className={styles.connectDiscord}>
                            <div className={styles.connect_discord_container}>
                                <div className={styles.content}>
                                    <h1>Join Discord using your µid</h1>
                                    <p className={styles.content_tagline}>
                                        To join our discord server you need to
                                        connect your account with discord. To do
                                        so you need to copy your µid and paste
                                        it in the discord server.
                                    </p>
                                    <div className={styles.muid_and_btn}>
                                        <PowerfulButton
                                            variant="secondary"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    muid
                                                );

                                                toast.success(
                                                    "Copied to clipboard, Please paste it in discord to connect your account"
                                                );
                                            }}
                                        >
                                            <MdContentCopy />
                                            {muid}
                                        </PowerfulButton>
                                        <a
                                            href={
                                                import.meta.env
                                                    .VITE_DISCORD_AUTH_URL
                                            }
                                            // target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <PowerfulButton>
                                                <BsDiscord />
                                                Join Discord
                                            </PowerfulButton>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/mulearn.official/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.follow_us}
                                        >
                                            <FaInstagram size={20} />
                                            <p style={{ marginLeft: "0.3rem" }}>
                                                Follow Us
                                            </p>
                                        </a>
                                    </div>
                                </div>
                                <img
                                    className={styles.fb_image}
                                    src={cdimage}
                                    alt=""
                                />
                            </div>

                            {/* <div className={styles.onboarding_flow_container}>
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
                                            From the sidebar select the
                                            Aaronchettan to continue.
                                        </p>
                                        <p className={styles.p}>
                                            Select the Aaronchettan Profile
                                        </p>
                                    </div>
                                    <div className={styles.box3}>
                                        <p>
                                            From the opened direct message,
                                            click the Connect Muid button.
                                        </p>
                                        <p className={styles.p}>
                                            Connect Muid!
                                        </p>
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
                    </div> */}
                        </div>
                    ) : (
                        <div className={styles.spinner_container}>
                            <div className={styles.spinner}>
                                <MuLoader />{" "}
                            </div>
                        </div>
                    )}
                </>
            ) : discordStatus == "connecting" ? (
                <div className={styles.spinner_container}>
                    <div className={styles.spinner}>
                        <MuLoader />{" "}
                    </div>
                </div>
            ) : discordStatus == "connected" ? (
                <div className={styles.connectDiscord}>
                    <div className={styles.connect_discord_container}>
                        <div className={styles.content}>
                            <h1>Discord Connected</h1>
                            <p className={styles.content_tagline}>
                                Your account has been successfully connected to
                                discord.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.connectDiscord}>
                    <div className={styles.connect_discord_container}>
                        <div className={styles.content}>
                            <h1>Discord Connection Failed</h1>
                            <p className={styles.content_tagline}>
                                Your account could not be connected to discord.
                                Please try again later.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConnectDiscord;
