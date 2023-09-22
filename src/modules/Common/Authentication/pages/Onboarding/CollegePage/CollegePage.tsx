import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CollegePage.module.css";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import {
    getColleges,
    getDepartments
} from "../../../services/newOnboardingApis";
import ReactSelect from "react-select";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

const inputObject = {
    college: "Collage Name",
    department: "Department",
    graduationYear: "Graduation Year"
};

const scheme = z.object({
    college: z
        .string()
        .required(`${inputObject.college} is Required`)
        .min(3, `${inputObject.college} must be at least 3 characters`)
        .max(100, `${inputObject.college} must be at most 100 characters`),
    department: z
        .string()
        .required(`${inputObject.department} is Required`)
        .min(2, `${inputObject.department} must be at least 2 characters`)
        .max(100, `${inputObject.department} must be at most 100 characters`),
    graduationYear: z
        .number()
        .integer()
        .positive()
        .required(`${inputObject.graduationYear} is Required`)
        .min(2000, `${inputObject.graduationYear} > 2000`)
        .max(2030, `${inputObject.graduationYear} < 2030`)
});

export default function CollegePage() {
    const [isloading, setIsLoading] = useState(true);
    const [colleges, setColleges] = useState([{ id: "", title: "" }]);
    const [departments, setDepartments] = useState([{ id: "", title: "" }]);

    const [selectedCollege, setSelectedCollege] = useState({
        id: "",
        title: ""
    });
    const [selectedDepartment, setSelectedDepartment] = useState({
        id: "",
        title: ""
    });

    useEffect(() => {
        getColleges({
            setIsLoading: setIsLoading,
            setColleges: setColleges
        });
        getDepartments({
            setIsLoading: setIsLoading,
            setDepartments: setDepartments
        });
    }, []);

    // const setUserCollege = ()

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your college"}
            />
            {isloading ? (
                <MuLoader />
            ) : (
                <Formik
                    initialValues={Object.fromEntries(
                        Object.keys(inputObject).map(key => [key, ""])
                    )}
                    validationSchema={scheme}
                    onSubmit={(value, action) => console.log(value)} // TODO: Add API call etc stuffs here
                >
                    {formik => (
                        <div>
                            <div className={styles.wrapper}>
                                <Form onSubmit={formik.handleSubmit}>
                                    <h5 className={styles.text}>
                                        Please enter your collage details
                                    </h5>
                                    <div className={styles.inputBox}>
                                        <ReactSelect
                                            options={
                                                colleges.map(college => ({
                                                    value: college.id,
                                                    label: college.title
                                                })) as any
                                            }
                                            name="college"
                                            placeholder="College"
                                            value={selectedCollege.title}
                                            onChange={e => {
                                                setSelectedCollege(e);
                                                formik.setFieldValue(
                                                    "college",
                                                    e.value
                                                );
                                                inputObject.college = e.label;
                                            }}
                                        />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <ReactSelect
                                            options={
                                                departments.map(department => ({
                                                    value: department.id,
                                                    label: department.title
                                                })) as any
                                            }
                                            name="department"
                                            placeholder="Department"
                                            value={selectedDepartment.title}
                                            onChange={e => {
                                                setSelectedDepartment(e);
                                                formik.setFieldValue(
                                                    "department",
                                                    e.value
                                                );
                                                inputObject.department =
                                                    e.label;
                                            }}
                                        />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            value={formik.values.graduationYear}
                                            name="graduationYear"
                                            type="number"
                                            placeholder="Graduation Year"
                                        />
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
            )}
        </OnboardingTemplate>
    );
}
