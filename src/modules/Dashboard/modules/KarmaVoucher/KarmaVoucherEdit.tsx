import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, getTaskDetails, getUUID } from "./KarmaVoucherApis";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { Form, Formik } from "formik";
import {
    FormikSelect,
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AxiosError } from "axios";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

type Props = {};

const KarmaVoucherEdit = (props: Props) => {
    const [data, setData] = useState<TaskEditInterface>({});
    const [uuidData, setuuidData] = useState<{ [index: string]: any[] } | null>(
        null
    );
    const { id } = useParams();
    const firstFetch = useRef(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (firstFetch.current) {
            (async () => {
                try {
                    setuuidData(await getUUID());
                } catch (err) {
                    console.log(err as AxiosError);
                }
            })();
            getTaskDetails(id, setData);
        }
        firstFetch.current = false;

        if (uuidData && data) {
            setLoading(false);
        }
    }, [uuidData, data]);

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
        channel_id: Yup.string().required("Select a channel"),
        type_id: Yup.string().required("Select a type"),
        level_id: Yup.string().required("Select a Level"),
        ig_id: Yup.string().required("Select an Interest Group"),
        organization_id: Yup.string().required("Select an Organization")
    });
    return (
        <>
            {loading ? (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            ) : (
                <div className={styles.external_container}>
                    <div className={styles.container}>
                        <h1 className={styles.text}>IG Edit Page</h1>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                hashtag: data.hashtag || "",
                                title: data.title || "",
                                karma: data.karma || "",
                                active: data.active ? "1" : "0" || "",
                                variable_karma: data.variable_karma
                                    ? "1"
                                    : "0" || "",
                                usage_count: data.usage_count || "",
                                channel_id: data.channel || "",
                                type_id: data.type || "",
                                level_id: data.level || "",
                                ig_id: data.ig || "",
                                organization_id: data.org || ""
                            }}
                            validationSchema={taskEditSchema}
                            onSubmit={values => {
                                editTask(
                                    values.hashtag,
                                    values.title,
                                    values.karma,
                                    values.active,
                                    values.variable_karma,
                                    values.usage_count,
                                    values.channel_id,
                                    values.type_id,
                                    values.level_id,
                                    values.ig_id,
                                    values.organization_id,
                                    id,
                                    toast
                                );
                                
                                setTimeout(() => {  
                                    navigate("/dashboard/tasks");
                                },4000);
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
                                <FormikSelect
                                    label="Channel"
                                    name="channel_id"
                                    disabled={!uuidData}
                                    defaultValue={data.channel}
                                >
                                    <option value="">Select an option</option>
                                    {uuidData?.channel.map(val => {
                                        return (
                                            <option value={val.id}>
                                                {val.name}
                                            </option>
                                        );
                                    })}
                                </FormikSelect>
                                <FormikSelect
                                    label="Type"
                                    name="type_id"
                                    disabled={!uuidData}
                                >
                                    <option value="">Select an option</option>
                                    {uuidData?.type.map(val => {
                                        return (
                                            <option value={val.id}>
                                                {val.title}
                                            </option>
                                        );
                                    })}
                                </FormikSelect>
                                <FormikSelect
                                    label="Level"
                                    name="level_id"
                                    disabled={!uuidData}
                                >
                                    <option value="">Select an option</option>
                                    {uuidData?.level.map(val => {
                                        return (
                                            <option value={val.id}>
                                                {val.name}
                                            </option>
                                        );
                                    })}
                                </FormikSelect>
                                <FormikSelect
                                    label="IG"
                                    name="ig_id"
                                    disabled={!uuidData}
                                >
                                    <option value="">Select an option</option>
                                    {uuidData?.ig.map(val => {
                                        return (
                                            <option value={val.id}>
                                                {val.name}
                                            </option>
                                        );
                                    })}
                                </FormikSelect>
                                <FormikSelect
                                    label="Organization"
                                    name="organization_id"
                                    disabled={!uuidData}
                                >
                                    <option value="">Select an option</option>
                                    {uuidData?.organization.map(val => {
                                        return (
                                            <option value={val.id}>
                                                {val.title}
                                            </option>
                                        );
                                    })}
                                </FormikSelect>
                                <div className={styles.btn_container}>
                                    <MuButton
                                        text={"Decline"}
                                        className={styles.btn_cancel}
                                        onClick={() => {
                                            navigate("/dashboard/tasks");
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className={styles.btn_submit}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default KarmaVoucherEdit;
