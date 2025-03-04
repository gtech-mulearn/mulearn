import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import toast from "react-hot-toast";
import { createInterestGroups, editInterestGroups, getIGDetails } from "./apis";
import ReactSelect from "react-select";
import styles2 from "./InterestGroupFrom.module.css";

type Props = { id: string; isEditMode: boolean };

const IntrestGroupForm = forwardRef(
    (props: Props & { closeModal: () => void }, ref: any) => {
        const [data, setData] = useState<IGData>({
            name: "",
            icon: "",
            code: "",
            category: "others"
        });
        const interestGroup = [
            { label: "Coder", value: "coder" },
            { label: "Hardware", value: "hardware" },
            // {
            //     label: "Manager",
            //     value: "manager"
            // },
            { label: "Creative", value: "creative" },
            { label: "Others", value: "others" }
        ];

        const [errors, setErrors] = useState<OrgFormErrors>({});

        // //Fetch the initial data if in edit mode
        useEffect(() => {
            if (props.isEditMode) {
                getIGDetails(props.id).then((data: IGData) => {
                    setData({
                        name: data.name,
                        icon: data.icon,
                        code: data.code,
                        category: data.category
                    });
                });
            }
        }, [props.id]);

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

        //! useImperativeHandle for triggering submit from MuModal button
        useImperativeHandle(ref, () => ({
            handleSubmitExternally: handleSubmit
        }));
        const handleSubmit = (e?: React.FormEvent) => {
            e?.preventDefault();
            const updatedData = {
                ...data
            };

            // Validate form data
            let isValid = true;
            // for (const key in updatedData) {
            //     if (
            //         updatedData[key as keyof IGData] === "" ||
            //         updatedData[key as keyof IGData] === "undefined"
            //     ) {
            //         isValid = false;
            //         setErrors(prevErrors => ({
            //             ...prevErrors,
            //             [key]: `${
            //                 key.charAt(0).toUpperCase() + key.slice(1)
            //             } is required`
            //         }));
            //         toast.error(`Error: ${key} is required`);
            //     }
            // }

            if (isValid) {
                console.log(updatedData);
                if (props.isEditMode) {
                    toast.promise(editInterestGroups(props.id, updatedData), {
                        loading: "Saving...",
                        success: () => {
                            props.closeModal();
                            return <b>Interest Group edited.</b>;
                        },
                        error: <b>Failed to edit Interest Group</b>
                    });
                } else {
                    toast.promise(createInterestGroups(updatedData), {
                        loading: "Saving...",
                        success: () => {
                            props.closeModal();
                            return <b>Interest Group is created.</b>;
                        },
                        error: <b>Failed to create Interest Group</b>
                    });
                }
            }
        };

        return (
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter IG name"
                            value={data.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="code"
                            placeholder="Enter the IG code"
                            value={data.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.code && (
                            <div style={{ color: "red" }}>{errors.code}</div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="icon"
                            placeholder="Enter theIG Icon"
                            value={data.icon}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.icon && (
                            <div style={{ color: "red" }}>{errors.icon}</div>
                        )}
                    </div>
                    <ReactSelect
                        required={true}
                        className={styles2.inputBox}
                        options={interestGroup}
                        onChange={e => {
                            setData(prevData => ({
                                ...prevData,
                                category: e?.value as string
                            }));
                        }}
                        value={
                            interestGroup.filter(e => {
                                console.log(e.value, data.category);
                                return e.value === data.category;
                            })[0]
                        }
                    />
                </form>
            </div>
        );
    }
);

export default IntrestGroupForm;
