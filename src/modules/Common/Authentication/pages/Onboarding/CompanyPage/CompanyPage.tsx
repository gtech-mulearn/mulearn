import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CompanyPage.module.css";
import {
    getInterestGroups,
    getRoles,
    submitUserData
} from "../../../services/newOnboardingApis";

import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useEffect, useState } from "react";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { getCompanies } from "../../../services/newOnboardingApis";
import ReactSelect from "react-select";
import { useLocation, useNavigate } from "react-router-dom";

type InterestGroup = {
    id: string;
    name: string;
};

const inputObject = {
    company: "Company Name",
    aois: "Area of interest",
    about: "Tell us about yourself"
};

const scheme = z.object({
    company: z
        .string()
        .required(`Company Name is Required`)
        .min(3, `Company Name must be at least 3 characters`)
        .max(100, `Company Name must be at most 100 characters`),
    radio: z.string().required(`This field is Required`),
    hours: z.string().required(`This field is Required`),
    reason: z.string().required(`This field is Required`),
    aois: z.string().required(`This field is Required`),
    about: z.string().required(`This field is Required`)
});

const CustomFilter = (
    { label, value }: { label: string; value: string },
    string: string
): boolean => {
    if (value === "Others") return true; // Always show "Others" option
    if (!string) return true;
    return label.toLowerCase().startsWith(string.toLowerCase());
};
// const renderErrorSpan = (formik: any, fieldName: string) => {
//     return (
//         formik.touched[fieldName as keyof typeof formik.touched] &&
//         formik.errors[fieldName as keyof typeof formik.touched] && (
//             <span className={styles.errorsSpan}>
//                 {formik.errors[fieldName as keyof typeof formik.touched]}
//             </span>
//         )
//     );
// };
export default function CompanyPage({
    selectedRole
}: {
    selectedRole: string;
}) {
    const navigate = useNavigate();

    const location = useLocation();
    let userData = location.state;

    const [isloading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([{ id: "", title: "" }]);
    const [roles, setRoles] = useState([{ id: "", title: "" }]);
    const [interestGroups, setInterestGroups] = useState([] as InterestGroup[]);

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
            getRoles().then((res: any) => {
                setRoles(res);
                setIsLoading(false);
            });
            getInterestGroups().then((res: any) => {
                setInterestGroups(res);
                setIsLoading(false);
            });
        }
    }, []);

    const [selectedCompany, setSelectedCompany] = useState({
        id: "",
        title: ""
    });
    const [selectedAois, setSelectedAois] = useState([]);

    const onSubmit = async (values: any) => {
        // Remove "Others" company from organizations array if it exists
        const organizations =
            values.company === "Others"
                ? userData.communities
                : [values.company, ...userData.communities];

        const newUserData: any = {
            user: {
                full_name: userData.user.full_name,
                email: userData.user.email,
                password: userData.user.password,
                area_of_interest: values.aois
            },
            organization: {
                year_of_graduation: values.graduationYear,
                organizations: organizations,
                verified: true
            },
            mentor: {
                reason: values.reason,
                hours: values.hours,
                about: values.about
            }
        };

        if (userData.referral_id)
            newUserData["referral"] = { muid: userData.referral_id };
        if (userData.param) {
            newUserData["integration"] = userData.integration;
        }

        if (userData.referral)
            newUserData["referral"] = { muid: userData.referral.muid };

        if (userData.role) {
            newUserData.user["role"] = userData.role;
        }

        if (userData.gender) {
            newUserData.user["gender"] = userData.gender;
        }

        if (userData.dob) {
            newUserData.user["dob"] = userData.dob;
        }

        // console.log(newUserData);
        submitUserData({
            setIsLoading: setIsLoading,
            userData: newUserData,
            navigate: navigate
        });
    };

    return (
        <Formik
            initialValues={{
                ...Object.fromEntries(
                    Object.keys(inputObject).map(key => [key, ""])
                ),
                radio: "",
                hours: "",
                reason: "",
                aois: "",
                about: ""
            }}
            validationSchema={scheme}
            onSubmit={onSubmit}
        >
            {formik => (
                <div>
                    <div className={styles.wrapper}>
                        <Form onSubmit={formik.handleSubmit}>
                            {/* <h5 className={styles.text}>
                                Please enter your company details
                                <span className={styles.errorsSpan}> *</span>
                            </h5> */}

                            {/* <h5 className={styles.text}>
                                Hour contribute weekly?
                                <span className={styles.errorsSpan}> *</span>
                            </h5> */}
                            <div className={styles.inputBox}>
                                <SimpleInput
                                    value={formik.values.hours}
                                    name="hours"
                                    type="number"
                                    onChange={formik.handleChange}
                                    placeholder="Hour contribute weekly?"
                                    required
                                    disabled={isloading}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <SimpleInput
                                    name={"reason"}
                                    type="text"
                                    value={formik.values.reason}
                                    onChange={formik.handleChange}
                                    placeholder="Why should I be a mentor?"
                                    required
                                    disabled={isloading}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <SimpleInput
                                    name={"about"}
                                    type="text"
                                    value={formik.values.about}
                                    onChange={formik.handleChange}
                                    placeholder="Tell us about yourself"
                                    required
                                    disabled={isloading}
                                />
                            </div>

                            <div className={styles.inputBox}>
                                <ReactSelect
                                    options={[
                                        ...(interestGroups.map(aois => ({
                                            value: aois.id,
                                            label: aois.name
                                        })) as any)
                                    ]}
                                    name="aois"
                                    placeholder="Area of interest"
                                    value={selectedAois}
                                    isDisabled={isloading}
                                    isMulti
                                    filterOption={CustomFilter}
                                    onChange={(selectedOptions: any) => {
                                        if (selectedOptions.length <= 3) {
                                            setSelectedAois(selectedOptions);
                                            formik.setFieldValue(
                                                "aois",
                                                selectedOptions.map(
                                                    (option: any) =>
                                                        option.value
                                                )
                                            );
                                        }
                                    }}
                                    required
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
                                            ...(companies.map(company => ({
                                                value: company.id,
                                                label: company.title
                                            })) as any)
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
                                    // required
                                />
                            </div>
                            {/* {renderErrorSpan(formik, "company")} */}
                            {/* <div className={styles.content}>
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
                            </div> */}

                            <div className={styles.submit}>
                                <PowerfulButton
                                    type="submit"
                                    isLoading={isloading}
                                    style={{ marginTop: "20px" }}
                                    onClick={() => {
                                        onSubmit(formik.values);
                                    }}
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
