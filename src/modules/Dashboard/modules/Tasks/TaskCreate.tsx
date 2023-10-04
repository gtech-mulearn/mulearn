import { useNavigate } from "react-router-dom";
import { createTask, getUUID } from "./TaskApis";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikCheckBox,
    FormikSelect,
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

const TaskCreate = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [uuidData, setuuidData] = useState<{ [index: string]: any[] } | null>(
        null
    );

    useEffect(() => {
        (async () => {
            try {
                setuuidData(await getUUID());
            } catch (err) {
                console.log(err as AxiosError);
            }
        })();
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
            .truncate(),
        usage_count: Yup.number()
            .truncate()
            .required("Mention the number of uses"),

        active: Yup.boolean().required("Select an option"),
        variable_karma: Yup.boolean().required("Select an option"),

        description: Yup.string()
            .min(4, "Too Short!")
            .max(100, "Too Long!")
            .required("A description is required"),
        channel_id: Yup.string().required("Select a Channel"),
        type_id: Yup.string().required("Select a Type"),
        level_id: Yup.string().nullable(),
        ig_id: Yup.string().nullable(),
        organization_id: Yup.string().nullable()
    });

    if (!uuidData) return <MuLoader />;

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
                        active: false,
                        variable_karma: false,
                        description: "",
                        channel_id: "",
                        type_id: "",
                        level_id: "",
                        ig_id: "",
                        organization_id: ""
                    }}
                    validationSchema={taskEditSchema}
                    onSubmit={values => {
                        createTask(
                            values.hashtag,
                            values.title,
                            values.karma,
                            values.usage_count,
                            values.active ? "True" : "False",
                            values.variable_karma ? "True" : "False ",
                            values.description,
                            values.channel_id,
                            values.type_id,
                            values.level_id,
                            values.ig_id,
                            values.organization_id,
                            toast
                        );

                        setTimeout(() => {
                            navigate("/dashboard/tasks");
                        }, 3000);
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="Hashtag"
                            name="hashtag"
                            type="text"
                            placeholder="#example"
                            required
                        />
                        <FormikTextInput
                            label="Title"
                            name="title"
                            type="text"
                            placeholder="Enter the title"
                            required
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
                            required
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly"
                            }}
                        >
                            <FormikCheckBox label="Active" name="active" />
                            <FormikCheckBox
                                label="Variable Karma"
                                name="variable_karma"
                            />
                        </div>

                        <FormikTextInput
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="..."
                            required
                        />
                        <FormikSelect label="Channel" name="channel_id">
                            <option value="">Select an option</option>
                            {uuidData?.channel.map(val => {
                                return (
                                    <option value={val.id}>{val.name}</option>
                                );
                            })}
                        </FormikSelect>
                        <FormikSelect label="Type" name="type_id">
                            <option value="">Select an option</option>
                            {uuidData?.type.map(val => {
                                return (
                                    <option value={val.id}>{val.title}</option>
                                );
                            })}
                        </FormikSelect>
                        <FormikSelect label="Level" name="level_id">
                            <option value="">Select an option</option>
                            {uuidData?.level.map(val => {
                                return (
                                    <option value={val.id}>{val.name}</option>
                                );
                            })}
                        </FormikSelect>
                        <FormikSelect label="IG" name="ig_id">
                            <option value="">Select an option</option>
                            {uuidData?.ig.map(val => {
                                return (
                                    <option value={val.id}>{val.name}</option>
                                );
                            })}
                        </FormikSelect>
                        <FormikSelect
                            label="Organization"
                            name="organization_id"
                        >
                            <option value="">Select an option</option>
                            {uuidData?.organization.map(val => {
                                return (
                                    <option value={val.id}>{val.title}</option>
                                );
                            })}
                        </FormikSelect>
                        <div className={styles.btn_container}>
                            <button
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/dashboard/tasks");
                                }}
                            >
                                Decline
                            </button>
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
