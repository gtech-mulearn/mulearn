import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, getTaskDetails } from "./TaskApis";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import styles from "../../../../components/MuComponents/FormikComponents/form.module.css";
import { Form, Formik } from "formik";
import { FormikSelect, FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";

type Props = {};

const TaskEdit = (props: Props) => {
    const [data, setData] = useState<string[]>([]);
    const { id } = useParams();
	const navigate = useNavigate();
	const toast = useToast();

    useEffect(() => {
        getTaskDetails(id, setData);
    }, []);

	const taskEditSchema = Yup.object().shape({
        hashtag: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(30, "Too Long!"),
        title: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        karma: Yup.number()
            .positive("Karma should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(9999, "Should not exceed 4 digits")
            .truncate()
            .required("Karma is required"),
        usage_count: Yup.number()
            .truncate()
            .required("Mention the number of uses"),
        active: Yup.boolean().required("Select an option"),
        variable_karma: Yup.boolean().required("Select an option"),
    });

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>IG Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        hashtag: data.hashtag,
                        title: data.title,
                        karma: data.karma,
                        active: data.active,
                        variable_karma: data.variable_karma,
                        usage_count: data.usage_count,
                    }}
                    validationSchema={taskEditSchema}
                    onSubmit={values => {
                        editTask(values.hashtag, values.title, values.karma, values.active, values.variable_karma, values.usage_count, id);
                        toast({
                            title: "Interest Group created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                        navigate("/tasks");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="Hashtag"
                            name="hashtag"
                            type="text"
                            placeholder="#example"
                        />
                        <FormikTextInput
                            label="Title"
                            name="title"
                            type="text"
                            placeholder="Enter the title"
                        />
                        <FormikTextInput
                            label="Karma"
                            name="karma"
                            type="number"
                            placeholder="Karma points"
                        />
                        <FormikSelect label="Active" name="active">
                            <option value="">Select an option</option>
                            <option value="1">True</option>
                            <option value="0">False</option>
                        </FormikSelect>
                        <FormikSelect
                            label="Variable Karma"
                            name="variable_karma"
							>
                            <option value="">Select an option</option>
                            <option value="1">True</option>
                            <option value="0">False</option>
                        </FormikSelect>
                        <FormikTextInput
                            label="Usage Count"
                            name="usage_count"
                            type="number"
                            placeholder="No. of times to be used"
                        />
                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/tasks");
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

export default TaskEdit;
