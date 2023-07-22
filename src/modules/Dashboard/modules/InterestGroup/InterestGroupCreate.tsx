import { createInterestGroups } from "./apis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css"
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";

type Props = {};

export const InterestGroupCreate = (props: Props) => {

    const toast = useToast();
    const navigate = useNavigate();

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>IG Create Page</h1>
                <Formik
                    initialValues={{
                        igName: ""
                        // acceptedTerms: false, // added for our checkbox
                        // jobType: "" // added for our select
                    }}
                    validationSchema={Yup.object({
                        igName: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                        // firstName: Yup.string()
                        //     .max(15, "Must be 15 characters or less")
                        //     .required("Required"),
                        // lastName: Yup.string()
                        //     .max(20, "Must be 20 characters or less")
                        //     .required("Required"),
                        // email: Yup.string()
                        //     .email("Invalid email address")
                        //     .required("Required"),
                        // acceptedTerms: Yup.boolean()
                        //     .required("Required")
                        //     .oneOf(
                        //         [true],
                        //         "You must accept the terms and conditions."
                        //     ),
                        // jobType: Yup.string()
                        //     .oneOf(
                        //         ["designer", "development", "product", "other"],
                        //         "Invalid Job Type"
                        //     )
                        //     .required("Required")
                    })}
                    onSubmit={values => {
                        //console.log(values.igName);
                        createInterestGroups(values.igName);
                        toast({
                            title: "Interest Group created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                        navigate("/interest-groups");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="IG Name"
                            name="igName"
                            type="text"
                            placeholder="Enter a name"
                        />
                        {/* <MySelect label="Job Type" name="jobType">
                            <option value="">Select a job type</option>
                            <option value="designer">Designer</option>
                            <option value="development">Developer</option>
                            <option value="product">Product Manager</option>
                            <option value="other">Other</option>
                        </MySelect>

                        <MyCheckbox name="acceptedTerms">
                            I accept the terms and conditions
                        </MyCheckbox> */}
                    </Form>
                </Formik>
                <div className={styles.btn_container}>
                    <MuButton
                        text={"Decline"}
                        className={styles.btn_cancel}
                        onClick={() => {
                            navigate("/interest-groups");
                        }}
                    />
                    <button type="submit" className={styles.btn_submit}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};