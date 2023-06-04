import { useEffect, useState } from "react";
import { editManageUsers, getManageUsersDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import styles from "../../../../components/MuComponents/FormikComponents/form.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";

type Props = {};

const ManageUsersEdit = (props: Props) => {
    const [name, setName] = useState("");
    const [data, setData] = useState<string[]>([]);

    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        getManageUsersDetails(id, setData);
    }, []);

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>User Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        // igName: name
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        mobile: data.mobile,
                        discord_id: data.discord_id,
                        mu_id: data.mu_id
                    }}
                    validationSchema={Yup.object({
                        // igName: Yup.string()
                        //     .max(30, "Must be 30 characters or less")
                        //     .required("Required"),
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
                            .length(10,"Invalid mobile number")
                            .required("Required"),
                        discord_id: Yup.string()
                            .min(17, "Must be 17 characters or more")
                            .required("Required"),
                        mu_id: Yup.string()
                            .email("Invalid mu_id")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        editManageUsers(
                            id,
                            values.firstName,
                            values.lastName,
                            values.email,
                            values.mobile,
                            values.discord_id,
                            values.mu_id
                        );
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
                            label="User Discord ID"
                            name="discord_id"
                            type="text"
                            placeholder="Enter a mobile number"
                        />
                        <FormikTextInput
                            label="User Mu_ID"
                            name="mu_id"
                            type="text"
                            placeholder="Enter a mobile number"
                        />

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

export default ManageUsersEdit;
