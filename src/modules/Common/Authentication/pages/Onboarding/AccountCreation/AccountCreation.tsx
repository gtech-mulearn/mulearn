import styles from "./AccountCreation.module.css";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { getDWMSDetails } from "../../../services/newOnboardingApis";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import makeAnimated from "react-select/animated";
import { BiSupport } from "react-icons/bi";
import { isDev } from "@/MuLearnServices/common_functions";
import { submitUserData } from "../../../services/newOnboardingApis";
import toast from "react-hot-toast";

type DWMSData = {
    email: string;
    fullName: string;
    phoneNumber: string;
    gender?: string;
    dob?: string;
};

const scheme = z.object({
    email: z
        .string()
        .required(`Email is Required`)
        .min(5, `Email must be at least 3 characters`)
        .max(100, `Email must be at most 100 characters`),
    fullName: z
        .string()
        .required(`Full Name is Required`)
        .min(3, `Full Name must be at least 3 characters`)
        .max(100, `Full Name must be at most 100 characters`),
    // phoneNumber: z
    //     .string()
    //     .required(`Phone number is Required`)
    //     .min(10, `Phone number must be at least 10 characters`)
    //     .max(10, `Phone number must be at most 10 characters`),
    ...(isDev()
        ? {
              password: z.string().required(`Password is Required`)
          }
        : {
              password: z
                  .string()
                  .required(`Password is Required`)
                  .min(8, `Password must be at least 8 characters`)
                  .max(100, `Password must be at most 100 characters`)
          })
    // confirmPassword: z
    //     .string()
    //     .required(`Password is Required`)
    //     .test(
    //         "passwords-match",
    //         "Passwords are not matching",
    //         function (value) {
    //             return this.parent.password === value;
    //         }
    //     )
});

export default function AccountCreation() {
    let { role } = useParams();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("param");
    const referralId = urlParams.get("referral_id");

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [dwmsData, setDWMSData] = useState<DWMSData>();

    const [isTncChecked, setTncChecked] = useState(false);

    const [initialValues, setInitialValues] = useState({
        email: "",
        fullName: "",
        password: "",
        role: "",
        muid: "",
        communities: []
    });
    const ruri = window.location.href.split("=")[1];

    role =
        role === "student" || role === "mentor" || role === "enabler"
            ? role
            : "other";

    useEffect(() => {
        if (isLoading) return;
        setIsLoading(true);
        if (param) {
            getDWMSDetails(param, (data: any) => {
                setDWMSData({
                    email: data?.email_id || "",
                    fullName:
                        data?.job_seeker_fname + " " + data?.job_seeker_lname ||
                        "",
                    phoneNumber: data?.mobile_no || "",
                    gender: data?.gender || "",
                    dob: data?.dob || ""
                });

                setInitialValues({
                    ...initialValues,
                    email: data?.email_id || "",
                    fullName:
                        data?.job_seeker_fname + " " + data?.job_seeker_lname ||
                        ""
                    // phoneNumber: data?.mobile_no || ""
                });
            });
        }

        setIsLoading(false);
    }, []);

    const onsubmit = async (values: any, actions: any) => {
        if (!isTncChecked) {
            toast.error("Please accept the terms and conditions");
            return;
        }
        const userData: {
            user: {
                full_name: any;
                email: any;
                password: any;
            };
            role?: string;
            referral?: { muid: string };
            gender?: string;
            dob?: string;
            communities?: string[];
            integration?: {
                param: string;
                title: string;
            };
        } = {
            user: {
                full_name: values.fullName,
                email: values.email,
                password: values.password
            }
        };

        if (dwmsData && dwmsData.gender) {
            userData.gender = dwmsData.gender;
        }

        if (param) {
            userData.integration = {
                param: param,
                title: "DWMS"
            };
        }

        if (dwmsData && dwmsData.dob) {
            userData.dob = dwmsData.dob;
        }

        submitUserData({
            setIsLoading: setIsLoading,
            userData: userData
        }).then(res => {
            if (res) {
                navigate(
                    ruri
                        ? `/register/interests/?ruri=${ruri}`
                        : "/register/interests"
                );
            }
        });
    };

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Create an Account"}
                desc={"Please Enter Your Information"}
            />
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={scheme}
                onSubmit={onsubmit}
            >
                {formik => (
                    <Form>
                        <div className={styles.accountCreationContainer}>
                            <div className={styles.accountCreationInputs}>
                                <div className={styles.inputBox}>
                                    <SimpleInput
                                        name={"email"}
                                        type="email"
                                        value={
                                            formik.values.email ||
                                            dwmsData?.email
                                        }
                                        onChange={formik.handleChange}
                                        placeholder="Email id"
                                        required
                                        disabled={
                                            isLoading || dwmsData?.email
                                                ? true
                                                : false
                                        }
                                        style={
                                            dwmsData?.email
                                                ? { backgroundColor: "#f7f7f7" }
                                                : { backgroundColor: "#F5F7FB" }
                                        }
                                    />
                                </div>

                                <div className={styles.accountCreationName}>
                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"fullName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            placeholder="Full Name"
                                            value={
                                                formik.values.fullName ||
                                                dwmsData?.fullName
                                            }
                                            required
                                            disabled={
                                                isLoading || dwmsData?.fullName
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                dwmsData?.fullName
                                                    ? {
                                                          backgroundColor:
                                                              "#f7f7f7"
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "#F5F7FB"
                                                      }
                                            }
                                        />
                                    </div>
                                    <div
                                        className={
                                            styles.accountCreationPassword
                                        }
                                    >
                                        <div className={styles.inputBox}>
                                            <SimpleInput
                                                name={"password"}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                type={
                                                    isVisible
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Password"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setVisible(e => !e)}
                                        >
                                            {isVisible ? (
                                                <HiEye size={26} />
                                            ) : (
                                                <HiEyeSlash size={26} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.tnc}>
                                    <input
                                        type="checkbox"
                                        name="tnc"
                                        className={styles.tncCheckbox}
                                        checked={isTncChecked}
                                        onChange={() => setTncChecked(e => !e)}
                                    />
                                    <p>
                                        I agree to the{" "}
                                        <a
                                            href="http://mulearn.org/termsandconditions"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Terms & Conditions
                                        </a>
                                        {" and "}
                                        <a
                                            href="http://mulearn.org/privacypolicy"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                                <div className={styles.supportContainer}>
                                    <BiSupport size={20} />
                                    <a
                                        href="https://chat.whatsapp.com/La3nY4AVQsR0ndrwk4wN7v"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p className={styles.supportWa}>
                                            Facing Issues? Join our{" "}
                                            <span>Support Group!</span>
                                        </p>
                                    </a>
                                </div>

                                <PowerfulButton
                                    type="submit"
                                    style={{ marginTop: "10px" }}
                                    isLoading={isLoading}
                                >
                                    {isLoading ? "Validating..." : "Register"}
                                </PowerfulButton>
                            </div>

                            <div className={styles.accountCreationAlternative}>
                                <div>
                                    <p>
                                        Already have an account?{" "}
                                        <a
                                            href={
                                                ruri
                                                    ? `/login?ruri=${ruri}`
                                                    : "/login"
                                            }
                                        >
                                            Sign In
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </OnboardingTemplate>
    );
}
