import { createManageUsers } from "./apis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import styles from "../../../../components/MuComponents/FormikComponents/form.module.css";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import * as Yup from "yup";
import { FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";

type Props = {};

const ManageUsersCreate = (props: Props) => {
    const toast = useToast();
    const navigate = useNavigate();

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>User Create Page</h1>
                <Formik
                    initialValues={{
                        userName: ""
                        // acceptedTerms: false, // added for our checkbox
                        // jobType: "" // added for our select
                    }}
                    validationSchema={Yup.object({
                        userName: Yup.string()
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
                        console.log(values.userName);
                        createManageUsers(values.userName);
                        toast({
                            title: "User created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                        navigate("/manage-users");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="User Name"
                            name="User Name"
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
                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/manage-users");
                                }}
                            />
                            <button type="submit" className={styles.btn_submit}>
                                Confirm
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default ManageUsersCreate;
