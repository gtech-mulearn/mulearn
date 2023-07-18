
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { postCountryData } from "./apis";
import { useToast } from "@chakra-ui/react";

const EditLocation = () => {
    const navigate = useNavigate();
    const toast = useToast();
    return (
        <div className="popup_container">
            <div className={styles.container}>
                <div className="popup_top_container">
                    <h1 className="popup_title">Add Country</h1>
                    <i
                        className="fi fi-sr-cross"
                        onClick={() => {
                            navigate('/manage-locations');
                        }}
                    ></i>
                </div>
                <p>Kindly review the provided details and make sure that they are correct.
                    Once you have verified the information, please click the <span>Confirm</span>
                    button to proceed for further process.
                </p>
                <Formik
                    initialValues={{
                        countryName: ""
                    }}
                    validationSchema={Yup.object({
                        countryName: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values.countryName);
                        postCountryData(values.countryName);
                        toast({
                            title: "Interest Group created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                        navigate('/manage-locations');
                    }}
                >
                    <Form>
                        <FormikTextInput
                            label="Country Name"
                            name="countryName"
                            type="text"
                            placeholder="Enter Country "
                        />

                        {/* <MySelect label="Job Type" name="jobType">
                            <option value="">Select a job type</option>
                            <option value="designer">Designer</option>
                            <option value="development">Developer</option>
                            <option value="product">Product Manager</option>
                            <option value="other">Other</option>
                        </MySelect>

                        <MyCheckbox name="acceptedTerms">
                            I accept the terms and conditions
                        </MyCheckbox> */}
                        <div className="ml_popup_btn_container">
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate('/manage-locations');
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
    )
}

export default EditLocation