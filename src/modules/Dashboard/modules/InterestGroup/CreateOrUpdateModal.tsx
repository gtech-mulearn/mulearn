import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import Modal from "../CollegeLevels/components/Modal";

import { createInterestGroups, editInterestGroups } from "./apis";
import { modalTypes } from "./InterestGroup";
import { getIGDetails } from "./apis";

type Props = {
    id?: string;
    setCurrModal: Dispatch<SetStateAction<modalTypes>>;
    toast: (options?: UseToastOptions | undefined) => ToastId;
};

const CreateOrUpdateModal = ({ id, setCurrModal, toast }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [prefill, setPrefill] = useState({
        igName: "",
        igCode: "",
        igIcon: ""
    });

    useEffect(() => {
        try {
            getIGDetails(id, val => {
                setPrefill({
                    igName: val.name,
                    igCode: val.code,
                    igIcon: val.icon
                });
            });
        } catch (err) {
            toast({
                title: "Something went wrong",
                status: "error"
            });
        }
    }, []);
    return (
        <Modal
            onClose={setCurrModal}
            header={id ? "Edit Interest Group" : "Create a new Interest Group"}
            paragraph={""}
        >
            <Formik
                enableReinitialize
                initialValues={{ ...prefill }}
                validationSchema={Yup.object({
                    igName: Yup.string()
                        .max(50, "Must be 50 characters or less")
                        .required("Required"),
                    igCode: Yup.string()
                        .max(50, "Must be 50 characters or less")
                        .required("Required"),
                    igIcon: Yup.string()
                        .max(50, "Must be 50 characters or less")
                        .required("Required")
                })}
                onSubmit={async values => {
                    if (id)
                        //Checking if its edit or create
                        await editInterestGroups(
                            values.igName,
                            id,
                            values.igCode,
                            values.igIcon,
                            msg => toast({ status: "error", title: msg }),
                            toast
                        );
                    else
                        await createInterestGroups(
                            values.igName,
                            values.igCode,
                            values.igIcon,
                            toast
                        );

                    setCurrModal(null);
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormikTextInput
                            name="igName"
                            label="IG Name"
                            placeholder="Enter Interest Group Name"
                        />
                        <FormikTextInput
                            name="igCode"
                            label="IG Code"
                            placeholder="Enter Interest Group Code"
                        />
                        <FormikTextInput
                            name="igIcon"
                            label="IG Icon"
                            placeholder="Enter Interest Group Icon"
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection:
                                    window.innerWidth < 768 ? "column" : "row",
                                justifyContent: "space-between",
                                gap: "1rem",
                                width: "min(25rem,80vw)"
                            }}
                        >
                            <PowerfulButton
                                children="Cancel"
                                type="button"
                                onClick={() => setCurrModal(null)}
                                style={{
                                    background: "#eff1f9",
                                    color: "#456ff6",
                                    width: "100%"
                                }}
                            />
                            <PowerfulButton
                                children="Submit"
                                type="submit"
                                style={{ width: "100%" }}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default CreateOrUpdateModal;
