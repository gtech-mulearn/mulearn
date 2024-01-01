import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, editTask, getUUID, uuidToString } from "./TaskApis";
import styles from "../../utils/modalForm.module.css";
import * as Yup from "yup";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";

import { AxiosError } from "axios";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { getTaskDetails } from "./TaskApis";
import { FormikCheckBox } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { convertDateToYYYYMMDD } from "../../utils/common";

type Props = { id: string; isEditMode: boolean };

const TaskForm = forwardRef(
    (props: Props & { closeModal: () => void }, ref: any) => {
        const navigate = useNavigate();

        const [errors, setErrors] = useState<OrgFormErrors>({});
        const [uuidData, setuuidData] = useState<{
            [index: string]: any[];
        } | null>(null);
        const [taskData, setTaskData] = useState<any>(null);

        // TODO: need to set an interface up for this. Cross check TaskEditInterface and the ones used in TaskCreate/TaskEdit
        const [data, setData] = useState({
            hashtag: "",
            title: "",
            karma: "",
            usage_count: "",
            active: true,
            variable_karma: false,
            description: "",
            channel_id: "",
            type_id: "",
            level_id: "",
            ig_id: "",
            organization_id: "",
            discord_link: "",
            event: "",
            bonus_time: "",
            bonus_karma: ""
        });

        //! taskEditSchema has not been used !!
        // const taskEditSchema = Yup.object().shape({
        //     hashtag: Yup.string()
        //         .required("Required")
        //         .min(2, "Too Short!")
        //         .max(30, "Too Long!"),
        //     title: Yup.string()
        //         .min(2, "Too Short!")
        //         .max(50, "Too Long!")
        //         .required("Required"),
        //     karma: Yup.number()
        //         .positive("Karma should be a positive value")
        //         .min(10, "Needs to be at least 2 digits.")
        //         .max(9999, "Should not exceed 4 digits")
        //         .truncate(),
        //     usage_count: Yup.number()
        //         .truncate()
        //         .required("Mention the number of uses"),

        //     active: Yup.boolean().required("Select an option"),
        //     variable_karma: Yup.boolean().required("Select an option"),

        //     description: Yup.string()
        //         .max(100, "Too Long!")
        //         .required("A description is required"),
        //     channel_id: Yup.string(),
        //     type_id: Yup.string().required("Select a Type"),
        //     level_id: Yup.string().nullable(),
        //     ig_id: Yup.string().nullable(),
        //     organization_id: Yup.string().nullable(),
        //     discord_link: Yup.string().nullable()
        // });

        // Data Variables for react-select Fields
        const [selectedChannel, setSelectedChannel] =
            useState<AffiliationOption | null>(null);
        const [selectedType, setSelectedType] =
            useState<AffiliationOption | null>(null);
        const [selectedLevel, setSelectedLevel] =
            useState<AffiliationOption | null>(null);
        const [selectedIg, setSelectedIg] = useState<AffiliationOption | null>(
            null
        );
        const [selectedOrg, setSelectedOrg] =
            useState<AffiliationOption | null>(null);

        const [blurStatus, setBlurStatus] = useState({ affiliation: false });
        const [showBonus, setShowBonus] = useState<boolean>(false);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setData(prevData => ({ ...prevData, [name]: value }));
        };

        const handleHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;

            if (!value.slice(0, 1).match("#") && value) {
                setData(prevData => ({ ...prevData, [name]: "#" + value }));
            } else if (!value.slice(1).match("#")) {
                setData(prevData => ({ ...prevData, [name]: value }));
            }
        };
        const handleCheckboxChange = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const { name, checked } = e.target;
            setData(prevData => ({ ...prevData, [name]: checked }));
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (!value.trim()) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: `${
                        name.charAt(0).toUpperCase() + name.slice(1)
                    } is required`
                }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        };

        useEffect(() => {
            (async () => {
                try {
                    setuuidData(await getUUID());
                } catch (err) {
                    console.log(err as AxiosError);
                }
            })();
        }, []);

        useEffect(() => {
            (async () => {
                try {
                    await getTaskDetails(props.id, setTaskData);
                } catch (err) {
                    console.log(err as AxiosError);
                }
            })();
        }, [props.id]);

        useEffect(() => {
            if (props.isEditMode && taskData) {
                setData({
                    hashtag: taskData.hashtag,
                    title: taskData.title,
                    karma: taskData.karma,
                    usage_count: taskData.usage_count,
                    active: taskData.active,
                    variable_karma: taskData.variable_karma,
                    description: taskData.description,
                    channel_id: taskData.channel,
                    type_id: taskData.type,
                    level_id: taskData.level,
                    ig_id: taskData.ig,
                    organization_id: taskData.org,
                    discord_link: taskData.discord_link,
                    event: taskData.event,
                    bonus_time:
                        convertDateToYYYYMMDD(String(taskData?.bonus_time)) ||
                        null,
                    bonus_karma: taskData.bonus_karma
                });
                console.log(taskData);
            }
        }, [taskData]);

        useEffect(() => {
            if (props.isEditMode && data && uuidData) {
                const channel = uuidData.channel.filter(val => {
                    return val.id == data.channel_id;
                })[0];
                const type = uuidData.type.filter(val => {
                    return val.id == data.type_id;
                })[0];
                const level = uuidData.level.filter(val => {
                    return val.id == data.level_id;
                })[0];
                const ig = uuidData.ig.filter(val => {
                    return val.id == data.ig_id;
                })[0];
                const org = uuidData.organization.filter(val => {
                    return val.id == data.organization_id;
                })[0];

                channel
                    ? setSelectedChannel({
                          value: channel.id,
                          label: channel.name
                      })
                    : setSelectedChannel(null);
                type
                    ? setSelectedType({ value: type.id, label: type.title })
                    : setSelectedType(null);
                level
                    ? setSelectedLevel({ value: level.id, label: level.name })
                    : setSelectedLevel(null);
                ig
                    ? setSelectedIg({ value: ig.id, label: ig.name })
                    : setSelectedIg(null);
                org
                    ? setSelectedOrg({ value: org.id, label: org.title })
                    : setSelectedOrg(null);
                data.bonus_karma && data.bonus_time && setShowBonus(true);
            }
        }, [data, uuidData]);

        useImperativeHandle(ref, () => ({
            handleSubmitExternally: handleSubmit
        }));
        const handleSubmit = (e: React.FormEvent) => {
            e?.preventDefault();
            const updatedData = {
                ...data
            };
            console.log("HELLO");
            // Validate form data
            let isValid = true;

            const requiredKeys: Array<keyof typeof updatedData> = [
                "hashtag",
                "title",
                "karma",
                "usage_count"
            ]; // Add the keys that are required

            for (const key of requiredKeys) {
                if (!(key in updatedData) || !updatedData[key]) {
                    isValid = false;
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [key]: `${
                            key.charAt(0).toUpperCase() + key.slice(1)
                        } is required`
                    }));
                }
            }

            // Check if the selectedType value is valid
            if (!selectedType) {
                isValid = false;
                setErrors(prevErrors => ({
                    ...prevErrors,
                    type_id: "Type is required" // Update error message for type_id
                }));
            }

            if (isValid) {
                console.log(updatedData);
                if (!props.isEditMode) {
                    createTask(
                        data.hashtag,
                        data.title,
                        data.karma,
                        data.usage_count,
                        data.active,
                        data.variable_karma,
                        data.description,
                        selectedChannel?.value || "",
                        selectedType?.value || "",
                        selectedLevel?.value || "",
                        selectedIg?.value || "",
                        selectedOrg?.value || "",
                        data.discord_link,
                        data.event,
                        data.bonus_time,
                        data.bonus_karma
                    )
                        .then(() => {
                            props.closeModal();
                            // window.location.reload();
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    editTask(
                        data.hashtag,
                        data.title,
                        data.karma,
                        data.active,
                        data.variable_karma,
                        data.usage_count,
                        selectedChannel?.value || "",
                        selectedType?.value || "",
                        selectedLevel?.value || "",
                        selectedIg?.value || "",
                        selectedOrg?.value || "",
                        data.description,
                        data.discord_link,
                        props.id,
                        data.event,
                        data.bonus_time,
                        data.bonus_karma
                    )
                        .then(() => {
                            props.closeModal();
                            // window.location.reload();
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            }
        };

        return (
            <>
                <div className={styles.container}>
                    <form
                        className={styles.formContainer}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="hashtag"
                                placeholder="Hashtag"
                                value={data.hashtag}
                                onChange={handleHashChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.hashtag && (
                                <div style={{ color: "red" }}>
                                    {errors.hashtag}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={data.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.title && (
                                <div style={{ color: "red" }}>
                                    {errors.title}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                name="karma"
                                placeholder="Karma"
                                value={data.karma}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.karma && (
                                <div style={{ color: "red" }}>
                                    {errors.karma}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                name="usage_count"
                                placeholder="Usage Count"
                                value={data.usage_count}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.usage_count && (
                                <div style={{ color: "red" }}>
                                    {errors.usage_count}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="discord_link"
                                placeholder="Discord Link"
                                value={data.discord_link}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={data.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={uuidData?.channel.map(val => {
                                    return { value: val.id, label: val.name };
                                })}
                                isClearable
                                placeholder="Channel"
                                isLoading={!uuidData?.channel.length}
                                value={selectedChannel}
                                onChange={value => setSelectedChannel(value)}
                                onBlur={() => {
                                    setBlurStatus(prev => ({
                                        ...prev,
                                        channel: true
                                    }));
                                }}
                                name="channel_id"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={uuidData?.type.map(val => {
                                    return { value: val.id, label: val.title };
                                })}
                                isClearable
                                placeholder="Type"
                                isLoading={!uuidData?.type.length}
                                value={selectedType}
                                onChange={value => setSelectedType(value)}
                                onBlur={() => {
                                    setBlurStatus(prev => ({
                                        ...prev,
                                        type: true
                                    }));
                                }}
                                name="type_id"
                                required
                            />
                            {!selectedType && errors.type_id && (
                                <div style={{ color: "red" }}>
                                    {errors.type_id}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={uuidData?.level.map(val => {
                                    return { value: val.id, label: val.name };
                                })}
                                isClearable
                                placeholder="Level"
                                isLoading={!uuidData?.level.length}
                                value={selectedLevel}
                                onChange={value => setSelectedLevel(value)}
                                onBlur={() => {
                                    setBlurStatus(prev => ({
                                        ...prev,
                                        level: true
                                    }));
                                }}
                                name="level_id"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={uuidData?.ig.map(val => {
                                    return { value: val.id, label: val.name };
                                })}
                                isClearable
                                placeholder="Interest Group"
                                isLoading={!uuidData?.ig.length}
                                value={selectedIg}
                                onChange={value => setSelectedIg(value)}
                                onBlur={() => {
                                    setBlurStatus(prev => ({
                                        ...prev,
                                        ig: true
                                    }));
                                }}
                                name="ig_id"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={uuidData?.organization.map(val => {
                                    return { value: val.id, label: val.title };
                                })}
                                isClearable
                                placeholder="Organization"
                                isLoading={!uuidData?.organization.length}
                                value={selectedOrg}
                                onChange={value => setSelectedOrg(value)}
                                onBlur={() => {
                                    setBlurStatus(prev => ({
                                        ...prev,
                                        organization: true
                                    }));
                                }}
                                name="organization_id"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="event"
                                placeholder="Event"
                                value={data.event}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className={styles.CheckBoxWrapperSet}>
                            <label className={styles.toggle} htmlFor="active">
                                <label
                                    className={styles.toggle__label}
                                    htmlFor="active"
                                >
                                    {" "}
                                    Active
                                </label>
                                <input
                                    type="checkbox"
                                    className={styles.toggle__input}
                                    id="active"
                                    name="active"
                                    checked={data.active}
                                    onChange={handleCheckboxChange}
                                />
                                <span className={styles.toggleTrack}>
                                    <span
                                        className={styles.toggleTndicator}
                                    ></span>
                                </span>
                            </label>

                            <label
                                className={styles.toggle}
                                htmlFor="variable_karma"
                            >
                                <label
                                    className={styles.toggle__label}
                                    htmlFor="variable_karma"
                                >
                                    {" "}
                                    Variable Karma
                                </label>
                                <input
                                    type="checkbox"
                                    id="variable_karma"
                                    className={styles.toggle__input}
                                    name="variable_karma"
                                    checked={data.variable_karma}
                                    onChange={handleCheckboxChange}
                                />
                                <span className={styles.toggleTrack}>
                                    <span
                                        className={styles.toggleTndicator}
                                    ></span>
                                </span>
                            </label>
                        </div>
                        <div
                            className={styles.CheckBoxWrapperSet}
                            style={{ justifyContent: "center" }}
                        >
                            <label
                                className={styles.toggle}
                                htmlFor="showBonusCheckbox"
                            >
                                <label
                                    className={styles.toggle__label}
                                    htmlFor="showBonusCheckbox"
                                >
                                    {" "}
                                    Do You need bonus Karma?
                                </label>
                                <input
                                    type="checkbox"
                                    className={styles.toggle__input}
                                    id="showBonusCheckbox"
                                    name="showBonusCheckbox"
                                    checked={showBonus}
                                    onChange={e =>
                                        setShowBonus(e.target.checked)
                                    }
                                />
                                <span className={styles.toggleTrack}>
                                    <span
                                        className={styles.toggleTndicator}
                                    ></span>
                                </span>
                            </label>
                        </div>
                        {showBonus && (
                            <div className={styles.inputContainer}>
                                <input
                                    type="date"
                                    name="bonus_time"
                                    placeholder="Bonus Time"
                                    value={data.bonus_time}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        )}
                        {showBonus && (
                            <div className={styles.inputContainer}>
                                <input
                                    type="number"
                                    name="bonus_karma"
                                    placeholder="Bonus Karma"
                                    value={data.bonus_karma}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        )}
                    </form>
                </div>
            </>
        );
    }
);

export default TaskForm;
