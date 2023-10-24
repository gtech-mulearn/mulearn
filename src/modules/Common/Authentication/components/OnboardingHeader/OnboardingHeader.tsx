import mu from '/src/modules/Common/Authentication/assets/µLearn.png'
import styles from './OnboardingHeader.module.css'
import { motion } from 'framer-motion';
import { slideUpFunc } from '@/AnimatedComponents/slider';

type OnboardingHeaderProps = {
    title: string;
    desc: string;
};

export default function OnboardingHeader({
    title,
    desc
}: OnboardingHeaderProps) {
    return (
        <motion.div {...slideUpFunc(.3)} className={styles.onboardingHeader}>
            <img src={mu} alt="" />
            <h1>{title}</h1>
            <p className={styles.tagline} dangerouslySetInnerHTML={{ __html: desc }} />
            <br />
        </motion.div>
    );
}
