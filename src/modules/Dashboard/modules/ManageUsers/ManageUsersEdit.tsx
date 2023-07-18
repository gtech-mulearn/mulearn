import { useEffect, useState } from "react";
import { editManageUsers, getManageUsersDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikSelect, FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";

type Props = {};

const ManageUsersEdit = (props: Props) => {
    const [name, setName] = useState("");
    interface IData {
        first_name: string;
        last_name: string;
        email: string;
        mobile: string;
        discord_id: string;
        mu_id: string;
        college: string;
        company: string;
        department: string;
        graduation_year: string;
    }

    // const [data, setData] = useState<IData>({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     mobile: "",
    //     discord_id: "",
    //     mu_id: "",
    //     college: "",
    //     company: "",
    //     department: "",
    //     graduation_year: ""
    // });
     const [data, setData] = useState<IData>({
         first_name: "",
         last_name: "",
         email: "",
         mobile: "",
         discord_id: "",
         mu_id: "",
         college: "",
         company: "",
         department: "",
         graduation_year: ""
     });

    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        getManageUsersDetails(id, setData);
    }, []);

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>User Edit Page</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        // igName: name
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        mobile: data.mobile,
                        discord_id: data.discord_id,
                        mu_id: data.mu_id,
                        college: data.college,
                        company: data.company,
                        department: data.department,
                        graduation_year: data.graduation_year
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
                        college: Yup.string()
                            .min(5, "Invalid mobile number")
                            .required("Required"),
                        company: Yup.string()
                            .min(3, "Invalid mobile number")
                            .required("Required"),
                        department: Yup.string()
                            .min(3, "Invalid mobile number")
                            .required("Required"),
                        graduation_year: Yup.string()
                            .length(4, "Invalid mobile number")
                            .required("Required")
                        // discord_id: Yup.string()
                        //     .min(17, "Must be 17 characters or more")
                        //     .required("Required"),
                        // mu_id: Yup.string()
                        //     .email("Invalid mu_id")
                        //     .required("Required")
                    })}
                    onSubmit={values => {
                        editManageUsers(
                            id,
                            values.first_name,
                            values.last_name,
                            values.email,
                            values.mobile,
                            values.discord_id,
                            values.mu_id,

                            values.college,
                            values.company,
                            values.department,
                            values.graduation_year,
                            toast
                        );

                        navigate("/manage-users");
                    }}
                >
                    <Form className={styles.inputContainer}>
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
                        <FormikTextInput
                            label="User College Name"
                            name="college"
                            type="text"
                            placeholder="Enter a mobile number"
                        />
                        <FormikSelect label="User College Name" name="college">
                            <option value="">Select an option</option>
                            <option value="VIDYA ACADEMY OF SCIENCE AND TECHNOLOGY">
                                VIDYA ACADEMY OF SCIENCE AND TECHNOLOGY
                            </option>
                            <option value="ST JOSEPHS COLLEGE OF ENGINEERING AND TECHNOLOGY PALAI">
                                ST JOSEPHS COLLEGE OF ENGINEERING AND TECHNOLOGY
                                PALAI
                            </option>
                            <option value="A M T T I VILABHAGAM">
                                A M T T I VILABHAGAM
                            </option>
                            <option value="Mar Baselios College of Engineering and Technology">
                                Mar Baselios College of Engineering and
                                Technology
                            </option>
                            <option value=""></option>
                            <option value=""></option>
                        </FormikSelect>
                        <FormikTextInput
                            label="User Company Name"
                            name="company"
                            type="text"
                            placeholder="Enter a mobile number"
                        />
                        <FormikTextInput
                            label="User Department"
                            name="department"
                            type="text"
                            placeholder="Enter a mobile number"
                        />
                        <FormikTextInput
                            label="User Graduation Year"
                            name="graduation_year"
                            type="text"
                            placeholder="Enter a mobile number"
                        />
                        {/* <FormikTextInput
                            label="User Discord ID"
                            name="discord_id"
                            type="text"
                            placeholder="Enter a mobile number"
                        />
                        <FormikTextInput
                            label="User Mu_ID"
                            name="mu_id"
                            type="text"
                            placeholder="Enter a mobile number"
                        /> */}
                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/manage-users");
                                }}
                            />
                            <button type="submit" className={styles.btn_submit}>
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
