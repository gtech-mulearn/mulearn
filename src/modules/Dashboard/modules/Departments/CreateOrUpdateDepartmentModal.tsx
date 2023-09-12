import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import Modal from "../CollegeLevels/components/Modal";

import { createDepartment, getDepartments, updateDepartment } from "./apis";
import { modalTypes } from "../../utils/enums";

const CreateOrUpdateDepartmentModal = ({
    id,
    title,
    setCurrModal,
    setDepartments,
    setIsLoading,
    toast
}: {
    id?: string;
    title?: string;
    setCurrModal: Dispatch<SetStateAction<modalTypes | null>>;
    setDepartments: Dispatch<SetStateAction<any[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    toast: (options?: UseToastOptions | undefined) => ToastId;
}) => {
    return (
        <Modal
            onClose={setCurrModal}
            header={id ? "Edit department" : "Create a new department"}
        >
            <Formik
                initialValues={{ title: title || "" }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(50, "Must be 50 characters or less")
                        .required("Required")
                })}
                onSubmit={async values => {
                    id
                        ? await updateDepartment(id!, values.title, toast)
                        : await createDepartment(values.title, toast);
                    getDepartments({
                        setDepartments: setDepartments,
                        setIsLoading: setIsLoading
                    });
                    setCurrModal(null);
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormikTextInput
                            label={`${id ? "New " : ""}Name`}
                            name="title"
                            type="text"
                            placeholder={`Enter ${
                                id ? "new " : ""
                            }department name`}
                        />
                        <PowerfulButton
                            children="Submit"
                            type="submit"
                            style={{ margin: "20px 0 0 0" }}
                        />
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CreateOrUpdateDepartmentModal;
