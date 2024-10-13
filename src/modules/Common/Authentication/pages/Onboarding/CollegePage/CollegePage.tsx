import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./CollegePage.module.css";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import {
    getColleges,
    getCompanies,
    getDepartments
} from "../../../services/newOnboardingApis";
import ReactSelect from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { Switch } from "@chakra-ui/react";
import { selectOrganization } from "../../../services/onboardingApis";

const inputObject = {
    organization: "Organization",
    department: "Department",
    graduationYear: "Graduation Year"
};

const scheme = z.object({
    organization: z
        .string()
        .required(`${inputObject.organization} is Required`)
        .min(3, `${inputObject.organization} must be at least 3 characters`)
        .max(100, `${inputObject.organization} must be at most 100 characters`),
    department: z
        .string()
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

export default function CollegePage() {
    const navigate = useNavigate();
    const [isloading, setIsLoading] = useState(true);
    const [colleges, setColleges] = useState([{ id: "", title: "" }]);
    const [departments, setDepartments] = useState([{ id: "", title: "" }]);
    const [isCollege, setIsCollege] = useState(true);
    const [companies, setCompanies] = useState([{ id: "", title: "" }]);
    const [selectedOrganization, setSelectedOrganization] = useState({
        id: "",
        title: ""
    });
    const [selectedDepartment, setSelectedDepartment] = useState({
        id: "",
        title: ""
    });

    const ruri = window.location.href.split("=")[1];

    const CustomFilter = (
        { label, value }: { label: string; value: string },
        string: string
    ): boolean => {
        if (value === "Others") return true; // Always show "Others" option
        if (!string) return true;
        return label.toLowerCase().includes(string.toLowerCase());
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
        getCompanies({
            setIsLoading: setIsLoading,
            setCompanies: setCompanies
        });
    }, []);
    const onSubmit = async (values: any) => {
        selectOrganization({
            setIsLoading: setIsLoading,
            userData: {
                organization:
                    values.organization == "Others"
                        ? null
                        : values.organization,
                department:
                    values.department == "Others" ? null : values.department,
                graduation_year:
                    values.graduationYear == null || values.graduationYear != ""
                        ? values.graduationYear
                        : null,
                is_student: isCollege
            }
        }).then(res => {
            if (res) {
                if (ruri) {
                    navigate(`/${ruri}`);
                } else {
                    navigate("/dashboard/connect-discord");
                }
            }
        });
    };
    // console.log(userData);
    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title="Organization Details"
                desc="Please Select your organization details"
            />
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
                                    Please enter your organization details
                                </h5>
                                <div className={styles.input_field}>
                                    Not a college ?{" "}
                                    <Switch
                                        checked={isCollege}
                                        onChange={e => {
                                            setIsCollege(!isCollege);
                                        }}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <ReactSelect
                                        options={
                                            [
                                                {
                                                    value: "Others",
                                                    label: "Others"
                                                },
                                                ...(isCollege
                                                    ? colleges.map(college => ({
                                                          value: college.id,
                                                          label: college.title
                                                      }))
                                                    : companies.map(
                                                          company => ({
                                                              value: company.id,
                                                              label: company.title
                                                          })
                                                      ))
                                            ] as any
                                        }
                                        name="organization"
                                        placeholder={
                                            isCollege
                                                ? "College"
                                                : "Organization"
                                        }
                                        value={selectedOrganization.title}
                                        filterOption={CustomFilter}
                                        isDisabled={isloading}
                                        onChange={(e: any) => {
                                            setSelectedOrganization(e);
                                            formik.setFieldValue(
                                                "organization",
                                                e.value
                                            );
                                            inputObject.organization = e.value;
                                        }}
                                    />
                                </div>
                                {formik.touched.college &&
                                    formik.errors.college && (
                                        <span className={styles.errorsSpan}>
                                            {formik.errors.college}
                                        </span>
                                    )}
                                {isCollege ? (
                                    <>
                                        <div className={styles.inputBox}>
                                            <ReactSelect
                                                options={
                                                    [
                                                        {
                                                            value: "Others",
                                                            label: "Others"
                                                        },
                                                        ...departments.map(
                                                            department => ({
                                                                value: department.id,
                                                                label: department.title
                                                            })
                                                        )
                                                    ] as any
                                                }
                                                name="department"
                                                className={styles.inputBox}
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
                                                    inputObject.department =
                                                        e.value;
                                                }}
                                            />
                                        </div>
                                        {formik.touched.department &&
                                            formik.errors.department && (
                                                <span
                                                    className={
                                                        styles.errorsSpan
                                                    }
                                                >
                                                    {formik.errors.department}
                                                </span>
                                            )}
                                        <div className={styles.inputBox}>
                                            <SimpleInput
                                                value={
                                                    formik.values.graduationYear
                                                }
                                                name="graduationYear"
                                                type="number"
                                                placeholder="Graduation Year"
                                                disabled={isloading}
                                            />
                                            {formik.touched.graduationYear &&
                                                formik.errors
                                                    .graduationYear && (
                                                    <span
                                                        className={
                                                            styles.errorsSpan
                                                        }
                                                    >
                                                        {
                                                            formik.errors
                                                                .graduationYear
                                                        }
                                                    </span>
                                                )}
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}

                                <div className={styles.submit}>
                                    <PowerfulButton
                                        style={{ color: "var(--blue)" }}
                                        variant="outline"
                                        onClick={e => {
                                            e.preventDefault();
                                            if (ruri) {
                                                navigate(`/${ruri}`);
                                            } else {
                                                navigate(
                                                    "/dashboard/connect-discord"
                                                );
                                            }
                                        }}
                                    >
                                        Skip
                                    </PowerfulButton>
                                    <PowerfulButton
                                        type="submit"
                                        isLoading={isloading}
                                    >
                                        {isloading
                                            ? "Please wait..."
                                            : "Submit"}
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
