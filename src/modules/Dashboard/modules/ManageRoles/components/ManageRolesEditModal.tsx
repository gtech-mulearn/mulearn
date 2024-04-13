import { useEffect, useState } from "react";
import { editManageRoles, getManageRolesDetails } from "../apis";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButton.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

type Props = {
    id: string;
    onClose: any;
    values: string[];
};

const ManageRolesEditModal = (props: Props) => {
    interface IData {
        title: string;
        description: string;
    }
    const [data, setData] = useState<IData>({
        title: "",
        description: ""
    });
    const id = props.id;

    useEffect(() => {
        getManageRolesDetails(id, setData);
    }, []);
    if (!data.title) return <MuLoader />;
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                title: data.title,
                description: data.description
            }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .required("Required"),
                description: Yup.string().max(
                    30,
                    "Must be 30 characters or less"
                )
            })}
            onSubmit={values => {
                (async () => {
                    await editManageRoles(id, values.title, values.description);
                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.Form}>
                <FormikTextInput
                    label=""
                    name="title"
                    type="text"
                    placeholder="Role title"
                />
                <FormikTextInput
                    label=""
                    name="description"
                    type="text"
                    placeholder="Role description"
                />

                <div className={styles.ButtonContainer}>
                    <PowerfulButton
                        type="button"
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

export default ManageRolesEditModal;
