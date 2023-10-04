import { createManageUsers } from "./apis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";

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
                        // userName: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        mobile: "",
                        dob: "",
                        gender: ""
                        // acceptedTerms: false, // added for our checkbox
                        // jobType: "" // added for our select
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .max(15, "Must be 15 characters or less")
                            .required("Required"),
                        lastName: Yup.string()
                            .max(20, "Must be 20 characters or less")
                            .required("Required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        mobile: Yup.string()
                            .email("Invalid mobile number")
                            .required("Required"),
                        dob: Yup.string()
                            .email("Invalid Date of Birth")
                            .required("Required"),
                        gender: Yup.string()
                            .email("Invalid gender")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values.firstName);
                        createManageUsers(
                            values.firstName,
                            values.lastName,
                            values.email,
                            values.mobile,
                            values.dob,
                            values.gender
                        );
                        toast({
                            title: "User created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                        navigate("/dashboard/manage-users");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="User First Name"
                            name="firstName"
                            type="text"
                            placeholder="Enter a name"
                        />
                        <FormikTextInput
                            label="User Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Enter a name"
                        />
                        <FormikTextInput
                            label="User Email"
                            name="email"
                            type="text"
                            placeholder="Enter a email"
                        />
                        <FormikTextInput
                            label="User Mobile Number"
                            name="mobile"
                            type="text"
                            placeholder="Enter a mobile number"
                        />
                        <FormikTextInput
                            label="User Date Of Birth"
                            name="dob"
                            type="text"
                            placeholder="Enter a Date Of Birth"
                        />
                        <FormikTextInput
                            label="User Gender"
                            name="gender"
                            type="text"
                            placeholder="Enter a gender"
                        />
                        <div className={styles.btn_container}>
                            <PowerfulButton
                                
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/dashboard/manage-users");
                                }}
                            >Decline</PowerfulButton>
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
