import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CompanyPage.module.css";

import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useEffect, useState } from "react";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { getCompanies } from "../../../services/newOnboardingApis";
import ReactSelect from "react-select";

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
    const [isloading, setIsLoading] = useState(true);
    const [companies, setCompanies] = useState([{ id: "", title: "" }]);

    useEffect(() => {
        getCompanies({
            setIsLoading: setIsLoading,
            setCompanies: setCompanies
        });
    }, []);

    const [selectedCompany, setSelectedCompany] = useState({
        id: "",
        title: ""
    });

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
                    onSubmit={(value, action) => console.log(value)} // TODO: Add API call etc stuffs here
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
                                                inputObject.company = e.label;
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
                                                        value="Yes"
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
            )}
        </OnboardingTemplate>
    );
}
