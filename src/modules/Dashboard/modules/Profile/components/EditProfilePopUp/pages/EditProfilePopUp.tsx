import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./EditProfilePopUp.module.css";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { FormikImageComponent } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import {
    getCommunities,
    getEditUserProfile,
    patchEditUserProfile,
    syncDiscordImage,
    updateProfileImage
} from "../services/api";
import { useFormik } from "formik";
import Select from "react-select";
import {
    capitalizeFirstLetter,
    toReactOptions
} from "../../../../../utils/common";
import { BsDiscord, BsCheck } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";

type Props = {
    editPopUp: boolean;
    setEditPopUP: (value: boolean) => void;
    triggerUpdateProfile: () => void;
    id: string;
};

const sanitizeFormData = (data: any) => {
    return {
        first_name: data?.first_name ?? "",
        last_name: data?.last_name ?? "",
        email: data?.email ?? "",
        mobile: data?.mobile ?? "",
        gender: data?.gender ?? "",
        dob: data?.dob ?? "",
        communities: Array.isArray(data?.communities) ? data.communities : [],
        image: ""
    };
};

const EditProfilePopUp = (props: Props) => {
    const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }]);
    const [loadStatus, setLoadStatus] = useState(false);
    const imageRef = useRef<HTMLInputElement>(null);
    const [discordState, setDiscordState] = useState<
        "initial" | "loading" | "finished"
    >("initial");
    const [originalData, setOriginalData] = useState<any>(null);

    const handlePopState = useCallback(() => {
        props.setEditPopUP(false);
    }, [props.setEditPopUP]);

    useEffect(() => {
        if (props.editPopUp) {
            window.history.pushState(null, "", window.location.href);
            window.addEventListener("popstate", handlePopState);
        }

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [props.editPopUp, handlePopState]);

    const formik = useFormik({
        initialValues: sanitizeFormData({}),
        enableReinitialize: true,
        onSubmit: values => {
            const dataToSubmit = {
                ...originalData,
                ...values,
            };

            const finalData = Object.keys(dataToSubmit).reduce((acc: any, key) => {
                if (key === 'image') return acc;
                
                const formValue = values[key as keyof typeof values];
                const originalValue = originalData?.[key];
                
                if (key === 'mobile') {
                    acc[key] = formValue;
                } else {
                    if (formValue !== "" && formValue !== null && formValue !== undefined) {
                        acc[key] = formValue;
                    } else if (originalValue !== undefined && originalValue !== null) {
                        acc[key] = originalValue;
                    }
                }
                
                return acc;
            }, {});

            if (imageRef.current && imageRef.current.files && imageRef.current.files[0]) {
                updateProfileImage(imageRef.current.files[0], props.id);
            }

            patchEditUserProfile(
                finalData,
                props.id,
                props.setEditPopUP,
                formik.setFieldError,
                imageRef?.current?.files?.item(0) ?? undefined
            );
            props.triggerUpdateProfile();
        },
        validate: (values: any) => {
            let errors: any = {};
            const emailRegex = /\S+@\S+\.\S+/;
            
            ["first_name", "last_name"].forEach(key => {
                const value = values[key] || originalData?.[key];
                if (!value) errors[key] = "Required";
            });
            
            const email = values.email || originalData?.email;
            if (!email) errors.email = "Email is required";
            else if (!emailRegex.test(email))
                errors.email = "Invalid email address";
            if (values.mobile && values.mobile.toString().trim()) {
                const mobileStr = values.mobile.toString().trim();
                if (!/^\d{10}$/.test(mobileStr)) {
                    errors.mobile = "Mobile number must be exactly 10 digits";
                }
            }

            return errors;
        }
    });

    const discordSync = async () => {
        setDiscordState("loading");
        try {
            await syncDiscordImage();
            setDiscordState("finished");
            toast.success("Profile picture synced with discord");
        } catch (error) {
            setDiscordState("initial");
            toast.error("Failed to sync discord image");
        }
    };

    useEffect(() => {
        getCommunities(setCommunityAPI, setLoadStatus);
    }, []);

    useEffect(() => {
        if (props.editPopUp) {
            getEditUserProfile(data => {
                const sanitizedData = sanitizeFormData(data);
                setOriginalData(data); // Store original data
                formik.setValues(sanitizedData);
            });
        }
    }, [props.editPopUp]);

    const buttonStyle = {
        background: "#456FF6",
        color: "#fff",
        margin: "0px 0px -8px 0px",
        display: "flex",
        justifyContent: "center",
        padding: "16px",
        height: "50px"
    };

    const communityIds: string[] = formik.values.communities || []; // Provide a default empty array
    const filteredCommunityOptions = toReactOptions(
        communityAPI.filter(value => communityIds?.includes(value.id))
    );

    const propsList2 = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur
    };

    const communityProps = {
        name: "communities.id",
        onChange: (OnChangeValue: any) => {
            formik.setFieldValue(
                "communities",
                OnChangeValue?.map(
                    (value: any = { value: "", label: "" }) => value.value
                ) || []
            );
        },
        closeMenuOnSelect: false,
        isMulti: true,
        value: filteredCommunityOptions,
        options: toReactOptions(communityAPI)
    };

    const propsList = (formik: any) => {
        const props = ["first_name", "last_name", "email"];
        return props.map((item: string) => {
            return {
                placeholder: capitalizeFirstLetter(item.replace("_", " ")),
                type: item === "email" ? "email" : "text",
                name: item,
                id: item,
                value: String(formik.values[item] ?? ""),
                touched: formik.touched[item],
                error: formik.errors[item]
            };
        });
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || /^\d{0,10}$/.test(value)) {
            formik.setFieldValue("mobile", value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Don't set value to formik to avoid controlled/uncontrolled issues
        // File is handled via ref only
    };

    return (
        <div
            className={styles.edit_profile_container}
            style={
                props.editPopUp
                    ? { transform: "scale(1)" }
                    : { transform: "scale(0)" }
            }
            onClick={() => props.setEditPopUP(false)}
        >
            <div className={styles.edit_profile}>
                <div
                    className={styles.edit_profile_contents}
                    tabIndex={1}
                    onFocus={() => props.setEditPopUP(true)}
                    onClick={e => e.stopPropagation()}
                    // onBlur={() => props.setEditPopUP(false)}
                >
                    <h2>Edit Profile</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {propsList(formik).map((item, index) => (
                            <div key={`field-${item.name}-${index}`} className={styles.input_field}>
                                <label
                                    className={styles.label}
                                    htmlFor={item.id}
                                >
                                    {item.placeholder}
                                </label>
                                <div className={styles.inputBox}>
                                    <input 
                                        {...propsList2} 
                                        type={item.type}
                                        name={item.name}
                                        id={item.id}
                                        placeholder={item.placeholder}
                                        value={String(item.value ?? "")}
                                    />
                                    {item.touched && item.error && (
                                        <div className={styles.error_message}>
                                            {item.error}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        <div className={styles.input_field}>
                            <label className={styles.label}>Mobile</label>
                            <div className={styles.inputBox}>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={String(formik.values.mobile ?? "")}
                                    placeholder="Mobile"
                                    onBlur={formik.handleBlur}
                                    onChange={handleMobileChange}
                                    maxLength={10}
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <div className={styles.error_message}>
                                        {typeof formik.errors.mobile === "string"
                                            ? formik.errors.mobile
                                            : Array.isArray(formik.errors.mobile)
                                                ? formik.errors.mobile.join(", ")
                                                : ""}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="community">
                                Community
                            </label>
                            <div className={styles.inputBox}>
                                {loadStatus && <Select {...communityProps} />}
                            </div>
                        </div>
                        
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="gender">
                                Gender
                            </label>
                            <div className={styles.inputBox}>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={String(formik.values.gender ?? "")}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">♂ Male</option>
                                    <option value="Female">♀ Female</option>
                                    <option value="Other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="dob">
                                Date of Birth
                            </label>
                            <div className={styles.inputBox}>
                                <input
                                    id="dob"
                                    type="date"
                                    name="dob"
                                    value={String(formik.values.dob ?? "")}
                                    placeholder="Date of Birth"
                                    max={`${new Date().getFullYear() - 17}-12-31`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                        </div>
                        
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="image">
                                Profile Image
                            </label>
                            <div className={`${styles.inputBox} ${styles.imageBox}`}>
                                <input
                                    id="image"
                                    ref={imageRef}
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        
                        <div className={styles.btn_container}>
                            <PowerfulButton
                                type="button"
                                variant="outline"
                                disabled={discordState === "loading"}
                                onClick={discordSync}
                                className={styles.powerfulButton}
                            >
                                Sync Discord Image
                                {
                                    {
                                        initial: <BsDiscord size={32} />,
                                        loading: (
                                            <BeatLoader
                                                size={8}
                                                color="#456ff6"
                                            />
                                        ),
                                        finished: <BsCheck size={32} />
                                    }[discordState]
                                }
                            </PowerfulButton>

                            <MuButton
                                type="submit"
                                style={buttonStyle}
                                text="Update Profile"
                            />
                        </div>
                        
                        <button
                            type="button"
                            className={styles.edit_profile_close}
                            onClick={() => props.setEditPopUP(false)}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePopUp;