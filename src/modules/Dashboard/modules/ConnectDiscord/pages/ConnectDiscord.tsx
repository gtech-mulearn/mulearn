import { useEffect, useRef, useState } from "react";
import styles from "./ConnectDiscord.module.css";
import cdimage from "../assets/images/connectdiscordpng1.webp";
import { getInfo } from "../services/apis";
import { useToast } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import { BsDiscord } from "react-icons/bs";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { FaInstagram } from "react-icons/fa6";
import i18next from "i18next";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import { getFontSizeForLanguage } from "../../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
const ConnectDiscord = () => {
    const [muid, setMuid] = useState("");
    const toast = useToast();
    const { t } = useTranslation(["ChangePassword"]);
    const fontSize = getFontSizeForLanguage(i18next.language);
    const firstFetch = useRef(true);
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

    return (
        <>
            {muid && muid.length > 0 ? (
                <div className={styles.connectDiscord}>
                    <div className={styles.connect_discord_container}>
                        <div className={styles.content}>
                            <p
                                className={styles.content_tagline}
                                style={{ fontSize }}
                            >
                                {t("Join Discord desc")}
                            </p>
                            <div className={styles.muid_and_btn}>
                                <PowerfulButton
                                    variant="secondary"
                                    onClick={() => {
                                        navigator.clipboard.writeText(muid);
                                        toast.closeAll();
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
                                    {muid}
                                </PowerfulButton>
                                <a
                                    href={
                                        import.meta.env.VITE_DISCORD_INVITE_URL
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <PowerfulButton>
                                        <BsDiscord />
                                        Connect Discord
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
                        <img className={styles.fb_image} src={cdimage} alt="" />
                    </div>

                    <div className={styles.onboarding_flow_container}>
                        <div className={styles.content}>
                            <h1>{t("Onboarding Flow")}</h1>
                            <div className={styles.onboarding_flow}>
                                <p className={styles.lines}>
                                    <div className={styles.box}>
                                        <p style={{ fontSize }}>
                                            {t(
                                                "Click the connect discord button to join our discord server and complete the registration progress"
                                            )}
                                        </p>
                                        <p
                                            className={styles.p}
                                            style={{ fontSize }}
                                        >
                                            {t(
                                                "Onboard Discord Server Accept the invitation"
                                            )}
                                        </p>
                                    </div>
                                    <div className={styles.box2}>
                                        <p style={{ fontSize }}>
                                            {t(
                                                "From the sidebar select the Aaronchettan to continue."
                                            )}
                                        </p>
                                        <p
                                            className={styles.p}
                                            style={{ fontSize }}
                                        >
                                            {t(
                                                "Select the Aaronchettan Profile"
                                            )}
                                        </p>
                                    </div>
                                    <div className={styles.box3}>
                                        <p style={{ fontSize }}>
                                            {t(
                                                "From the opened direct message,click the Connect Muid button."
                                            )}
                                        </p>
                                        <p
                                            className={styles.p}
                                            style={{ fontSize }}
                                        >
                                            {t("Connect Muid!")}
                                        </p>
                                    </div>
                                    <div className={styles.box4}>
                                        <p style={{ fontSize }}>
                                            {t(
                                                "Inside the modal that is opened enter the muid you copied and click submit."
                                            )}
                                        </p>
                                        <p
                                            className={styles.p}
                                            style={{ fontSize }}
                                        >
                                            {t("Enter Your muid")}
                                        </p>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.spinner_container}>
                    <div className={styles.spinner}>
                        <MuLoader />{" "}
                    </div>
                </div>
            )}
        </>
    );
};

export default ConnectDiscord;
