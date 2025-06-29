import styles from "./OnboardingHeader.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

type OnboardingHeaderProps = {
    title: string;
    desc: string;
};

const OnboardingHeader = ({ title, desc }: OnboardingHeaderProps) => {
    return (
        <div className={styles.onboardingHeader}>
            <img src={cdnUrl("public/assets/µLearn.png")} alt="µLearn Logo" className={styles.logo} />
                <h1>{title}</h1>
                <p 
                className={styles.tagline}
                dangerouslySetInnerHTML={{ __html: desc }}
                > </p>
        
            <br />        
            </div>
    );
};

export default OnboardingHeader;
