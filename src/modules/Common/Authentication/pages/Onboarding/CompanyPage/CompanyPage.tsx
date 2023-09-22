import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CompanyPage.module.css";

import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

const inputObject = {
    companyName: "Company Name"
};

const scheme = z.object({
    companyName: z
        .string()
        .required(`Company Name is Required`)
        .min(3, `Company Name must be at least 3 characters`)
        .max(100, `Company Name must be at most 100 characters`),
    radio: z
        .string()
        .required(`Radio is Required`)
        .min(2, `Radio must be at least 2 characters`)
        .max(3, `Radio must be at most 3 characters`)
});

export default function CompanyPage() {
    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your company"}
            />

            <Formik
                initialValues={{
                    ...Object.fromEntries(
                        Object.keys(inputObject).map(key => [key, ""])
                    ),
                    radio: ""
                }}
                validationSchema={scheme}
                onSubmit={(value, action) => console.log(value)} // TODO: Add API call etc stuffs here
            >
                {formik => (
                    <div>
                        <div className={styles.wrapper}>
                            <Form onSubmit={formik.handleSubmit}>
                                <h5 className={styles.text}>
                                    Please enter your company details
                                </h5>

                                {Object.entries(inputObject).map(
                                    ([key, value]) => (
                                        <div
                                            className={styles.inputBox}
                                            key={key}
                                        >
                                            <SimpleInput
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values[
                                                        key as keyof typeof inputObject &
                                                            "radio"
                                                    ]
                                                }
                                                name={key}
                                                placeholder={value}
                                            />
                                        </div>
                                    )
                                )}

                                <div className={styles.content}>
                                    <h5 className={styles.text}>
                                        Do you want to become a mentor?
                                    </h5>
                                    {formik.touched.radio &&
                                        formik.errors.radio && (
                                            <span>{formik.errors.radio}</span>
                                        )}
                                    <div className={styles.select}>
                                        <button className={styles.selectRadio}>
                                            <label>
                                                <input
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    type="radio"
                                                    value="Yes"
                                                    name="radio"
                                                />
                                                <span>Yes</span>
                                            </label>
                                        </button>
                                        <button className={styles.selectRadio}>
                                            <label>
                                                <input
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    type="radio"
                                                    value="NO"
                                                    name="radio"
                                                />
                                                <span>No</span>
                                            </label>
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.submit}>
                                    <PowerfulButton type="submit">
                                        Submit
                                    </PowerfulButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </OnboardingTemplate>
    );
}
