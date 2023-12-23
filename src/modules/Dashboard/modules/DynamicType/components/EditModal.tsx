import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButton.module.css";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { updateRoleType, updateUserType } from "../apis";
import toast from "react-hot-toast";

type Props = {
    onClose: any;
    users?: { value: string; label: string }[];
    roles?: { value: string; label: string }[];
    rowId: string;
};

const EditModal = (props: Props) => {
    const errHandler = (err: any) => {
        toast.error("Something Went Wrong");
        toast.error(err);
    };
    const succHandler = (msg: any) => {
        toast.success(msg.toString());
    };
    return (
        <Formik
            initialValues={{
                ...(props.roles && { role: "" }),
                ...(!props.roles && { user: "" })
                // acceptedTerms: false, // added for our checkbox
                // jobType: "" // added for our select
            }}
            validationSchema={Yup.object({
                ...(props.roles && { role: Yup.string().required("Required") }),
                ...(!props.roles && { user: Yup.string().required("Required") })
            })}
            onSubmit={values => {
                (async () => {
                    if (props.roles)
                        await updateRoleType(
                            errHandler,
                            succHandler,
                            props.rowId,
                            values.role!
                        );
                    else
                        await updateUserType(
                            errHandler,
                            succHandler,
                            props.rowId,
                            values.user!
                        );
                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.Form}>
                {!!props.roles ? (
                    <FormikReactSelect
                        name="role"
                        options={props.roles}
                        label="Role"
                        placeholder="Select the role"
                        isClearable
                        isSearchable
                    />
                ) : (
                    <FormikTextInput
                        label="User Muid or Email"
                        name="user"
                        type="text"
                        placeholder="Enter a muid or email"
                    />
                )}

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

export default EditModal;
