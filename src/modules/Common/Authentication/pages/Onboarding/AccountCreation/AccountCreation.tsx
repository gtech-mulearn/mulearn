import styles from "./AccountCreation.module.css";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { validate } from "../../../services/newOnboardingApis";
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


const animatedComponents = makeAnimated();

const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    countryCode: "+91",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    muid: "",
    communities: []
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
        .min(6, `Password must be at least 6 characters`),
    confirmPassword: z
        .string()
        .required(`Password is Required`)
        .min(6, `Password must be at least 6 characters`)
        .max(100, `Password must be at most 100 characters`)
        .test('passwords-match', 'Passwords are not matching', function (value) {
            return this.parent.password === value;
        })
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
    const [isTncChecked, setTncChecked] = useState(false);

    const [communitiesList, setCommunitiesList] = useState([
        { id: "", title: "" }
    ]);

    useEffect(() => {
        getCommunities({
            setCommunityAPI: setCommunitiesList,
            setIsLoading: setIsLoading
        });
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

        console.log(values)

        const userData: {
            first_name: any;
            last_name: any;
            email: any;
            mobile: any;
            password: any;
            param: string | null;
            communities: any;
            referral?: { muid: string };
        } = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            mobile: values.phoneNumber,
            password: values.password,
            param: param,
            communities: values.communities,
        };

        if (values.muid) {
            userData.referral = { muid: values.muid };
        } else if (referralId) {
            userData.referral = { muid: referralId };
        }

        const isSuccess = await validate({
            userData: userData,
            setIsSubmitting: setIsLoading,
            toast: toast
        });
        if (isSuccess) navigate("/role", { state: userData });
    };

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Welcome! Create Account"}
                desc={"Please enter the user informations"}
            />
            <Formik
                initialValues={initialValues}
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
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        placeholder="Email id"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className={styles.accountCreationName}>
                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"firstName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            placeholder="First Name"
                                            value={formik.values.firstName}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"lastName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            value={formik.values.lastName}
                                            placeholder="Last Name"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className={styles.col_2}>
                                    <select
                                        style={{
                                            width: "15%",
                                            height: "40px",
                                            borderRadius: "5px",
                                            textAlign: "center"
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
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            type="number"
                                            required
                                            disabled={isLoading}
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
                                                    formik.values.confirmPassword
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
                                        placeholder="Refferal Id"
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

                                <PowerfulButton
                                    type="submit"
                                    style={{ marginTop: "10px" }}
                                    isLoading={isLoading}
                                >
                                    {isLoading
                                        ? "Validating..."
                                        : "Next Step"}
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
