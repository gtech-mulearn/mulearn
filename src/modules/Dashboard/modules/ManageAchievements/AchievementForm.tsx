import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import toast from "react-hot-toast";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { Switch } from "@chakra-ui/react";
import { updateAchievements } from "./services/api";
import { AchievementData } from "./ManageAchievementsInterface";
import { getUUID } from "../Tasks/TaskApis";
import { AxiosError } from "axios";

interface ExtendedAchievementData extends AchievementData {
    template_id?: string;
    level_id?: string;
}

type Props = {
    achievement: AchievementData;
    closeModal: () => void;
    onsuccess?: (updatedAchievement: AchievementData) => void;
};

const achievementTypes = [
    { value: "Badge", label: "Badge" },
    { value: "Learning", label: "Learning" },
    { value: "Skills", label: "Skills" },
    { value: "Offers", label: "Offers" }
];

const tagsOptions = [
    { value: "Level 4 skill", label: "Level 4" },
    { value: "Level 5 skill", label: "Level 5" },
    { value: "Level 6 skill", label: "Level 6" },
    { value: "Level 7 skill", label: "Level 7" }
];

const AchievementForm = forwardRef((props: Props, ref: any) => {
    const { achievement } = props;
    
    const [data, setData] = useState<ExtendedAchievementData>({
        id: achievement?.id,
        title: achievement?.title || achievement?.name || "",
        level_based: achievement?.level_based ?? achievement?.levelBased ?? false,
        description: achievement?.description || "",
        has_vc: achievement?.has_vc ?? achievement?.vcToken ?? false,
        tags: achievement?.tags || [],
        type: achievement?.type || "",
        icon: achievement?.icon || "",
        template_id: achievement?.template_id || "",
        level_id: achievement?.level_id || "",
        levelBased: achievement?.level_based ?? achievement?.levelBased ?? false,
        vcToken: achievement?.has_vc ?? achievement?.vcToken ?? false
    });
    
    const [errors, setErrors] = useState<Partial<Record<keyof ExtendedAchievementData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [uuidData, setUuidData] = useState<{ [index: string]: any[] } | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setUuidData(await getUUID());
            } catch (err) {
                console.log(err as AxiosError);
            }
        })();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value } as ExtendedAchievementData));
    };

    const handleSwitchChange = (name: keyof ExtendedAchievementData) => {
        setData(prev => ({ ...prev, [name]: !prev[name] } as ExtendedAchievementData));
    };

    const handleTagsChange = (selectedOptions: any) => {
        const tags = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
        setData(prev => ({ ...prev, tags }));
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            setData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput("");
        }
    };

    const handleTypeChange = (selectedOption: { value: string; label: string } | null) => {
        setData(prev => ({ ...prev, type: selectedOption?.value || "" }));
    };

    useImperativeHandle(ref, () => ({
        handleSubmitExternally: handleSubmit
    }));

    const handleSubmit = async () => {
        const requiredFields: (keyof ExtendedAchievementData)[] = ["title", "description", "type"];
        let isValid = true;
        const newErrors: Partial<Record<keyof ExtendedAchievementData, string>> = {};

        requiredFields.forEach(field => {
            if (!data[field]) {
                isValid = false;
                newErrors[field] = `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} is required`;
            }
        });

        // Add validation for level_id if level_based is true
        if (data.level_based && !data.level_id) {
            isValid = false;
            newErrors.level_id = "Level is required when Level Based is enabled";
        }

        setErrors(newErrors);

        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const achievementData: AchievementData = {
                id: data.id,
                title: data.title || "",
                name: data.title || "",
                level_based: data.level_based ?? false,
                levelBased: data.level_based ?? false,
                description: data.description,
                has_vc: data.has_vc ?? false,
                vcToken: data.has_vc ?? false,
                type: data.type,
                tags: data.tags,
                icon: data.icon || "",
                template_id: data.template_id || "",
                level_id: data.level_id || ""
            };

            const response = await updateAchievements(achievementData);

            const transformedResponse: ExtendedAchievementData = {
                ...response,
                levelBased: response?.level_based ?? false,
                vcToken: response?.has_vc ?? false,
                id: response?.id,
                title: response?.name || data.title,
                name: response?.name || data.title,
                description: response?.description ?? data.description,
                type: response?.type ?? data.type,
                tags: response?.tags ?? data.tags,
                icon: response?.icon ?? data.icon,
                template_id: response?.template_id ?? data.template_id,
                level_id: response?.level_id ?? data.level_id
            };

            toast.success("Achievement updated successfully");
            props.onsuccess?.(transformedResponse);
            props.closeModal();
        } catch (error) {
            toast.error("Failed to update achievement");
            console.error("Error updating achievement:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                    {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                    {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Level Based
                        <Switch
                            isChecked={data.level_based ?? false}
                            onChange={() => handleSwitchChange("level_based")}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                {data.level_based && uuidData && (
                    <div className={styles.inputContainer}>
                        <label>
                            Level
                            <select
                                name="level_id"
                                value={data.level_id}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            >
                                <option value="">Select a level</option>
                                {uuidData?.level?.map(val => (
                                    <option key={val.id} value={val.id}>
                                        {val.name}
                                    </option>
                                ))}
                            </select>
                            {errors.level_id && <div style={{ color: "red" }}>{errors.level_id}</div>}
                        </label>
                    </div>
                )}

                <div className={styles.inputContainer}>
                    <label>
                        Has VC?
                        <Switch
                            isChecked={data.has_vc ?? false}
                            onChange={() => handleSwitchChange("has_vc")}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.taginputcontainer}>
                        <div className={styles.taginputwrapper}>
                            {data.tags.map(tag => (
                                <span key={tag} className={styles.tagchip}>
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        disabled={isSubmitting}
                                        className={styles.removetagbutton}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                placeholder={data.tags.length === 0 ? "Enter a tag and press Enter" : ""}
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyPress={handleTagInputKeyPress}
                                disabled={isSubmitting}
                                className={styles.taginputfield}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <Select
                        styles={customReactSelectStyles}
                        options={achievementTypes}
                        value={achievementTypes.find(option => option.value === data.type)}
                        onChange={handleTypeChange}
                        placeholder="Select Type"
                        isClearable
                        isDisabled={isSubmitting}
                    />
                    {errors.type && <div style={{ color: "red" }}>{errors.type}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="icon"
                        placeholder="Icon URL"
                        value={data.icon}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="template_id"
                        placeholder="Template ID"
                        value={data.template_id}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
});

export default AchievementForm;