import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CompanyPage.module.css";
import { getRoles, submitUserData } from "../../../services/newOnboardingApis";

import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useEffect, useState } from "react";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { getCompanies } from "../../../services/newOnboardingApis";
import ReactSelect from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const inputObject = {
    company: "Company Name"
};

const scheme = z.object({
    company: z
        .string()
        .required(`Company Name is Required`)
        .min(3, `Company Name must be at least 3 characters`)
        .max(100, `Company Name must be at most 100 characters`),
    radio: z.string().required(`This field is Required`)
});

const CustomFilter = (
    { label, value }: { label: string; value: string },
    string: string
  ): boolean => {
      if (value === "Others") return true; // Always show "Others" option
      if (!string) return true;
      return label.toLowerCase().includes(string.toLowerCase());
  };
  

export default function CompanyPage({
    selectedRole
}: {
    selectedRole: string;
}) {
    const navigate = useNavigate();
    const toast = useToast();
    const location = useLocation();
    let userData = location.state;

    const [isloading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([{ id: "", title: "" }]);
    const [roles, setRoles] = useState([{ id: "", title: "" }]);

    useEffect(() => {
        if (
            userData === undefined ||
            userData === null ||
            userData.user.email === undefined
        ) {
            navigate("/register", { replace: true });
        } else {
            getCompanies({
                setIsLoading: setIsLoading,
                setCompanies: setCompanies
            });
            getRoles({
                setIsLoading: setIsLoading,
                setRoles: setRoles
            });
        }
    }, []);

    const [selectedCompany, setSelectedCompany] = useState({
        id: "",
        title: ""
    });

    const onSubmit = async (values: any) => {
        // Remove "Others" company from organizations array if it exists
        const organizations = values.company === "Others"
            ? userData.communities
            : [values.company, ...userData.communities];

        const newUserData: any = {
            user: {
                first_name: userData.user.first_name,
                last_name: userData.user.last_name,
                mobile: userData.user.mobile,
                email: userData.user.email,
                password: userData.user.password
            },
            organization: {
                year_of_graduation: values.graduationYear,
                organizations: organizations,
                verified: true
            }
        };

        if (userData.referral_id)
            newUserData["referral"] = { muid: userData.referral_id };
        if (userData.param) {
            newUserData["integration"] = userData.integration;
        }

        if (userData.referral)
            newUserData["referral"] = { muid: userData.referral.muid };

        /// If user doesn't want to be a mentor set role to null
        if (values.radio === "yes") {
            if (selectedRole === "") {
                const mentorRole = roles.find(role => role.title === "Mentor");
                newUserData.user["role"] = mentorRole?.id;
            } else {
                newUserData.user["role"] = selectedRole;
            }
        }

        if (userData.gender) {
            newUserData.user["gender"] = userData.gender;
        }

        if (userData.dob) {
            newUserData.user["dob"] = userData.dob;
        }

        submitUserData({
            setIsLoading: setIsLoading,
            userData: newUserData,
            toast: toast,
            navigate: navigate
        });
    };

    return (
        <Formik
            initialValues={{
                ...Object.fromEntries(
                    Object.keys(inputObject).map(key => [key, ""])
                ),
                radio: ""
            }}
            validationSchema={scheme}
            onSubmit={onSubmit}
        >
            {formik => (
                <div>
                    <div className={styles.wrapper}>
                        <Form onSubmit={formik.handleSubmit}>
                            <h5 className={styles.text}>
                                Please enter your company details
                                <span className={styles.errorsSpan}> *</span>
                            </h5>
                            <ReactSelect
                                options={
                                    [
                                        {
                                            value: "Others",
                                            label: "Others"
                                        },
                                        ...companies.map(company => ({
                                            value: company.id,
                                            label: company.title
                                        })) as any
                                    ] as any
                                }
                                name="company"
                                placeholder="Company Name"
                                value={selectedCompany.title}
                                isDisabled={isloading}
                                filterOption={CustomFilter}
                                onChange={(e: any) => {
                                    if (e) {
                                        setSelectedCompany(e);
                                        formik.setFieldValue(
                                            "company",
                                            e.value
                                        );
                                        inputObject.company = e.value;
                                    }
                                }}
                                required
                            />
                            {formik.touched[
                                "company" as keyof typeof formik.touched
                            ] &&
                                formik.errors[
                                "company" as keyof typeof formik.touched
                                ] && (
                                    <span className={styles.errorsSpan}>
                                        {
                                            formik.errors[
                                            "company" as keyof typeof formik.touched
                                            ]
                                        }
                                    </span>
                                )}
                            <div className={styles.content}>
                                <h5 className={styles.text}>
                                    Do you want to become a mentor?
                                    <span className={styles.errorsSpan}>
                                        {" "}
                                        *
                                    </span>
                                </h5>
                                {formik.touched.radio &&
                                    formik.errors.radio && (
                                        <span className={styles.errorsSpan}>
                                            {formik.errors.radio}
                                        </span>
                                    )}
                                <div className={styles.select}>
                                    <button
                                        type="button"
                                        className={styles.selectRadio}
                                    >
                                        <label>
                                            <input
                                                onChange={e => {
                                                    formik.setFieldValue(
                                                        "radio",
                                                        e.target.value
                                                    );
                                                }}
                                                type="radio"
                                                value="yes"
                                                name="radio"
                                                disabled={isloading}
                                            />
                                            <span>Yes</span>
                                        </label>
                                    </button>

                                    <button
                                        type="button"
                                        className={styles.selectRadio}
                                    >
                                        <label>
                                            <input
                                                onChange={e => {
                                                    formik.setFieldValue(
                                                        "radio",
                                                        e.target.value
                                                    );
                                                }}
                                                type="radio"
                                                value="no"
                                                name="radio"
                                            />
                                            <span>No</span>
                                        </label>
                                    </button>
                                </div>
                            </div>

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
