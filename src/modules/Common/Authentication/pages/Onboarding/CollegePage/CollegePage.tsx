import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./CollegePage.module.css";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import {
    getColleges,
    getDepartments,
    getRoles,
    submitUserData
} from "../../../services/newOnboardingApis";
import ReactSelect from "react-select";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function CollegePage({
    selectedRole
}: {
    selectedRole: string;
}) {
    const navigate = useNavigate();

    const location = useLocation();
    let userData: any = location.state as Object;

    const [isloading, setIsLoading] = useState(true);
    const [colleges, setColleges] = useState([{ id: "", title: "" }]);
    const [departments, setDepartments] = useState([{ id: "", title: "" }]);
    const [roles, setRoles] = useState([{ id: "", title: "" }]);

    const [selectedCollege, setSelectedCollege] = useState({
        id: "",
        title: ""
    });
    const [selectedDepartment, setSelectedDepartment] = useState({
        id: "",
        title: ""
    });

    const getRoleTitle = (id: string) => {
        const slice = roles.filter(val => val.id === id);
        if (slice[0]) return slice[0].title;
    };

    const CustomFilter = (
        { label, value }: { label: string; value: string },
        string: string
    ): boolean => {
        if (value === "Others") return true; // Always show "Others" option
        if (!string) return true;
        return label.toLowerCase().includes(string.toLowerCase());
    };

    useEffect(() => {
        if (userData === undefined || userData === null) {
            navigate("/register", { replace: true });
        } else {
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
        }
    }, []);

    // useEffect(() => {
    //     setSelectedRole(
    //         roles.find((role: any) => role.id === userData.role)?.title || ""
    //     );
    // }, [userData, roles]);
    const onSubmit = async (values: any) => {
        const newUserData: any = {
            user: {
                full_name: userData.user.full_name,
                // mobile: userData.user.mobile,
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

        if (selectedRole) newUserData.user["role"] = selectedRole;

        if (userData.referral)
            newUserData["referral"] = { muid: userData.referral.muid };

        if (userData.param) {
            newUserData["integration"] = userData.integration;
        }

        if (userData.role === "Enabler")
            delete newUserData.organization.year_of_graduation;

        if (userData.gender) {
            newUserData.user["gender"] = userData.gender;
        }

        if (userData.dob) {
            newUserData.user["dob"] = userData.dob;
        }
        console.log(newUserData);

        submitUserData({
            setIsLoading: setIsLoading,
            userData: newUserData,
            navigate: navigate
        });
    };
    // console.log(userData);
    return (
        <Formik
            initialValues={Object.fromEntries(
                Object.keys(inputObject).map(key => [key, ""])
            )}
            validationSchema={scheme}
            onSubmit={(value, action) => onSubmit(value)}
        >
            {formik => (
                <div>
                    <div className={styles.wrapper}>
                        <Form onSubmit={formik.handleSubmit}>
                            <h5 className={styles.text}>
                                Please enter your college details
                            </h5>
                            <div className={styles.inputBox}>
                                <ReactSelect
                                    options={
                                        [
                                            {
                                                value: "Others",
                                                label: "Others"
                                            },
                                            ...colleges.map(college => ({
                                                value: college.id,
                                                label: college.title
                                            }))
                                        ] as any
                                    }
                                    name="college"
                                    placeholder="College"
                                    value={selectedCollege.title}
                                    filterOption={CustomFilter}
                                    isDisabled={isloading}
                                    onChange={(e: any) => {
                                        setSelectedCollege(e);
                                        formik.setFieldValue(
                                            "college",
                                            e.value
                                        );
                                        inputObject.college = e.value;
                                    }}
                                />
                            </div>
                            {formik.touched.college &&
                                formik.errors.college && (
                                    <span className={styles.errorsSpan}>
                                        {formik.errors.college}
                                    </span>
                                )}
                            <div className={styles.inputBox}>
                                <ReactSelect
                                    options={
                                        [
                                            {
                                                value: "Others",
                                                label: "Others"
                                            },
                                            ...departments.map(department => ({
                                                value: department.id,
                                                label: department.title
                                            }))
                                        ] as any
                                    }
                                    name="department"
                                    placeholder="Department"
                                    value={selectedDepartment.title}
                                    isDisabled={isloading}
                                    filterOption={CustomFilter}
                                    onChange={(e: any) => {
                                        setSelectedDepartment(e);
                                        formik.setFieldValue(
                                            "department",
                                            e.value
                                        );
                                        inputObject.department = e.value;
                                    }}
                                />
                            </div>
                            {formik.touched.department &&
                                formik.errors.department && (
                                    <span className={styles.errorsSpan}>
                                        {formik.errors.department}
                                    </span>
                                )}
                            {getRoleTitle(selectedRole) === "Student" && (
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
                            )}

                            <div className={styles.submit}>
                                <PowerfulButton
                                    type="submit"
                                    isLoading={isloading}
                                >
                                    {isloading ? "Please wait..." : "Submit"}
                                </PowerfulButton>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}
