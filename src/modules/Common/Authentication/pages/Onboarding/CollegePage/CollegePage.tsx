import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CollegePage.module.css";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";

const inputObject = {
    collageName: "Collage Name",
    department: "Department",
    graduationYear: "Graduation Year",
}

const scheme = z.object({
    collageName: z.string().required(`${inputObject.collageName} is Required`).min(3, `${inputObject.collageName} must be at least 3 characters`).max(100, `${inputObject.collageName} must be at most 100 characters`),
    department: z.string().required(`${inputObject.department} is Required`).min(2, `${inputObject.department} must be at least 2 characters`).max(100, `${inputObject.department} must be at most 100 characters`),
    graduationYear: z.number().integer().positive().required(`${inputObject.graduationYear} is Required`).min(2000, `${inputObject.graduationYear} > 2000`).max(2030, `${inputObject.graduationYear} < 2030`),
})


export default function CollegePage() {
    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your college"}
            />
            <Formik initialValues={
                Object.fromEntries(Object.keys(inputObject).map(key => [key, ""]))
                }
                validationSchema={scheme}
                onSubmit={(value, action)=> console.log(value)} // TODO: Add API call etc stuffs here
            >
            {formik => (

                <div>
                <div className={styles.wrapper}>
                    <Form onSubmit={formik.handleSubmit}>
                        <h5 className={styles.text}>
                            Please enter your collage details
                        </h5>

                        {Object.entries(inputObject).map(([key, value]) =>

                            <div className={styles.inputBox} key={key}>
                            <SimpleInput
                                onChange={formik.handleChange}
                                value={formik.values[key as keyof typeof inputObject]}
                                name={key}
                                placeholder={value}
                            />
                            </div>

                        )}

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
