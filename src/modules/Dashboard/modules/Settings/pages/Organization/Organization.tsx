import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./Organization.module.css";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import {
    getColleges,
    getDepartments,
    getRoles,
    submitUserData
} from "../../../../../Common/Authentication/services/newOnboardingApis";
import ReactSelect, { SingleValue } from "react-select";
import { useLocation, useNavigate } from "react-router-dom";

// Define the Option type for ReactSelect
type Option = {
    value: string;
    label: string;
};

const inputObject = {
    college: "College Name",
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
        .when("role", {
            is: "student",
            then: s =>
                s
                    .required(`${inputObject.graduationYear} is Required`)
                    .min(2000, `${inputObject.graduationYear} > 2000`)
                    .max(2030, `${inputObject.graduationYear} < 2030`)
        })
});

export default function CollegePage({}: {}) {
    const navigate = useNavigate();
    const location = useLocation();
    let userData: any = location.state as Object;

    const [isloading, setIsLoading] = useState(true);
    const [colleges, setColleges] = useState([{ id: "", title: "" }]);
    const [departments, setDepartments] = useState([{ id: "", title: "" }]);
    const [roles, setRoles] = useState([{ id: "", title: "" }]);

    const [selectedCollege, setSelectedCollege] = useState<Option | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null);

    const getRoleTitle = (id: string) => {
        const slice = roles.filter(val => val.id === id);
        if (slice[0]) return slice[0].title;
    };

    const CustomFilter = (
        { label, value }: Option,
        searchString: string
    ): boolean => {
        if (value === "Others") return true;
        if (!searchString) return true;
        return label.toLowerCase().includes(searchString.toLowerCase());
    };

    useEffect(() => {
        getColleges({
            setIsLoading: setIsLoading,
            setColleges: setColleges
        });
        getDepartments({
            setIsLoading: setIsLoading,
            setDepartments: setDepartments
        });
        getRoles().then((res: any) => {
            setRoles(res);
            setIsLoading(false);
        });
    }, []);

    const onSubmit = async (values: any) => {
        const newUserData: any = {
            user: {
                full_name: userData.user.full_name,
                email: userData.user.email,
                password: userData.user.password,
                district: userData.district
            },
            organization: {
                ...(values.department !== "Others" && {
                    department: values.department
                }),
                year_of_graduation: values.graduationYear,
                organizations: [
                    ...(values.college !== "Others" ? [values.college] : []),
                    ...userData.communities
                ],
                verified: true
            }
        };

        if (userData.referral)
            newUserData["referral"] = { muid: userData.referral.muid };

        if (userData.role === "Enabler")
            delete newUserData.organization.year_of_graduation;

        console.log(newUserData);

        submitUserData({
            setIsLoading: setIsLoading,
            userData: newUserData,
            navigate: navigate
        });
    };

    return (
        <Formik
            initialValues={Object.fromEntries(
                Object.keys(inputObject).map(key => [key, ""])
            )}
            validationSchema={scheme}
            onSubmit={(value, action) => onSubmit(value)}
        >
            {formik => (
                <div className={`${styles.wrapper} ${styles.tableWrapper}`}>
                    <Form onSubmit={formik.handleSubmit}>
                        <h5 className={styles.text}>
                            Please enter your college details
                        </h5>
                        <div className={styles.inputBox}>
                            <ReactSelect
                                options={[
                                    { value: "Others", label: "Others" },
                                    ...colleges.map(college => ({
                                        value: String(college.id), // Ensure ID is string
                                        label: college.title
                                    }))
                                ]}
                                name="college"
                                placeholder="College"
                                value={selectedCollege}
                                filterOption={CustomFilter}
                                isDisabled={isloading}
                                onChange={(newValue: SingleValue<Option>) => {
                                    if (newValue) {
                                        setSelectedCollege(newValue);
                                        formik.setFieldValue("college", newValue.value);
                                    } else {
                                        setSelectedCollege(null);
                                        formik.setFieldValue("college", "");
                                    }
                                }}
                            />
                        </div>
                        {formik.touched.college && formik.errors.college && (
                            <span className={styles.errorsSpan}>
                                {formik.errors.college}
                            </span>
                        )}
                        <div className={styles.inputBox}>
                            <ReactSelect
                                options={[
                                    { value: "Others", label: "Others" },
                                    ...departments.map(department => ({
                                        value: String(department.id), // Ensure ID is string
                                        label: department.title
                                    }))
                                ]}
                                name="department"
                                placeholder="Department"
                                value={selectedDepartment}
                                isDisabled={isloading}
                                filterOption={CustomFilter}
                                onChange={(newValue: SingleValue<Option>) => {
                                    if (newValue) {
                                        setSelectedDepartment(newValue);
                                        formik.setFieldValue("department", newValue.value);
                                    } else {
                                        setSelectedDepartment(null);
                                        formik.setFieldValue("department", "");
                                    }
                                }}
                            />
                        </div>
                        {formik.touched.department &&
                            formik.errors.department && (
                                <span className={styles.errorsSpan}>
                                    {formik.errors.department}
                                </span>
                            )}
                        <div className={styles.inputBox}>
                            <SimpleInput
                                value={formik.values.graduationYear}
                                name="graduationYear"
                                type="number"
                                placeholder="Graduation Year"
                                disabled={isloading}
                            />
                            {formik.touched.graduationYear &&
                                formik.errors.graduationYear && (
                                    <span className={styles.errorsSpan}>
                                        {formik.errors.graduationYear}
                                    </span>
                                )}
                        </div>

                        <div className={styles.submit}>
                            <PowerfulButton type="submit" isLoading={isloading}>
                                {isloading ? "Please wait..." : "Submit"}
                            </PowerfulButton>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}
