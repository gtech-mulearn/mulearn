import styles from "./AccountCreation.module.css";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import {
    getDWMSDetails,
    getRoles,
    validate
} from "../../../services/newOnboardingApis";
import { Form, Formik } from "formik";
import * as z from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useEffect, useRef, useState } from "react";

// import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getCommunities } from "../../../services/onboardingApis";
import { BiSupport } from "react-icons/bi";
import { isDev } from "@/MuLearnServices/common_functions";
import roleOptions from "../RolePage/data/roleOptions";
import muBrand from "/src/modules/Common/Authentication/assets/µLearn.png";
import { submitUserData } from "../../../services/newOnboardingApis";
import toast from "react-hot-toast";

const animatedComponents = makeAnimated();

type DWMSData = {
    email: string;
    fullName: string;
    phoneNumber: string;
    gender?: string;
    dob?: string;
};

const scheme = z.object({
    email: z
        .string()
        .required(`Email is Required`)
        .min(5, `Email must be at least 3 characters`)
        .max(100, `Email must be at most 100 characters`),
    fullName: z
        .string()
        .required(`Full Name is Required`)
        .min(3, `Full Name must be at least 3 characters`)
        .max(100, `Full Name must be at most 100 characters`),
    // phoneNumber: z
    //     .string()
    //     .required(`Phone number is Required`)
    //     .min(10, `Phone number must be at least 10 characters`)
    //     .max(10, `Phone number must be at most 10 characters`),
    ...(isDev()
        ? {
              password: z.string().required(`Password is Required`)
          }
        : {
              password: z
                  .string()
                  .required(`Password is Required`)
                  .min(8, `Password must be at least 8 characters`)
                  .max(100, `Password must be at most 100 characters`)
          })
    // confirmPassword: z
    //     .string()
    //     .required(`Password is Required`)
    //     .test(
    //         "passwords-match",
    //         "Passwords are not matching",
    //         function (value) {
    //             return this.parent.password === value;
    //         }
    //     )
});

