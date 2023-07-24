import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationForm, getHackDetails } from "../services/HackathonApis";
import { HackList } from "../services/HackathonInterfaces";


type Props = {};

const HackathonRegistration = (props: Props) => {
    const toast = useToast();
    const { id } = useParams();
	const navigate = useNavigate();
    const [data, setData] = useState<HackList>();

    useEffect(() => {
        getHackDetails(setData, id);
		getApplicationForm(id, toast)
    }, [1]);

    const taskEditSchema = Yup.object().shape({
        name: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(30, "Too Long!"),
        
    });

	const handleSubmit = (values: any) => {
		console.log(values)
	}

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>
                    Application Form for {data?.title}
                </h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: "",
                        gender: "",
                        email: "",
                        mobile: '',
                        bio: "",
                        college: "",
                        experience: "",
                        github: "",
                        linkedin: ""
                    }}
                    validationSchema={taskEditSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className={styles.inputContainer}>
                        <FormikTextInput
                            label="Hashtag"
                            name="hashtag"
                            type="text"
                            placeholder="#example"
                        />
                        <div className={styles.btn_container}>
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/tasks");
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

export default HackathonRegistration;
