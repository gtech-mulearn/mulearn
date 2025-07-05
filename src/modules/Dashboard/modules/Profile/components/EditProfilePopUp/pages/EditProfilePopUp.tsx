import { useEffect, useRef, useState } from "react";
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
import { updateCollege } from "@/MuLearnServices/collegeApi";
import { useFormik } from "formik";
import Select from "react-select";
import {
    capitalizeFirstLetter,
    toReactOptions
} from "../../../../../utils/common";
import { BsDiscord, BsCheck } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";

import {
    getCountries,
    getState,
    getDistrict,
    getColleges
} from "@/modules/Common/Authentication/services/onboardingApis";

type Props = {
    editPopUp: boolean;
    setEditPopUP: (value: boolean) => void;
    triggerUpdateProfile: () => void;
    id: string;
};

const EditProfilePopUp = (props: Props) => {
    const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }]);
    const [loadStatus, setLoadStatus] = useState(false);

    const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
    const [states, setStates] = useState<{ value: string; label: string }[]>([]);
    const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);
    const [colleges, setColleges] = useState<{ value: string; label: string }[]>([]);
    const [collegeAPI, setCollegeAPI] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);

    const imageRef = useRef<HTMLInputElement>(null);

    const [discordState, setDiscordState] = useState<"initial" | "loading" | "finished">("initial");

    const errorHandler = (status: number, dataStatus: number) => {
        console.error(`Error [${status}] - ${dataStatus}`);
    };

    type FormValues = {
        first_name: string;
        last_name: string;
        email: string;
        mobile: string;
        gender: string;
        dob: string;
        communities: string[];
        image: string;
        college: string;
        country: string;
        state: string;
        district: string;
    };

    const formik = useFormik<FormValues>({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            gender: "",
            dob: "",
            communities: [],
            image: "",
            college: "",
            country: "",
            state: "",
            district: ""
        },
        onSubmit: async values => {
            const { image, ...data } = values;

            

            await patchEditUserProfile(
                data,
                props.id,
                props.setEditPopUP,
                formik.setFieldError,
                imageRef?.current?.files?.item(0) ?? undefined
            );

            
            if (values.college) {
                await updateCollege(values.college);
            }

            props.triggerUpdateProfile();
        },
        validate: values => {
            let errors: Partial<Record<keyof FormValues, string>> = {};
            const emailRegex = /\S+@\S+\.\S+/;
            (["first_name", "mobile"] as (keyof FormValues)[]).forEach(key => {
                if (!values[key]) errors[key] = "Required";
            });
            if (!values.email) errors.email = "Email is required";
            else if (!emailRegex.test(values.email))
                errors.email = "Invalid email address";
            return errors;
        }
    });

    const discordSync = async () => {
        setDiscordState("loading");
        await syncDiscordImage();
        setDiscordState("finished");
        toast.success("Profile picture synced with discord");
    };

    useEffect(() => {
        getCommunities(setCommunityAPI, setLoadStatus);
        getCountries(errorHandler, setCountries);
    }, []);

    useEffect(() => {
        if (props.editPopUp)
            getEditUserProfile(data =>
                formik.setValues({
                    ...data,
                    image: "",
                    college: data.college ?? "",
                    country: data.country ?? "",
                    state: data.state ?? "",
                    district: data.district ?? ""
                })
            );
    }, [props.editPopUp]);

    useEffect(() => {
        if (formik.values.country)
            getState(errorHandler, setStates, { country: formik.values.country });
        else setStates([]);
        setDistricts([]);
        setColleges([]);
    }, [formik.values.country]);

    useEffect(() => {
        if (formik.values.state)
            getDistrict(errorHandler, setDistricts, { state: formik.values.state });
        else setDistricts([]);
        setColleges([]);
    }, [formik.values.state]);

    useEffect(() => {
        if (formik.values.district)
            getColleges(setCollegeAPI, setColleges, setDepartments, errorHandler, {
                district: formik.values.district
            });
        else setColleges([]);
    }, [formik.values.district]);

    const buttonStyle = {
        background: "#456FF6",
        color: "#fff",
        margin: "0px 0px -8px 0px",
        display: "flex",
        justifyContent: "center",
        padding: "16px",
        height: "50px"
    };

    const communityProps = {
        name: "communities.id",
        onChange: (OnChangeValue: any) => {
            formik.setFieldValue(
                "communities",
                OnChangeValue.map((value: any) => value.value)
            );
        },
        closeMenuOnSelect: false,
        isMulti: true,
        value: toReactOptions(
            communityAPI.filter(c => formik.values.communities.includes(c.id))
        ),
        options: toReactOptions(communityAPI)
    };

    const propsList = (["first_name", "last_name", "email"] as (keyof FormValues)[]).map(item => ({
        placeholder: capitalizeFirstLetter(item.replace("_", " ")),
        type: item === "email" ? "email" : "text",
        name: item,
        id: item,
        value: formik.values[item],
        touched: formik.touched[item],
        error: formik.errors[item]
    }));

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
                >
                    <h2>Edit Profile</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {propsList.map((item, index) => (
                            <div key={index} className={styles.input_field}>
                                <label className={styles.label} htmlFor={item.id}>
                                    {item.placeholder}
                                </label>
                                <div className={styles.inputBox}>
                                    <input
                                        {...item}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                    type="number"
                                    name="mobile"
                                    value={formik.values.mobile}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <p className={styles.error_message}>
                                        {formik.errors.mobile}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label}>Community</label>
                            <div className={styles.inputBox}>
                                {loadStatus && <Select {...communityProps} />}
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label}>Gender</label>
                            <div className={styles.inputBox}>
                                <select
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                >
                                    <option>Select gender</option>
                                    <option value="Male">♂ Male</option>
                                    <option value="Female">♀ Female</option>
                                    <option value="Other">Other</option>
                                    <option value="">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        {/* Cascading Dropdowns */}
                        <div className={styles.input_field}>
                            <label className={styles.label}>Country</label>
                            <div className={styles.inputBox}>
                                <select
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((c: any) => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label}>State</label>
                            <div className={styles.inputBox}>
                                <select
                                    name="state"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    disabled={!formik.values.country}
                                >
                                    <option value="">Select State</option>
                                    {states.map((s: any) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label}>District</label>
                            <div className={styles.inputBox}>
                                <select
                                    name="district"
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    disabled={!formik.values.state}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((d: any) => (
                                        <option key={d.value} value={d.value}>
                                            {d.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label}>College</label>
                            <div className={styles.inputBox}>
                                <select
                                    name="college"
                                    value={formik.values.college}
                                    onChange={formik.handleChange}
                                    disabled={!formik.values.district}
                                >
                                    <option value="">Select College</option>
                                    {colleges.map((c: any) => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.input_field}>
                            <label className={styles.label}>DOB</label>
                            <div className={styles.inputBox}>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formik.values.dob}
                                    onChange={formik.handleChange}
                                    max={`${new Date().getFullYear() - 17}-12-31`}
                                />
                            </div>
                        </div>

                        <div className={styles.input_field}>
                            <label className={styles.label}>Image</label>
                            <div className={`${styles.inputBox} ${styles.imageBox}`}>
                                <input
                                    ref={imageRef}
                                    type="file"
                                    name="image"
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.btn_container}>
                            <PowerfulButton
                                type="button"
                                variant="outline"
                                onClick={discordSync}
                                className={styles.powerfulButton}
                            >
                                Sync Discord Image
                                {{
                                    initial: <BsDiscord size={32} />,
                                    loading: <BeatLoader size={8} color="#456ff6" />,
                                    finished: <BsCheck size={32} />
                                }[discordState]}
                            </PowerfulButton>
                            <MuButton
                                type="submit"
                                style={buttonStyle}
                                text={"Update Profile"}
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
