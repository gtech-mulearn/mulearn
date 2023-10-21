import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as z from "yup";
import OnboardingHeader from '../../../components/OnboardingHeader/OnboardingHeader';
import OnboardingTemplate from '../../../components/OnboardingTeamplate/OnboardingTemplate';
import { Form, Formik } from 'formik';
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from '@/MuLearnComponents/MuButtons/MuButton';
import { forgetPassword } from '../../../services/apis';
import styles from "./ForgetPassword.module.css"

const ForgetPassword = () => {
    const [muid, setMuid] = useState("");
    const [showLoader, setShowLoader] = useState(false)
    const navigate = useNavigate();
    const toast = useToast();

    const inputObject = {
        emailOrMuId: "Email or MuId"
    }

    const scheme = z.object({
        emailOrMuId: z
            .string()
            .required(`${inputObject.emailOrMuId} is Required`)
            .min(5, `${inputObject.emailOrMuId} must be at least 3 characters`)
            .max(
                100,
                `${inputObject.emailOrMuId} must be at most 100 characters`
            )
    });

    const onSubmit = (values: any) => {
        if (values.emailOrMuId.length > 0) {
            forgetPassword(
                values.emailOrMuId,
                toast,
                navigate,
                setShowLoader
            );
        }
    }

    return (
        <>
            <OnboardingTemplate>
                <OnboardingHeader
                    title={"Forgot Password"}
                    desc={
                        "Don't worry, enter your muid to reset your password"
                    }
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
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.submit}>
                                        <PowerfulButton
                                            type="submit"
                                            onClick={e => {
                                                e.preventDefault();
                                            }}
                                            isLoading={showLoader}
                                        >
                                            Reset password
                                        </PowerfulButton>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>
            </OnboardingTemplate>

        </>
    )
}

export default ForgetPassword