import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import { useNavigate } from "react-router-dom";
import {
    createTaskType,
    editTaskType,
    getTaskTypeDetails,
    getTaskTypes
} from "./TaskTypeApis";
import { AxiosError } from "axios";

type Props = { id: string; isEditMode: boolean; reload: () => void };
const TaskTypeForm = forwardRef(
    (props: Props & { closeModal: () => void }, ref: any) => {
        const navigate = useNavigate();
        const [errors, setErrors] = useState<OrgFormErrors>({});
        const [taskData, setTaskData] = useState<any>(null);
        console.log(props.id);
        // TODO: need to set an interface up for this. Cross check TaskEditInterface and the ones used in TaskCreate/TaskEdit
        const [data, setData] = useState({
            title: ""
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
                    await getTaskTypeDetails(props.id, setData);
                } catch (err) {
                    console.log(err as AxiosError);
                }
            })();
        }, [props.id]);

        // useEffect(() => {
        //     if (props.isEditMode) {
        //         setData({
        //             title: data.title
        //         });
        //     }
        // }, []);

        // useEffect(() => {
        //     if (props.isEditMode && data) {
        //     }
        // }, [data]);

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

            const requiredKeys: Array<keyof typeof updatedData> = ["title"]; // Add the keys that are required

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
                    createTaskType(data.title)
                        .then(() => {
                            props.closeModal();
                            props.reload();
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    editTaskType(data.title, props.id)
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
                    </form>
                </div>
            </>
        );
    }
);

export default TaskTypeForm;
