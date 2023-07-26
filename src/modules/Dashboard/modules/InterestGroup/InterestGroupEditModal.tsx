import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from "./InterestGroup.module.css"
import { RiCloseLine } from 'react-icons/ri';
import { editInterestGroups } from "./apis";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { modalStatesType } from './InterestGroup';
// ModalProps type definition
interface ModalProps {
  isOpen:modalStatesType ;
  onClose: Dispatch<SetStateAction<modalStatesType>>;
  id:string
}

const InterestGroupEditModal: React.FC<ModalProps> = ({ isOpen, onClose,id }) => {
  if (isOpen!=='edit') return null;
  const toast = useToast();
  const [hasError, setHasError] = useState(false);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContainerRow}>
            <button
              className={styles.closeBtn} onClick={() => {
                onClose(null);
              }}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
          </div>
          <div className={styles.modalContainerItemRow}>
            <span className={styles.IGCreate}>Edit Interest Group</span>
          </div>
          <Formik
            initialValues={{
              igName: ""
              // acceptedTerms: false, // added for our checkbox
              // jobType: "" // added for our select
            }}
            validationSchema={Yup.object({
              igName: Yup.string()
                .max(30, "Must be 30 characters or less")
                .required("Required")
              // firstName: Yup.string()
              //     .max(15, "Must be 15 characters or less")
              //     .required("Required"),
              // lastName: Yup.string()
              //     .max(20, "Must be 20 characters or less")
              //     .required("Required"),
              // email: Yup.string()
              //     .email("Invalid email address")
              //     .required("Required"),
              // acceptedTerms: Yup.boolean()
              //     .required("Required")
              //     .oneOf(
              //         [true],
              //         "You must accept the terms and conditions."
              //     ),
              // jobType: Yup.string()
              //     .oneOf(
              //         ["designer", "development", "product", "other"],
              //         "Invalid Job Type"
              //     )
              //     .required("Required")
            })}
            onSubmit={values => {
              //console.log(values.igName);
              (async ()=>{
                await editInterestGroups(
                  values.igName,
                  id
                );
                toast({
                  title: "Interest Group created",
                  status: "success",
                  duration: 3000,
                  isClosable: true
                });
                onClose(null)
              })()
              
            }}
          >
            <Form className={styles.modalContainerItemRow}>
              <span className={styles.IGCreateDesc}>Enter the new Interest Group name.</span>
              <FormikTextInput
                name="igName"
                type="text"
                placeholder="Enter the new name"
              />
              <div className={styles.modalContainerBtnRow}>
                <button type="submit" className={styles.btnSubmit}>
                  Confirm
                </button>
                <button className={styles.btnCancel}
                  onClick={() => {
                    onClose(null);
                  }}
                >
                  Decline
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default InterestGroupEditModal;
