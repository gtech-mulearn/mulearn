import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./Guild.module.css";
import { BsDiscord } from "react-icons/bs";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { cdnUrl } from "@/modules/utils/cdn";

export default function ConnectToDiscord() {
    return (
        <OnboardingTemplate>
            <div className={styles.connectDiscord}>
                <div className={styles.connect_discord_container}>
                    <div className={styles.content}>
                        <h1>Join Community using your µid</h1>
                        <p className={styles.content_tagline}>
                            To join our discord server you need to
                            connect your account with discord.
                        </p>
                        <div className={styles.muid_and_btn}>
                            <a href={import.meta.env.VITE_DISCORD_AUTH_URL} rel="noopener noreferrer">
                                <PowerfulButton>
                                    <BsDiscord />
                                    Join Community
                                </PowerfulButton>
                            </a>
                        </div>
                    </div>
                    <img
                        className={styles.fb_image}
                        src={cdnUrl("src/modules/Common/Authentication/assets/connectdiscordpng1.webp")}
                        alt="Connect Discord"
                    />
                </div>
            </div>
        </OnboardingTemplate>
    );
}