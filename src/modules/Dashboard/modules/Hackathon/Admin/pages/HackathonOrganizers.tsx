import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import styles from "@Mulearn/FormikComponents/FormComponents.module.css";
import * as Yup from "yup";
import { FormikTextInput } from "@Mulearn/FormikComponents/FormikComponents";
import { PowerfullButton } from "@Mulearn/MuButtons/MuButton";

type Props = {};

export const HackathonOrganizers = (props: Props) => {
    const toast = useToast();

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>IG Create Page</h1>
                <Formik
                    initialValues={{
                        muid: ""
                    }}
                    validationSchema={Yup.object({
                        muid: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values.muid);
                        toast({
                            title: "success",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="Mu ID"
                            name="muid"
                            type="text"
                            placeholder="Enter Mu ID"
                        />

                        <PowerfullButton text={"Add Organizer"} type={"submit"} margin="23px 0 0 0"></PowerfullButton>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
