import { useEffect, useState } from "react";
import styles from "./LearningCircle.module.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {
    getInterestGroups,
    createCircle
} from "../services/LearningCircleAPIs";
import { useNavigate } from "react-router-dom";

type Props = {};

type interestGroupType = {
    value: string;
    label: string;
};

const LearningCircleCreate = (props: Props) => {
    const [interestGroups, setInterestGroups] = useState<interestGroupType[]>();
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const createLearningCircleSchema = Yup.object().shape({
        circle_name: Yup.string()
          .required('Required')
          .min(2, 'Too Short!')
          .max(30, 'Too Long!')
          .matches(/^[^/<>[\]{}|]*$/, 'Invalid characters detected'), // Custom validation for invalid characters
        interest_group: Yup.string().required('Required'),
      });

    useEffect(() => {
        (async () => {
            const data = await getInterestGroups();
            setInterestGroups(data);
        })();
    }, []);

    return (
        <>
            <div className={styles.LearningCircleCreateContent}>
                <div className={styles.LearningCircleCreateMain}>
                    <img
                        src="https://i.ibb.co/RhT8b3z/image-24.png"
                        alt="Loading..."
                    />

                    <div className={styles.LearningCircleCreateHeading}>
                        <div>
                            <b>Create a Learning circle</b>
                            <p>Connect, Collaborate, and Learn Together!</p>
                        </div>

                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                circle_name: "",
                                interest_group: ""
                            }}
                            validationSchema={createLearningCircleSchema}
                            onSubmit={(values, { resetForm }) => {
                                createCircle(
                                    setId,
                                    values.circle_name,
                                    values.interest_group,
                                    navigate
                                );
                                resetForm();
                            }}
                        >
                            <Form>
                                <div
                                    className={styles.LearningCircleCreateForm}
                                >
                                    <FormikTextInput
                                        type="text"
                                        name="circle_name"
                                        placeholder="Learning circle name"
                                    />
                                    <FormikReactSelect
                                        isDisabled={!interestGroups}
                                        name="interest_group"
                                        placeholder="Interest group"
                                        label=""
                                        options={interestGroups!}
                                    />
                                </div>
                                <button type="submit">Create</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LearningCircleCreate;
