import { FormikTextInputWhite } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import styles from "../pages/HackathonCreate.module.css";

export const FormTabDates = () => {
    return (
        <>
            <FormikTextInputWhite
                label="Registration Start Date"
                name="applicationStart"
                className={styles.placeholder}
                type="date"
            />
            <FormikTextInputWhite
                label="Registration End Date"
                name="applicationEnds"
                className={styles.placeholder}
                type="date"
            />
            <FormikTextInputWhite
                label="Hackathon Start Date"
                name="eventStart"
                className={styles.placeholder}
                type="date"
            />
            <FormikTextInputWhite
                label="Hackathon End Date"
                name="eventEnd"
                className={styles.placeholder}
                type="date"
            />
        </>
    );
};
