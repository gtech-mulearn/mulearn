import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";

type Props = {
    onClose: any;
};

const CreateModal = (props: Props) => {
    const toast = useToast();

    return (
        <Formik
            initialValues={{
                title: "",
                description: ""
                // acceptedTerms: false, // added for our checkbox
                // jobType: "" // added for our select
            }}
            validationSchema={Yup.object({
                type: Yup.string().required("Required"),
                role: Yup.string().required("Required")
            })}
            onSubmit={values => {
                (async () => {
                    console.log(values);
                    // await createManageRoles(values.title, values.description);
                    // toast({
                    //     title: "Role created",
                    //     status: "success",
                    //     duration: 3000,
                    //     isClosable: true
                    // });
                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.Form}>
                {/* <FormikTextInput
                    name="title"
                    type="text"
                    placeholder="Enter a title"
                />
                <FormikTextInput
                    name="description"
                    type="text"
                    placeholder="Enter a description"
                /> */}

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
