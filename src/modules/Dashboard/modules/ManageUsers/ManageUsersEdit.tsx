import { useEffect, useState, useRef } from "react";
import { editManageUsers, getManageUsersDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { roles } from "@/MuLearnServices/types";
import {
    getCommunities,
    getCompanies,
    getCountries,
    getState,
    getDistrict,
    getColleges
} from "../../../Common/Authentication/services/onboardingApis";

type Props = {};

const errorHandler = (status: number, dataStatus: number) => {
    const toast = useToast();
    toast({
        title: `Status${status} DataStatus${dataStatus}`,
        status: "error",
        duration: 3000,
        isClosable: true
    });
};

const ManageUsersEdit = (props: Props) => {
    const formikRef = useRef<any>();

    //DropDownStates
    const [community, setCommuntiy] = useState([{ id: "", title: "" }]);
    const [company, setCompany] = useState([{ id: "", title: "" }]);

    const [country, setCountry] = useState([{ value: "", label: "" }]);
    const [state, setState] = useState([{ value: "", label: "" }]);
    const [district, setDistrict] = useState([{ value: "", label: "" }]);
    const [college, setCollege] = useState([{ value: "", label: "" }]);
    const [department, setDepartment] = useState([{ value: "", label: "" }]);
    const [temp, setTemp] = useState([{ id: "", title: "" }]);

    const [data, setData] = useState<UserData>();
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        getManageUsersDetails(id, setData);

        //DropDown Fetch
        getCommunities(errorHandler, setCommuntiy);
        getCompanies(errorHandler, setCompany);
        getCountries(errorHandler, setCountry);
    }, []);
    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>User Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    innerRef={formikRef}
                    initialValues={{
                        // igName: name
                        first_name: data?.first_name || "",
                        last_name: data?.last_name || "",
                        email: data?.email || "",
                        mobile: data?.mobile || "",
                        // discord_id: data?.discord_id,
                        // mu_id: data?.mu_id,
                        college: data?.organization?.College
                            ? data?.organization?.College[0]
                            : "null",
                        community: data?.organization?.Community
                            ? data?.organization?.Community
                            : [],
                        company: data?.organization?.Company
                            ? data?.organization?.Company[0]
                            : "null",
                        department: data?.department || "null",
                        graduation_year: data?.graduation_year || "null",
                        country: "",
                        state: "",
                        district: ""
                    }}
                    validationSchema={Yup.object({
                        // igName: Yup.string()
                        //     .max(30, "Must be 30 characters or less")
                        //     .required("Required"),
                        first_name: Yup.string()
                            .max(20, "Must be 20 characters or less")
                            .required("Required"),
                        last_name: Yup.string()
                            .max(20, "Must be 20 characters or less")
                            .required("Required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        mobile: Yup.string()
                            .length(10, "Invalid mobile number")
                            .required("Required"),
                        college: Yup.string().required("Required"),
                        community: Yup.array().required("Required"),
                        company: Yup.string().required("Required"),
                        department: Yup.string()
                            .min(3, "Invalid mobile number")
                            .required("Required"),
                        graduation_year: Yup.string()
                            .length(4, "Invalid graduation_year")
                            .required("Required"),
                        country: Yup.string().optional(),
                        state: Yup.string().optional(),
                        district: Yup.string().optional()
                    })}
                    onSubmit={values => {
                        //     editManageUsers(
                        //     id,
                        //     values.first_name,
                        //     values.last_name,
                        //     values.email,
                        //     values.mobile,
                        //     values.college,
                        //     values.department, // why error occur for deparmenet only
                        //     values.graduation_year,
                        //     values.role,
                        //     data?.organizations
                        //     // toast
                        // );
                        console.log(values);

                        // navigate("/manage-users");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        {/* {data?.role ? : }  */}
                        <FormikTextInput
                            label="User First Name"
                            name="first_name"
                            type="text"
                            placeholder="Enter a name"
                        />
                        <FormikTextInput
                            label="User Last Name"
                            name="last_name"
                            type="text"
                            placeholder="Enter a name"
                        />
                        <FormikTextInput
                            label="User Email"
                            name="email"
                            type="text"
                            placeholder="Enter a email"
                        />
                        <FormikTextInput
                            label="User Mobile Number"
                            name="mobile"
                            type="text"
                            placeholder="Enter a mobile number"
                        />

                        <FormikReactSelect
                            name="community"
                            options={community.map(obj => {
                                return { value: obj.id, label: obj.title };
                            })}
                            label="Community"
                            isClearable
                            isSearchable
                            isMulti
                        />
                        {!data?.role.includes(roles.STUDENT) ? (
                            <FormikReactSelect
                                name="company"
                                options={company.map(obj => {
                                    return { value: obj.id, label: obj.title };
                                })}
                                label="Company"
                                isClearable
                                isSearchable
                            />
                        ) : (
                            <>
                                <FormikReactSelect
                                    name="country"
                                    options={country}
                                    label="Country"
                                    isClearable
                                    isSearchable
                                    addOnChange={(option: any) => {
                                        formikRef.current.setFieldValue(
                                            "state",
                                            ""
                                        );
                                        if (option)
                                            getState(errorHandler, setState, {
                                                country: option.value
                                            });
                                        else {
                                            setState([]);
                                            setDistrict([]);
                                        }
                                    }}
                                />
                                <FormikReactSelect
                                    name="state"
                                    options={state}
                                    label="State"
                                    isClearable
                                    isSearchable
                                    addOnChange={(option: any) => {
                                        formikRef.current.setFieldValue(
                                            "district",
                                            ""
                                        );
                                        if (option)
                                            getDistrict(
                                                errorHandler,
                                                setDistrict,
                                                { state: option.value }
                                            );
                                        else {
                                            setDistrict([]);
                                        }
                                    }}
                                    isDisabled={!state.length}
                                />
                                <FormikReactSelect
                                    name="district"
                                    options={district}
                                    label="District"
                                    isClearable
                                    isSearchable
                                    addOnChange={(option: any) => {
                                        getColleges(
                                            setTemp,
                                            setCollege,
                                            setDepartment,
                                            errorHandler,
                                            { district: option.value }
                                        );
                                    }}
                                    isDisabled={!district.length}
                                />

                                <FormikReactSelect
                                    name="college"
                                    options={college}
                                    label="College"
                                    isClearable
                                    isSearchable
                                    isDisabled={!college.length}
                                />
                                <FormikReactSelect
                                    label="User Department"
                                    name="department"
                                    options={department}
                                    isClearable
                                    isSearchable
                                    isDisabled={!department.length}
                                />
                                <FormikTextInput
                                    label="User Graduation Year"
                                    name="graduation_year"
                                    type="text"
                                    placeholder="Enter a mobile number"
                                />
                            </>
                        )}
                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/manage-users");
                                }}
                            />
                            <button
                                type="submit"
                                className={styles.btn_submit}
                                onClick={() => console.log(formikRef)}
                            >
                                Confirm
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default ManageUsersEdit;
