import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { createRoleType, createUserType } from "../apis";

type Props = {
    onClose: any;
    users?: { value: string; label: string }[];
    roles?: { value: string; label: string }[];
    type: { value: string; label: string }[];
};

const CreateModal = (props: Props) => {
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
                type: "",
                ...(props.roles && { role: "" }),
                ...(!props.roles && { user: "" })
            }}
            validationSchema={Yup.object({
                type: Yup.string().required("Required"),
                ...(props.roles && { role: Yup.string().required("Required") }),
                ...(!props.roles && { user: Yup.string().required("Required") })
            })}
            onSubmit={values => {
                (async () => {
                    if (props.roles)
                        await createRoleType(
                            errHandler,
                            succHandler,
                            values.type,
                            values.role!
                        );
                    else
                        await createUserType(
                            errHandler,
                            succHandler,
                            values.type,
                            values.user!
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

export default CreateModal;
