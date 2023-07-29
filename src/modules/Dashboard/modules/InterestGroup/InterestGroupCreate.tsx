import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect } from "react";
import { createInterestGroups } from "./apis";

type Props = {};

const InterestGroupCreate = (props: Props) => {
    const toast = useToast();
    const navigate = useNavigate();

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>CREATE IG GROUP</h1>
                <Formik
                    initialValues={{
                        igName: "",
						igCode: "",
						igIcon: "",
                    }}
                    validationSchema={Yup.object({
                        igName: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required"),
                        igCode: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required"),
                        igIcon: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values);
						createInterestGroups(values.igName, values.igCode, values.igIcon)
                        setTimeout(() => {
                            navigate(`/dashboard/interest-groups`);
                        }, 1000);
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="IG Name"
                            name="igName"
                            type="text"
                            placeholder="Enter IG Name"
                        />
                        <FormikTextInput
                            label="IG Code"
                            name="igCode"
                            type="text"
                            placeholder="Enter IG Code"
                        />
                        <FormikTextInput
                            label="IG Icon"
                            name="igIcon"
                            type="text"
                            placeholder="Enter IG Icon"
                        />

                        <PowerfulButton
                            text={"Submit"}
                            type={"submit"}
                            margin="23px 0 0 0"
                        ></PowerfulButton>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default InterestGroupCreate;
