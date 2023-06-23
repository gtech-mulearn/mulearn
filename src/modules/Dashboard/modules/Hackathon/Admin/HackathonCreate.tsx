import { Form, Formik, useFormikContext, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./HackathonCreate.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "../../../../../components/MuComponents/FormikComponents/FormikComponents";
import { useState } from "react";

const SubmitButton = () => {
    const formik = useFormikContext();

    const handleSubmit = () => {
        formik.submitForm();
    };

    return (
        <button onClick={handleSubmit} className={styles.btn}>
            Save & Finish later
        </button>
    );
};

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);

    function handleNext() {
        if (tabIndex === 6) {
            setTabIndex(6);
        } else {
            setTabIndex(tabIndex + 1);
        }
    }

    function handleBack() {
        if (tabIndex === 0) {
            setTabIndex(0);
        } else {
            setTabIndex(tabIndex - 1);
        }
    }

    const hackathonSchema = Yup.object().shape({
        title: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
        description: Yup.string()
            .min(2, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
        about: Yup.string().min(5, "Too Short!").required("Required"),
        startDate: Yup.date().required("Required"),
        endDate: Yup.date().required("Required"),
        regStartDate: Yup.date().required("Required"),
        regEndDate: Yup.date().required("Required"),
        participants: Yup.number()
            .positive("Number of users should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(999999, "Should not exceed 6 digits")
            .truncate()
            .required("User count is required")
    });

    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                <h1 className={styles.dashLine}>Lets Get Started</h1>
                <SubmitButton />
            </div>

            <div>
                <div className={styles.hackNav}>
                    <div className={styles.starImg}>
                        <img
                            src="/src/modules/Dashboard/modules/Hackathon/Assects/Star 1.png"
                            alt=""
                        />
                        <img
                            src="/src/modules/Dashboard/modules/Hackathon/Assects/Star 2.png"
                            alt=""
                        />
                    </div>

                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            startDate: "",
                            endDate: "",
                            regStartDate: "",
                            regEndDate: "",
                            participants: "",
                            about: ""
                        }}
                        validationSchema={hackathonSchema}
                        onSubmit={values => {
                            console.log(values);
                        }}
                    >
                        <Form>
                            <Tabs
                                selectedTabClassName={styles.selectedTab}
                                selectedIndex={tabIndex}
                                onSelect={index => setTabIndex(index)}
                            >
                                <TabList>
                                    <Tab>Basics</Tab>
                                    <Tab>Dates</Tab>
                                    <Tab>Links</Tab>
                                    <span></span>
                                    <Tab>Prizes</Tab>
                                    <Tab>Sponsors</Tab>
                                    <Tab>Events</Tab>
                                    <Tab>FAQs</Tab>
                                </TabList>
                                <div className={styles.form}>
                                    <TabPanel className={styles.formGroup}>
                                        <FormikTextInputWhite
                                            label="Name"
                                            name="title"
                                            type="text"
                                            placeholder="what you are calling your hackathon"
                                        />

                                        <FormikTextInputWhite
                                            label="Tagline"
                                            name="description"
                                            type="text"
                                            placeholder="eg: worlds realest hackathon"
                                        />
                                        <FormikTextInputWhite
                                            label="Approx. Participants"
                                            name="participants"
                                            type="number"
                                            placeholder="eg: 250."
                                        />
                                        <FormikTextAreaWhite
                                            label="About"
                                            name="about"
                                            placeholder="explain something"
                                        />
                                    </TabPanel>

                                    <TabPanel className={styles.formGroup}>
                                        <FormikTextInputWhite
                                            label="Start Date"
                                            name="startDate"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="End Date"
                                            name="endDate"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="Registration Start Date"
                                            name="regStartDate"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="Registration End Date"
                                            name="regEndDate"
                                            type="date"
                                        />
                                    </TabPanel>
                                    <TabPanel className={styles.formGroup}>
                                        <h2>Content for Tab 3</h2>
                                        <p>This is the content of Tab 3.</p>
                                    </TabPanel>
                                </div>
                                <div className={styles.btns}>
                                    <button
                                        onClick={handleBack}
                                        className={styles.btn}
                                    >
                                        Go back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className={styles.btn}
                                    >
                                        Next
                                    </button>
                                </div>
                            </Tabs>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default HackathonCreate;
