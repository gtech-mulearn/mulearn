import React, { useEffect, useRef, useState } from "react";
import styles from "./Onboarding.module.css";
type Props = {};
import ReactSelect, { SingleValue } from "react-select";
import Error from "../components/Error";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";

import {
    getCountries,
    getColleges,
    getCommunities,
    getCompanies,
    getInterests,
    getRoles,
    registerUser,
    emailVerification,
    getState,
    getDistrict,
    getDWMSDetails
} from "../services/onboardingApis";
import { useNavigate, useParams } from "react-router-dom";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";

const animatedComponents = makeAnimated();

interface BackendErrors {
    [fieldName: string]: string[];
}

const Onboarding = (props: Props) => {
    const urlParams = new URLSearchParams(window.location.search);
    const jsId = urlParams.get("jsid");
    const referralId = urlParams.get("referral_id");
    // console.log(jsId)
    const queryParameters = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    // for hide and question container
    const [displayLoader, setDisplayLoader] = useState("flex");
    const [opacityLoader, setOpacityLoader] = useState(1);
    setTimeout(() => {
        setDisplayLoader("none");
        setOpacityLoader(0);
    }, 5000);
    const [display0, setDisplay0] = useState("flex");
    const [display, setDisplay] = useState("flex");
    const [display2, setDisplay2] = useState("flex");
    const [opacity0, setOpacity0] = useState(1);
    const [opacity, setOpacity] = useState(1);
    const [opacity2, setOpacity2] = useState(1);
    const [emailVerificationResultBtn, setEmailVerificationResultBtn] =
        useState("Next");
    const [firstQuestion, setFirstQuestion] = useState(false);
    const [secondQuestion, setSecondQuestion] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showSubmitLoader, setShowSubmitLoader] = useState(false);
    //Getting the token from the URL
    const token = queryParameters.get("id");

    //State Variables for the From
    const [role, setRole] = useState([{ id: "", title: "" }]);
    const [tcChecked, setTcChecked] = useState(false);
    //State Variable for the Form Submission Validation
    const [formSuccess, setFormSuccess] = useState(false);
    const [hasError, setHasError] = useState({
        error: false,
        statusCode: 0,
        message: ""
    });

    const [hasValidationError, setHasValidationError] = useState({
        error: false,
        message: ""
    });

    const [roleVerified, setRoleVerified] = useState(false);
    //temporary measure for hiding company
    //when not working,not studying
    //is selected
    const [working, setWorking] = useState(false);
    //ref to community selector for resetting - temporary fix
    const community_select_ref = useRef<any>();
    //State Array for Storing the Organization(Company, Community, College)
    const [organization, setOrganization] = useState("");
    const [community, setCommunity] = useState<string[]>([]);

    //State Array for storing the College Options
    const [collegeAPI, setCollegeAPI] = useState([{ id: "", title: "" }]);
    //State Array for storing the College Options(Search)
    const [collegeOptions, setCollegeOptions] = useState([
        { value: "", label: "" }
    ]);
    const [countryOption, setCountryOption] = useState([
        { value: "", label: "" }
    ]);
    const [stateOption, setStateOption] = useState([{ value: "", label: "" }]);
    const [districtOption, setDistrictOption] = useState([
        { value: "", label: "" }
    ]);
    const [district, setDistrict] = useState([{ value: "", label: "" }]);

    //State Array for storing the Department Options
    const [departmentAPI, setDepartmentAPI] = useState([
        { value: "", label: "" }
    ]);
    //State Array for storing the Company Options
    const [companyAPI, setCompanyAPI] = useState([{ id: "", title: "" }]);
    //State Array for storing the Community Options
    const [communityAPI, setCommunityAPI] = useState([{ id: "", title: "" }]);
    //State Array for storing the Mentor Role Options
    const [roleAPI, setRoleAPI] = useState([{ id: "", title: "" }]);
    //State Array for storing the Area of Interest Options
    const [aoiAPI, setAoiAPI] = useState([{ id: "", name: "" }]);
    const [showOrHidePassword, setShowOrHidePassword] = useState("password");
    const [showOrHideCPassword, setShowOrHideCPassword] = useState("password");

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: "none",
            background: "rgba(239, 241, 249, 0.6)",
            borderRadius: "6px",
            outline: "none",
            marginTop: "10px"
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#F8F8F8" : "white",
            color: "#4A4A4A",
            padding: "8px 20px",
            "&:hover": {
                backgroundColor: "#F8F8F8"
            }
        }),
        menu: (provided: any) => ({
            ...provided,
            marginTop: "0",
            borderRadius: "0",
            boxShadow: "none"
        })
    };
    const currentYear = new Date().getFullYear() + 7;
    const yearsCount = 15;
    const yog_year = Array.from({ length: yearsCount }, (_, index) => {
        const year = currentYear - index;
        return { value: year, label: year };
    });

    const errorHandler = (status: number, dataStatus: number) => {
        if (status === 404 || status === 500) {
            const errorMessage = {
                error: true,
                statusCode: dataStatus,
                message: "Something went wrong, Please try again Later"
            };
            setHasError(errorMessage);
        }
    };

    useEffect(() => {
        localStorage.setItem("token", queryParameters.get("id") as string);
        getCountries(errorHandler, setCountryOption);
        getCommunities(errorHandler, setCommunityAPI);
        getCompanies(errorHandler, setCompanyAPI);
        getInterests(errorHandler, setAoiAPI);
        getRoles(errorHandler, setRoleAPI);
        jsId &&
            getDWMSDetails(errorHandler, jsId, (data: any) => {
                formik.setValues({
                    firstName: data.job_seeker_fname,
                    lastName: data.job_seeker_lname,
                    email: data.email_id,
                    password: "",
                    confirmPassword: "",
                    phone: data.mobile_no,
                    gender: data.gender.toLowerCase(),
                    dob: data.dob,
                    role: "",
                    country: "",
                    state: "",
                    district: "",
                    organization,
                    community,
                    dept: "",
                    yog: "",
                    mentorRole: "",
                    areaOfInterest: [],
                    general: "",
                    referral_id: ""
                });
            });
    }, []);
    const [backendError, setBackendError] = useState<BackendErrors>({});

    const handleBackendErrors = (errors: BackendErrors) => {
        // console.log(errors);

        const formattedErrors: BackendErrors = {};
        Object.entries(errors).forEach(([fieldName, errorMessages]) => {
            formattedErrors[fieldName] = errorMessages;
        });
        // console.log(formattedErrors);

        setBackendError(formattedErrors);
    };

    // formik
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: void 0,
        gender: "",
        dob: "",
        role: "",
        country: "",
        state: "",
        district: "",
        organization,
        community,
        dept: "",
        yog: "",
        mentorRole: "",
        areaOfInterest: [],
        general: "",
        referral_id: referralId ? referralId : ""
    };

    const onSubmit = async (values: any, { setErrors, resetForm }: any) => {
        if (values.organization != "") {
            values.community.push(values.organization);
        }
        //console.log(values.community);

        const userData = {
            first_name: values.firstName, //required
            last_name: values.lastName === "" ? null : values.lastName,
            email: values.email, //required
            mobile: values.phone, //required
            gender: values.gender === "" ? null : values.gender,
            dob: values.dob === "" ? null : values.dob,
            role: role[0]["id"] == "" ? null : role[0]["id"], //required
            organizations:
                values.organization === "" && values.community.length === 0
                    ? null
                    : values.community, //required except for individual
            dept: values.dept === "" ? null : values.dept, //required for student and enabler
            year_of_graduation: values.yog === "" ? null : values.yog, //required for student
            area_of_interests: values.areaOfInterest, //required,
            password: values.password, //required
            referral_id: values.referral_id === "" ? null : values.referral_id
        };

        registerUser(
            setFormSuccess,
            setRoleVerified,
            formik,
            setHasValidationError,
            userData,
            navigate,
            setShowSubmitLoader
        );
    };

    const validate = (values: any) => {
        let errors: any = {};
        if (!values.firstName) {
            errors.firstName = "First name is required";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email address";
        }
        if (values.password.length < 8)
            errors.password = "Password length should be greater than 8";

        if (!values.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (
            values.confirmPassword == "" ||
            values.password != values.confirmPassword
        ) {
            errors.confirmPassword = "Password does not match";
        }
        if (!values.phone) {
            errors.phone = "Phone number is required";
        } else if (values.phone.toString().length != 10) {
            errors.phone = "Phone number is invalid";
        }
        if (!values.organization) {
            errors.organization = "This field is required";
        }
        if (!values.country) {
            errors.country = "This field is required";
        }
        if (!values.state) {
            errors.state = "This field is required";
        }
        if (!values.district) {
            errors.district = "This field is required";
        }
        if (!values.dept) {
            errors.dept = "Department is required";
        }
        if (!values.yog) {
            errors.yog = "Year of graduation is required";
        }
        if (!values.mentorRole) {
            errors.mentorRole = "Type is required";
        }
        if (!values.areaOfInterest) {
            errors.areaOfInterest = "Area of interest is required";
        }
        return errors;
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    useEffect(() => {
        setEmailVerificationResultBtn("Next");
    }, [formik.values.email]);

    useEffect(() => {
        if (jsId) {
            const foundRole = roleAPI.find(
                (role: any) => role.title === "Student"
            );
            if (foundRole) {
                setRole([
                    {
                        id: foundRole.id,
                        title: foundRole.title
                    }
                ]);
            }
        }
    }, [roleAPI]);
    return (
        <>
            <div className={styles.onboarding_page}>
                {!hasError.error ? (
                    <>
                        {hasValidationError.error ? (
                            <div className={styles.validation_error_message}>
                                <p>{hasValidationError.message}</p>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className={styles.form_container}>
                            {!jsId && (
                                <div
                                    style={{
                                        display: display0,
                                        opacity: opacity0
                                    }}
                                    className={styles.question_container}
                                >
                                    {" "}
                                    <div className={styles.question_box}>
                                        <div className={styles.question}>
                                            <h3
                                                style={
                                                    emailVerificationResultBtn ===
                                                    "Login"
                                                        ? {
                                                              backgroundColor:
                                                                  "#9719CD"
                                                          }
                                                        : {}
                                                }
                                            >
                                                Enter your email
                                            </h3>
                                            <div className={styles.answers}>
                                                <form
                                                    className={
                                                        styles.verify_email
                                                    }
                                                >
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className={styles.input}
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values.email
                                                        }
                                                        placeholder="Enter your email"
                                                    />
                                                    {formik.touched.email &&
                                                    formik.errors.email ? (
                                                        <div
                                                            className={
                                                                styles.error_message
                                                            }
                                                        >
                                                            {
                                                                formik.errors
                                                                    .email
                                                            }
                                                        </div>
                                                    ) : null}
                                                    <MuButton
                                                        type="submit"
                                                        className={
                                                            styles.verify_button
                                                        }
                                                        text={
                                                            emailVerificationResultBtn
                                                        }
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            if (
                                                                emailVerificationResultBtn ==
                                                                "Next"
                                                            ) {
                                                                if (
                                                                    !/\S+@\S+\.\S+/.test(
                                                                        formik
                                                                            .values
                                                                            .email
                                                                    )
                                                                ) {
                                                                    formik.errors.email =
                                                                        "Invalid email address";
                                                                }
                                                                if (
                                                                    !formik
                                                                        .errors
                                                                        .email &&
                                                                    formik
                                                                        .values
                                                                        .email !=
                                                                        ""
                                                                ) {
                                                                    emailVerification(
                                                                        formik
                                                                            .values
                                                                            .email,
                                                                        setFirstQuestion,
                                                                        formik,
                                                                        setEmailVerificationResultBtn,
                                                                        setOpacity0,
                                                                        setDisplay0,
                                                                        setShowLoader
                                                                    );
                                                                }
                                                            } else {
                                                                navigate(
                                                                    "/login"
                                                                );
                                                            }
                                                        }}
                                                        style={
                                                            emailVerificationResultBtn ===
                                                            "Login"
                                                                ? {
                                                                      backgroundColor:
                                                                          "#9719CD"
                                                                  }
                                                                : {}
                                                        }
                                                        isLoading={showLoader}
                                                    />
                                                </form>
                                                <a href="/login">
                                                    Do you have an account ?
                                                    Login
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {firstQuestion ? (
                                <div
                                    style={{
                                        display: display,
                                        opacity: opacity
                                    }}
                                    className={styles.question_container}
                                >
                                    <div className={styles.question_box}>
                                        <div className={styles.question}>
                                            <h3>What is your role ?</h3>
                                            <div className={styles.answers}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        roleAPI.map(
                                                            (role: any) => {
                                                                if (
                                                                    role.title ===
                                                                    "Student"
                                                                ) {
                                                                    setRole([
                                                                        {
                                                                            id: role.id,
                                                                            title: role.title
                                                                        }
                                                                    ]);
                                                                }
                                                            }
                                                        );
                                                        setOpacity(0);
                                                        setTimeout(() => {
                                                            setDisplay("none");
                                                        }, 1000);
                                                    }}
                                                >
                                                    I'm currently studying
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpacity(0);
                                                        setSecondQuestion(true);
                                                        setTimeout(() => {
                                                            setDisplay("none");
                                                        }, 1000);
                                                        //temporary measure for hiding company
                                                        //when not working,not studying
                                                        //is selected
                                                        setWorking(true);
                                                    }}
                                                >
                                                    I'm currently a working
                                                    professional
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        roleAPI.map(
                                                            (role: any) => {
                                                                if (
                                                                    role.title ===
                                                                    "Enabler"
                                                                ) {
                                                                    setRole([
                                                                        {
                                                                            id: role.id,
                                                                            title: role.title
                                                                        }
                                                                    ]);
                                                                }
                                                            }
                                                        );

                                                        setOpacity(0);
                                                        setTimeout(() => {
                                                            setDisplay("none");
                                                        }, 1000);
                                                    }}
                                                >
                                                    I'm teaching in a institute
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpacity(0);
                                                        setSecondQuestion(true);
                                                        setTimeout(() => {
                                                            setDisplay("none");
                                                        }, 1000);
                                                        setWorking(true);
                                                    }}
                                                >
                                                    I'm a freelancer
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setOpacity(0);
                                                        setTimeout(() => {
                                                            setDisplay("none");
                                                        }, 1000);
                                                    }}
                                                >
                                                    I'm not working, not
                                                    studying
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {/*2nd question if the user is working prof. or freelancer  */}
                            {secondQuestion ? (
                                <div
                                    style={{
                                        display: display2,
                                        opacity: opacity2
                                    }}
                                    className={styles.question_container}
                                >
                                    <div className={styles.question_box}>
                                        <div className={styles.question}>
                                            <h3>
                                                Would you like to become a
                                                Mentor?
                                            </h3>
                                            <div className={styles.answers}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setRole([
                                                            {
                                                                id: "",
                                                                title: ""
                                                            }
                                                        ]);
                                                        setOpacity2(0);
                                                        setTimeout(() => {
                                                            setDisplay2("none");
                                                        }, 1000);
                                                    }}
                                                >
                                                    No
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        roleAPI.map(
                                                            (role: any) => {
                                                                if (
                                                                    role.title ===
                                                                    "Mentor"
                                                                ) {
                                                                    setRole([
                                                                        {
                                                                            id: role.id,
                                                                            title: role.title
                                                                        }
                                                                    ]);
                                                                }
                                                            }
                                                        );

                                                        setOpacity2(0);
                                                        setTimeout(() => {
                                                            setDisplay2("none");
                                                        }, 1000);
                                                    }}
                                                >
                                                    Yes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* Form */}

                            <h1>User Information</h1>
                            <p>
                                Please enter all the required information in the
                                fields provided below. Please be aware that once
                                you have submitted this information, you will
                                not be able to make any changes or updates.{" "}
                                <b>Don't use autofill to fill in the form.</b>
                            </p>
                            <form
                                onSubmit={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div>
                                    <div className={styles.inputs}>
                                        <div className={styles.input_container}>
                                            <label htmlFor="">
                                                First Name{" "}
                                                <span
                                                    className={styles.required}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                id="first_name"
                                                type="text"
                                                name="firstName"
                                                placeholder="First name"
                                                className={styles.input}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.firstName}
                                            />
                                            {formik.touched.firstName &&
                                            formik.errors.firstName ? (
                                                <div
                                                    className={
                                                        styles.error_message
                                                    }
                                                >
                                                    {formik.errors.firstName}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className={styles.input_container}>
                                            <label htmlFor="">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last name"
                                                className={styles.input}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.inputs}>
                                        <div className={styles.input_container}>
                                            <label htmlFor="">
                                                Email address{" "}
                                                <span
                                                    className={styles.required}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="username@domain.com"
                                                className={styles.input}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                // required
                                            />
                                            {formik.touched.email &&
                                            formik.errors.email ? (
                                                <div
                                                    className={
                                                        styles.error_message
                                                    }
                                                >
                                                    {formik.errors.email}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className={styles.input_container}>
                                            <label htmlFor="">
                                                Phone number{" "}
                                                <span
                                                    className={styles.required}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <div
                                                className={
                                                    styles.grouped_inputs
                                                }
                                            >
                                                <select
                                                    style={{
                                                        width: "20%",
                                                        textAlign: "center"
                                                    }}
                                                    name=""
                                                >
                                                    <option value="+91">
                                                        +91
                                                    </option>
                                                </select>
                                                <input
                                                    id="phone_field"
                                                    name="phone"
                                                    style={{ width: "78%" }}
                                                    type="number"
                                                    placeholder="8023456789"
                                                    onBlur={formik.handleBlur}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={formik.values.phone}
                                                    // required
                                                />
                                                {formik.touched.phone &&
                                                formik.errors.phone ? (
                                                    <div
                                                        className={
                                                            styles.error_message
                                                        }
                                                    >
                                                        {formik.errors.phone}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.inputs}>
                                        <div className={styles.input_container}>
                                            <label htmlFor="">
                                                Password{" "}
                                                <span
                                                    className={styles.required}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                id="password"
                                                type={showOrHidePassword}
                                                name="password"
                                                placeholder="Password"
                                                className={styles.input}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                            />
                                            <button
                                                type="button"
                                                className={styles.password_icon}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    showOrHidePassword ==
                                                    "password"
                                                        ? setShowOrHidePassword(
                                                              "text"
                                                          )
                                                        : setShowOrHidePassword(
                                                              "password"
                                                          );
                                                }}
                                            >
                                                {showOrHidePassword ===
                                                "text" ? (
                                                    <i className="fi fi-sr-eye"></i>
                                                ) : (
                                                    <i className="fi fi-sr-eye-crossed"></i>
                                                )}
                                            </button>
                                            {formik.touched.password &&
                                            formik.errors.password ? (
                                                <div
                                                    className={
                                                        styles.error_message
                                                    }
                                                >
                                                    {formik.errors.password}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className={styles.input_container}>
                                            <label htmlFor="">
                                                Confirm password{" "}
                                                <span
                                                    className={styles.required}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type={showOrHideCPassword}
                                                name="confirmPassword"
                                                placeholder="Confirm password"
                                                className={styles.input}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values
                                                        .confirmPassword
                                                }
                                            />
                                            <button
                                                type="button"
                                                className={styles.password_icon}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    showOrHideCPassword ==
                                                    "password"
                                                        ? setShowOrHideCPassword(
                                                              "text"
                                                          )
                                                        : setShowOrHideCPassword(
                                                              "password"
                                                          );
                                                }}
                                            >
                                                {showOrHideCPassword ===
                                                "text" ? (
                                                    <i className="fi fi-sr-eye"></i>
                                                ) : (
                                                    <i className="fi fi-sr-eye-crossed"></i>
                                                )}
                                            </button>
                                            {formik.touched.confirmPassword &&
                                            formik.errors.confirmPassword ? (
                                                <div
                                                    className={
                                                        styles.error_message
                                                    }
                                                >
                                                    {
                                                        formik.errors
                                                            .confirmPassword
                                                    }
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className={styles.inputs}>
                                        <div className={styles.input_container}>
                                            <div
                                                className={
                                                    styles.grouped_inputs
                                                }
                                            >
                                                <div
                                                    style={{ width: "49%" }}
                                                    className={
                                                        styles.input_container
                                                    }
                                                >
                                                    <label htmlFor="">
                                                        Gender
                                                    </label>
                                                    <select
                                                        name="gender"
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values.gender
                                                        }
                                                    >
                                                        <option value="">
                                                            Select gender
                                                        </option>
                                                        <option value="male">
                                                            <span
                                                                className={
                                                                    styles.gender
                                                                }
                                                            >
                                                                ♂
                                                            </span>{" "}
                                                            Male
                                                        </option>
                                                        <option value="female">
                                                            <span
                                                                className={
                                                                    styles.gender
                                                                }
                                                            >
                                                                ♀
                                                            </span>{" "}
                                                            Female
                                                        </option>
                                                        <option value="other">
                                                            Other
                                                        </option>
                                                        <option value="not to say">
                                                            Prefer not to say
                                                        </option>
                                                    </select>
                                                </div>
                                                <div
                                                    style={{ width: "49%" }}
                                                    className={
                                                        styles.input_container
                                                    }
                                                >
                                                    <label htmlFor="">
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        id="gender_field"
                                                        name="dob"
                                                        type="date"
                                                        placeholder="dd/mm/yyyy"
                                                        className={styles.input}
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values.dob
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.input_container}>
                                            <div
                                                style={{ width: "100%" }}
                                                className={
                                                    styles.input_container
                                                }
                                            >
                                                <label htmlFor="">
                                                    Community{" "}
                                                </label>
                                                <Select
                                                    name="community.id"
                                                    ref={community_select_ref}
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
                                                    components={
                                                        animatedComponents
                                                    }
                                                    isClearable
                                                    isMulti
                                                    options={communityAPI.map(
                                                        company => {
                                                            return {
                                                                value: company.id,
                                                                label: company.title
                                                            };
                                                        }
                                                    )}
                                                />
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.inputs}>
                                        {role[0].title == "Student" ||
                                        role[0].title == "Enabler" ? (
                                            <>
                                                <div
                                                    className={
                                                        styles.input_container
                                                    }
                                                >
                                                    <label htmlFor="">
                                                        Country{" "}
                                                        <span
                                                            className={
                                                                styles.required
                                                            }
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <Select
                                                        key={
                                                            formik.values
                                                                .country
                                                        }
                                                        value={countryOption.find(
                                                            option =>
                                                                option?.value !==
                                                                    "" &&
                                                                option?.value ===
                                                                    formik
                                                                        .values
                                                                        .country
                                                        )}
                                                        name="country"
                                                        onChange={option => {
                                                            formik.setFieldValue(
                                                                "state",
                                                                ""
                                                            );
                                                            formik.setFieldValue(
                                                                "district",
                                                                ""
                                                            );
                                                            formik.setFieldValue(
                                                                "organization",
                                                                ""
                                                            );
                                                            formik.setFieldValue(
                                                                "country",
                                                                option?.value
                                                            );
                                                            getState(
                                                                errorHandler,
                                                                setStateOption,
                                                                {
                                                                    country:
                                                                        option?.value
                                                                }
                                                            );
                                                        }}
                                                        options={countryOption}
                                                        isClearable={false}
                                                        placeholder="Select country..."
                                                        filterOption={(
                                                            { label },
                                                            inputValue
                                                        ) =>
                                                            label
                                                                .toLowerCase()
                                                                .includes(
                                                                    inputValue.toLowerCase()
                                                                )
                                                        }
                                                        styles={customStyles}
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        // required
                                                    />
                                                    {formik.touched.country &&
                                                    formik.errors.country ? (
                                                        <div
                                                            className={
                                                                styles.error_message
                                                            }
                                                        >
                                                            {
                                                                formik.errors
                                                                    .country
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div
                                                    className={
                                                        styles.input_container
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.grouped_inputs
                                                        }
                                                    >
                                                        <div
                                                            style={
                                                                role[0]
                                                                    .title ===
                                                                "Student"
                                                                    ? window.innerWidth >
                                                                      500
                                                                        ? {
                                                                              width: "48%"
                                                                          }
                                                                        : {
                                                                              width: "100%"
                                                                          }
                                                                    : {}
                                                            }
                                                            className={
                                                                styles.input_container
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                State{" "}
                                                                <span
                                                                    className={
                                                                        styles.required
                                                                    }
                                                                >
                                                                    *
                                                                </span>
                                                            </label>
                                                            <Select
                                                                key={
                                                                    formik
                                                                        .values
                                                                        .state
                                                                }
                                                                value={stateOption.find(
                                                                    option =>
                                                                        option?.value !==
                                                                            "" &&
                                                                        option?.value ===
                                                                            formik
                                                                                .values
                                                                                .state
                                                                )}
                                                                name="state"
                                                                onChange={option => {
                                                                    formik.setFieldValue(
                                                                        "district",
                                                                        ""
                                                                    );
                                                                    formik.setFieldValue(
                                                                        "organization",
                                                                        ""
                                                                    );
                                                                    formik.setFieldValue(
                                                                        "state",
                                                                        option?.value
                                                                    );

                                                                    getDistrict(
                                                                        errorHandler,
                                                                        setDistrictOption,
                                                                        {
                                                                            state: option?.value
                                                                        }
                                                                    );
                                                                }}
                                                                options={
                                                                    stateOption
                                                                }
                                                                isClearable={
                                                                    false
                                                                }
                                                                placeholder="Select State..."
                                                                filterOption={(
                                                                    { label },
                                                                    inputValue
                                                                ) =>
                                                                    label
                                                                        .toLowerCase()
                                                                        .includes(
                                                                            inputValue.toLowerCase()
                                                                        )
                                                                }
                                                                styles={
                                                                    customStyles
                                                                }
                                                                isDisabled={
                                                                    formik
                                                                        .values
                                                                        .country ===
                                                                    ""
                                                                        ? true
                                                                        : false
                                                                }
                                                                onBlur={
                                                                    formik.handleBlur
                                                                }
                                                                // required
                                                            />
                                                            {formik.touched
                                                                .state &&
                                                            formik.errors
                                                                .state ? (
                                                                <div
                                                                    className={
                                                                        styles.error_message
                                                                    }
                                                                >
                                                                    {
                                                                        formik
                                                                            .errors
                                                                            .state
                                                                    }
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        {role[0].title ==
                                                            "Student" ||
                                                        role[0].title ==
                                                            "Enabler" ? (
                                                            <div
                                                                style={
                                                                    window.innerWidth >
                                                                    500
                                                                        ? {
                                                                              width: "50%"
                                                                          }
                                                                        : {}
                                                                }
                                                                className={
                                                                    styles.input_container
                                                                }
                                                            >
                                                                <label htmlFor="">
                                                                    District{" "}
                                                                    <span
                                                                        className={
                                                                            styles.required
                                                                        }
                                                                    >
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <Select
                                                                    key={
                                                                        formik
                                                                            .values
                                                                            .district
                                                                    }
                                                                    name="district"
                                                                    value={districtOption.find(
                                                                        option =>
                                                                            option?.value !==
                                                                                "" &&
                                                                            option?.value ===
                                                                                formik
                                                                                    .values
                                                                                    .district
                                                                    )}
                                                                    onChange={option => {
                                                                        formik.setFieldValue(
                                                                            "organization",
                                                                            ""
                                                                        );
                                                                        formik.setFieldValue(
                                                                            "district",
                                                                            option?.value
                                                                        );
                                                                        getColleges(
                                                                            setCollegeAPI,
                                                                            setCollegeOptions,
                                                                            setDepartmentAPI,
                                                                            errorHandler,
                                                                            {
                                                                                district:
                                                                                    option?.value
                                                                            }
                                                                        );
                                                                    }}
                                                                    options={
                                                                        districtOption
                                                                    }
                                                                    isClearable={
                                                                        false
                                                                    }
                                                                    placeholder="Select dist..."
                                                                    filterOption={(
                                                                        {
                                                                            label
                                                                        },
                                                                        inputValue
                                                                    ) =>
                                                                        label
                                                                            .toLowerCase()
                                                                            .includes(
                                                                                inputValue.toLowerCase()
                                                                            )
                                                                    }
                                                                    styles={
                                                                        customStyles
                                                                    }
                                                                    isDisabled={
                                                                        formik
                                                                            .values
                                                                            .state ===
                                                                        ""
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    onBlur={
                                                                        formik.handleBlur
                                                                    }
                                                                    // required
                                                                />
                                                                {formik.touched
                                                                    .district &&
                                                                formik.errors
                                                                    .district ? (
                                                                    <div
                                                                        className={
                                                                            styles.error_message
                                                                        }
                                                                    >
                                                                        {
                                                                            formik
                                                                                .errors
                                                                                .district
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>

                                    <div className={styles.inputs}>
                                        {role[0].title == "Student" ||
                                        role[0].title == "Enabler" ? (
                                            <>
                                                <div
                                                    className={
                                                        styles.input_container
                                                    }
                                                >
                                                    <label htmlFor="">
                                                        College{" "}
                                                        <span
                                                            className={
                                                                styles.required
                                                            }
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <ReactSelect
                                                        key={
                                                            formik.values
                                                                .organization
                                                        }
                                                        id="college_field"
                                                        name="organization"
                                                        value={collegeOptions.find(
                                                            option =>
                                                                option?.value !==
                                                                    "" &&
                                                                option?.value ===
                                                                    formik
                                                                        .values
                                                                        .organization
                                                        )}
                                                        onChange={option => {
                                                            const indexToRemove =
                                                                formik.values.community.indexOf(
                                                                    organization
                                                                );
                                                            // Remove the value at the specified index
                                                            if (
                                                                indexToRemove !==
                                                                -1
                                                            ) {
                                                                formik.values.community.splice(
                                                                    indexToRemove,
                                                                    1
                                                                );
                                                            }
                                                            option &&
                                                                setOrganization(
                                                                    option.value
                                                                );
                                                            formik.handleChange(
                                                                {
                                                                    target: {
                                                                        name: "organization",
                                                                        value:
                                                                            option &&
                                                                            option.value
                                                                    }
                                                                }
                                                            );
                                                        }}
                                                        options={collegeOptions}
                                                        isClearable={false}
                                                        placeholder="Select college..."
                                                        noOptionsMessage={() => (
                                                            <a
                                                                href="https://airtable.com/shrfongm5JG8J53rD"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <p
                                                                    className={
                                                                        styles.add_college
                                                                    }
                                                                >
                                                                    College Not
                                                                    Found, Add
                                                                    College
                                                                </p>
                                                            </a>
                                                        )}
                                                        filterOption={(
                                                            { label },
                                                            inputValue
                                                        ) =>
                                                            label
                                                                .toLowerCase()
                                                                .includes(
                                                                    inputValue.toLowerCase()
                                                                )
                                                        }
                                                        styles={customStyles}
                                                        isDisabled={
                                                            formik.values
                                                                .district === ""
                                                                ? true
                                                                : false
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        // required
                                                    />
                                                    {formik.touched
                                                        .organization &&
                                                    formik.errors
                                                        .organization ? (
                                                        <div
                                                            className={
                                                                styles.error_message
                                                            }
                                                        >
                                                            {
                                                                formik.errors
                                                                    .organization
                                                            }
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div
                                                    className={
                                                        styles.input_container
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.grouped_inputs
                                                        }
                                                    >
                                                        <div
                                                            style={
                                                                role[0]
                                                                    .title ===
                                                                "Student"
                                                                    ? window.innerWidth >
                                                                      500
                                                                        ? {
                                                                              width: "48%"
                                                                          }
                                                                        : {
                                                                              width: "100%"
                                                                          }
                                                                    : {}
                                                            }
                                                            className={
                                                                styles.input_container
                                                            }
                                                        >
                                                            <label htmlFor="">
                                                                Department{" "}
                                                                <span
                                                                    className={
                                                                        styles.required
                                                                    }
                                                                >
                                                                    *
                                                                </span>
                                                            </label>
                                                            <Select
                                                                name="dept"
                                                                onChange={option => {
                                                                    formik.setFieldValue(
                                                                        "dept",
                                                                        option?.value
                                                                    );
                                                                }}
                                                                options={
                                                                    departmentAPI
                                                                }
                                                                isClearable={
                                                                    false
                                                                }
                                                                placeholder="Select dept..."
                                                                filterOption={(
                                                                    { label },
                                                                    inputValue
                                                                ) =>
                                                                    label
                                                                        .toLowerCase()
                                                                        .includes(
                                                                            inputValue.toLowerCase()
                                                                        )
                                                                }
                                                                styles={
                                                                    customStyles
                                                                }
                                                                isDisabled={
                                                                    formik
                                                                        .values
                                                                        .organization ===
                                                                    ""
                                                                        ? true
                                                                        : false
                                                                }
                                                                onBlur={
                                                                    formik.handleBlur
                                                                }
                                                            />
                                                            {formik.touched
                                                                .dept &&
                                                            formik.errors
                                                                .dept ? (
                                                                <div
                                                                    className={
                                                                        styles.error_message
                                                                    }
                                                                >
                                                                    {
                                                                        formik
                                                                            .errors
                                                                            .dept
                                                                    }
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        {role[0].title ==
                                                        "Student" ? (
                                                            <div
                                                                style={
                                                                    window.innerWidth >
                                                                    500
                                                                        ? {
                                                                              width: "50%"
                                                                          }
                                                                        : {}
                                                                }
                                                                className={
                                                                    styles.input_container
                                                                }
                                                            >
                                                                <label htmlFor="">
                                                                    Graduation
                                                                    Year{" "}
                                                                    <span
                                                                        className={
                                                                            styles.required
                                                                        }
                                                                    >
                                                                        *
                                                                    </span>
                                                                </label>

                                                                <Select
                                                                    name="yog"
                                                                    onChange={option => {
                                                                        formik.setFieldValue(
                                                                            "yog",
                                                                            option?.value
                                                                        );
                                                                    }}
                                                                    options={
                                                                        yog_year
                                                                    }
                                                                    isClearable={
                                                                        false
                                                                    }
                                                                    placeholder="Select year..."
                                                                    styles={
                                                                        customStyles
                                                                    }
                                                                    isDisabled={
                                                                        formik
                                                                            .values
                                                                            .dept ===
                                                                        ""
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    onBlur={
                                                                        formik.handleBlur
                                                                    }
                                                                    // required
                                                                />
                                                                {formik.touched
                                                                    .yog &&
                                                                formik.errors
                                                                    .yog ? (
                                                                    <div
                                                                        className={
                                                                            styles.error_message
                                                                        }
                                                                    >
                                                                        {
                                                                            formik
                                                                                .errors
                                                                                .yog
                                                                        }
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </>
                                        ) : !working ? (
                                            ""
                                        ) : (
                                            <>
                                                <div
                                                    className={
                                                        styles.input_container
                                                    }
                                                >
                                                    <label htmlFor="">
                                                        Company{" "}
                                                    </label>
                                                    <select
                                                        id="company_field"
                                                        name="organization"
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .organization
                                                        }
                                                    >
                                                        <option value="">
                                                            Select
                                                        </option>
                                                        {companyAPI.map(
                                                            (
                                                                company,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            company.id
                                                                        }
                                                                    >
                                                                        {
                                                                            company.title
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className={styles.inputs}>
                                        <div className={styles.input_container}>
                                            <label htmlFor="">
                                                Referral id
                                                {/* <span
                                                    className={styles.required}
                                                >
                                                    *
                                                </span> */}
                                            </label>
                                            <input
                                                id="referralId"
                                                type="text"
                                                name="referral_id"
                                                placeholder="Referral id , if any"
                                                className={styles.input}
                                                onBlur={formik.handleBlur}
                                                disabled={
                                                    referralId ? true : false
                                                }
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values.referral_id
                                                }
                                            />
                                            {formik.touched.referral_id &&
                                            formik.errors.referral_id ? (
                                                <div
                                                    className={
                                                        styles.error_message
                                                    }
                                                >
                                                    {formik.errors.referral_id}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className={styles.inputs}>
                                        <div className={styles.label_container}>
                                            <label htmlFor="">
                                                Areas of Interest / Stack{" "}
                                                <span
                                                    className={styles.required}
                                                >
                                                    *
                                                </span>
                                            </label>
                                        </div>

                                        <div className={styles.aoi_container}>
                                            {aoiAPI.map((aoi, i) => {
                                                const checked =
                                                    formik.values.areaOfInterest.includes(
                                                        aoi.id as never
                                                    );
                                                const disabled =
                                                    formik.values.areaOfInterest
                                                        .length >= 3 &&
                                                    !checked;
                                                return (
                                                    <label key={i}>
                                                        <input
                                                            name="areaOfInterest"
                                                            onBlur={
                                                                formik.handleBlur
                                                            }
                                                            value={
                                                                formik.values
                                                                    .areaOfInterest
                                                            }
                                                            // value={aoi.id}
                                                            type="checkbox"
                                                            checked={checked}
                                                            disabled={disabled}
                                                            onChange={e => {
                                                                const selectedId =
                                                                    aoi.id;
                                                                if (checked) {
                                                                    formik.setFieldValue(
                                                                        "areaOfInterest",
                                                                        formik.values.areaOfInterest.filter(
                                                                            aois =>
                                                                                aois !==
                                                                                selectedId
                                                                        )
                                                                    );
                                                                } else {
                                                                    formik.setFieldValue(
                                                                        "areaOfInterest",
                                                                        [
                                                                            ...formik
                                                                                .values
                                                                                .areaOfInterest,
                                                                            selectedId
                                                                        ].slice(
                                                                            -3
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                            // required
                                                        />
                                                        <span>{aoi.name}</span>
                                                    </label>
                                                );
                                            })}
                                            {formik.touched.areaOfInterest &&
                                            formik.values.areaOfInterest
                                                .length == 0 ? (
                                                <div
                                                    className={
                                                        styles.error_message
                                                    }
                                                >
                                                    Please select at least one
                                                    area of interest
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.error_message}>
                                    {formik.errors.general || ""}
                                </div>
                                <div className={styles.form_bottom}>
                                    <div className={styles.checkbox}>
                                        <input
                                            className={styles.input_checkbox}
                                            type="checkbox"
                                            checked={tcChecked}
                                            name=""
                                            id=""
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setTcChecked(true);
                                                } else {
                                                    setTcChecked(false);
                                                }
                                            }}
                                        />
                                        <label
                                            className={styles.tc_text}
                                            htmlFor=""
                                        >
                                            I Agree, the{" "}
                                            <a
                                                href="http://mulearn.org/termsandconditions"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span
                                                    className={styles.tc_span}
                                                >
                                                    Terms and Conditions
                                                </span>
                                            </a>{" "}
                                            and the{" "}
                                            <a
                                                href="http://mulearn.org/privacypolicy"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span
                                                    className={styles.tc_span}
                                                >
                                                    Privacy Policy
                                                </span>
                                            </a>
                                        </label>
                                    </div>
                                    <div className={styles.form_buttons}>
                                        <button
                                            type="reset"
                                            onClick={() => {
                                                community_select_ref.current.clearValue();
                                                formik.handleReset(
                                                    formik.values
                                                );
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <MuButton
                                            className={styles.submit_button}
                                            text={"Submit"}
                                            type="submit"
                                            onClick={e => {
                                                // e.preventDefault();
                                                validate(formik.values);
                                                if (
                                                    formik.values.firstName ==
                                                        "" ||
                                                    formik.errors.firstName ||
                                                    formik.errors.email ||
                                                    formik.errors.phone ||
                                                    formik.errors.password ||
                                                    formik.errors
                                                        .confirmPassword ||
                                                    formik.errors
                                                        .areaOfInterest ||
                                                    (role[0]["title"] ==
                                                        "Student" ||
                                                    role[0]["title"] ==
                                                        "Enabler"
                                                        ? formik.errors
                                                              .organization ||
                                                          formik.errors.dept
                                                        : null) ||
                                                    (role[0]["title"] ==
                                                    "Student"
                                                        ? formik.errors.yog
                                                        : null) ||
                                                    // (role[0]["title"] == "Mentor"
                                                    //   ? formik.errors.mentorRole
                                                    //   : null) ||
                                                    // (formik.values.mentorRole == "Company"
                                                    //   ? formik.errors.organization
                                                    //   : null) ||
                                                    (formik.values
                                                        .areaOfInterest
                                                        .length == 0
                                                        ? true
                                                        : null)
                                                ) {
                                                    //console.log(formik.errors);
                                                } else {
                                                    // console.log(formik.values);
                                                    // console.log("no error");
                                                    onSubmit(formik.values, {});
                                                }
                                            }}
                                            isLoading={showSubmitLoader}
                                            style={
                                                tcChecked
                                                    ? {
                                                          backgroundColor:
                                                              "#5570f1"
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "#5570f1",
                                                          opacity: "0.5"
                                                      }
                                            }
                                            disabled={!tcChecked}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className={styles.error_msg}>
                        <div className={styles.tik}>
                            <Error />
                        </div>
                        <br />
                        <br />
                        <p>{hasError ? hasError.message : "Loading..."}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Onboarding;
