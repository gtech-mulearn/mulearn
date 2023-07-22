import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationForm, getHackDetails } from "../services/HackathonApis";
import { HackList } from "../services/HackathonInterface";


type Props = {};

const HackathonRegistration = (props: Props) => {
    const toast = useToast();
    const { id } = useParams();
	const navigate = useNavigate();
    const [data, setData] = useState<HackList>();

    useEffect(() => {
        getHackDetails(setData, id);
		getApplicationForm(id, toast)
    }, []);

    const taskEditSchema = Yup.object().shape({
        hashtag: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(30, "Too Long!"),
        title: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        karma: Yup.number()
            .positive("Karma should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(9999, "Should not exceed 4 digits")
            .truncate()
            .required("Karma is required"),
        usage_count: Yup.number()
            .truncate()
            .required("Mention the number of uses"),
        active: Yup.boolean().required("Select an option"),
        variable_karma: Yup.boolean().required("Select an option"),
        description: Yup.string().min(4, "Too Short!").max(100, "Too Long!"),
        channel_id: Yup.string(),
        type_id: Yup.string(),
        level_id: Yup.string(),
        ig_id: Yup.string(),
        organization_id: Yup.string()
    });
    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>Application Form for {data?.title}</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        hashtag: "",
                        title: "",
                        karma: "",
                        usage_count: "",
                        active: "",
                        variable_karma: "",
                        description: "",
                        channel_id: "",
                        type_id: "",
                        level_id: "",
                        ig_id: "",
                        organization_id: ""
                    }}
                    validationSchema={taskEditSchema}
                    onSubmit={(values: {
                        hashtag: any;
                        title: any;
                        karma: any;
                        usage_count: any;
                        active: any;
                        variable_karma: any;
                        description: any;
                        channel_id: any;
                        type_id: any;
                        level_id: any;
                        ig_id: any;
                        organization_id: any;
                    }) => {
                        toast({
                            title: "Interest Group created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                        // navigate("/tasks");
                    }}
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
