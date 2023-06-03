import { useNavigate } from "react-router-dom";
import { createTask } from "./TaskApis";
import styles from "../../../../components/MuComponents/FormikComponents/form.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikSelect, FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { useToast } from "@chakra-ui/react";

type Props = {};

const TaskCreate = (props: Props) => {
    const navigate = useNavigate();
    const toast = useToast();

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
        description: Yup.string().min(4, "Too Short!").max(100, "Too Long!"),
        channel_id: Yup.number(),
        type_id: Yup.number(),
        level_id: Yup.number(),
        ig_id: Yup.number()
    });

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>IG Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        hashtag: "",
                        title: "",
                        karma: "",
                        usage_count: "",
                        active: "",
                        variable_karma: "",
                        description: "",
                        channel_id: "",
                        type_id: "",
                        level_id: "",
                        ig_id: ""
                    }}
                    validationSchema={taskEditSchema}
                    onSubmit={values => {
                        createTask(
                            values.hashtag,
                            values.title,
                            values.karma,
                            values.usage_count,
                            values.active,
                            values.variable_karma,
                            values.description,
                            values.channel_id,
                            values.type_id,
                            values.level_id,
                            values.ig_id
                        );
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
                        <FormikTextInput
                            label="Usage Count"
                            name="usage_count"
                            type="number"
                            placeholder="No. of times to be used"
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
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="..."
                        />
                        <FormikTextInput
                            label="Channel ID"
                            name="channel_id"
                            type="text"
                            placeholder="..."
                        />
                        <FormikTextInput
                            label="Type ID"
                            name="type_id"
                            type="text"
                            placeholder="..."
                        />
                        <FormikTextInput
                            label="Level ID"
                            name="level_id"
                            type="text"
                            placeholder="..."
                        />
                        <FormikTextInput
                            label="IG ID"
                            name="ig_id"
                            type="text"
                            placeholder="..."
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

export default TaskCreate;
