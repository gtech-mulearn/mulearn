import mu from '/src/modules/Common/Authentication/assets/µLearn.png'
import Styles from './OnboardingHeader.module.css'

type OnboardingHeaderProps = {
    title: string;
    desc: string;
};

export default function OnboardingHeader({
    title,
    desc
}: OnboardingHeaderProps) {
    return (
        <div className={Styles.onboardingHeader}>
            <img src={mu} alt="" />
            <h1>{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
    );
}
