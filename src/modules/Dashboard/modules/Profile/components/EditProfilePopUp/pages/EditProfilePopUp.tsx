import { useEffect, useState } from "react";
import styles from "./EditProfilePopUp.module.css";
import { useToast } from "@chakra-ui/react";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import {
    getCommunities,
    getEditUserProfile,
    patchEditUserProfile
} from "../services/api";
import { useFormik } from "formik";
import Select from "react-select";
import {
    capitalizeFirstLetter,
    toReactOptions
} from "../../../../../utils/common";

type Props = {
    editPopUp: boolean;
    setEditPopUP: (value: boolean) => void;
    triggerUpdateProfile: () => void;
};

const EditProfilePopUp = (props: Props) => {
    const toast = useToast();
    const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }]);
    const [loadStatus, setLoadStatus] = useState(false);
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
            communities: []
        },
        onSubmit: values => {
            2;
            patchEditUserProfile(toast, values);
            props.triggerUpdateProfile();
            setTimeout(() => {
                props.setEditPopUP(false);
            }, 1000);
        },
        validate: (values: any) => {
            let errors: any = {};
            const emailRegex = /\S+@\S+\.\S+/;
            ["first_name", "last_name", "mobile"].forEach(key => {
                if (!values[key]) errors[key] = "Required";
            });
            if (!values.email) errors.email = "Email is required";
            else if (!emailRegex.test(values.email))
                errors.email = "Invalid email address";
            return errors;
        }
    });
    useEffect(() => {
        return getCommunities(setCommunityAPI, setLoadStatus);
    }, []);
    useEffect(() => {
        getEditUserProfile(data => formik.setValues(data));
    }, [props.editPopUp]);
    const buttonStyle = {
        background: "#456FF6",
        color: "#fff",
        margin: "0px 0px -8px 0px",
        display: "flex",
        justifyContent: "center",
        padding: "16px"
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
        defaultValue: filteredCommunityOptions,
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
        >
            <div className={styles.edit_profile}>
                <div
                    className={styles.edit_profile_contents}
                    tabIndex={1}
                    onFocus={() => props.setEditPopUP(true)}
                    onBlur={() => props.setEditPopUP(false)}
                >
                    <h2>Edit Profile</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {propsList(formik).map((item, index) => (
                            <div key={index} className={styles.input_field}>
                                <label className={styles.label} htmlFor={item.id}>
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
                                {formik.touched.mobile && formik.errors.mobile ? (
                                    <p className={styles.error_message}>
                                        {formik.errors.mobile}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="">Community</label>
                            <div className={styles.inputBox}>
                                {loadStatus && <Select {...communityProps} />}
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="">Gender</label>
                            <div className={styles.inputBox}>
                                <select
                                    name="gender"
                                    value={formik.values.gender}
                                    {...propsList2}
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">♂ Male</option>
                                    <option value="female">♀ Female</option>
                                    <option value="other">Other</option>
                                    <option value="not to say">
                                        Prefer not to say
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="">DOB</label>
                            <div className={styles.inputBox}>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formik.values.dob}
                                    placeholder="DOB"
                                    {...propsList2}
                                />
                            </div>

                        </div>

                        <MuButton
                            type="submit"
                            style={buttonStyle}
                            text={"Update Profile"}
                        />
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
