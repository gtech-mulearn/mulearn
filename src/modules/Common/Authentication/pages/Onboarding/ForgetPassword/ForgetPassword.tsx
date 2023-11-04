import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "yup";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import { Form, Formik } from "formik";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { forgetPassword } from "../../../services/apis";
import styles from "./ForgetPassword.module.css";

const ForgetPassword = () => {
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const scheme = z.object({
        emailOrMuId: z
            .string()
            .required(`Email or MuId is Required`)
            .min(5, `Email or MuId must be at least 3 characters`)
            .max(100, `Email or MuId must be at most 100 characters`)
    });

    const onSubmit = (values: any) => {
        if (values.emailOrMuId.length > 0) {
            forgetPassword(values.emailOrMuId, toast, navigate, setShowLoader);
        } else {
            toast({
                title: "Error",
                description: "Please enter your email or muid",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <>
            <OnboardingTemplate>
                <OnboardingHeader
                    title={"Forgot Password"}
                    desc={"Don't worry, enter your muid to reset your password"}
                />
                <Formik
                    initialValues={{
                        emailOrMuId: ""
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
                                            value={formik.values.emailOrMuId}
                                            name="emailOrMuId"
                                            placeholder="Email or MuId"
                                            type="text"
                                            disabled={showLoader}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.submit}>
                                        <PowerfulButton
                                            type="submit"
                                            isLoading={showLoader}
                                        >
                                            Reset password
                                        </PowerfulButton>
                                        <PowerfulButton
                                            type="button"
                                            onClick={() => navigate("/login")}
                                        >
                                            Go Back
                                        </PowerfulButton>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>
            </OnboardingTemplate>
        </>
    );
};

export default ForgetPassword;
