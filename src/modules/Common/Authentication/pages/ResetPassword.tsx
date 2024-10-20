import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Login.module.css";

import { getMuid, resetPassword } from "../services/apis";
import { useFormik } from "formik";

type Props = {};

const ResetPassword = (props: Props) => {
    const [showOrHidePassword, setShowOrHidePassword] = useState("password");
    const [showOrHideConfirmPassword, setShowOrHideConfirmPassword] =
        useState("password");
    const [muid, setMuID] = useState("");
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState("");
    localStorage.clear();
    const navigate = useNavigate();

    useEffect(() => {
        const paramToken = searchParams.get("token");
        setToken(paramToken as string);
        if (token.length > 0 && muid.length === 0) {
            getMuid(token, navigate, setMuID);
        }
    }, [token]);

    // formik
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    const onSubmit = async (values: any) => {
        if (formik.errors.password || formik.errors.confirmPassword) return;
        resetPassword(token, values.password, navigate);
    };

    const validate = (values: any) => {
        let errors: any = {};
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password == "") {
            errors.password = "Password should not be empty";
        } else if (values.password.length < 8) {
            errors.password = "Password should be atleast 8 characters";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (
            values.confirmPassword == "" ||
            values.password != values.confirmPassword
        ) {
            errors.confirmPassword = "Password does not match";
        }
        return errors;
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (
        <div className={styles.login_page}>
            <div className={styles.login_container}>
                <div className={styles.login_form}>
                    <h1>Reset Password</h1>
                    <p className={styles.p_welcome}>
                        Choose a new, strong password to keep your information
                        securer
                    </p>
                    <form>
                        <input
                            type="text"
                            placeholder="Your µID"
                            disabled
                            required
                            value={muid}
                        />
                        <div className={styles.password_div}>
                            <input
                                type={showOrHidePassword}
                                placeholder="Enter new password"
                                required
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className={styles.error_message}>
                                    {formik.errors.password}
                                </div>
                            ) : null}
                            <button
                                className={styles.password_icon}
                                onClick={e => {
                                    e.preventDefault();
                                    showOrHidePassword == "password"
                                        ? setShowOrHidePassword("text")
                                        : setShowOrHidePassword("password");
                                }}
                            >
                                {showOrHidePassword === "text" ? (
                                    <i className="fi fi-sr-eye"></i>
                                ) : (
                                    <i className="fi fi-sr-eye-crossed"></i>
                                )}
                            </button>
                        </div>
                        <div className={styles.password_div}>
                            <input
                                type={showOrHideConfirmPassword}
                                placeholder="Re-enter your new password"
                                required
                                name="confirmPassword"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ? (
                                <div className={styles.error_message}>
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}
                            <button
                                className={styles.password_icon}
                                onClick={e => {
                                    e.preventDefault();
                                    showOrHideConfirmPassword == "password"
                                        ? setShowOrHideConfirmPassword("text")
                                        : setShowOrHideConfirmPassword(
                                              "password"
                                          );
                                }}
                            >
                                {showOrHideConfirmPassword === "text" ? (
                                    <i className="fi fi-sr-eye"></i>
                                ) : (
                                    <i className="fi fi-sr-eye-crossed"></i>
                                )}
                            </button>
                        </div>
                        <br />
                        <br />
                        <button
                            onClick={e => {
                                e.preventDefault();
                                onSubmit(formik.values);
                            }}
                            type="submit"
                        >
                            Confirm password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
