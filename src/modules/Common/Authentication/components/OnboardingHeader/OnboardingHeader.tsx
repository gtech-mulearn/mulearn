import mu from "/src/modules/Common/Authentication/assets/µLearn.png";
import styles from "./OnboardingHeader.module.css";
import { cdnUrl } from "@/modules/utils/cdn";


type OnboardingHeaderProps = {
    title: string;
    desc: string;
};

export default function OnboardingHeader({
    title,
    desc
}: OnboardingHeaderProps) {
    return (
        <div className={styles.onboardingHeader}>
            <img src={cdnUrl('/src/modules/Common/Authentication/assets/µLearn.png')} alt="" />
            <h1>{title}</h1>
            <p
                className={styles.tagline}
                dangerouslySetInnerHTML={{ __html: desc }}
            />
            <br />
        </div>
    );
}
