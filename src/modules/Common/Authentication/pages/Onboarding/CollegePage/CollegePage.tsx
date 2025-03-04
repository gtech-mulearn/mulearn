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
import {
    createNewOrganization,
    selectOrganization
} from "../../../services/onboardingApis";

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
    const [companies, setCompanies] = useState<{ id: string; title: string }[]>(
        []
    );
    const [selectedOrganization, setSelectedOrganization] = useState({
        id: "",
        title: ""
    });
    const [selectedDepartment, setSelectedDepartment] = useState({
        id: "",
        title: ""
    });
    const [selectedOrgType, setSelectedOrgType] = useState<string | null>(null);
    const [organizationInput, setOrganizationInput] = useState("");
    const [createOrganizationTitle, setCreateOrganizationTitle] = useState<
        string | null
    >(null);
    const college_types = ["School", "College"];
    let ruri = window.location.href.split("=")[1];
    
    if (ruri === "noredirect") {
        ruri = "dashboard/home";
    }
    const CustomFilter = (
        { label, value }: { label: string; value: string },
        string: string
    ): boolean => {
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
    }, []);
    useEffect(() => {
        if (!isCollege && companies.length < 1) {
            getCompanies({
                setIsLoading: setIsLoading,
                setCompanies: setCompanies
            });
        }
    }, [isCollege]);
    const onSubmit = async (values: any) => {
        if (createOrganizationTitle) {
            createNewOrganization({
                setIsLoading: setIsLoading,
                org_data: {
                    department:
                        values.department == "Others"
                            ? null
                            : values.department,
                    graduation_year:
                        values.graduationYear == null ||
                        values.graduationYear != ""
                            ? values.graduationYear
                            : null,
                    title: createOrganizationTitle,
                    org_type: isCollege
                        ? selectedOrgType == null ||
                          selectedOrgType == "" ||
                          selectedOrgType == "Others"
                            ? null
                            : selectedOrgType
                        : "Company"
                }
            }).then(res => {
                if (res) {
                    if (ruri) {
                        navigate(`/${ruri}`);
                    } else {
                        navigate("/dashboard/home");
                    }
                }
            });
            return;
        }
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
                    navigate(`${ruri}`);
                } else {
                    navigate("/dashboard/home");
                }
            }
        });
    };
    const getOptions = () => {
        var orgs = isCollege ? colleges : companies;
        var options: any[] = [];
        orgs.forEach(org => {
            options.push({ value: org.id, label: org.title });
        });
        if (
            organizationInput &&
            !options.some(opt => opt.label === organizationInput)
        ) {
            options.push({
                value: organizationInput,
                label: `Create "${organizationInput}"`
            });
        }
        return options;
    };
    const onOrgSelectChange = (e: any, formik: any) => {
        if (
            (isCollege ? colleges : companies).filter(val => val.id == e.value)
                .length < 1
        ) {
            setCreateOrganizationTitle(e.value);
            formik.setFieldValue("organization", e.value);
            return;
        }
        setCreateOrganizationTitle(null);
        setSelectedOrganization(e);
        formik.setFieldValue("organization", e.value);
        inputObject.organization = e.value;
    };
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
                                    Not a student ?{" "}
                                    <Switch
                                        checked={isCollege}
                                        onChange={e => {
                                            setIsCollege(!isCollege);
                                        }}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <ReactSelect
                                        onInputChange={e => {
                                            setOrganizationInput(e);
                                        }}
                                        options={getOptions()}
                                        name="organization"
                                        placeholder={
                                            isCollege
                                                ? "College"
                                                : "Organization"
                                        }
                                        filterOption={CustomFilter}
                                        isDisabled={isloading}
                                        onChange={(e: any) => {
                                            onOrgSelectChange(e, formik);
                                        }}
                                    />
                                </div>
                                {formik.touched.college &&
                                    formik.errors.college && (
                                        <span className={styles.errorsSpan}>
                                            {formik.errors.college}
                                        </span>
                                    )}
                                {isCollege && createOrganizationTitle ? (
                                    <ReactSelect
                                        options={
                                            [
                                                ...college_types.map(type => ({
                                                    value: type,
                                                    label: type
                                                }))
                                            ] as any
                                        }
                                        name="org_type"
                                        className={styles.inputBox}
                                        placeholder="Institute Type"
                                        isDisabled={isloading}
                                        filterOption={CustomFilter}
                                        onChange={(e: any) => {
                                            setSelectedOrgType(e.value);
                                        }}
                                        required
                                    />
                                ) : null}
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
                                        className={styles.skipButton}
                                        variant="outline"
                                        onClick={e => {
                                            e.preventDefault();
                                            if (ruri) {
                                                navigate(`/${ruri}`);
                                            } else {
                                                navigate(
                                                    "/dashboard/home"
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
