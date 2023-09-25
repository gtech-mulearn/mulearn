import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CompanyPage.module.css";
import { submitUserData } from "../../../services/newOnboardingApis";

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
    radio: z
        .string()
        .required(`Radio is Required`)
        .min(2, `Radio must be at least 2 characters`)
        .max(3, `Radio must be at most 3 characters`)
});

export default function CompanyPage() {
    const navigate = useNavigate();
    const toast = useToast();
    const location = useLocation();
    let userData = location.state;

    const [isloading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([{ id: "", title: "" }]);

    useEffect(() => {
        if (
            userData === undefined ||
            userData === null ||
            userData.email === undefined
        ) {
            navigate("/signup", { replace: true });
        } else {
            getCompanies({
                setIsLoading: setIsLoading,
                setCompanies: setCompanies
            });
        }
    }, []);

    const [selectedCompany, setSelectedCompany] = useState({
        id: "",
        title: ""
    });

    const onSubmit = async (values: any) => {
        const newUserData = {
            ...userData,
            organizations: [values.company],
            area_of_interests: [],
            dept: null,
            year_of_graduation: null
        };

        /// If user doesn't want to be a mentor set role to null
        newUserData.role = values.radio === "yes" ? userData.role : null;

        submitUserData({
            setIsLoading: setIsLoading,
            userData: newUserData,
            toast: toast,
            navigate: navigate
        });
    };

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your company"}
            />

            {isloading ? (
                <MuLoader />
            ) : (
                <Formik
                    initialValues={{
                        ...Object.fromEntries(
                            Object.keys(inputObject).map(key => [key, ""])
                        ),
                        radio: ""
                    }}
                    validationSchema={scheme}
                    onSubmit={(value, action) => onSubmit(value)}
                >
                    {formik => (
                        <div>
                            <div className={styles.wrapper}>
                                <Form onSubmit={formik.handleSubmit}>
                                    <h5 className={styles.text}>
                                        Please enter your company details
                                    </h5>
                                    <ReactSelect
                                        options={
                                            companies.map(company => ({
                                                value: company.id,
                                                label: company.title
                                            })) as any
                                        }
                                        name="company"
                                        placeholder="Company Name"
                                        value={selectedCompany.title}
                                        onChange={e => {
                                            if (e) {
                                                setSelectedCompany(e);
                                                formik.setFieldValue(
                                                    "company",
                                                    e.value
                                                );
                                                inputObject.company = e.value;
                                            }
                                        }}
                                    />

                                    <div className={styles.content}>
                                        <h5 className={styles.text}>
                                            Do you want to become a mentor?
                                        </h5>
                                        {formik.touched.radio &&
                                            formik.errors.radio && (
                                                <span>
                                                    {formik.errors.radio}
                                                </span>
                                            )}
                                        <div className={styles.select}>
                                            <button
                                                className={styles.selectRadio}
                                            >
                                                <label>
                                                    <input
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        type="radio"
                                                        value="yes"
                                                        name="radio"
                                                    />
                                                    <span>Yes</span>
                                                </label>
                                            </button>
                                            <button
                                                className={styles.selectRadio}
                                            >
                                                <label>
                                                    <input
                                                        onChange={
                                                            formik.handleChange
                                                        }
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
