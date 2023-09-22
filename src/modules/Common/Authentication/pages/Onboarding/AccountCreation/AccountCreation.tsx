import styles from "./AccountCreation.module.css";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";

import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useState } from "react";

import { createAccount } from "../../../services/onboardingApis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const inputObject = {
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password"
};

const scheme = z.object({
    email: z
        .string()
        .required(`${inputObject.email} is Required`)
        .min(5, `${inputObject.email} must be at least 3 characters`)
        .max(100, `${inputObject.email} must be at most 100 characters`),
    firstName: z
        .string()
        .required(`${inputObject.firstName} is Required`)
        .min(3, `${inputObject.firstName} must be at least 3 characters`)
        .max(100, `${inputObject.firstName} must be at most 100 characters`),
    lastName: z
        .string()
        .required(`${inputObject.lastName} is Required`)
        .min(3, `${inputObject.lastName} must be at least 3 characters`)
        .max(100, `${inputObject.lastName} must be at most 100 characters`),
    phoneNumber: z
        .string()
        .required(`${inputObject.phoneNumber} is Required`)
        .min(10, `${inputObject.phoneNumber} must be at least 10 characters`)
        .max(10, `${inputObject.phoneNumber} must be at most 10 characters`),
    password: z
        .string()
        .required(`${inputObject.password} is Required`)
        .min(8, `${inputObject.password} must be at least 8 characters`),
    confirmPassword: z
        .string()
        .required(`${inputObject.confirmPassword} is Required`)
        .oneOf([z.ref("password"), ""], "Passwords must match")
});

export default function AccountCreation() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [isVisible, setVisible] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    const onsubmit = (values: any, actions: any) => {
        const userData = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            mobile: values.phoneNumber,
            password: values.password
        };
        createAccount({
            userData: userData,
            setIsSubmitting: setSubmitting,
            toast: toast,
            navigate: navigate
        });
    };

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Welcome ! Create Account"}
                desc={"Please enter the user informations"}
            />
            <Formik
                initialValues={Object.fromEntries(
                    Object.keys(inputObject).map(key => [key, ""])
                )}
                validationSchema={scheme}
                onSubmit={onsubmit}
            >
                {formik => (
                    <Form>
                        <div className={styles.accountCreationContainer}>
                            <div className={styles.accountCreationInputs}>
                                <div>
                                    <SimpleInput
                                        name={"email"}
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        placeholder="Email id"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className={styles.accountCreationName}>
                                    <div>
                                        <SimpleInput
                                            name={"firstName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            placeholder="First Name"
                                            value={formik.values.firstName}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <SimpleInput
                                            name={"lastName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            value={formik.values.lastName}
                                            placeholder="Last Name"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <SimpleInput
                                        name={"phoneNumber"}
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        type="number"
                                        placeholder="+91"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className={styles.accountCreationPassword}>
                                    <div>
                                        <SimpleInput
                                            name={"password"}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            type={
                                                isVisible ? "text" : "password"
                                            }
                                            placeholder="Password"
                                            required
                                            disabled={isSubmitting}
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

                                <div>
                                    <SimpleInput
                                        name={"confirmPassword"}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <PowerfulButton
                                    type="submit"
                                    style={{ marginTop: "10px" }}
                                >
                                    {isSubmitting
                                        ? "Please Wait ..."
                                        : "Create Account"}
                                </PowerfulButton>
                            </div>

                            <div className={styles.accountCreationAlternative}>
                                <div>
                                    <hr />
                                    <p>OR</p>
                                    <hr />
                                </div>
                                <PowerfulButton type="button" variant="ghost">
                                    <FcGoogle size={35} /> Sign in with google
                                </PowerfulButton>
                                <div>
                                    <p>
                                        Already have an account?{" "}
                                        <a href="">Sign In</a>
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
