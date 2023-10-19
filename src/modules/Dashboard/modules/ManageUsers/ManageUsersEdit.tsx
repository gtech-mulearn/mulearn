import { useEffect, useState, useRef } from "react";
import { editManageUsers, getManageUsersDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import usrStyles from "./ManageUsers.module.css";
import { Form, Formik } from "formik";
import { inputs, schema } from "./ManageUsersEditUtils";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
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

    const [isFetching, setIsFetching] = useState(true);

    //DropDownStates
    const [community, setCommunity] = useState([{ id: "", title: "" }]);
    const [interestGroup, setinterestGroup] = useState([{ id: "", name: "" }]);
    const [role, setRole] = useState([{ id: "", title: "" }]);

    const [company, setCompany] = useState([{ id: "", title: "" }]);

    const [country, setCountry] = useState([{ value: "", label: "" }]);
    const [state, setState] = useState([{ value: "", label: "" }]);
    const [district, setDistrict] = useState([{ value: "", label: "" }]);
    const [college, setCollege] = useState([{ value: "", label: "" }]);
    const [department, setDepartment] = useState([{ value: "", label: "" }]);
    const [collegTemp, setCollegTemp] = useState([{ id: "", title: "" }]);
    const roleStr = (roleName: string) => {
        //bad condition but it works
        if (role.length === 1 || !roleName) return "";
        return role.filter(item => item.title == roleName)[0]?.id || "";
    };

    const [data, setData] = useState<UserData>();
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const { formikProps, initialValues } = inputs(
        community,
        role,
        interestGroup,
        data,
        company,
        country,
        state,
        district,
        college,
        department,
        formikRef,
        errorHandler,
        setState,
        setDistrict,
        setCollegTemp,
        setCollege,
        setDepartment
    );

    useEffect(() => {
        //DropDown Fetch
        getCommunities({
            errorHandler: errorHandler,
            setCommunityAPI: setCommunity
        });
        getCompanies(errorHandler, setCompany);
        getCountries(errorHandler, setCountry);

        getInterests(errorHandler, setinterestGroup);
        getRoles(errorHandler, setRole);

        //user data
        getManageUsersDetails(id, setData).then(() => setIsFetching(false));
    }, []);

    useEffect(() => {
        //useEffect to recall lower demographic levels if previous level exist
        if (data?.country && state[0].value == "")
            getState(errorHandler, setState, { country: data.country });
        if (data?.state && district[0].value == "")
            getDistrict(errorHandler, setDistrict, { state: data.state });
        if (data?.district)
            getColleges(
                setCollegTemp,
                setCollege,
                setDepartment,
                errorHandler,
                { district: data.district }
            );
    }, [data]);
    if (
        !community[0].id ||
        !interestGroup[0].id ||
        !role[0].id ||
        !company[0].id ||
        !country[0].value
    )
        return <MuLoader />;
    return (
        <div className={styles.external_container}>
            <div>
                <h1 className={styles.text}>User Edit Page</h1>
                {isFetching ? (
                    <MuLoader />
                ) : (
                    <Formik
                        enableReinitialize={true}
                        innerRef={formikRef}
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={values => {
                            const filteredCommunity = [
                                values.college,
                                values.company,
                                ...values.community
                            ].filter(item => item !== null) as string[];

                            editManageUsers(
                                toast,
                                navigate,
                                id,
                                values.first_name,
                                values.last_name,
                                values.email,
                                values.mobile,
                                values.discord_id,
                                filteredCommunity,
                                values.department ?? undefined,
                                values.graduation_year ?? undefined,
                                values.role,
                                values.interest ?? undefined // use nullish coalescing operator to provide default value of undefined
                            );
                        }}
                    >
                        <Form>
                            <div className={usrStyles.container}>
                                <div className={usrStyles.TextInputContainer}>
                                    {formikProps.inputs?.map((input, index) => (
                                        <FormikTextInput
                                            {...input}
                                            key={index}
                                        />
                                    ))}
                                </div>
                                <div
                                    className={usrStyles.TextDropdownContainer}
                                >
                                    {formikProps.selects?.map(
                                        (select, index) => (
                                            <FormikReactSelect
                                                {...select}
                                                key={index}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                            <div className={usrStyles.container}>
                                <div
                                    className={usrStyles.TextDropdownContainer}
                                >
                                    {formikProps.dropDowns?.map(
                                        (select, index) => (
                                            <FormikReactSelect
                                                {...select}
                                                key={index}
                                            />
                                        )
                                    )}
                                    {data?.roles?.includes(
                                        roleStr(roles.ENABLER)
                                    ) && (
                                        <FormikTextInput
                                            {...formikProps.enabler}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={styles.btn_container}>
                                <PowerfulButton
                                    className={styles.btn_cancel}
                                    onClick={() => {
                                        navigate("/dashboard/manage-users");
                                    }}
                                >
                                    Decline
                                </PowerfulButton>
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
                )}
            </div>
        </div>
    );
};

export default ManageUsersEdit;
