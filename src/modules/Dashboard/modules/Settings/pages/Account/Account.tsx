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
import { HiEye } from "react-icons/hi";
import { HiEyeSlash } from "react-icons/hi2";
import Modal from "@/MuLearnComponents/Modal/Modal";

const Account = () => {
    const scheme = Yup.object({
        currentPassword: Yup.string()
            .required("Current password is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password should be at least 8 characters"),
        confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Password does not match")
    });

    const naviage = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: "", message: "" });

    const onSubmit = (values: any, formikHelpers: any) => {
        setIsLoading(true);
        setStatusMessage({ type: "", message: "" });

        privateGateway
            .post(dashboardRoutes.changePassword, {
                current_password: values.currentPassword,
                password: values.password
            })
            .then(response => {
                setIsLoading(false);
                const successMessage = response.data.message?.general && response.data.message.general.length > 0
                    ? response.data.message.general[0]
                    : "Password changed successfully!";

                setStatusMessage({
                    type: "success",
                    message: successMessage
                });

                toast.success(successMessage);
                formikHelpers.resetForm();
                setTimeout(() => {
                    naviage("/dashboard/profile");
                }, 2000);
            })
            .catch(error => {
                setIsLoading(false);

                let errorMessage = error.message?.general && error.message?.general.length > 0
                ? error.message?.general[0]
                : "Can't change password. Please try again.";

                setStatusMessage({
                    type: "error",
                    message: errorMessage
                });
                toast.error(errorMessage);
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

    const [showOrHidePassword1, setShowOrHidePassword1] = useState(false);
    const [showOrHidePassword2, setShowOrHidePassword2] = useState(false);
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
                            Enter your current password, then a new password, and confirm it to change.
                        </p>
                    </div>

                    <div className={styles.changePasswordInputContainer}>
                        <Formik
                            initialValues={{
                                currentPassword: "",
                                password: "",
                                confirmPassword: ""
                            }}
                            validationSchema={scheme}
                            onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
                        >
                            {formik => (
                                <div>
                                    <div className={styles.wrapper}>
                                        <Form>
                                            <div className={styles.inputBox}>
                                                <SimpleInput
                                                    value={
                                                        formik.values.currentPassword
                                                    }
                                                    name="currentPassword"
                                                    placeholder="Current Password"
                                                    type="password"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    style={{
                                                        marginTop: "10px"
                                                    }}
                                                />
                                                <div className={styles.passwordInput}>
                                                    <SimpleInput
                                                        value={
                                                            formik.values.password
                                                        }
                                                        name="password"
                                                        placeholder="New Password"
                                                        type={
                                                            showOrHidePassword1
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        style={{
                                                            marginTop: "10px"
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowOrHidePassword1(e => !e)}
                                                    >
                                                        {showOrHidePassword1 ? (
                                                            <HiEye size={20} />
                                                        ) : (
                                                            <HiEyeSlash size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className={styles.passwordInput}>
                                                    <SimpleInput
                                                        value={
                                                            formik.values
                                                                .confirmPassword
                                                        }
                                                        name="confirmPassword"
                                                        placeholder="Confirm New Password"
                                                        type={
                                                            showOrHidePassword2
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        style={{
                                                            marginTop: "10px"
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowOrHidePassword2(e => !e)}
                                                    >
                                                        {showOrHidePassword2 ? (
                                                            <HiEye size={20} />
                                                        ) : (
                                                            <HiEyeSlash size={20} />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className={styles.submit}>
                                                    {statusMessage.message && (
                                                        <div
                                                            className={styles.statusMessage}
                                                            style={{
                                                                color: statusMessage.type === 'success' ? 'green' : 'red',
                                                                marginBottom: '10px',
                                                                fontSize: '14px',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >
                                                            {statusMessage.message}
                                                        </div>
                                                    )}
                                                    <PowerfulButton
                                                        type="submit"
                                                        isLoading={isLoading}
                                                    >
                                                        {isLoading ? "Please wait..." : "Change Password"}
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
                {/* {isOpen && (
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
                </div> */}
            </div>
        </div>
    );
};

export default Account;
