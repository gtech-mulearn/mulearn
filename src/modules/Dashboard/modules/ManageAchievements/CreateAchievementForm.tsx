import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import toast from "react-hot-toast";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { Switch } from "@chakra-ui/react";
import { createAchievements } from "./services/api";
import { AchievementData } from "./ManageAchievementsInterface";
import { getQSCredentials } from "../Profile/services/api";
import { getUUID } from "../Tasks/TaskApis";
import { AxiosError } from "axios";

interface ExtendedAchievementData extends AchievementData {
    template_id?: string;
    level_id?: string; // Added level_id to the interface
}

type Props = {
    closeModal: () => void;
    onSuccess?: (newAchievement: any) => void;
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

const CreateAchievementForm = forwardRef((props: Props, ref: any) => {
    const [data, setData] = useState<ExtendedAchievementData>({
        title: "",
        level_based: false,
        description: "",
        has_vc: false,
        tags: [],
        type: "",
        levelBased: false,
        vcToken: false,
        icon: "",
        template_id: "",
        level_id: "" // Added level_id to initial state
    });
    const [qsTemplates, setQstemplates] = useState<any>([]);
    const [selectedPreset, setSelectedPreset] = useState<any>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof ExtendedAchievementData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [useQSeverse, setUseQSeverse] = useState(false);
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

    const handleQSeverseToggle = () => {
        if (useQSeverse) {
            setSelectedPreset(null);
            setData({
                title: "",
                type: "",
                tags: [],
                has_vc: false,
                levelBased: false,
                vcToken: false,
                level_based: false,
                icon: "",
                template_id: "",
                description: "",
                level_id: "", // Reset level_id
              
            });
        }
        setUseQSeverse(prev => !prev);
    };

    useImperativeHandle(ref, () => ({
        handleSubmitExternally: handleSubmit
    }));

    useEffect(() => {
        const getQSCredentialsList = async () => {
            try {
                const response = await getQSCredentials();
                setQstemplates(response.credentials);
            } catch (error) {
                toast.error("Failed to fetch QSeverse credentials");
                console.error("Error fetching QSeverse credentials:", error);
            }
        };
        getQSCredentialsList();
    }, []);

    const handleTemplateChange = (selectedOption: any) => {
        if (!selectedOption) {
            setSelectedPreset(null);
            setData({
                title: "",
                type: "",
                tags: [],
                has_vc: false,
                levelBased: false,
                vcToken: false,
                level_based: false,
                icon: "",
                template_id: "",
                description: "",
                level_id: "" // Reset level_id
            });
            return;
        }

        const selectedTemplate = selectedOption.value;
        const hasVC = selectedTemplate.tags?.includes("Verifiable Credential") || false;
        const isLevelBased = selectedTemplate.tags?.some((tag: string) => tag.startsWith("Level")) || false;

        setSelectedPreset(selectedTemplate);
        setData(prev => ({
            ...prev,
            title: selectedTemplate.name || "",
            type: selectedTemplate.template_type || "",
            tags: selectedTemplate.tags || [],
            has_vc: hasVC,
            level_based: isLevelBased,
            icon: selectedTemplate.banner_image_url || "",
            template_id: selectedTemplate.id || "",
            description: selectedTemplate.description || "",
            level_id: "" // Reset level_id when template changes
        }));
    };

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

        // Optional: Add validation for level_id if level_based is true
        if (data.level_based && !data.level_id) {
            isValid = false;
            newErrors.level_id = "Level is required when Level Based is enabled";
        }

        setErrors(newErrors);

        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const achievementData: AchievementData = {
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
                level_id: data.level_id || "" // Include level_id in submission
            };

            const response = await createAchievements(achievementData);

            const transformedResponse: ExtendedAchievementData = {
                ...response,
                levelBased: response?.level_based ?? false,
                vcToken: response?.has_vc ?? false,
                id: response?.id,
                created_at: response?.created_at || new Date().toISOString(),
                title: response?.title ?? data.title, // Ensure title is always a string
                name: response?.title ?? data.title,
                description: response?.description ?? data.description,
                type: response?.type ?? data.type,
                tags: response?.tags ?? data.tags,
                icon: response?.icon ?? data.icon,
                template_id: response?.template_id ?? data.template_id,
                level_id: response?.level_id ?? data.level_id // Include level_id in response
            };

            toast.success("Achievement created successfully");
            props.onSuccess?.(transformedResponse);
            props.closeModal();

            setData({
                title: "",
                level_based: false,
                description: "",
                has_vc: false,
                tags: [],
                type: "",
                icon: "",
                template_id: "",
                levelBased: false,
                vcToken: false,
                level_id: "" // Reset level_id
            });
            setUseQSeverse(false);
            setTagInput("");
        } catch (error) {
            toast.error("Failed to create achievement");
            console.error("Error creating achievement:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFieldDisabled = (field: keyof ExtendedAchievementData) => {
        return useQSeverse && !!data[field] && isSubmitting === false;
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <label>
                        Use QSeverse
                        <Switch
                            isChecked={useQSeverse}
                            onChange={handleQSeverseToggle}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                {useQSeverse && (
                    <div className={styles.formHeader}>
                        <Select
                            styles={customReactSelectStyles}
                            options={qsTemplates.map((template: any) => ({ value: template, label: template.name }))}
                            onChange={handleTemplateChange}
                            placeholder="Select QSeverse Template"
                            isClearable
                            isDisabled={isSubmitting}
                        />
                    </div>
                )}

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={handleChange}
                        disabled={isSubmitting || isFieldDisabled("title")}
                    />
                    {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={handleChange}
                        // disabled={isSubmitting || isFieldDisabled("description")}
                    />
                    {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Level Based
                        <Switch
                            isChecked={data.level_based ?? false}
                            onChange={() => handleSwitchChange("level_based")}
                            isDisabled={isSubmitting || isFieldDisabled("level_based")}
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
                                disabled={isSubmitting || isFieldDisabled("level_id")}
                            >
                                <option value="">Select a level</option>
                                {uuidData?.level.map(val => (
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
                            isDisabled={isSubmitting || isFieldDisabled("has_vc")}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    {useQSeverse ? (
                        <Select
                            styles={customReactSelectStyles}
                            options={tagsOptions}
                            isClearable
                            isMulti
                            placeholder="Select Tags"
                            value={tagsOptions.filter(option => data.tags.includes(option.value))}
                            onChange={handleTagsChange}
                            isDisabled={isSubmitting || isFieldDisabled("tags")}
                        />
                    ) : (
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
                    )}
                </div>

                <div className={styles.inputContainer}>
                    <Select
                        styles={customReactSelectStyles}
                        options={achievementTypes}
                        value={achievementTypes.find(option => option.value === data.type)}
                        onChange={handleTypeChange}
                        placeholder="Select Type"
                        isClearable
                        isDisabled={isSubmitting || isFieldDisabled("type")}
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
                        disabled={isSubmitting || isFieldDisabled("icon")}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="template_id"
                        placeholder="Template ID"
                        value={data.template_id}
                        onChange={handleChange}
                        disabled={isSubmitting || isFieldDisabled("template_id")}
                    />
                </div>
            </form>
        </div>
    );
});

export default CreateAchievementForm;