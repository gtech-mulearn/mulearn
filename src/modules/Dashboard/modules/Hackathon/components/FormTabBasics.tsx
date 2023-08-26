import { TabPanel } from "react-tabs";

import {
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "@/MuLearnComponents/FormikComponents/FormikComponents";

import styles from "../pages/HackathonCreate.module.css";

export const FormTabBasics = () => {
    return (
        <>
            <div className={styles.formGroupInitial}>
                <FormikTextInputWhite
                    label="Name"
                    name="title"
                    type="text"
                    className={styles.placeholder}
                    placeholder="what you are calling your hackathon"
                />
                <FormikTextInputWhite
                    label="Tagline"
                    name="tagline"
                    type="text"
                    className={styles.placeholder}
                    placeholder="eg: worlds realest hackathon"
                />
                <FormikTextInputWhite
                    label="Approx. Participants"
                    name="participantCount"
                    type="number"
                    className={styles.placeholder}
                    placeholder="eg: 250."
                />
            </div>
            <FormikTextAreaWhite
                label="About"
                name="description"
                className={styles.hackTectArea}
                placeholder="explain something"
            />
        </>
    );
};
