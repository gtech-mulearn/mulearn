import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import { useNavigate } from "react-router-dom";

import { getEventDetails, createEvent, editEvent } from "./EventsApis";
import { AxiosError } from "axios";

type Props = { id: string; isEditMode: boolean; reload: () => void };
const EventsForm = forwardRef(
    (props: Props & { closeModal: () => void }, ref: any) => {
        const navigate = useNavigate();

        const [errors, setErrors] = useState<OrgFormErrors>({});
        const [taskData, setTaskData] = useState<any>(null);
        console.log(props.id);
        // TODO: need to set an interface up for this. Cross check TaskEditInterface and the ones used in TaskCreate/TaskEdit
        const [data, setData] = useState({
            name: "",
            description: ""
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setData(prevData => ({ ...prevData, [name]: value }));
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
                    await getEventDetails(props.id, setData);
                } catch (err) {
                    console.log(err as AxiosError);
                }
            })();
        }, [props.id]);

        useEffect(() => {
            if (props.isEditMode) {
                setData({
                    name: data.name,
                    description: data.description
                });
            }
        }, []);

        useEffect(() => {
            if (props.isEditMode && data) {
            }
        }, [data]);

        useImperativeHandle(ref, () => ({
            handleSubmitExternally: handleSubmit
        }));
        const handleSubmit = (e: React.FormEvent) => {
            e?.preventDefault();
            const updatedData = {
                ...data
            };
            // Validate form data
            let isValid = true;

            const requiredKeys: Array<keyof typeof updatedData> = ["name"]; // Add the keys that are required

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

            if (isValid) {
                console.log(updatedData);
                if (!props.isEditMode) {
                    createEvent(data.name, data.description)
                        .then(() => {
                            props.closeModal();
                            props.reload();
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    editEvent(data.name, data.description, props.id)
                        .then(() => {
                            props.closeModal();
                            setTimeout(() => {
                                props.reload();
                            }, 500);
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
                                name="name"
                                placeholder="Name"
                                value={data.name}
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
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={data.description}
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
                    </form>
                </div>
            </>
        );
    }
);

export default EventsForm;
