import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { updateRoleType } from "../apis";

type Props = {
    onClose: any;
    users?: { value: string; label: string }[];
    roles?: { value: string; label: string }[];
    rowId: string;
};

const EditModal = (props: Props) => {
    const toast = useToast();
    const errHandler = (err: any) => {
        toast({
            title: "Something went wrong",
            description: err.toString(),
            status: "error",
            duration: 3000,
            isClosable: true
        });
    };
    const succHandler = (msg: any) => {
        toast({
            title: "Something went wrong",
            description: msg.toString(),
            status: "success",
            duration: 3000,
            isClosable: true
        });
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
                    else console.log(values);
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

export default EditModal;
