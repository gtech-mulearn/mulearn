// SkillForm.tsx
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";

interface SkillFormProps {
    skill: SkillData | null;
    onSubmit: (data: Partial<SkillData>) => Promise<void>;
    closeModal: () => void;
}

interface SkillData {
    id: string;
    name: string;
    code: string;
    description?: string;
    icon?: string;
    is_active: boolean;
}

interface FormErrors {
    name?: string;
    code?: string;
}

const SkillForm = forwardRef(
    (props: SkillFormProps, ref: any) => {
        const [errors, setErrors] = useState<FormErrors>({});
        const [isSubmitting, setIsSubmitting] = useState(false);

        const [data, setData] = useState({
            name: "",
            code: "",
            description: "",
            icon: "",
            is_active: true
        });

        useEffect(() => {
            if (props.skill) {
                setData({
                    name: props.skill.name || "",
                    code: props.skill.code || "",
                    description: props.skill.description || "",
                    icon: props.skill.icon || "",
                    is_active: props.skill.is_active ?? true
                });
            }
        }, [props.skill]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value, type } = e.target;
            if (type === "checkbox") {
                setData(prevData => ({
                    ...prevData,
                    [name]: (e.target as HTMLInputElement).checked
                }));
            } else {
                setData(prevData => ({ ...prevData, [name]: value }));
            }
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            if (!value.trim() && (name === "name" || name === "code")) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
                }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        };

        useImperativeHandle(ref, () => ({
            handleSubmitExternally: handleSubmit
        }));

        const handleSubmit = async (e?: React.FormEvent) => {
            e?.preventDefault();

            // Validate
            const newErrors: FormErrors = {};
            if (!data.name.trim()) newErrors.name = "Name is required";
            if (!data.code.trim()) newErrors.code = "Code is required";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            setIsSubmitting(true);
            try {
                await props.onSubmit({
                    name: data.name,
                    code: data.code.toUpperCase(),
                    description: data.description,
                    icon: data.icon,
                    is_active: data.is_active
                });
            } catch (error) {
                console.error("Error submitting skill:", error);
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Skill Name *"
                            value={data.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        />
                        {errors.name && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="code"
                            placeholder="Skill Code * (e.g., PYTHON, REACT)"
                            value={data.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ textTransform: "uppercase" }}
                            required
                        />
                        {errors.code && (
                            <div style={{ color: "red", fontSize: "12px" }}>
                                {errors.code}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <textarea
                            name="description"
                            placeholder="Description (optional)"
                            value={data.description}
                            onChange={handleChange}
                            rows={3}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                resize: "vertical"
                            }}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="icon"
                            placeholder="Icon (emoji or URL, optional)"
                            value={data.icon}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.CheckBoxWrapperSet}>
                        <label className={styles.toggle} htmlFor="is_active">
                            <label
                                className={styles.toggle__label}
                                htmlFor="is_active"
                            >
                                Active
                            </label>
                            <input
                                type="checkbox"
                                className={styles.toggle__input}
                                id="is_active"
                                name="is_active"
                                checked={data.is_active}
                                onChange={handleChange}
                            />
                            <span className={styles.toggleTrack}>
                                <span className={styles.toggleTndicator}></span>
                            </span>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
);

export default SkillForm;
