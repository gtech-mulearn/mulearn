import {
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import styles from "../pages/HackathonCreate.module.css";
import {motion} from "framer-motion"
import { slideLeft } from "@/AnimatedComponents/slider";

export const FormTabBasics = () => {
    return (
        <motion.div {...slideLeft}>
            <div className={styles.formGroupInitial}>
                <FormikTextInputWhite
                    label={<span className="requiredLabel">Name</span>}
                    name="title"
                    type="text"
                    className={styles.placeholder}
                    placeholder="what you are calling your hackathon"
                />
                <FormikTextInputWhite
                    label={<span className="requiredLabel">Tagline</span>}
                    name="tagline"
                    type="text"
                    className={styles.placeholder}
                    placeholder="eg: worlds realest hackathon"
                    />
                <FormikTextInputWhite
                    label={<span className="requiredLabel">Approx. Participants</span>}
                    name="participantCount"
                    type="number"
                    className={styles.placeholder}
                    placeholder="eg: 250."
                    />
            </div>
            <FormikTextAreaWhite
                label={<span className="requiredLabel">About</span>}
                name="description"
                className={styles.hackTectArea}
                placeholder="explain something"
            />
        </motion.div>
    );
};
