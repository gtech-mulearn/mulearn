import { Field } from "formik";
import styles from "../pages/HackathonCreate.module.css";

type FormTabApplicationProps = {
    values: any;
    handleChange: any;
    formData: string;
    initialFormFields: string[] | undefined;
};

export const FormTabApplication = ({
    values,
    handleChange,
    formData
}: FormTabApplicationProps) => {
    return (
        <>
            <div id="checkbox" className={styles.InputSet}>
                <label className={styles.formLabel + " requiredLabel"}>
                    Select fields for application form
                </label>
            </div>
            <div
                role="group"
                aria-labelledby="checkbox-group"
                className={styles.checkboxOuter}
            >
                {Object.entries(formData).map(([key, value]) => (
                    <label
                        key={key}
                        className={`${styles.checkBoxContainer} ${
                            values.formFields.includes(key) // Check if it's checked
                                ? styles.checked
                                : ""
                        }`}
                    >
                        <Field
                            type="checkbox"
                            name="formFields"
                            className={styles.checkBoxContainer}
                            style={{
                                display: "none"
                            }}
                            value={key}
                            checked={values.formFields.includes(key)}
                            onChange={handleChange}
                        />
                        {key}
                    </label>
                ))}
            </div>
        </>
    );
};
