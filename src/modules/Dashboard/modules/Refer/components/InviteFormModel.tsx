import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";

type Props = {
    id?: string;
    inviteType?: string;
    onClose: any;
    values?: string[];
};

const InviteFormModel = (props: Props) => {
    const toast = useToast();

    const emailValidateSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^[^/<>[\]{}|]*$/, 'Invalid characters detected') // Custom validation for invalid characters
            .email("Invalid email address")
            .required("Required")
    });
    return (
        <Formik
            initialValues={{
                email: ""
            }}
            validationSchema={emailValidateSchema}
            onSubmit={async values => {
                try {
                    const response = await privateGateway.post(
                        dashboardRoutes.createInviteEmail,
                        {
                            email: values.email,
                            invite_type: props.inviteType,
                        }
                    );
                    const message: any = response?.data;
                    console.log(message);

                    toast({
                        title: "Successful",
                        status: "success",
                        duration: 3000,
                        isClosable: true
                    });

                    props.onClose(null);
                } catch (error: unknown) {
                    const err = error as AxiosError<any>;
                    console.error("Error sending email:", error);
                    const message = err?.response?.data?.message?.general || "";
                    toast({
                        title: "Email Not Sent",
                        description: message,
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                }
            }}
        >
            <Form className={styles.Form}>
                <FormikTextInput
                    name="email"
                    type="email"
                    placeholder="Enter a email address"
                />
                <div className={styles.ButtonContainer}>
                    <PowerfulButton
                        className={`${mustyles.btn} ${styles.Decline}`}
                        onClick={() => {
                            props.onClose(null);
                        }}
                    >
                        Decline
                    </PowerfulButton>
                    <PowerfulButton
                        className={`${mustyles.btn} ${styles.Confirm}`}
                        type="submit"
                    >
                        Confirm
                    </PowerfulButton>
                </div>
            </Form>
        </Formik>
    );
};

export default InviteFormModel;
