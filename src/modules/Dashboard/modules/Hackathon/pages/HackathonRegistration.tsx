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
import Modal from "@/MuLearnComponents/Modal/Modal";

type Props = {};

// ... (previous imports)

const HackathonRegistration = (props: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modal, setModal] = useState(true); // Set modal to false initially
    const [data, setData] = useState<HackList>();
    const [application, setApplication] = useState<HackathonApplication[]>([]);

    useEffect(() => {
        getHackDetails(id || '')
        .then(res => {
            setData(res)
        })
        .catch(err => {
            console.error(err)
        })
        getApplicationForm(setApplication, id);
    }, []);

    const handleSubmit = (values: any) => {
        submitHackApplication(values, id, navigate);
    };

    function getSystemFieldsNames() {
        const systemFields = application.filter(
            hack => hack.field_type === "system"
        );
        const systemFieldNames = systemFields.map(hack => hack.field_name);
        return systemFieldNames.join(", ");
    }

    const handleModalClick = () => {
        const hasNonSystemFields = application.some(
            hack => hack.field_type !== "system"
        );

        if (hasNonSystemFields) {
            setModal(false);
        } else {
			handleSubmit({
                name: null,
                gender: null,
                email: null,
                mobile: null,
                bio: null,
                college: null,
                experience: null,
                github: null,
                linkedin: null
            });
            setModal(false);
        }
    };

    return (
        <div className={styles.external_container}>
            {modal && (
                <Modal
                    setIsOpen={setModal}
                    id={""}
                    heading={"Data access request"}
                    content={`Are you sure you want to share your ${getSystemFieldsNames()} to apply in this hackathon ?`}
                    click={handleModalClick}
                />
            )}
                {/* Check if there's at least one non-"system" field */}
                {application.some(hack => hack.field_type !== "system") && (
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
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values);
                        }}
                    >
                        {formik => (
                            <Form className={styles.formContainer}>
                                {application.map(
                                    (hack, index) =>
                                        hack.field_type !== "system" && (
                                            <div
                                                className={
                                                    styles.inputContainer
                                                }
                                                key={index}
                                            >
                                                <FormikTextInputWhite
                                                    label={capitalizeFirstLetter(
                                                        hack.field_name
                                                    )}
                                                    name={hack.field_name}
                                                    type="text"
                                                    placeholder="enter text here..."
                                                />
                                            </div>
                                        )
                                )}
                                <div className={styles.inputContainerBtn}>
                                    <PowerfulButton variant="secondary"
                                        type="button"
                                        onClick={() => navigate( `/dashboard/hackathon/details/${id}` )}
                                        children="Decline"
                                    />
                                    <PowerfulButton
                                        type="submit" // Change to "button"
                                        children="Confirm"
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
            </div>
                )}
        </div>
    );
};

export default HackathonRegistration;
