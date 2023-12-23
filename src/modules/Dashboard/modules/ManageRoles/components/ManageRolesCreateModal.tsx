import { createManageRoles, isRoleUnique } from "../apis";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButton.module.css";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import toast from "react-hot-toast";

type Props = {
    id: string;
    onClose: any;
    values: string[];
};

const ManageRolesCreateModal = (props: Props) => {
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
                    .required("Required")
                    .test(
                        "unique role name",
                        "role name already exists",
                        async value => {
                            return !isRoleUnique(value, props.values);
                        }
                    ),
                description: Yup.string().max(
                    100,
                    "Must be 100 characters or less"
                )
            })}
            onSubmit={values => {
                (async () => {
                    await createManageRoles(values.title, values.description);

                    toast.success("Role created");
                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.Form}>
                <FormikTextInput
                    label="Role Name"
                    name="title"
                    type="text"
                    placeholder="Enter a title"
                    required
                />
                <FormikTextInput
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Enter a description"
                />
                <div className={styles.ButtonContainer}>
                    <button
                        className={`${mustyles.btn} ${styles.Decline}`}
                        onClick={() => {
                            props.onClose(null);
                        }}
                    >
                        Decline
                    </button>
                    <button
                        className={`${mustyles.btn} ${styles.Confirm}`}
                        type="submit"
                    >
                        Confirm
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default ManageRolesCreateModal;
