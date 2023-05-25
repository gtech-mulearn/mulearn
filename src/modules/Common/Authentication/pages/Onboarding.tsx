import React, { useEffect, useState } from "react";
import styles from "./Onboarding.module.css";
type Props = {};
import ReactSelect from "react-select";
import Error from "../components/Error";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";

import {
    getCountries,
    getColleges,
    getCommunties,
    getCompanies,
    getInterests,
    getRoles,
    registerUser,
    emailVerification,
    getState,
    getDistrict
} from "../services/onboardingApis";
import { useNavigate } from "react-router-dom";
import { title } from "process";

const animatedComponents = makeAnimated();

interface BackendErrors {
    [fieldName: string]: string[];
}

const Onboarding = (props: Props) => {
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

    // const yog_year = [
    //     2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
    //     2027, 2028, 2029, 2030
    // ];
    const yog_year = [
        { value: 2015, label: 2015 },
        { value: 2016, label: 2016 },
        { value: 2017, label: 2017 },
        { value: 2018, label: 2018 },
        { value: 2019, label: 2019 },
        { value: 2020, label: 2020 },
        { value: 2021, label: 2021 },
        { value: 2022, label: 2022 },
        { value: 2023, label: 2023 },
        { value: 2024, label: 2024 },
        { value: 2025, label: 2025 },
        { value: 2026, label: 2026 },
        { value: 2027, label: 2027 },
        { value: 2028, label: 2028 },
        { value: 2029, label: 2029 },
        { value: 2030, label: 2030 }
    ];

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
        getCommunties(errorHandler, setCommunityAPI);
        getCompanies(errorHandler, setCompanyAPI);
        getInterests(errorHandler, setAoiAPI);
        getRoles(errorHandler, setRoleAPI);
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
        general: ""
    };

    const onSubmit = async (values: any, { setErrors, resetForm }: any) => {
        if (values.organization != "") {
            values.community.push(values.organization);
        }
        console.log(values.community);

        const userData = {
            firstName: values.firstName, //required
            lastName: values.lastName === "" ? null : values.lastName,
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
            yearOfGraduation: values.yog === "" ? null : values.yog, //required for student
            areaOfInterests: values.areaOfInterest, //required,
            password: values.password //required
        };

        registerUser(
            setFormSuccess,
            setRoleVerified,
            formik,
            setHasValidationError,
            userData,
            navigate
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
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password == "") {
            errors.password = "Password should not be empty";
        }
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
                            <div
                                style={{ display: display0, opacity: opacity0 }}
                                className={styles.question_container}
                            >
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
                                                className={styles.verify_email}
                                            >
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className={styles.input}
                                                    onBlur={formik.handleBlur}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={formik.values.email}
                                                    placeholder="Enter your email"
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
                                                <button
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        if (
                                                            emailVerificationResultBtn ==
                                                            "Next"
                                                        ) {
                                                            if (
                                                                !formik.errors
                                                                    .email &&
                                                                formik.values
                                                                    .email != ""
                                                            ) {
                                                                emailVerification(
                                                                    formik
                                                                        .values
                                                                        .email,
                                                                    setFirstQuestion,
                                                                    formik,
                                                                    setEmailVerificationResultBtn,
                                                                    setOpacity0,
                                                                    setDisplay0
                                                                );
                                                            }
                                                        } else {
                                                            navigate("/login");
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
                                                >
                                                    {emailVerificationResultBtn}
                                                </button>
                                            </form>
                                            <a href="/login">
                                                Do you have an account ? Login
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                                    onClick={() => {
                                                        setOpacity(0);
                                                        setSecondQuestion(true);
                                                        setTimeout(() => {
                                                            setDisplay("none");
                                                        }, 1000);
                                                    }}
                                                >
                                                    I'm currently working
                                                    professional
                                                </button>
                                                <button
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
                                                    onClick={() => {
                                                        setOpacity(0);
                                                        setSecondQuestion(true);
                                                        setTimeout(() => {
                                                            setDisplay("none");
                                                        }, 1000);
                                                    }}
                                                >
                                                    I'm a freelancer
                                                </button>
                                                <button
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
                                                    // value={}
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
                                                        name="country"
                                                        onChange={option => {
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
                                                                              width: "58%"
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
                                                                name="state"
                                                                // value={formik.values.country}
                                                                onChange={option => {
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
                                                        "Student" ? (
                                                            <div
                                                                style={
                                                                    window.innerWidth >
                                                                    500
                                                                        ? {
                                                                              width: "40%"
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
                                                                    name="district"
                                                                    // value={formik.values.country}
                                                                    onChange={option => {
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
                                                        id="college_field"
                                                        name="organization"
                                                        value={
                                                            organization.length >
                                                                0 &&
                                                            collegeOptions.find(
                                                                college =>
                                                                    college.value ===
                                                                    organization
                                                            )
                                                        }
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
                                                                              width: "58%"
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
                                                                              width: "40%"
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
                                                formik.values.areaOfInterest =
                                                    [];

                                                formik.values.firstName = "";
                                                formik.values.lastName = "";
                                                formik.values.email = "";
                                                formik.values.phone = void 0;
                                                // setRole([{ id: "", title: "" }]);
                                                formik.values.dept = "";
                                                formik.values.organization = "";
                                                formik.values.yog = "";
                                                formik.values.mentorRole = "";
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!tcChecked}
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
                                            onClick={e => {
                                                validate(formik.values);
                                                if (
                                                    formik.values.firstName ==
                                                        "" ||
                                                    formik.errors.firstName ||
                                                    formik.errors.email ||
                                                    formik.errors.phone ||
                                                    formik.errors
                                                        .areaOfInterest ||
                                                    (role[0]["title"] ==
                                                    "Student"
                                                        ? formik.errors
                                                              .organization ||
                                                          formik.errors.dept ||
                                                          formik.errors.yog
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
                                                    // console.log("error");
                                                } else {
                                                    // console.log(formik.values);
                                                    // console.log("no error");
                                                    onSubmit(formik.values, {});
                                                }
                                            }}
                                        >
                                            Submit
                                        </button>
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
