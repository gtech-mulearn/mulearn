import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";
import { ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import Modal from "../CollegeLevels/components/Modal";

import { createDepartment, getDepartments } from "./apis";
import { modalTypes } from "../../utils/enums";

const CreateOrUpdateDepartmentModal = ({
    setCurrModal,
    setDepartments,
    setIsLoading,
    toast
}: {
    setCurrModal: Dispatch<SetStateAction<modalTypes | null>>;
    setDepartments: Dispatch<SetStateAction<any[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    toast: (options?: UseToastOptions | undefined) => ToastId;
}) => {
    return (
        <Modal onClose={setCurrModal} header="Create a new department">
            <Formik
                initialValues={{
                    deptName: ""
                }}
                validationSchema={Yup.object({
                    deptName: Yup.string()
                        .max(50, "Must be 50 characters or less")
                        .required("Required")
                })}
                onSubmit={async values => {
                    await createDepartment(values.deptName, toast);
                    getDepartments({
                        setDepartments: setDepartments,
                        setIsLoading: setIsLoading
                    });
                    setCurrModal(null);
                }}
            >
                {({ handleSubmit, handleChange }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormikTextInput
                            label="Name"
                            name="deptName"
                            type="text"
                            placeholder="Enter department name"
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
