import { FormikTextInputWhite } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import styles from "../pages/HackathonCreate.module.css";

export const FormTabDates = () => {
    return (
        <>
            <FormikTextInputWhite
                label={<span className="requiredLabel">Registration Start Date</span>}
                name="applicationStart"
                className={styles.placeholder}
                type="date"
            />
            <FormikTextInputWhite
                label={<span className="requiredLabel">Registration End Date</span>}
                name="applicationEnds"
                className={styles.placeholder}
                type="date"
            />
            <FormikTextInputWhite
                label={<span className="requiredLabel">Hackathon Start Date</span>}
                name="eventStart"
                className={styles.placeholder}
                type="date"
            />
            <FormikTextInputWhite
                label={<span className="requiredLabel">Hackathon End Date</span>}
                name="eventEnd"
                className={styles.placeholder}
                type="date"
            />
        </>
    );
};
