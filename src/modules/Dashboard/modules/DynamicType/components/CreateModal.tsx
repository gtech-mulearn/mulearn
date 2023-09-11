import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { createRoleType } from "../apis";

type Props = {
    onClose: any;
    roles: { value: string; label: string }[];
    type: { value: string; label: string }[];
};

const CreateModal = (props: Props) => {
    const toast = useToast();

    return (
        <Formik
            initialValues={{
                type: "",
                role: ""
                // acceptedTerms: false, // added for our checkbox
                // jobType: "" // added for our select
            }}
            validationSchema={Yup.object({
                type: Yup.string().required("Required"),
                role: Yup.string().required("Required")
            })}
            onSubmit={values => {
                (async () => {
                    await createRoleType(
                        (err: any) => {
                            toast({
                                title: "Something went wrong",
                                description: err.toString(),
                                status: "error",
                                duration: 3000,
                                isClosable: true
                            });
                        },
                        values.type,
                        values.role
                    );
                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.Form}>
                <FormikReactSelect
                    name="type"
                    options={props.type}
                    label="Type"
                    placeholder="Select the type"
                    isClearable
                    isSearchable
                />
                <FormikReactSelect
                    name="role"
                    options={props.roles}
                    label="Role"
                    placeholder="Select the role"
                    isClearable
                    isSearchable
                />

                <div className={styles.ButtonContainer}>
                    <MuButton
                        className={`${mustyles.btn} ${styles.Decline}`}
                        text={"Decline"}
                        onClick={() => {
                            props.onClose(null);
                        }}
                    />
                    <MuButton
                        className={`${mustyles.btn} ${styles.Confirm}`}
                        text={"Confirm"}
                        submit={true}
                        type="submit"
                    />
                </div>
            </Form>
        </Formik>
    );
};

export default CreateModal;
