import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Login.module.css";
import { useToast } from "@chakra-ui/react";
import {
    login,
    requestEmailOrMuidOtp,
    otpVerification
} from "../services/apis";
import { useNavigate } from "react-router-dom";
import { BeatLoader, ClipLoader } from "react-spinners";
import Dropdown from "../../../../components/MuComponents/Dropdown/Dropdown";
import i18n from "../../../../i18n";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";

const Login = () => {
    const [showOrHidePassword, setShowOrHidePassword] = useState("password");
    const [muid, setMuID] = useState("");
    const [emailOrMuid, setEmailOrMuid] = useState("");
    const [hasError, setHasError] = useState(true);
    const [status, setStatus] = useState(0);
    const [password, setPassword] = useState("");
    const [otpForm, setOtpForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState(false);
    let ruri = window.location.href.split("=")[1];
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("en");
    const toast = useToast();
    const { t } = useTranslation(["login"]);
    const navigate = useNavigate();

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    const handleLanguageChange = (
        selectedLanguage: string | ((prevLanguage: string) => string)
    ) => {
        if (typeof selectedLanguage === "string") {
            setLanguage(selectedLanguage);
        }
    };

    useEffect(() => {
        setHasError(true);
        setPassword("");
        setStatus(0);
    }, [emailOrMuid]);
    return (
        <div className={styles.login_page}>
            <Dropdown
                contents={["en", "hi", "mal"]}
                input={language}
                setInput={handleLanguageChange}
            />
            <div className={styles.login_container}>
                {!otpForm ? (
                    <div className={styles.login_form}>
                        <h1>{t("user_login")}</h1>
                        <p className={styles.p_welcome}>{t("welcome_text")}</p>
                        <form>
                            <input
                                type="text"
                                placeholder={t("email") || ""}
                                required
                                value={muid}
                                onChange={e => setMuID(e.target.value)}
                            />
                            <div className={styles.password_div}>
                                <input
                                    type={showOrHidePassword}
                                    placeholder={t("password") || ""}
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <p
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
                                </p>
                            </div>
                            <p style={{ textAlign: "left" }}>
                                <a href="forgot-password">
                                    {t("forgot_password")}{" "}
                                    <b>{t("forgot_password_bold")}</b>
                                </a>
                                <a
                                    onClick={() => {
                                        setOtpForm(true);
                                    }}
                                >
                                    {t("login_otp")}{" "}
                                    <b>{t("login_otp_bold")}</b>
                                </a>
                            </p>
                            <MuButton
                                text={"Sign In"}
                                className={styles.signin_button}
                                onClick={e => {
                                    e.preventDefault();
                                    if (muid != "" && password != "") {
                                        login(
                                            muid,
                                            password,
                                            toast,
                                            navigate,
                                            setIsLoading,
                                            ruri
                                        );
                                    }
                                }}
                                type="submit"
                            >
                                <div className={styles.signin_loading}>
                                    {isLoading ? (
                                        <>
                                            Sign in
                                            <ClipLoader
                                                color="#fff"
                                                size={20}
                                            />
                                        </>
                                    ) : (
                                        t("sign_in")
                                    )}
                                </div>
                            </MuButton>
                            <span className={styles.register}>
                                <a href="register">{t("sign_up")}</a>
                            </span>
                        </form>
                    </div>
                ) : null}

                {otpForm ? (
                    <div className={styles.login_form}>
                        <h1>User Login</h1>
                        <p className={styles.p_welcome}>
                            Hey welcome, please enter your details to sign in to
                            your account
                        </p>
                        <form>
                            <input
                                type="text"
                                placeholder="Enter email or µID"
                                required
                                value={emailOrMuid}
                                onChange={e => setEmailOrMuid(e.target.value)}
                            />
                            {status === 200 ? (
                                <div className={styles.password_div}>
                                    <input
                                        type={showOrHidePassword}
                                        placeholder="OTP"
                                        required
                                        value={password}
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <p
                                        className={styles.password_icon}
                                        onClick={e => {
                                            e.preventDefault();
                                            showOrHidePassword == "password"
                                                ? setShowOrHidePassword("text")
                                                : setShowOrHidePassword(
                                                      "password"
                                                  );
                                        }}
                                    >
                                        {showOrHidePassword === "text" ? (
                                            <i className="fi fi-sr-eye"></i>
                                        ) : (
                                            <i className="fi fi-sr-eye-crossed"></i>
                                        )}
                                    </p>
                                </div>
                            ) : null}
                            <p style={{ textAlign: "left" }}>
                                <a href="forgot-password">
                                    Forgot your <b>password?</b>
                                </a>
                                <a
                                    onClick={() => {
                                        setOtpForm(false);
                                    }}
                                >
                                    Login with <b>password</b>
                                </a>
                            </p>
                            {/* <button
                                onClick={e => {
                                    setHasError(false);
                                    e.preventDefault();
                                    if (emailOrMuid != "" && hasError) {
                                        requestEmailOrMuidOtp(
                                            emailOrMuid,
                                            toast,
                                            setHasError,
                                            setStatus,
                                            setOtpLoading
                                        );
                                    }
                                    if (!hasError && password != "") {
                                        otpVerification(
                                            emailOrMuid,
                                            password,
                                            toast,
                                            navigate,
                                            setOtpLoading
                                        );
                                    }
                                }}
                                type="submit"
                                // disabled={status === 1 ? true : false}
                            >
                                {hasError
                                    ? "Request OTP"
                                    : status === 0 && emailOrMuid != ""
                                        ? "Processing"
                                        : emailOrMuid != ""
                                            ?
                                            <>
                                                {!otpLoading ? <>Sign in</> : <div className={styles.otp_loader}> <PulseLoader size={10} color="#fff" /></div>}
                                            </>
                                            : "Request OTP"
                                        }
                            </button> */}
                            <MuButton
                                text={
                                    hasError
                                        ? "Request OTP"
                                        : otpLoading
                                        ? "Processing"
                                        : otpError
                                        ? "Request OTP"
                                        : "Signin"
                                }
                                className={styles.signin_button}
                                onClick={e => {
                                    setHasError(false);
                                    e.preventDefault();
                                    if (emailOrMuid != "" && hasError) {
                                        requestEmailOrMuidOtp(
                                            emailOrMuid,
                                            toast,
                                            setHasError,
                                            setStatus,
                                            setOtpLoading,
                                            setOtpError
                                        );
                                    }
                                    if (!hasError && password != "") {
                                        otpVerification(
                                            emailOrMuid,
                                            password,
                                            toast,
                                            navigate,
                                            setOtpVerifyLoading,
                                            ruri
                                        );
                                    }
                                }}
                                // disabled={status === 1 ? true : false}
                                isLoading={
                                    otpLoading ? otpLoading : otpVerifyLoading
                                }
                            />
                            <span className={styles.register}>
                                {" "}
                                <a href="register">
                                    Don't have an account? Sign up
                                </a>
                                </span> 
                        </form>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Login;
