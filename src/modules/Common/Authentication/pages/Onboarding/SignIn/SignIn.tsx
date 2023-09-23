import styles from "./SignIn.module.css";
import google from "../../../assets/google.png";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";

import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { login } from "../../../services/apis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const inputObject = {
    emailOrMuId: "Email or MuId",
    password: "Password"
};

const scheme = z.object({
    emailOrMuId: z
        .string()
        .required(`${inputObject.emailOrMuId} is Required`)
        .min(5, `${inputObject.emailOrMuId} must be at least 3 characters`)
        .max(100, `${inputObject.emailOrMuId} must be at most 100 characters`),
    password: z
        .string()
        .required(`${inputObject.password} is Required`)
        .min(8, `${inputObject.password} must be at least 8 characters`)
});

export default function SignIn() {
    const toast = useToast();
    const navigate = useNavigate();

    let ruri = window.location.href.split("=")[1];

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: any) => {
        if (values.emailOrMuId === "" || values.password === "") return;

        login(
            values.emailOrMuId,
            values.password,
            toast,
            navigate,
            setIsLoading,
            ruri
        );
    };

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Hello ! Welcome back"}
                desc={
                    "Hey Welcome, please enter your details to<br/>sign in your account"
                }
            />
            <Formik
                initialValues={Object.fromEntries(
                    Object.keys(inputObject).map(key => [key, ""])
                )}
                validationSchema={scheme}
                onSubmit={onSubmit}
            >
                {formik => (
                    <div>
                        <div className={styles.wrapper}>
                            <Form>
                                {Object.entries(inputObject).map(
                                    ([key, value]) => (
                                        <div
                                            className={styles.inputBox}
                                            key={key}
                                        >
                                            <SimpleInput
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values[
                                                        key as keyof typeof inputObject
                                                    ]
                                                }
                                                name={key}
                                                placeholder={value}
                                                type={value.toLowerCase()}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    )
                                )}
                                <div className={styles.forgot}>
                                    <p>
                                        Forgot your <span>Password</span>
                                    </p>
                                    <p>
                                        Login with <span>OTP</span>
                                    </p>
                                </div>
                                <div className={styles.submit}>
                                    <PowerfulButton
                                        type="submit"
                                        isLoading={isLoading}
                                    >
                                        Submit
                                    </PowerfulButton>
                                    {/* <p>OR</p>
                                    <PowerfulButton
                                        variant="ghost"
                                        className={styles.google}
                                        type="button"
                                    >
                                        <FcGoogle size={30} />
                                        <p>Sign in with google</p>
                                    </PowerfulButton> */}
                                </div>
                                <div className={styles.noAccount}>
                                    <PowerfulButton variant="link">
                                        Don't have an account?
                                        <a href="">Sign Up</a>
                                    </PowerfulButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </OnboardingTemplate>
    );
}
