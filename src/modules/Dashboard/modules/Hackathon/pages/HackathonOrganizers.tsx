import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import styles from "@Mulearn/FormikComponents/FormComponents.module.css";
import * as Yup from "yup";
import { FormikTextInput } from "@Mulearn/FormikComponents/FormikComponents";
import { PowerfulButton } from "@Mulearn/MuButtons/MuButton";
import { addOrganizer } from "../services/HackathonApis";

type Props = {};

export const HackathonOrganizers = (props: Props) => {
    const toast = useToast();
    const { id } = useParams();


    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>ORGANIZERS</h1>
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
                        addOrganizer(
                            id,
                            values.muid
                            )
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

                        <PowerfulButton text={"Add Organizer"} type={"submit"}   margin="23px 0 0 0"></PowerfulButton>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
