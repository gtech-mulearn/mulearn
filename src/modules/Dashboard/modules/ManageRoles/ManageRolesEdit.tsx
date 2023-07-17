import { useEffect, useState } from "react";
import { editManageRoles, getManageRolesDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";

type Props = {};

const ManageRolesEdit = (props: Props) => {
    const [name, setName] = useState("");
    interface IData {
        title: string;
        description: string;
    }

    const [data, setData] = useState<IData>({
        title: "",
        description: ""
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        getManageRolesDetails(id, setData);
    }, []);

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>Role Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        // igName: name
                        title: data.title,
                        description: data.description
                    }}
                    validationSchema={Yup.object({
                        // igName: Yup.string()
                        //     .max(30, "Must be 30 characters or less")
                        //     .required("Required"),
                        title: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required"),
                        description: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        editManageRoles(
                            id,
                            values.title,
                            values.description,
                            toast
                        );

                        navigate("/manage-roles");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="Role Title"
                            name="title"
                            type="text"
                            placeholder="Enter a title"
                        />
                        <FormikTextInput
                            label="Role Description"
                            name="description"
                            type="text"
                            placeholder="Enter a description"
                        />

                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/manage-roles");
                                }}
                            />
                            <button type="submit" className={styles.btn_submit}>
                                Confirm
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default ManageRolesEdit;
