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
    level_id?: string;
    is_active?: boolean;
    skill_id?: string;
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
        iconFile: undefined,
        template_id: "",
        level_id: "",
        is_active: true,
        skill_id: ""
    });
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
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
                setQstemplates(response.response.credentials);
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
                iconFile: data.iconFile,  // Pass the uploaded file to API
                template_id: data.template_id || "",
                level_id: data.level_id || "",
                is_active: data.is_active ?? true,
                skill_id: data.skill_id || ""
            };

            const response = await createAchievements(achievementData);

            const transformedResponse: ExtendedAchievementData = {
                ...response,
                levelBased: response?.level_based ?? false,
                vcToken: response?.has_vc ?? false,
                id: response?.id,
                created_at: response?.created_at || new Date().toISOString(),
                title: response?.title ?? data.title,
                name: response?.title ?? data.title,
                description: response?.description ?? data.description,
                type: response?.type ?? data.type,
                tags: response?.tags ?? data.tags,
                icon: response?.icon ?? data.icon,
                template_id: response?.template_id ?? data.template_id,
                level_id: response?.level_id ?? data.level_id,
                is_active: response?.is_active ?? data.is_active,
                skill_id: response?.skill_id ?? data.skill_id
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
                level_id: "",
                is_active: true,
                skill_id: ""
            });
            setUseQSeverse(false);
            setIconFile(null);
            setIconPreview(null);
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
                    <label>
                        Active
                        <Switch
                            isChecked={data.is_active ?? true}
                            onChange={() => handleSwitchChange("is_active")}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                {uuidData?.skill && uuidData.skill.length > 0 && (
                    <div className={styles.inputContainer}>
                        <Select
                            styles={customReactSelectStyles}
                            options={uuidData.skill.map((val: any) => ({
                                value: val.id,
                                label: val.name
                            }))}
                            value={uuidData.skill
                                .filter((val: any) => val.id === data.skill_id)
                                .map((val: any) => ({ value: val.id, label: val.name }))[0] || null}
                            onChange={(option: any) => setData(prev => ({ ...prev, skill_id: option?.value || "" }))}
                            placeholder="Link to Skill (for skill-based achievements)"
                            isClearable
                            isDisabled={isSubmitting}
                        />
                    </div>
                )}

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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderRadius: '8px',
                        backgroundColor: '#f3f3f4',
                        padding: '10px',
                        width: '300px'
                    }}>
                        {/* Icon Preview */}
                        <div style={{
                            width: '60px',
                            height: '60px',
                            minWidth: '60px',
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            backgroundColor: '#fff'
                        }}>
                            {(data.iconFile || data.icon) ? (
                                <img
                                    src={data.iconFile ? URL.createObjectURL(data.iconFile) : data.icon}
                                    alt="Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            ) : (
                                <span style={{ color: '#999', fontSize: '10px' }}>No icon</span>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 5 * 1024 * 1024) {
                                            toast.error("Max 5MB");
                                            return;
                                        }
                                        setData(prev => ({ ...prev, iconFile: file, icon: "" }));
                                    }
                                }}
                                disabled={isSubmitting || isFieldDisabled("icon")}
                                style={{ width: '100%', fontSize: '12px', background: 'transparent', padding: 0 }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="icon"
                        placeholder="Icon URL (optional)"
                        value={data.icon}
                        onChange={(e) => {
                            setData(prev => ({ ...prev, icon: e.target.value, iconFile: undefined }));
                        }}
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