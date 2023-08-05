import React, { useEffect, useState } from "react";
import styles from "./EditProfilePopUp.module.css";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import {
    getCommunities,
    getEditUserProfile,
    patchEditUserProfile
} from "../services/api";
import { useFormik } from "formik";
import Select from "react-select";
// import makeAnimated from "react-select/animated";

type Props = {
    editPopUp: boolean;
    setEditPopUP: (value: boolean) => void;
};

const EditProfilePopUp = (props: Props) => {
    // const animatedComponents = makeAnimated();
    const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }]);
    const [loadStatus, setLoadStatus] = useState(false);

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            gender: "",
            dob: "",
            community: []
        },
        onSubmit: values => {
            console.log(values);
            patchEditUserProfile(values);
        },
        validate: (values: any) => {
            let errors: any = {};
            if (!values.first_name) {
                errors.first_name = "Required";
            }
            if (!values.last_name) {
                errors.last_name = "Required";
            }
            if (!values.email) {
                errors.email = "Required";
            }
            if (!values.mobile) {
                errors.mobile = "Required";
            }

            return errors;
        }
    });

    useEffect(() => {
        getCommunities(setCommunityAPI, setLoadStatus);
        getEditUserProfile((data: any) => {
            // console.log(data);
            formik.setValues({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                mobile: data.mobile,
                gender: data.gender,
                dob: data.dob,
                community: data.community
            });
        });
    }, []);

    const communityIds: string[] = formik.values.community;
    const filteredCommunityOptions = communityAPI
        .filter(value => communityIds.includes(value.id))
        .map(value => ({
            value: value.id,
            label: value.title
        }));

    return (
        <div
            className={styles.edit_profile_container}
            style={
                props.editPopUp
                    ? {
                          transform: "scale(1)"
                      }
                    : {
                          transform: "scale(0)"
                      }
            }
        >
            <div className={styles.edit_profile}>
                <div className={styles.edit_profile_contents}>
                    <h2>Edit Profile</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.input_field}>
                            <label htmlFor="">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                                onBlur={formik.handleBlur}
                                placeholder="First Name"
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label htmlFor="">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                onBlur={formik.handleBlur}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                placeholder="Email"
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label htmlFor="">Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                onChange={formik.handleChange}
                                value={formik.values.mobile}
                                onBlur={formik.handleBlur}
                                placeholder="Mobile"
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label htmlFor="">Community</label>
                            {loadStatus && (
                                <Select
                                    name="community.id"
                                    onChange={OnChangeValue => {
                                        formik.setFieldValue(
                                            "community",
                                            OnChangeValue.map(
                                                (
                                                    value: any = {
                                                        value: "",
                                                        label: ""
                                                    }
                                                ) => value.value
                                            )
                                        );
                                    }}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    // components={animatedComponents}
                                    defaultValue={filteredCommunityOptions}
                                    options={communityAPI.map(company => {
                                        return {
                                            value: company.id,
                                            label: company.title
                                        };
                                    })}
                                />
                            )}
                        </div>
                        <div className={styles.input_field}>
                            <label htmlFor="">Gender</label>
                            <input
                                type="text"
                                name="gender"
                                onChange={formik.handleChange}
                                value={formik.values.gender}
                                onBlur={formik.handleBlur}
                                placeholder="Gender"
                            />
                        </div>
                        <div className={styles.input_field}>
                            <label htmlFor="">DOB</label>
                            <input
                                type="date"
                                name="dob"
                                onChange={formik.handleChange}
                                value={formik.values.dob}
                                onBlur={formik.handleBlur}
                                placeholder="DOB"
                            />
                        </div>

                        <MuButton
                            type="submit"
                            style={{
                                background: "#456FF6",
                                color: "#fff",
                                margin: "0px 0px -8px 0px",
                                display: "flex",
                                justifyContent: "center",
                                padding: "16px"
                            }}
                            text={"Update Profile"}
                            onClick={() => {
                                // function()
                            }}
                        />
                        <button
                            type="button"
                            className={styles.edit_profile_close}
                            onClick={() => {
                                props.setEditPopUP(false);
                            }}
                        >
                            Close
                        </button>
                    </form>
                    <div className={styles.edit_profile_body}></div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePopUp;
