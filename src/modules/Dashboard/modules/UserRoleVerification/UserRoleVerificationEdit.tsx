import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
    editUserRoleVerification,
    getUserRoleVerificationDetails
} from "./apis";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import "./UserRoleVerification.css";

type Props = {};

const UserRoleVerificationEdit = (props: Props) => {
    const [input1, setInput1] = useState(true);

    interface IData {
        verified: boolean;
    }
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const [data, setData] = useState<IData>({
        verified: isChecked
    });
    useEffect(() => {
        getUserRoleVerificationDetails(id, setData);
    }, []);

    const inputFields = [
        {
            content: "User Role",
            inputType: "text",
            input: input1,
            setInput: setInput1
        }
    ];

    const { id } = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (id) {
            editUserRoleVerification(input1, id);
            navigate("/user-role-verification");
        }
    };
    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>Edit User Verification</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        verified: data.verified
                    }}
                    validationSchema={Yup.object({
                        // igName: Yup.string()
                        //     .max(30, "Must be 30 characters or less")
                        //     .required("Required"),
                        verified: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        if (id) {
                            editUserRoleVerification(isChecked, id);
                        }
                        navigate("/user-role-verification");
                    }}
                >
                    <Form className={styles.inputContainer}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                alignItems: "center"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 5,
                                    width: "fit-content",
                                    borderRadius: 10,
                                    borderWidth: 3,
                                    height: "50px",
                                    borderColor: "#014BB2",
                                    gap: 5
                                }}
                            >
                                <input
                                    style={{
                                        width: "50px"
                                    }}
                                    id="s2d"
                                    type="checkbox"
                                    className="switch"
                                    name="verified"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <p
                                    style={{
                                        color: "black",
                                        width: "100%"
                                    }}
                                >
                                    Verification
                                </p>
                            </div>

                            <div className={styles.btn_container}>
                                <MuButton
                                    text={"Decline"}
                                    className={styles.btn_cancel}
                                    onClick={() => {
                                        navigate("/user-role-verification");
                                    }}
                                />
                                <button
                                    type="submit"
                                    className={styles.btn_submit}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default UserRoleVerificationEdit;
