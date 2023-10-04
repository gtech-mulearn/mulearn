import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { editTask, getTaskDetails, getUUID } from "./TaskApis";
import { useToast } from "@chakra-ui/react";

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
    usage_count: Yup.number().truncate().required("Mention the number of uses"),
    active: Yup.boolean().required("Select an option"),
    variable_karma: Yup.boolean().required("Select an option"),
    channel_id: Yup.string().required("Select a channel"),
    type_id: Yup.string().required("Select a type"),
    level_id: Yup.string().nullable(),
    ig_id: Yup.string().nullable(),
    organization_id: Yup.string().nullable()
});

type IVType = {
    [K in keyof Yup.InferType<typeof taskEditSchema>]: string;
};

const useFormikData = () => {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [data, setData] = useState<TaskEditInterface>({});
    const [uuidData, setuuidData] = useState<{ [index: string]: any[] } | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const firstFetch = useRef(true);
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

    const submitHandler = async (values: any) => {
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
        }, 4000);
    };
    const initialValues = {
        hashtag: data.hashtag || "",
        title: data.title || "",
        karma: data.karma || "",
        active: data.active,
        variable_karma: data.variable_karma,
        usage_count: data.usage_count || "",
        channel_id: data.channel || "",
        type_id: data.type || "",
        level_id: data.level || "",
        ig_id: data.ig || "",
        organization_id: data.org || ""
    };

    const formStructure = [
        {
            element: "input",
            name: "hashtag",
            label: "Hashtag",
            type: "text",
            placeholder: "#example",
            required: true
        },
        {
            element: "input",
            name: "title",
            label: "Title",
            type: "text",
            placeholder: "Enter the title",
            required: true
        },
        {
            element: "input",
            name: "karma",
            label: "Karma",
            type: "number",
            placeholder: "Karma Points"
        },
        {
            element: "checkbox",
            name: "active",
            label: "Active"
        },
        {
            element: "checkbox",
            name: "variable_karma",
            label: "Variable Karma"
        },
        {
            element: "input",
            name: "usage_count",
            label: "Usage Count",
            type: "number",
            placeholder: "Number of times used",
            required: true
        },
        {
            element: "select",
            name: "channel_id",
            label: "Channel",
            required: true,
            options:
                (uuidData?.channel &&
                    uuidData?.channel
                        .map((channel: any) => ({
                            value: channel.id,
                            label: channel.name
                        }))
                        .concat({ value: "", label: "Select an option" })) ||
                [],
            disabled: !uuidData?.channel
        },
        {
            element: "select",
            name: "type_id",
            label: "Type",
            required: true,
            options:
                (uuidData?.type &&
                    uuidData?.type
                        .map((type: any) => ({
                            value: type.id,
                            label: type.title
                        }))
                        .concat({ value: "", label: "Select an option" })) ||
                [],
            disabled: !uuidData?.type
        },
        {
            element: "select",
            name: "level_id",
            label: "Level",
            options:
                (uuidData?.level &&
                    uuidData?.level
                        .map((level: any) => ({
                            value: level.id,
                            label: level.name
                        }))
                        .concat({ value: "", label: "Select an option" })) ||
                [],
            disabled: !uuidData?.level
        },
        {
            element: "select",
            name: "ig_id",
            label: "Interest Group",
            options:
                (uuidData?.ig &&
                    uuidData?.ig
                        .map((ig: any) => ({
                            value: ig.id,
                            label: ig.name
                        }))
                        .concat({ value: "", label: "Select an option" })) ||
                [],
            disabled: !uuidData?.ig
        },
        {
            element: "select",
            name: "organization_id",
            label: "Organization",
            options:
                (uuidData?.organization &&
                    uuidData?.organization
                        .map((org: any) => ({
                            value: org.id,
                            label: org.title
                        }))
                        .concat({ value: "", label: "Select an option" })) ||
                [],
            disabled: !uuidData?.organization
        }
    ];

    return {
        navigate,
        initialValues,
        submitHandler,
        loading,
        formStructure
    };
};

export { taskEditSchema, useFormikData };
