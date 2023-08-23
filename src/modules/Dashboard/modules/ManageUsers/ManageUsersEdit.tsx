import { useEffect, useState, useRef } from "react";
import { editManageUsers, getManageUsersDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import usrStyles from "./ManageUsers.module.css"
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
    getColleges,
    getRoles,
    getInterests
} from "../../../Common/Authentication/services/onboardingApis";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

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
    const [interestGroup, setinterestGroup] = useState([{ id: "", name: "" }]);
    const [role, setRole] = useState([{ id: "", title: "" }]);

    const [company, setCompany] = useState([{ id: "", title: "" }]);

    const [country, setCountry] = useState([{ value: '', label: '' }])
    const [state, setState] = useState([{ value: '', label: '' }])
    const [district, setDistrict] = useState([{ value: '', label: '' }])
    const [college, setCollege] = useState([{ value: '', label: '' }])
    const [department, setDepartment] = useState([{ value: '', label: '' }])
    const [collegTemp, setCollegTemp] = useState([{ id: '', title: '' }])


    const arrayIntersection = (userList: string[], mainList: string[]) => {
        return userList.filter(item => mainList.includes(item))
    }
    const roleStr = (roleName: string) => {
        //bad condition but it works
        if (role.length === 1 || !roleName)
            return ""
        return role.filter(item => item.title == roleName)[0].id
    }

    const [data, setData] = useState<UserData>();
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {

        //DropDown Fetch
        getCommunities(errorHandler, setCommuntiy)
        getCompanies(errorHandler, setCompany)
        getCountries(errorHandler, setCountry)

        getInterests(errorHandler, setinterestGroup)
        getRoles(errorHandler, setRole)

        //user data
        getManageUsersDetails(id, setData);

    }, []);

    useEffect(() => {
        //useEffect to recall lower demographic levels if previous level exist
        console.log(!!data?.country, !!data?.state, !!data?.district)
        if (data?.country && state[0].value == "")
            getState(errorHandler, setState, { country: data.country })
        if (data?.state && district[0].value == "")
            getDistrict(errorHandler, setDistrict, { state: data.state })
        if (data?.district)
            getColleges(
                setCollegTemp,
                setCollege,
                setDepartment,
                errorHandler,
                {district:data.district}
                )
                
    },[data])
    if(
        !community[0].id ||
        !interestGroup[0].id ||
        !role[0].id ||
        !company[0].id ||
        !country[0].value
    )
    return(
        <MuLoader/>
    )
    return (
        <div className={styles.external_container}>
            <div>
                <h1 className={styles.text}>User Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    innerRef={formikRef}
                    initialValues={{
                        // igName: name
                        first_name: data?.first_name || '',
                        last_name: data?.last_name || '',
                        email: data?.email || '',
                        mobile: data?.mobile || '',
                        college:
                            data?.organizations ?
                                arrayIntersection(
                                    data.organizations,
                                    college.map(item => item.value)
                                )[0] || "null"
                                : "null",
                        community:
                            data?.organizations ?
                                arrayIntersection(
                                    data.organizations,
                                    community.map(item => item.id)
                                )
                                : [],
                        company:
                            data?.organizations ?
                                arrayIntersection(
                                    data.organizations,
                                    company.map(item => item.id)
                                )[0] || "null"
                                : "null",
                        department: data?.department || "null",
                        graduation_year: data?.graduation_year || "null",
                        country: data?.country || "",
                        state: data?.state || "",
                        district: data?.district || "",
                        interest: data?.interest_groups,
                        role: data?.roles
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
                        district: Yup.string().optional(),
                        interest: Yup.array().required("Required"),
                        role: Yup.array().required("Required")
                    })}
                    onSubmit={values => {
                        editManageUsers(
                            id,
                            values.first_name,
                            values.last_name,
                            values.email,
                            values.mobile,
                            [
                                values.college,
                                values.company,
                                ...values.community
                            ].filter(item => item !== "null"),
                            values.department,
                            values.graduation_year,
                            values.role,
                            values.interest
                        );

                        navigate("/dashboard/manage-users");
                    }}
                >
                    <Form>
                        <div className={usrStyles.container}>
                            {/* {data?.role ? : }  */}
                            <div className={usrStyles.TextInputContainer}>
                                <FormikTextInput
                                    label="First Name"
                                    name="first_name"
                                    type="text"
                                    placeholder="Enter a name"
                                />
                                <FormikTextInput
                                    label="Last Name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Enter a name"
                                />
                                <FormikTextInput
                                    label="Email"
                                    name="email"
                                    type="text"
                                    placeholder="Enter a email"
                                />
                                <FormikTextInput
                                    label="Mobile Number"
                                    name="mobile"
                                    type="text"
                                    placeholder="Enter a mobile number"
                                />
                            </div>
                            <div className={usrStyles.TextDropdownContainer}>
                               <FormikReactSelect
                                    name="community"
                                    options={community.map(obj => {
                                        return { value: obj?.id, label: obj.title };
                                    })}
                                    label="Community"
                                    isClearable
                                    isSearchable
                                    isMulti
                                />
                                <FormikReactSelect
                                    name="role"
                                    options={role.map(obj => {
                                        return { value: obj?.id, label: obj.title };
                                    })}
                                    label="Roles"
                                    isClearable
                                    isSearchable
                                    isMulti
                                />
                                <FormikReactSelect
                                    name="interest"
                                    options={interestGroup.map(obj => {
                                        return { value: obj?.id, label: obj.name };
                                    })}
                                    label="Interest Groups"
                                    isClearable
                                    isSearchable
                                    isMulti
                                />
                            </div>
                        </div>
                        <div className={usrStyles.container}>
                            <div className={usrStyles.TextDropdownContainer}>
                            {data?.roles.includes(
                                roleStr(roles.ASSOCIATE)
                            ) ? <FormikReactSelect
                                name="company"
                                options={company.map((obj) => {
                                    return { value: obj.id, label: obj.title }
                                })}
                                label="Company"
                                isClearable
                                isSearchable

                            /> :
                                <>
                                    <FormikReactSelect
                                        name="country"
                                        options={country}
                                        label="Country"
                                        isClearable
                                        isSearchable
                                        addOnChange={(option: any) => {
                                            formikRef.current.setFieldValue('state', '')
                                            if (option)
                                                getState(
                                                    errorHandler,
                                                    setState,
                                                    { country: option.value }
                                                )
                                            else {
                                                setState([])
                                                setDistrict([])
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
                                            formikRef.current.setFieldValue('district', '')
                                            if (option)
                                                getDistrict(
                                                    errorHandler,
                                                    setDistrict,
                                                    { state: option.value }
                                                )
                                            else {
                                                setDistrict([])
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
                                                setCollegTemp,
                                                setCollege,
                                                setDepartment,
                                                errorHandler,
                                                { district: option.value }
                                            )
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
                                    {
                                        !data?.roles.includes(
                                            roleStr(roles.ENABLER)
                                        ) &&
                                        <FormikTextInput
                                            label="User Graduation Year"
                                            name="graduation_year"
                                            type="text"
                                            placeholder="Enter Graduation Year"
                                        />
                                    }
                                </>
                            }
                            </div>
                        </div>
                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/dashboard/manage-users");
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
