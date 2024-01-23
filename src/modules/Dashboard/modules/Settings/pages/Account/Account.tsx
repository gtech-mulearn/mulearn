import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./Account.module.css";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "@/MuLearnComponents/Modal/Modal";

const Account = () => {
    const scheme = Yup.object({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password should be at least 8 characters"),
        confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Password does not match")
    });

    const naviage = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = (values: any) => {
        privateGateway
            .post(dashboardRoutes.changePassword, {
                password: values.password
            })
            .then(response => {
                toast.success(response.data.message.general[0]);
                naviage("/dashboard/profile");
            })
            .catch(error => {
                toast.error(error.response.data.message.general[0]);
            });
    };

    const handleLeave = () => {
        privateGateway
            .delete(
                dashboardRoutes.deleteUser + `${localStorage.getItem("userId")}`
            )
            .then(response => {
                toast.success(response.data.message.general[0]);
                naviage("/");
            })
            .catch(error => {
                toast.error(error.response.data.message.general[0]);
            });
    };

    const [showOrHidePassword, setShowOrHidePassword] = useState("password");
    const [showOrHideConfirmPassword, setShowOrHideConfirmPassword] =
        useState("password");

    return (
        <div className={styles.mainContainer}>
            <div className={styles.profileContainer}>
                <div className={styles.changePasswordContainer}>
                    <div>
                        <p className={styles.changePasswordContainerLabel}>
                            Change Password
                        </p>
                        <p className={styles.changePasswordContainerTagline}>
                            Enter in a new password, and confirm it to change.
                        </p>
                    </div>

                    <div className={styles.changePasswordInputContainer}>
                        <Formik
                            initialValues={{
                                password: "",
                                confirmPassword: ""
                            }}
                            validationSchema={scheme}
                            onSubmit={onSubmit}
                        >
                            {formik => (
                                <div>
                                    <div className={styles.wrapper}>
                                        <Form>
                                            <div className={styles.inputBox}>
                                                <SimpleInput
                                                    value={
                                                        formik.values.password
                                                    }
                                                    name="password"
                                                    placeholder="Password"
                                                    type={showOrHidePassword}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    style={{
                                                        marginTop: "10px"
                                                    }}
                                                />
                                                <span
                                                    className={styles.eye}
                                                    onClick={() => {
                                                        setShowOrHidePassword(
                                                            showOrHidePassword ===
                                                                "password"
                                                                ? "text"
                                                                : "password"
                                                        );
                                                    }}
                                                >
                                                    <i
                                                        className={`fa fa-eye${
                                                            showOrHidePassword ===
                                                            "password"
                                                                ? "-slash"
                                                                : ""
                                                        }`}
                                                    />
                                                </span>
                                                <SimpleInput
                                                    value={
                                                        formik.values
                                                            .confirmPassword
                                                    }
                                                    name="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    type={
                                                        showOrHideConfirmPassword
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    style={{
                                                        marginTop: "10px"
                                                    }}
                                                />
                                                <span
                                                    className={styles.eye}
                                                    onClick={() => {
                                                        setShowOrHideConfirmPassword(
                                                            showOrHideConfirmPassword ===
                                                                "password"
                                                                ? "text"
                                                                : "password"
                                                        );
                                                    }}
                                                >
                                                    <i
                                                        className={`fa fa-eye${
                                                            showOrHideConfirmPassword ===
                                                            "password"
                                                                ? "-slash"
                                                                : ""
                                                        }`}
                                                    />
                                                </span>
                                                <div className={styles.submit}>
                                                    <PowerfulButton type="submit">
                                                        Change Password
                                                    </PowerfulButton>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
                <br />
                {isOpen && (
                    <Modal
                        setIsOpen={setIsOpen}
                        id={"Leave"}
                        heading={
                            "Are you sure you want to delete your account ?"
                        }
                        content={
                            "This cannot be undone. This will permanently delete your account."
                        }
                        click={handleLeave}
                        type="Delete"
                    />
                )}
                <div className={styles.deleteUserContainer}>
                    <div>
                        <p className={styles.changePasswordContainerLabel}>
                            Delete User
                        </p>
                        <p className={styles.changePasswordContainerTagline}>
                            Click the below button to delete your account.
                        </p>
                    </div>
                    <div className={styles.submit}>
                        <PowerfulButton
                            style={{ backgroundColor: "#DC143C" }}
                            onClick={() => setIsOpen(true)}
                        >
                            Delete Account
                        </PowerfulButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