export default function AccountCreation() {
    let { role } = useParams();
    const [popUP, setPopUp] = useState(role ? false : true);
    // const toast = useToast();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([{ id: "", title: "" }]);
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("param");
    const referralId = urlParams.get("referral_id");
    const [selectedRoleId, setSelectedRoleId] = useState<string>("");
    const [selectedRole, setSelectedRole] = useState<string>("");

    //ref to community selector for resetting - temporary fix
    const community_select_ref = useRef<any>();

    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isVisibleC, setVisibleC] = useState(false);
    const [dwmsData, setDWMSData] = useState<DWMSData>();

    const [isTncChecked, setTncChecked] = useState(false);

    const [communitiesList, setCommunitiesList] = useState([
        { id: "", title: "" }
    ]);
    const [initialValues, setInitialValues] = useState({
        email: "",
        fullName: "",
        password: "",
        role: "",
        muid: "",
        communities: []
    });

    role =
        role === "student" || role === "mentor" || role === "enabler"
            ? role
            : "other";

    useEffect(() => {
        if (isLoading) return;
        setIsLoading(true);
        getCommunities({
            setCommunityAPI: setCommunitiesList,
            setIsLoading: setIsLoading
        });
        getRoles().then((res: any) => {
            setRoles(res);
            setIsLoading(false);
            setSelectedRoleId(
                res.find((role: any) => role.title.toLowerCase() === role)
                    ?.id || ""
            );
            // setSelectedRole(role);
        });
        if (param) {
            getDWMSDetails(param, (data: any) => {
                setDWMSData({
                    email: data?.email_id || "",
                    fullName:
                        data?.job_seeker_fname + " " + data?.job_seeker_lname ||
                        "",
                    phoneNumber: data?.mobile_no || "",
                    gender: data?.gender || "",
                    dob: data?.dob || ""
                });

                setInitialValues({
                    ...initialValues,
                    email: data?.email_id || "",
                    fullName:
                        data?.job_seeker_fname + " " + data?.job_seeker_lname ||
                        ""
                    // phoneNumber: data?.mobile_no || ""
                });
            });
        }

        setIsLoading(false);
    }, []);
    // console.log(roles.find(e => e.title.toLowerCase() === role)?.id);

    const onsubmit = async (values: any, actions: any) => {
        if (!isTncChecked) {
            toast.error("Please accept the terms and conditions");
            return;
        }

        // console.log(values);

        const userData: {
            user: {
                full_name: any;
                email: any;
                password: any;
            };
            role?: string;
            referral?: { muid: string };
            gender?: string;
            dob?: string;
            communities?: string[];
            integration?: {
                param: string;
                title: string;
            };
        } = {
            user: {
                full_name: values.fullName,
                email: values.email,
                password: values.password
            }
        };

        // if (values.lastName) {
        //     userData.user.last_name = values.lastName;
        // }

        if (values.muid) {
            userData.referral = { muid: values.muid };
        } else if (referralId) {
            userData.referral = { muid: referralId };
        }

        if (dwmsData && dwmsData.gender) {
            userData.gender = dwmsData.gender;
        }

        if (values.communities) {
            userData.communities = values.communities;
        }

        if (role) {
            userData.role = roles.find(e => e.title.toLowerCase() === role)?.id;
        }

        if (selectedRoleId) {
            userData.role = selectedRoleId;
        }

        if (param) {
            userData.integration = {
                param: param,
                title: "DWMS"
            };
        }

        if (dwmsData && dwmsData.dob) {
            userData.dob = dwmsData.dob;
        }

        const isSuccess = await validate({
            userData: userData,
            setIsSubmitting: setIsLoading
            // toast: toast // Make sure to pass the toast parameter correctly
        });

        if (isSuccess && selectedRole.toLowerCase() !== "other") {
            navigate("/register/about", { state: userData });
        } else if (isSuccess && selectedRole.toLowerCase() === "other") {
            submitUserData({
                setIsLoading: setIsLoading,
                userData: userData,
                // toast: toast,
                navigate: navigate
            });
        }
    };
    // console.log(selectedRole, role);

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Create an Account"}
                desc={"Please Enter Your Information"}
            />
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={scheme}
                onSubmit={onsubmit}
            >
                {formik => (
                    <Form>
                        {popUP && (
                            <div className={styles.popUp}>
                                <div className={styles.box}>
                                    <img src={muBrand} alt="mulearn" />
                                    <h1>What describes you the most!</h1>
                                    <p className={styles.subText}>
                                        Choose the role that best fits your
                                        profile.
                                    </p>
                                    <div className={styles.rolePageCards}>
                                        {roleOptions.map((roleOption: any) => {
                                            let classname = `${
                                                styles.rolePageCard
                                            } ${
                                                selectedRole ===
                                                    roleOption.value &&
                                                styles.active
                                            }`;
                                            return (
                                                <div
                                                    className={classname}
                                                    onClick={() => {
                                                        let rolId = roles.find(
                                                            role =>
                                                                role.title ===
                                                                roleOption.value
                                                        )?.id;
                                                        setSelectedRoleId(
                                                            rolId || ""
                                                        );
                                                        setSelectedRole(
                                                            roleOption.value
                                                        );
                                                        setPopUp(false);
                                                    }}
                                                >
                                                    {roleOption.icon}
                                                    <p>{roleOption.title}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={styles.accountCreationContainer}>
                            <div className={styles.accountCreationInputs}>
                                <div className={styles.inputBox}>
                                    <SimpleInput
                                        name={"email"}
                                        type="email"
                                        value={
                                            formik.values.email ||
                                            dwmsData?.email
                                        }
                                        onChange={formik.handleChange}
                                        placeholder="Email id"
                                        required
                                        disabled={
                                            isLoading || dwmsData?.email
                                                ? true
                                                : false
                                        }
                                        style={
                                            dwmsData?.email
                                                ? { backgroundColor: "#f7f7f7" }
                                                : { backgroundColor: "#F5F7FB" }
                                        }
                                    />
                                </div>

                                <div className={styles.accountCreationName}>
                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"fullName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            placeholder="Full Name"
                                            value={
                                                formik.values.fullName ||
                                                dwmsData?.fullName
                                            }
                                            required
                                            disabled={
                                                isLoading || dwmsData?.fullName
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                dwmsData?.fullName
                                                    ? {
                                                          backgroundColor:
                                                              "#f7f7f7"
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "#F5F7FB"
                                                      }
                                            }
                                        />
                                    </div>
                                    <div
                                        className={
                                            styles.accountCreationPassword
                                        }
                                    >
                                        <div className={styles.inputBox}>
                                            <SimpleInput
                                                name={"password"}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                type={
                                                    isVisible
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Password"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setVisible(e => !e)}
                                        >
                                            {isVisible ? (
                                                <HiEye size={26} />
                                            ) : (
                                                <HiEyeSlash size={26} />
                                            )}
                                        </button>
                                    </div>
                                    {/* <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"lastName"}
                                            onChange={formik.handleChange}
                                            type="text"
                                            value={
                                                formik.values.lastName ||
                                                dwmsData?.lastName
                                            }
                                            placeholder="Last Name"
                                            disabled={
                                                isLoading || dwmsData?.lastName
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                dwmsData?.lastName
                                                    ? {
                                                          backgroundColor:
                                                              "#f7f7f7"
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "#F5F7FB"
                                                      }
                                            }
                                        />
                                    </div> */}
                                </div>

                                {/* <div className={styles.col_2}>
                                    <select
                                        style={{
                                            width: "15%",
                                            height: "40px",
                                            borderRadius: "5px",
                                            textAlign: "center",
                                            backgroundColor: "#F5F7FB"
                                        }}
                                        name="countryCode"
                                    >
                                        <option value="+91" selected>
                                            +91
                                        </option>
                                    </select>
                                    <div className={styles.inputBox}>
                                        <SimpleInput
                                            name={"phoneNumber"}
                                            value={
                                                formik.values.phoneNumber ||
                                                dwmsData?.phoneNumber
                                            }
                                            onChange={formik.handleChange}
                                            type="number"
                                            placeholder="Phone Number"
                                            required
                                            disabled={
                                                isLoading ||
                                                dwmsData?.phoneNumber
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                dwmsData?.phoneNumber
                                                    ? {
                                                          backgroundColor:
                                                              "#f7f7f7"
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "#F5F7FB"
                                                      }
                                            }
                                        />
                                    </div>
                                </div> */}
                                {/* <div className={styles.col_2}>
                                    <div
                                        className={
                                            styles.accountCreationPassword
                                        }
                                    >
                                        <div className={styles.inputBox}>
                                            <SimpleInput
                                                name={"password"}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                type={
                                                    isVisible
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Password"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setVisible(e => !e)}
                                        >
                                            {isVisible ? (
                                                <HiEye size={26} />
                                            ) : (
                                                <HiEyeSlash size={26} />
                                            )}
                                        </button>
                                    </div>
                                    <div
                                        className={
                                            styles.accountCreationPassword
                                        }
                                    >
                                        <div className={styles.inputBox}>
                                            <SimpleInput
                                                name={"confirmPassword"}
                                                value={
                                                    formik.values
                                                        .confirmPassword
                                                }
                                                onChange={formik.handleChange}
                                                type={
                                                    isVisibleC
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm Password"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setVisibleC(e => !e)}
                                        >
                                            {isVisibleC ? (
                                                <HiEye size={26} />
                                            ) : (
                                                <HiEyeSlash size={26} />
                                            )}
                                        </button>
                                    </div>
                                </div> */}
                                {/* <div>
                                    <Select
                                        name="community.id"
                                        ref={community_select_ref}
                                        placeholder="Select Communities you're part of"
                                        onChange={OnChangeValue => {
                                            console.log(OnChangeValue);
                                            const ids = OnChangeValue.map(
                                                (e: any) => e.value
                                            );
                                            formik.setFieldValue(
                                                "communities",
                                                ids
                                            );
                                        }}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isClearable
                                        defaultValue={
                                            param
                                                ? {
                                                      value: "ebb42790-571e-4d9e-b65e-d367faad5746",
                                                      label: "KKEM"
                                                  }
                                                : null
                                        }
                                        isMulti
                                        options={communitiesList.map(
                                            company => {
                                                return {
                                                    value: company.id,
                                                    label: company.title
                                                };
                                            }
                                        )}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <SimpleInput
                                        name={"muid"}
                                        value={formik.values.muid}
                                        type="text"
                                        placeholder="Referral MuID (Optional)"
                                        disabled={isLoading}
                                    />
                                </div> */}

                                <div className={styles.tnc}>
                                    <input
                                        type="checkbox"
                                        name="tnc"
                                        className={styles.tncCheckbox}
                                        checked={isTncChecked}
                                        onChange={() => setTncChecked(e => !e)}
                                    />
                                    <p>
                                        I agree to the{" "}
                                        <a
                                            href="http://mulearn.org/termsandconditions"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Terms & Conditions
                                        </a>
                                        {" and "}
                                        <a
                                            href="http://mulearn.org/privacypolicy"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                                <div className={styles.supportContainer}>
                                    <BiSupport size={20} />
                                    <a
                                        href="https://chat.whatsapp.com/La3nY4AVQsR0ndrwk4wN7v"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p className={styles.supportWa}>
                                            Facing Issues? Join our{" "}
                                            <span>Support Group!</span>
                                        </p>
                                    </a>
                                </div>

                                <PowerfulButton
                                    type="submit"
                                    style={{ marginTop: "10px" }}
                                    isLoading={isLoading}
                                >
                                    {selectedRole.toLowerCase() !== "other"
                                        ? isLoading
                                            ? "Validating..."
                                            : "Next Step"
                                        : isLoading
                                          ? "Validating..."
                                          : "Submit"}
                                </PowerfulButton>
                            </div>

                            <div className={styles.accountCreationAlternative}>
                                <div>
                                    <p>
                                        Already have an account?{" "}
                                        <a href="/login">Sign In</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </OnboardingTemplate>
    );
}
