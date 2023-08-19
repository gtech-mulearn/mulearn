import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import styles from "../../../utils/formStyle.module.css";
import {
    FormikTextInputWhite
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {
    MuButton, PowerfulButton,
} from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationForm, getHackDetails, submitHackApplication } from "../services/HackathonApis";
import { capitalizeFirstLetter } from "../../../utils/common";
import { HackApplicationSchema } from "../services/HackathonYup";
import { HackList, HackathonApplication } from "../services/HackathonInterfaces";

type Props = {};

const HackathonRegistration = (props: Props) => {
    const toast = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<HackList>();
    const [application, setApplication] = useState<HackathonApplication[]>([]);

    useEffect(() => {
        getHackDetails(setData, id);
        getApplicationForm(setApplication, id);
    }, []);

    const handleSubmit = (values: any) => {
        submitHackApplication(
			values,
			id,
            navigate,
            toast,
		)
    };

    return (
        <div className={styles.external_container}>
            <div className={styles.container}>
                <h1 className={styles.text}>
                    Application Form for {data?.title}
                </h1>
                <Formik
                    initialValues={{
                        name: null,
                        gender: null,
                        email: null,
                        mobile: null,
                        bio: null,
                        college: null,
                        experience: null,
                        github: null,
                        linkedin: null
                    }}
                    /*
					! TODO: Validation has issues with submitting so disabled for now.
					*/
                    // validationSchema={HackApplicationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                    }}
                >
                    {formik => (
                        <Form className={styles.formContainer}>
                            {application &&
                                application.map((hack, index) => (
                                    <div className={styles.inputContainer}>
                                        <FormikTextInputWhite
                                            label={capitalizeFirstLetter(
                                                hack.field_name
                                            )}
                                            name={hack.field_name}
                                            type="text"
                                            placeholder="enter text here..."
                                        />
                                    </div>
                                ))}
                            <div className={styles.inputContainerBtn}>
                                <PowerfulButton text="Decline" onButtonClick={() => {
                                        navigate(
                                            `/dashboard/hackathon/details/${id}`
                                        );
                                    }} backgroundColor="#EFF1F9" color="#456FF6" borderColor="#EFF1F28"/>
                                
                                <PowerfulButton text="Confirm" type={"submit"}/>
                                
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default HackathonRegistration;
