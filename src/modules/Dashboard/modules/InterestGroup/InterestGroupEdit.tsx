import { useEffect, useState } from "react";
import { editInterestGroups, getIGDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";

type Props = {};

const InterestGroupEdit = (props: Props) => {
    const [name, setName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
	const toast = useToast();
    useEffect(() => {
		getIGDetails(id, setName);
    }, []);

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>IG Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        igName: name
                    }}
                    validationSchema={Yup.object({
                        igName: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        editInterestGroups(values.igName, id);
                        toast({
                            title: "Interest Group created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                        navigate("/interest-groups");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="IG Name"
                            name="igName"
                            type="text"
                            placeholder="Enter a name"
                        />
                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/interest-groups");
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

export default InterestGroupEdit;