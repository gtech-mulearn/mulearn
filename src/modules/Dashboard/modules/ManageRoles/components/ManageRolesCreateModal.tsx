import { createManageRoles } from "../apis";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css"
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css"
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";

type Props = {
    id:string
    onClose:any
};

const ManageRolesCreateModal = (props: Props) => {
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
                title: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .required("Required"),
                description: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .required("Required")
                // firstName: Yup.string()
                //     .max(15, "Must be 15 characters or less")
                //     .required("Required"),
                // lastName: Yup.string()
                //     .max(20, "Must be 20 characters or less")
                //     .required("Required"),
                // email: Yup.string()
                //     .email("Invalid email address")
                //     .required("Required"),
                // acceptedTerms: Yup.boolean()
                //     .required("Required")
                //     .oneOf(
                //         [true],
                //         "You must accept the terms and conditions."
                //     ),
                // jobType: Yup.string()
                //     .oneOf(
                //         ["designer", "development", "product", "other"],
                //         "Invalid Job Type"
                //     )
                //     .required("Required")
            })}
            onSubmit={values => {
                (async ()=>{
                    await createManageRoles(values.title, values.description);
                    toast({
                        title: "Role created",
                        status: "success",
                        duration: 3000,
                        isClosable: true
                    });
                    props.onClose(null)
                })()
                
            }}
        >
            <Form className={styles.Form}>
                {/* <FormikTextInput
                    label="Role Name"
                    name="Role Name"
                    type="text"
                    placeholder="Enter a name"
                /> */}
                <FormikTextInput
                    name="title"
                    type="text"
                    placeholder="Enter a title"
                />
                <FormikTextInput
                    name="description"
                    type="text"
                    placeholder="Enter a description"
                />

                {/* <MySelect label="Job Type" name="jobType">
                    <option value="">Select a job type</option>
                    <option value="designer">Designer</option>
                    <option value="development">Developer</option>
                    <option value="product">Product Manager</option>
                    <option value="other">Other</option>
                </MySelect>

                <MyCheckbox name="acceptedTerms">
                    I accept the terms and conditions
                </MyCheckbox> */}
                <div className={styles.ButtonContainer}>
                    <MuButton
                        className={`${mustyles.btn} ${styles.Decline}`}
                        text={"Decline"}
                        onClick={() => {
                            props.onClose(null)
                        }}
                    />
                    <MuButton
                        className={`${mustyles.btn} ${styles.Confirm}`}
                        text={"Confirm"}
                        submit={true}
                    />
                </div>
            </Form>
        </Formik>
           
    );
};

export default ManageRolesCreateModal;
