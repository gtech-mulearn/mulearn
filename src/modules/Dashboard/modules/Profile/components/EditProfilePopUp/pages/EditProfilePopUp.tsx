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

const EditProfilePopUp = (props: Props) => {
    const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }]);
    const [loadStatus, setLoadStatus] = useState(false);
    const imageRef = useRef<HTMLInputElement>(null);
    const [discordState, setDiscordState] = useState<
        "initial" | "loading" | "finished"
    >("initial");
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", () => {
            props.setEditPopUP(false);
        });
    }, [props.editPopUp]);
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            gender: "",
            dob: "",
            communities: [],
            image: ""
        },
        onSubmit: values => {
            const { image, ...data } = values;

            if (imageRef.current && imageRef.current.files) {
                updateProfileImage(imageRef.current.files[0], props.id);
            }
            patchEditUserProfile(
                data,
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
            ["first_name", "mobile"].forEach(key => {
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
        return getCommunities(setCommunityAPI, setLoadStatus);
    }, []);
    useEffect(() => {
        if (props.editPopUp)
            getEditUserProfile(data =>
                formik.setValues({ ...data, image: "" })
            );
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
                OnChangeValue.map(
                    (
                        value: any = {
                            value: "",
                            label: ""
                        }
                    ) => value.value
                )
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
                value: formik.values[item],
                touched: formik.touched[item],
                error: formik.errors[item]
            };
        });
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
                            <div key={index} className={styles.input_field}>
                                <label
                                    className={styles.label}
                                    htmlFor={item.id}
                                >
                                    {item.placeholder}
                                </label>
                                <div className={styles.inputBox}>
                                    <input {...propsList2} {...item} />
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
                                    placeholder="Mobile"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.mobile &&
                                formik.errors.mobile ? (
                                    <p className={styles.error_message}>
                                        {formik.errors.mobile}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="">
                                Community
                            </label>
                            <div className={styles.inputBox}>
                                {loadStatus && <Select {...communityProps} />}
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="">
                                Gender
                            </label>
                            <div className={styles.inputBox}>
                                <select
                                    name="gender"
                                    value={formik.values.gender}
                                    {...propsList2}
                                >
                                    <option>Select gender</option>
                                    <option value="Male">♂ Male</option>
                                    <option value="Female">♀ Female</option>
                                    <option value="Other">Other</option>
                                    <option value="">Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="">
                                DOB
                            </label>
                            <div className={styles.inputBox}>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formik.values.dob}
                                    placeholder="DOB"
                                    max={
                                        (
                                            new Date().getFullYear() - 17
                                        ).toString() + "-12-31"
                                    }
                                    {...propsList2}
                                />
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="">
                                Image
                            </label>
                            <div
                                className={`${styles.inputBox} ${styles.imageBox}`}
                            >
                                <input
                                    ref={imageRef}
                                    type="file"
                                    name="image"
                                    value={formik.values.image}
                                    placeholder="DOB"
                                    {...propsList2}
                                />{" "}
                            </div>
                        </div>
                        <div className={styles.btn_container}>
                            <PowerfulButton
                                type="button"
                                variant="outline"
                                // disabled={discordState === "finished"}
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
                            {/* <div
                                    title={
                                        discordState === "initial"
                                            ? "Click to sync discord image"
                                            : ""
                                    }
                                    onClick={discordSync}
                                >
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
                                </div> */}

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
