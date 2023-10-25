import styles from "./AccountCreation.module.css";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { getDWMSDetails, validate } from "../../../services/newOnboardingApis";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useEffect, useRef, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getCommunities } from "../../../services/onboardingApis";
import { BiSupport } from "react-icons/bi";

const animatedComponents = makeAnimated();

type DWMSData = {
    email: string;
    firstName: string;
    lastName: string;
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
    firstName: z
        .string()
        .required(`Firstname is Required`)
        .min(3, `Firstname must be at least 3 characters`)
        .max(100, `Firstname must be at most 100 characters`),
    phoneNumber: z
        .string()
        .required(`Phone number is Required`)
        .min(10, `Phone number must be at least 10 characters`)
        .max(10, `Phone number must be at most 10 characters`),
    password: z
        .string()
        .required(`Password is Required`)
        .min(8, `Password must be at least 8 characters`),
    confirmPassword: z
        .string()
        .required(`Password is Required`)
        .min(8, `Password must be at least 8 characters`)
        .max(100, `Password must be at most 100 characters`)
        .test(
            "passwords-match",
            "Passwords are not matching",
            function (value) {
                return this.parent.password === value;
            }
        )
});

export default function AccountCreation() {
    const toast = useToast();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("param");
    const referralId = urlParams.get("referral_id");

    //ref to community selector for resetting - temporary fix
    const community_select_ref = useRef<any>();

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isVisibleC, setVisibleC] = useState(false);
    const [dwmsData, setDWMSData] = useState<DWMSData>();

    const [isTncChecked, setTncChecked] = useState(false);

    const [communitiesList, setCommunitiesList] = useState([
        { id: "", title: "" }
    ]);
    const [initialValues, setInitialValues] = useState({
        email: "",
        firstName: "",
        lastName: "",
        countryCode: "+91",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        muid: "",
        communities: []
    });

    useEffect(() => {
        if (isLoading) return;
        setIsLoading(true);
        getCommunities({
            setCommunityAPI: setCommunitiesList,
            setIsLoading: setIsLoading
        });
        if (param) {
            getDWMSDetails(param, (data: any) => {
                setDWMSData({
                    email: data?.email_id || "",
                    firstName: data?.job_seeker_fname || "",
                    lastName: data?.job_seeker_lname || "",
                    phoneNumber: data?.mobile_no || "",
                    gender: data?.gender || "",
                    dob: data?.dob || ""
                });

                setInitialValues({
                    ...initialValues,
                    email: data?.email_id || "",
                    firstName: data?.job_seeker_fname || "",
                    lastName: data?.job_seeker_lname || "",
                    phoneNumber: data?.mobile_no || ""
                });
            });
        }

        setIsLoading(false);
    }, []);

    const onsubmit = async (values: any, actions: any) => {
        if (!isTncChecked) {
            toast({
                title: "Please accept the terms and conditions",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            return;
        }

        console.log(values);

        const userData: {
            user: {
                first_name: any;
                last_name: any;
                email: any;
                mobile: any;
                password: any;
            };
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
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                mobile: values.phoneNumber,
                password: values.password
            }
        };

        if (values.muid) {
            userData.referral = { muid: values.muid };
        } else if (referralId) {
            userData.referral = { muid: referralId };
        }

        if (dwmsData && dwmsData.gender) {
            userData.gender = dwmsData.gender;
        }

        if (values.communities) {
            userData.communities = values.communities;
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

        const isSuccess = await validate({
            userData: userData,
            setIsSubmitting: setIsLoading,
            toast: toast
        });
        if (isSuccess) navigate("select-role", { state: userData });
    };

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Welcome! Create Account"}
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
                                            name={"firstName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            placeholder="First Name"
                                            value={
                                                formik.values.firstName ||
                                                dwmsData?.firstName
                                            }
                                            required
                                            disabled={
                                                isLoading || dwmsData?.firstName
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                dwmsData?.firstName
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

                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"lastName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            value={
                                                formik.values.lastName ||
                                                dwmsData?.lastName
                                            }
                                            placeholder="Last Name"
                                            disabled={
                                                isLoading || dwmsData?.lastName
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                dwmsData?.lastName
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
                                </div>

                                <div className={styles.col_2}>
                                    <select
                                        style={{
                                            width: "15%",
                                            height: "40px",
                                            borderRadius: "5px",
                                            textAlign: "center",
                                            backgroundColor: "#F5F7FB"
                                        }}
                                        name="countryCode"
                                    >
                                        <option value="+91" selected>
                                            +91
                                        </option>
                                    </select>
                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"phoneNumber"}
                                            value={
                                                formik.values.phoneNumber ||
                                                dwmsData?.phoneNumber
                                            }
                                            onChange={formik.handleChange}
                                            type="number"
                                            placeholder="Phone Number"
                                            required
                                            disabled={
                                                isLoading ||
                                                dwmsData?.phoneNumber
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                dwmsData?.phoneNumber
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
                                </div>
                                <div className={styles.col_2}>
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
                                    <div
                                        className={
                                            styles.accountCreationPassword
                                        }
                                    >
                                        <div className={styles.inputBox}>
                                            <SimpleInput
                                                name={"confirmPassword"}
                                                value={
                                                    formik.values
                                                        .confirmPassword
                                                }
                                                onChange={formik.handleChange}
                                                type={
                                                    isVisibleC
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm Password"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setVisibleC(e => !e)}
                                        >
                                            {isVisibleC ? (
                                                <HiEye size={26} />
                                            ) : (
                                                <HiEyeSlash size={26} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <Select
                                        name="community.id"
                                        ref={community_select_ref}
                                        placeholder="Select Communities you're part of"
                                        onChange={OnChangeValue => {
                                            console.log(OnChangeValue);
                                            const ids = OnChangeValue.map(
                                                (e: any) => e.value
                                            );
                                            formik.setFieldValue(
                                                "communities",
                                                ids
                                            );
                                        }}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isClearable
                                        defaultValue={
                                            param
                                                ? {
                                                      value: "ebb42790-571e-4d9e-b65e-d367faad5746",
                                                      label: "KKEM"
                                                  }
                                                : null
                                        }
                                        isMulti
                                        options={communitiesList.map(
                                            company => {
                                                return {
                                                    value: company.id,
                                                    label: company.title
                                                };
                                            }
                                        )}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <SimpleInput
                                        name={"muid"}
                                        value={formik.values.muid}
                                        type="text"
                                        placeholder="Referral MuID (Optional)"
                                        disabled={isLoading}
                                    />
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
                                    {isLoading ? "Validating..." : "Next Step"}
                                </PowerfulButton>
                            </div>

                            <div className={styles.accountCreationAlternative}>
                                <div>
                                    <p>
                                        Already have an account?{" "}
                                        <a href="/login">Sign In</a>
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
