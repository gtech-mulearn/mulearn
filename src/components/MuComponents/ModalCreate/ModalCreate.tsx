import styles from './ModalCreateComponent.module.css'
import React, { Dispatch, SetStateAction, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from '../MuButtons/MuButton';

// ModalProps type definition
interface ModalProps {
    isOpen: boolean;//for opening modal.
    onClose: Dispatch<SetStateAction<boolean>>;//will change the open state of modal to close.
    heading: string | undefined;//Title of the modal *Required
    content?: string | undefined;//Content of the modal *not required
    placeholder: string | undefined;//Placeholder for input box , for better user experience.
    inputType: string | undefined;//Type of the textfield. Eg: text,password,file
    name: string | undefined;//name of the parameter.
    toastMsg: string | undefined;//message to be toasted. *Required
    btnPrimaryText: string | undefined;//Message to be displayed on the primary button *Required
    btnSecondaryText: string | undefined;//Message to be displayed on the secondary button *Required
    navigateRoute: string;//Location to where the user is to be direcetd.
    onRender: (name: string, onClose: Dispatch<SetStateAction<boolean>>) => void;//function which is to be called.
}

const ModalCreateComponent: React.FC<ModalProps> = ({ isOpen, onClose, content, heading, placeholder, inputType, name, onRender, toastMsg, navigateRoute, btnPrimaryText, btnSecondaryText }) => {
    if (!isOpen) return null;
    const toast = useToast();
    const navigate = useNavigate();

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContainer}>
                    <div className={styles.modalContainerRow}>
                        <PowerfulButton
                            className={styles.closeBtn} onClick={() => {
                                onClose(false);
                            }}>
                            <RiCloseLine style={{ marginBottom: "-3px" }} />
                        </PowerfulButton>
                    </div>
                    <div className={styles.modalContainerItemRow}>
                        <span className={styles.IGCreate}>{heading}</span>
                    </div>
                    <Formik
                        initialValues={{
                            igName: ""
                        }}
                        validationSchema={Yup.object({
                            igName: Yup.string()
                                .max(30, "Must be 30 characters or less")
                                .required("Required")
                        })}
                        onSubmit={
                            values => {
                                console.log(values.igName);
                                onRender(values.igName, onClose);
                                toast({
                                    title: toastMsg,
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true
                                });
                                navigate(navigateRoute);
                            }
                        }
                    >
                        <Form className={styles.modalContainerItemRow}>
                            <span className={styles.IGCreateDesc}>{content}</span>
                            <FormikTextInput
                                name={name}
                                type={inputType}
                                placeholder={placeholder}
                            />
                            <div className={styles.modalContainerBtnRow}>
                                <PowerfulButton type="submit" className={styles.btnSubmit}>
                                    {btnPrimaryText}
                                </PowerfulButton>
                                <PowerfulButton className={styles.btnCancel}
                                    onClick={() => {
                                        onClose(false);
                                    }}
                                >
                                    {btnSecondaryText}
                                </PowerfulButton>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ModalCreateComponent;
